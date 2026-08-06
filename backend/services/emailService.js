const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendResultsEmail(email, recommendations) {
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

  const html = `
    <h1>Your CFFR Career Results</h1>
    ${recommendations
      .map(
        (recommendation) => `
          <div>
            <h2>${recommendation.specificCareer || "Career Recommendation"}</h2>
            <p>${recommendation.tagline || ""}</p>
            <p>Match: ${recommendation.matchScore || 0}%</p>
          </div>
        `
      )
      .join("")}
  `;

  const { data, error } = await resend.emails.send({
    from: `CFFR Career Guidance <${process.env.RESEND_FROM_EMAIL}>`,
    to: [email],
    replyTo: process.env.RESEND_REPLY_TO || undefined,
    subject: "Your CFFR Career Results — Kenya CBC Career Guidance",
    html,
  });

  if (error) {
    const sendError = new Error(
      error.message || "Resend rejected the email."
    );

    sendError.statusCode = error.statusCode;
    throw sendError;
  }

  return data;
}

module.exports = {
  sendResultsEmail,
};
