/**
 * CFFR Pesapal Payment Route  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/pay/initiate     — creates Pesapal order, returns redirect URL
 * GET  /api/pay/callback     — Pesapal redirects student here after payment
 * GET  /api/pay/status/:ref  — frontend polls this to confirm payment
 */

const express = require("express");
const axios   = require("axios");
const router  = express.Router();

// Credentials — set ALL of these in Render environment variables

const CONSUMER_KEY    = process.env.PESAPAL_CONSUMER_KEY;     // ***YOUR_PESAPAL_CONSUMER_KEY***
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;  // ***YOUR_PESAPAL_CONSUMER_SECRET***
const CALLBACK_URL    = process.env.PESAPAL_CALLBACK_URL;      // ***https://cffr-backend.onrender.com/api/pay/callback***
const AMOUNT          = 250;
const CURRENCY        = "KES";

// Sandbox vs Production — set PESAPAL_ENV=production in Render when going live
const IS_PRODUCTION = process.env.PESAPAL_ENV === "production";
const PESAPAL_BASE  = IS_PRODUCTION
  ? "https://pay.pesapal.com/v3"
  : "https://cybqa.pesapal.com/pesapalv3";

// ─── In-memory order store ────────────────────────────────────────────────────
// Keyed by our internal order reference
const orderStore = {};

// ─── Helper: Get Pesapal Auth Token ──────────────────────────────────────────
const getAuthToken = async () => {
  const response = await axios.post(
    `${PESAPAL_BASE}/api/Auth/RequestToken`,
    {
      consumer_key:    CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    },
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  return response.data.token;
};

// ─── Helper: Register IPN (do once per deployment) ───────────────────────────
// IPN = Instant Payment Notification — Pesapal calls this URL when payment status changes
let cachedIpnId = process.env.PESAPAL_IPN_ID || null;

const registerIpn = async (token) => {
  if (cachedIpnId) return cachedIpnId;

  const response = await axios.post(
    `${PESAPAL_BASE}/api/URLSetup/RegisterIPN`,
    {
      url:          CALLBACK_URL,
      ipn_notification_type: "GET",
    },
    {
      headers: {
        Authorization:  `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept:         "application/json",
      },
    }
  );
  cachedIpnId = response.data.ipn_id;
  console.log("[CFFR Pay] IPN registered:", cachedIpnId);
  return cachedIpnId;
};

// ─── POST /api/pay/initiate ───────────────────────────────────────────────────
// Creates a Pesapal order and returns the hosted payment page URL.
// Frontend redirects student to this URL.
router.post("/initiate", async (req, res) => {
  const { phone, email, firstName, lastName } = req.body;

  if (!phone && !email) {
    return res.status(400).json({
      success: false,
      message: "Please provide a phone number or email address.",
    });
  }

  try {
    const token  = await getAuthToken();
    const ipnId  = await registerIpn(token);
    const ref    = `CFFR-${Date.now()}`; // unique order reference

    const orderPayload = {
      id:                    ref,
      currency:              CURRENCY,
      amount:                AMOUNT,
      description:           "CFFR Career Assessment Fee",
      callback_url:          `${CALLBACK_URL}?ref=${ref}`,
      notification_id:       ipnId,
      billing_address: {
        phone_number:  phone   || "",
        email_address: email   || "",
        first_name:    firstName || "Student",
        last_name:     lastName  || "User",
      },
    };

    const orderResponse = await axios.post(
      `${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`,
      orderPayload,
      {
        headers: {
          Authorization:  `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept:         "application/json",
        },
      }
    );

    const { order_tracking_id, redirect_url } = orderResponse.data;

    // Store order as pending
    orderStore[ref] = { status: "pending", trackingId: order_tracking_id };

    console.log(`[CFFR Pay] Order created: ${ref} → ${order_tracking_id}`);

    return res.status(200).json({
      success:     true,
      redirectUrl: redirect_url,   // frontend opens this URL
      orderRef:    ref,
    });

  } catch (err) {
    console.error("[CFFR Pay] Initiate error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment. Please try again.",
    });
  }
});

// ─── GET /api/pay/callback ────────────────────────────────────────────────────
// Pesapal redirects student here after payment (success or failure).
// We check the transaction status and update our store.
router.get("/callback", async (req, res) => {
  const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.query;
  const ref = req.query.ref || OrderMerchantReference;

  try {
    const token = await getAuthToken();

    const statusResponse = await axios.get(
      `${PESAPAL_BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:        "application/json",
        },
      }
    );

    const { payment_status_description, status_code } = statusResponse.data;

    // status_code 1 = COMPLETED
    if (status_code === 1 || payment_status_description === "Completed") {
      if (orderStore[ref]) orderStore[ref].status = "paid";
      console.log(`[CFFR Pay] Payment confirmed: ${ref}`);
      // Redirect student back to frontend with success flag
      const frontendUrl = process.env.FRONTEND_URL || "https://cffr.projectdatahub.org";
      return res.redirect(`${frontendUrl}?payment=success&ref=${ref}`);
    } else {
      if (orderStore[ref]) orderStore[ref].status = "failed";
      const frontendUrl = process.env.FRONTEND_URL || "https://cffr.projectdatahub.org";
      return res.redirect(`${frontendUrl}?payment=failed&ref=${ref}`);
    }

  } catch (err) {
    console.error("[CFFR Pay] Callback error:", err.response?.data || err.message);
    const frontendUrl = process.env.FRONTEND_URL || "https://cffr.projectdatahub.org";
    return res.redirect(`${frontendUrl}?payment=failed`);
  }
});

// ─── GET /api/pay/status/:ref ─────────────────────────────────────────────────
// Frontend polls this to check if payment went through
router.get("/status/:ref", (req, res) => {
  const order = orderStore[req.params.ref];
  if (!order) {
    return res.status(404).json({ success: false, status: "not_found" });
  }
  return res.status(200).json({ success: true, status: order.status });
});

module.exports = router;
