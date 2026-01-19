// app/api/subscribe/route.js

function isValidEmail(email) {
  // Good-enough email check for portfolio (not overkill)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function makeId(prefix = "msg") {
  // Example: msg_20260119_8xk3m2p9q
  const ts = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 11);
  return `${prefix}_${ts}_${rand}`;
}

function formatMoney(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return num.toFixed(2);
}

function buildCustomerEmail({ email, roast, size, frequency, price }) {
  const subject = `Your Standard Issue Coffee subscription is confirmed (demo)`;
  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.45; color:#111;">
    <h2 style="margin:0 0 8px;">Subscription Confirmed ✅</h2>
    <p style="margin:0 0 12px;">Thanks for subscribing. This is a <b>demo</b> confirmation for portfolio purposes.</p>

    <div style="border:1px solid #eee; border-radius:12px; padding:12px; background:#fafafa;">
      <p style="margin:0 0 6px;"><b>Roast:</b> ${roast || "-"}</p>
      <p style="margin:0 0 6px;"><b>Size:</b> ${size || "-"}</p>
      <p style="margin:0 0 6px;"><b>Frequency:</b> ${frequency || "-"}</p>
      <p style="margin:0;"><b>Estimated price:</b> ${price ? `$${formatMoney(price)}` : "-"}</p>
    </div>

    <p style="margin:12px 0 0; font-size:12px; color:#666;">
      Sent to: ${email}
    </p>
  </div>`;
  const text = `Subscription Confirmed (DEMO)
Roast: ${roast || "-"}
Size: ${size || "-"}
Frequency: ${frequency || "-"}
Estimated price: ${price ? `$${formatMoney(price)}` : "-"}

Sent to: ${email}`;
  return { to: email, subject, html, text };
}

function buildCompanyEmail({ companyInbox, email, roast, size, frequency, price }) {
  const subject = `New subscription lead (demo) — ${email}`;
  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.45; color:#111;">
    <h2 style="margin:0 0 8px;">New Subscription Lead 📩</h2>
    <p style="margin:0 0 12px;">This is a <b>demo</b> notification for portfolio purposes.</p>

    <div style="border:1px solid #eee; border-radius:12px; padding:12px; background:#fafafa;">
      <p style="margin:0 0 6px;"><b>Customer email:</b> ${email}</p>
      <p style="margin:0 0 6px;"><b>Roast:</b> ${roast || "-"}</p>
      <p style="margin:0 0 6px;"><b>Size:</b> ${size || "-"}</p>
      <p style="margin:0 0 6px;"><b>Frequency:</b> ${frequency || "-"}</p>
      <p style="margin:0;"><b>Estimated price:</b> ${price ? `$${formatMoney(price)}` : "-"}</p>
    </div>

    <p style="margin:12px 0 0; font-size:12px; color:#666;">
      Inbox: ${companyInbox}
    </p>
  </div>`;
  const text = `New Subscription Lead (DEMO)
Customer email: ${email}
Roast: ${roast || "-"}
Size: ${size || "-"}
Frequency: ${frequency || "-"}
Estimated price: ${price ? `$${formatMoney(price)}` : "-"}

Inbox: ${companyInbox}`;
  return { to: companyInbox, subject, html, text };
}

export async function POST(req) {
  try {
    const body = await req.json();

    const email = (body.email || "").trim();
    const roast = (body.roast || "").trim();
    const size = (body.size || "").trim();
    const frequency = (body.frequency || "").trim();
    const price = body.price ?? "";

    if (!email) {
      return Response.json({ ok: false, error: "Email is required." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const companyInbox = process.env.COMPANY_INBOX || "orders@standardissuecoffee.co";
    const now = new Date().toISOString();

    const customerMessageId = makeId("cust");
    const companyMessageId = makeId("co");

    const customerEmail = buildCustomerEmail({ email, roast, size, frequency, price });
    const companyEmail = buildCompanyEmail({ companyInbox, email, roast, size, frequency, price });

    // DEMO "send" logs (this is your proof in Vercel logs)
    console.log("=== DEMO EMAIL PIPELINE ===");
    console.log("timestamp:", now);
    console.log("customerMessageId:", customerMessageId);
    console.log("companyMessageId:", companyMessageId);
    console.log("customerEmail:", { to: customerEmail.to, subject: customerEmail.subject });
    console.log("companyEmail:", { to: companyEmail.to, subject: companyEmail.subject });
    console.log("payload:", { roast, size, frequency, price, email });
    console.log("===========================");

    // Optional: mimic processing delay (tiny) without slowing UX too much
    await new Promise((r) => setTimeout(r, 200));

    return Response.json({
      ok: true,
      mode: "demo",
      emailStatus: "sent_demo",
      timestamp: now,
      ids: { customerMessageId, companyMessageId },
      companyInbox,
      previews: {
        customer: customerEmail,
        company: companyEmail,
      },
    });
  } catch (e) {
    console.error("Subscribe API error:", e);
    return Response.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}