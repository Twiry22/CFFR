const { Resend } = require("resend");

async function sendResultsEmail(
  email,
  recommendations,
  options = {}
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error("RESEND_FROM_EMAIL is missing.");
  }

  if (!email) {
    throw new Error("Recipient email is required.");
  }

  if (!Array.isArray(recommendations)) {
    throw new Error("Recommendations must be an array.");
  }

  if (recommendations.length === 0) {
    throw new Error("At least one recommendation is required.");
  }

  const resend = new Resend(
    process.env.RESEND_API_KEY
  );

  const fallbackHtml = `
    <h1>Your CFFR Career Results</h1>

    ${recommendations
      .map(
        (recommendation) => `
          <div>
            <h2>
              ${
                recommendation.specificCareer ||
                "Career Recommendation"
              }
            </h2>

            <p>
              ${recommendation.tagline || ""}
            </p>

            <p>
              Match:
              ${recommendation.matchScore || 0}%
            </p>
          </div>
        `
      )
      .join("")}
  `;

  const html =
    options.html ||
    fallbackHtml;

  const subject =
    options.subject ||
    "Your CFFR Career Results — Kenya CBC Career Guidance";

  const emailPayload = {
    from:
      `CFFR Career Guidance <${process.env.RESEND_FROM_EMAIL}>`,

    to: [email],

    subject,

    html,
  };

  if (process.env.RESEND_REPLY_TO) {
    emailPayload.replyTo =
      process.env.RESEND_REPLY_TO;
  }

  const { data, error } =
    await resend.emails.send(emailPayload);

  if (error) {
    const sendError = new Error(
      error.message ||
      "Resend rejected the email."
    );

    sendError.name =
      error.name ||
      "ResendError";

    sendError.statusCode =
      error.statusCode;

    throw sendError;
  }

  return data;
}

module.exports = {
  sendResultsEmail,
};
