// app/api/subscribe/route.js
import sgMail from "@sendgrid/mail";

/* ---------- helpers ---------- */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatMoney(n) {
  const num = Number(n);
  return Number.isFinite(num) ? num.toFixed(2) : "";
}

/* ---------- handler ---------- */

export async function POST(req) {
  try {
    const body = await req.json();

    const email = (body.email || "").trim();
    const roast = (body.roast || "").trim();
    const size = (body.size || "").trim();
    const frequency = (body.frequency || "").trim();
    const price = body.price ?? "";

    if (!email) {
      return Response.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    /* ---------- env vars ---------- */

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL || "admin@masonbarneslv.com";
    const FROM_NAME = process.env.FROM_NAME || "Standard Issue Coffee Co.";
    const COMPANY_INBOX =
      process.env.COMPANY_INBOX || "masonbarneslv@icloud.com";

    if (!SENDGRID_API_KEY) {
      return Response.json(
        { ok: false, error: "Missing SENDGRID_API_KEY." },
        { status: 500 }
      );
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const estPrice =
      price !== "" && price !== null && price !== undefined
        ? `$${formatMoney(price)}`
        : "-";

    /* ---------- admin email ---------- */

    const adminMessage = {
      to: COMPANY_INBOX,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      replyTo: COMPANY_INBOX,
      subject: `New coffee subscription lead — ${email}`,
      text: `
New Subscription Lead

Email: ${email}
Roast: ${roast || "-"}
Size: ${size || "-"}
Frequency: ${frequency || "-"}
Estimated price: ${estPrice}
      `,
      html: `
        <h2>New Subscription Lead ☕</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Roast:</strong> ${roast || "-"}</p>
        <p><strong>Size:</strong> ${size || "-"}</p>
        <p><strong>Frequency:</strong> ${frequency || "-"}</p>
        <p><strong>Estimated price:</strong> ${estPrice}</p>
      `,
    };

    /* ---------- customer email ---------- */

    const customerMessage = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      replyTo: COMPANY_INBOX,
      subject: `Your ${FROM_NAME} subscription is confirmed`,
      text: `
Subscription Confirmed (Demo)

Roast: ${roast || "-"}
Size: ${size || "-"}
Frequency: ${frequency || "-"}
Estimated price: ${estPrice}
      `,
      html: `
        <h2>Subscription Confirmed ✅</h2>
        <p>Thanks for subscribing! This is a <strong>demo confirmation</strong>.</p>

        <p><strong>Roast:</strong> ${roast || "-"}</p>
        <p><strong>Size:</strong> ${size || "-"}</p>
        <p><strong>Frequency:</strong> ${frequency || "-"}</p>
        <p><strong>Estimated price:</strong> ${estPrice}</p>
      `,
    };

    /* ---------- send ---------- */

    await sgMail.send([adminMessage, customerMessage]);

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Subscribe API error:", error?.response?.body || error);
    return Response.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}