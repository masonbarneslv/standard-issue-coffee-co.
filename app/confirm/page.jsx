"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmPage() {
  return (
    <Suspense fallback={<LoadingUI />}>
      <ConfirmInner />
    </Suspense>
  );
}

function ConfirmInner() {
  const params = useSearchParams();
  const router = useRouter();

  const roast = params.get("roast") || "-";
  const size = params.get("size") || "-";
  const frequency = params.get("frequency") || "-";
  const price = params.get("price") || "-";
  const email = params.get("email") || "-";
  const emailStatus = params.get("emailStatus") || "";

  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 350),
      setTimeout(() => setStep(2), 750),
      setTimeout(() => setStep(3), 1150),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main style={styles.page}>
      {/* HEADER BAND */}
      <div style={styles.headerBand}>
        <div style={styles.shell}>
          <div style={styles.badge}>STANDARD ISSUE COFFEE CO</div>
          <h1 style={styles.heroTitle}>Subscription Details</h1>
          <p style={styles.heroSubtitle}>Portfolio demo — email is simulated.</p>
        </div>
      </div>

      <div style={styles.shell}>
        {emailStatus === "sent_demo" && (
          <div style={styles.banner}>
            ✅ Confirmation email sent <b>(demo)</b> to <b>{email}</b> and company
            inbox.
          </div>
        )}

        <section style={styles.card}>
          <Row label="Roast" value={roast} />
          <Row label="Size" value={size} />
          <Row label="Frequency" value={frequency} />
          <Row
            label="Estimated Price"
            value={price !== "-" ? `$${Number(price).toFixed(2)}` : "-"}
          />
          <Row label="Email" value={email} />
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>Email Pipeline (Demo)</h2>
          <PipelineRow label="Queued" active={step >= 1} />
          <PipelineRow label="Processed" active={step >= 2} />
          <PipelineRow label="Dispatched" active={step >= 3} />
          <PipelineRow label="Delivered" active={step >= 3} />
        </section>

        <div style={styles.actions}>
          <button style={styles.btnGhost} onClick={() => router.push("/subscribe")}>
            Edit Subscription
          </button>

          <button
            style={styles.btn}
            onClick={() =>
              (window.location.href =
                "https://standardissuecoffecco.wpcomstaging.com")
            }
          >
            Back to Website
          </button>
        </div>

        <div style={{ height: 28 }} />
      </div>
    </main>
  );
}

function LoadingUI() {
  return (
    <main style={styles.page}>
      <div style={styles.headerBand}>
        <div style={styles.shell}>
          <div style={styles.badge}>STANDARD ISSUE COFFEE CO</div>
          <h1 style={styles.heroTitle}>Subscription Details</h1>
          <p style={styles.heroSubtitle}>Loading…</p>
        </div>
      </div>
      <div style={styles.shell}>
        <section style={styles.card}>
          <div style={{ fontWeight: 900, color: "#111" }}>Preparing details…</div>
          <div style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
            One moment.
          </div>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value }) {
  return (
    <div style={styles.row}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function PipelineRow({ label, active }) {
  return (
    <div style={styles.pipeRow}>
      <div style={active ? styles.dotDone : styles.dotTodo} />
      <span>{label}</span>
      <span style={{ marginLeft: "auto", opacity: 0.7 }}>
        {active ? "✓" : "…"}
      </span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2ece6",
    color: "#1a1a1a",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },

  shell: { width: "100%", maxWidth: 720, margin: "0 auto", padding: "0 24px" },

  headerBand: {
    padding: "42px 0 22px",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 40%), #f2ece6",
  },

  badge: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 999,
    background: "linear-gradient(180deg, #4b0014 0%, #2a000a 100%)",
    color: "#ffffff",
    fontWeight: 800,
    letterSpacing: 3,
    fontSize: 13,
    textTransform: "uppercase",
    boxShadow: "0 10px 20px rgba(0,0,0,.12)",
  },

  heroTitle: {
    margin: "18px 0 6px",
    fontSize: 54,
    lineHeight: 1.03,
    fontWeight: 900,
    letterSpacing: -1.2,
    color: "#111111",
  },

  heroSubtitle: {
    margin: 0,
    fontSize: 18,
    opacity: 0.85,
    maxWidth: 560,
  },

  banner: {
    marginTop: 18,
    padding: 12,
    borderRadius: 14,
    background: "rgba(139,0,0,.06)",
    border: "1px solid rgba(139,0,0,.22)",
    color: "#1a1a1a",
  },

  card: {
    marginTop: 14,
    border: "1px solid rgba(139,0,0,.18)",
    borderRadius: 18,
    padding: 18,
    background: "#fff8f2",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  },

  h2: { marginBottom: 10, fontSize: 16, color: "#111" },

  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "6px 0",
  },

  pipeRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "6px 0",
  },

  dotDone: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "#8b0000",
  },

  dotTodo: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "rgba(139,0,0,.25)",
  },

  actions: {
    marginTop: 18,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  btn: {
    padding: "14px 16px",
    borderRadius: 14,
    background: "#8b0000",
    color: "#f2ece6",
    fontWeight: 900,
    border: "none",
    cursor: "pointer",
  },

  btnGhost: {
    padding: "14px 16px",
    borderRadius: 14,
    background: "transparent",
    color: "#8b0000",
    fontWeight: 900,
    border: "1px solid rgba(139,0,0,.30)",
    cursor: "pointer",
  },
};