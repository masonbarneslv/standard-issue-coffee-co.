"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function safeJsonParse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

function formatIso(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso || "";
  }
}

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  const roast = params.get("roast") || "";
  const size = params.get("size") || "";
  const frequency = params.get("frequency") || "";
  const price = params.get("price") || "";
  const email = params.get("email") || "";
  const emailStatus = params.get("emailStatus") || "";

  const [demoMeta, setDemoMeta] = useState(null);
  const [step, setStep] = useState(0); // pipeline animation step

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("demoEmailPayload") : null;
    const parsed = stored ? safeJsonParse(stored) : null;
    if (parsed) setDemoMeta(parsed);

    // Animate pipeline for “real feel”
    let alive = true;
    const timers = [
      setTimeout(() => alive && setStep(1), 400),
      setTimeout(() => alive && setStep(2), 900),
      setTimeout(() => alive && setStep(3), 1400),
    ];
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  const pipeline = useMemo(() => {
    const stages = [
      { label: "Queued", desc: "Request accepted by server" },
      { label: "Processed", desc: "Templates rendered & validated" },
      { label: "Dispatched", desc: "Handed to email provider (demo)" },
      { label: "Delivered", desc: "Recipient inbox (simulated)" },
    ];
    return stages.map((s, i) => ({
      ...s,
      state: i <= step ? "done" : "todo",
    }));
  }, [step]);

  const customerPreview = demoMeta?.previews?.customer || null;
  const companyPreview = demoMeta?.previews?.company || null;

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.badge}>Standard Issue Coffee Co</div>
          <h1 style={styles.title}>Subscription Confirmed</h1>
          <p style={styles.subtitle}>Portfolio demo confirmation + email simulation.</p>

          {emailStatus === "sent_demo" && (
            <div style={styles.banner}>
              ✅ Emails sent <b>(demo)</b> to <b>{email}</b> (customer) and company inbox.
              <div style={styles.bannerMeta}>
                {demoMeta?.timestamp ? (
                  <span>Timestamp: {formatIso(demoMeta.timestamp)}</span>
                ) : (
                  <span>Timestamp: (demo)</span>
                )}
              </div>
            </div>
          )}
        </header>

        <section style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.h2}>Subscription Details</h2>
            <div style={styles.row}><span>Roast</span><b>{roast || "-"}</b></div>
            <div style={styles.row}><span>Size</span><b>{size || "-"}</b></div>
            <div style={styles.row}><span>Frequency</span><b>{frequency || "-"}</b></div>
            <div style={styles.row}><span>Estimated price</span><b>{price ? `$${Number(price).toFixed(2)}` : "-"}</b></div>
            <div style={styles.row}><span>Email</span><b>{email || "-"}</b></div>

            <div style={styles.actions}>
              <button style={styles.btnGhost} onClick={() => router.push("/subscribe")}>
                Edit selection
              </button>
              <button
                style={styles.btn}
                onClick={() =>
                  (window.location.href = "https://standardissuecoffecco.wpcomstaging.com")
                }
              >
                Back to website
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.h2}>Email Pipeline (Demo)</h2>
            <div style={styles.pipeline}>
              {pipeline.map((p) => (
                <div key={p.label} style={styles.pipeRow}>
                  <div style={p.state === "done" ? styles.dotDone : styles.dotTodo} />
                  <div style={styles.pipeText}>
                    <div style={styles.pipeTop}>
                      <b>{p.label}</b>
                      <span style={styles.pipeState}>{p.state === "done" ? "✓" : "…"}</span>
                    </div>
                    <div style={styles.pipeDesc}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.ids}>
              <div><span style={styles.muted}>Customer Message-ID:</span> <b>{demoMeta?.ids?.customerMessageId || "demo_id_customer"}</b></div>
              <div><span style={styles.muted}>Company Message-ID:</span> <b>{demoMeta?.ids?.companyMessageId || "demo_id_company"}</b></div>
              <div><span style={styles.muted}>Company Inbox:</span> <b>{demoMeta?.companyInbox || "orders@standardissuecoffee.co"}</b></div>
            </div>
          </div>

          <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
            <h2 style={styles.h2}>Email Previews (What would be sent)</h2>
            <div style={styles.previewGrid}>
              <EmailPreview title="Customer Email" preview={customerPreview} fallbackTo={email} />
              <EmailPreview title="Company Notification" preview={companyPreview} fallbackTo="orders@standardissuecoffee.co" />
            </div>
            <p style={styles.note}>
              These previews are generated server-side (API route) and stored locally for display — same pattern used with real email providers.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function EmailPreview({ title, preview, fallbackTo }) {
  const [tab, setTab] = useState("text");

  const to = preview?.to || fallbackTo || "-";
  const subject = preview?.subject || "(demo subject)";
  const text = preview?.text || "Demo email body (text).";
  const html = preview?.html || "<div>Demo email body (HTML).</div>";

  return (
    <div style={styles.previewCard}>
      <div style={styles.previewHead}>
        <b>{title}</b>
        <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => setTab("text")}
            style={tab === "text" ? styles.tabActive : styles.tab}
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => setTab("html")}
            style={tab === "html" ? styles.tabActive : styles.tab}
          >
            HTML
          </button>
        </div>
      </div>

      <div style={styles.metaLine}><span style={styles.muted}>To:</span> <b>{to}</b></div>
      <div style={styles.metaLine}><span style={styles.muted}>Subject:</span> <b>{subject}</b></div>

      {tab === "text" ? (
        <pre style={styles.pre}>{text}</pre>
      ) : (
        <div style={styles.htmlBox} dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 24,
    background: "#0b0b0c",
    color: "#f2f2f2",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  },
  shell: { width: "100%", maxWidth: 960 },
  header: { marginBottom: 18 },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    border: "1px solid rgba(255,255,255,.18)",
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 0.4,
    opacity: 0.9,
  },
  title: { margin: "10px 0 6px", fontSize: 32, lineHeight: 1.1 },
  subtitle: { margin: 0, opacity: 0.8 },
  banner: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(255,255,255,.05)",
    fontSize: 14,
  },
  bannerMeta: { marginTop: 6, fontSize: 12, opacity: 0.8 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 14,
  },
  card: {
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 16,
    padding: 16,
    background: "rgba(255,255,255,.03)",
  },
  h2: { margin: "0 0 10px", fontSize: 16, letterSpacing: 0.2 },
  row: { display: "flex", justifyContent: "space-between", gap: 12, padding: "6px 0" },
  actions: { display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" },
  btn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)",
    background: "#f2ece6",
    color: "#0b0b0c",
    fontWeight: 800,
    cursor: "pointer",
  },
  btnGhost: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)",
    background: "transparent",
    color: "#f2f2f2",
    fontWeight: 800,
    cursor: "pointer",
  },
  pipeline: { display: "grid", gap: 10, marginTop: 4 },
  pipeRow: { display: "flex", gap: 10, alignItems: "flex-start" },
  dotDone: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "#f2ece6",
    marginTop: 5,
  },
  dotTodo: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "rgba(242,236,230,.25)",
    marginTop: 5,
  },
  pipeText: { flex: 1 },
  pipeTop: { display: "flex", justifyContent: "space-between", gap: 10 },
  pipeState: { opacity: 0.8 },
  pipeDesc: { fontSize: 12, opacity: 0.75, marginTop: 2 },
  ids: {
    marginTop: 12,
    borderTop: "1px solid rgba(255,255,255,.10)",
    paddingTop: 10,
    display: "grid",
    gap: 6,
    fontSize: 13,
  },
  muted: { opacity: 0.7 },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 12,
  },
  previewCard: {
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 14,
    padding: 12,
    background: "rgba(255,255,255,.02)",
  },
  previewHead: { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" },
  tabs: { display: "flex", gap: 8 },
  tab: {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.16)",
    background: "transparent",
    color: "#f2f2f2",
    cursor: "pointer",
    fontSize: 12,
  },
  tabActive: {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.16)",
    background: "#f2ece6",
    color: "#0b0b0c",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 800,
  },
  metaLine: { marginTop: 8, fontSize: 13 },
  pre: {
    marginTop: 10,
    whiteSpace: "pre-wrap",
    background: "#111114",
    border: "1px solid rgba(255,255,255,.10)",
    borderRadius: 12,
    padding: 10,
    fontSize: 12,
    color: "#f2f2f2",
  },
  htmlBox: {
    marginTop: 10,
    background: "#f2ece6",
    color: "#0b0b0c",
    borderRadius: 12,
    padding: 10,
    fontSize: 13,
  },
  note: { marginTop: 10, fontSize: 12, opacity: 0.75 },
};