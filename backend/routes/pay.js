/**
 * CFFR Mpesa Payment Route
 * POST /api/pay        — initiates STK Push to student's phone
 * POST /api/pay/callback — Safaricom calls this after payment
 * GET  /api/pay/status/:checkoutId — frontend polls this to confirm payment
 */

const express = require("express");
const axios   = require("axios");
const router  = express.Router();

// ─── Your Mpesa Credentials ───────────────────────────────────────────────────
// Store ALL of these in your Render environment variables — never hardcode them.

const CONSUMER_KEY     = process.env.MPESA_CONSUMER_KEY;      // ***YOUR_CONSUMER_KEY***
const CONSUMER_SECRET  = process.env.MPESA_CONSUMER_SECRET;   // ***YOUR_CONSUMER_SECRET***
const TILL_NUMBER      = process.env.MPESA_TILL_NUMBER;        // ***YOUR_TILL_NUMBER***
const CALLBACK_URL     = process.env.MPESA_CALLBACK_URL;       // ***https://cffr-backend.onrender.com/api/pay/callback***
const AMOUNT           = 100;                                   // KES 100 per assessment

// Daraja endpoints — switch to production URLs when going live
const IS_PRODUCTION    = process.env.MPESA_ENV === "production";
const DARAJA_BASE      = IS_PRODUCTION
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke";

// ─── In-memory payment store ──────────────────────────────────────────────────
// Stores payment status keyed by CheckoutRequestID.
// For production at scale, replace with a database (MongoDB, PostgreSQL etc.)
const paymentStore = {};

// ─── Helper: Get OAuth Token ──────────────────────────────────────────────────
const getAccessToken = async () => {
  const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const response = await axios.get(`${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  return response.data.access_token;
};

// ─── Helper: Format phone number ─────────────────────────────────────────────
// Converts 07XXXXXXXX or +2547XXXXXXXX → 2547XXXXXXXX
const formatPhone = (phone) => {
  const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "");
  if (cleaned.startsWith("0")) return `254${cleaned.slice(1)}`;
  return cleaned;
};

// ─── POST /api/pay ────────────────────────────────────────────────────────────
// Initiates STK Push — sends payment prompt to student's phone
router.post("/", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone number is required." });
  }

  const formattedPhone = formatPhone(phone);
  if (!/^2547\d{8}$/.test(formattedPhone)) {
    return res.status(400).json({ success: false, message: "Please enter a valid Safaricom number." });
  }

  try {
    const token     = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);

    // For Buy Goods (Till), BusinessShortCode = your Till Number
    // Password = base64(TillNumber + Passkey + Timestamp)
    // Passkey is provided by Safaricom on the Daraja portal
    const PASSKEY   = process.env.MPESA_PASSKEY; // ***YOUR_PASSKEY_FROM_DARAJA_PORTAL***
    const password  = Buffer.from(`${TILL_NUMBER}${PASSKEY}${timestamp}`).toString("base64");

    const stkResponse = await axios.post(
      `${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: TILL_NUMBER,
        Password:          password,
        Timestamp:         timestamp,
        TransactionType:   "CustomerBuyGoodsOnline",  // Buy Goods Till
        Amount:            AMOUNT,
        PartyA:            formattedPhone,             // Student's phone
        PartyB:            TILL_NUMBER,                // Your till
        PhoneNumber:       formattedPhone,
        CallBackURL:       CALLBACK_URL,
        AccountReference:  "CFFR Assessment",
        TransactionDesc:   "Career Assessment Fee",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { CheckoutRequestID, ResponseCode, CustomerMessage } = stkResponse.data;

    if (ResponseCode !== "0") {
      return res.status(400).json({ success: false, message: CustomerMessage || "Payment initiation failed." });
    }

    // Store as pending
    paymentStore[CheckoutRequestID] = { status: "pending", phone: formattedPhone };

    return res.status(200).json({
      success:           true,
      checkoutRequestId: CheckoutRequestID,
      message:           "Check your phone and enter your Mpesa PIN to complete payment.",
    });

  } catch (err) {
    console.error("[CFFR Pay] STK Push error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment. Please try again.",
    });
  }
});

// ─── POST /api/pay/callback ───────────────────────────────────────────────────
// Safaricom calls this URL automatically after the student pays or cancels.
// Must be publicly accessible — your Render URL handles this.
router.post("/callback", (req, res) => {
  try {
    const body   = req.body?.Body?.stkCallback;
    const id     = body?.CheckoutRequestID;
    const code   = body?.ResultCode;

    if (!id) return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });

    if (code === 0) {
      // Payment successful
      paymentStore[id] = { status: "paid" };
      console.log(`[CFFR Pay] Payment confirmed for ${id}`);
    } else {
      // Payment failed or cancelled
      paymentStore[id] = { status: "failed", reason: body?.ResultDesc };
      console.log(`[CFFR Pay] Payment failed for ${id}: ${body?.ResultDesc}`);
    }

    // Always return 200 to Safaricom
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (err) {
    console.error("[CFFR Pay] Callback error:", err.message);
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
});

// ─── GET /api/pay/status/:checkoutId ─────────────────────────────────────────
// Frontend polls this every 3 seconds to check if payment went through
router.get("/status/:checkoutId", (req, res) => {
  const { checkoutId } = req.params;
  const record = paymentStore[checkoutId];

  if (!record) {
    return res.status(404).json({ success: false, status: "not_found" });
  }

  return res.status(200).json({ success: true, status: record.status });
});

module.exports = router;
module.exports.paymentStore = paymentStore;
