"use client"; // 🔴 MUST BE FIRST LINE
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  const roast = params.get("roast") || "-";
  const size = params.get("size") || "-";
  const frequency = params.get("frequency") || "-";
  const price = params.get("price") || "-";
  const email = params.get("email") || "-";
  const emailStatus = params.get("emailStatus") || "";

  const [step, setStep] = useState(0);

  // Fake email pipeline animation
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.badge}>Standard Issue Coffee Co</div>
          <h1 style={styles.title}>Subscription Confirmed</h1>

          {emailStatus === "sent_demo" && (
            <div style={styles.banner}>
              ✅ Confirmation email sent <b>(demo)</b> to <b>{email}</b> and company
              inbox.
            </div>
          )}
        </header>

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
          <button
            style={styles.btnGhost}
            onClick={() => router.push("/subscribe")}
          >
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
    display: "flex",
    justifyContent: "center",
    padding: 24,
    background: "#0b0b0c",
    color: "#f2f2f2",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  shell: { width: "100%", maxWidth: 720 },
  header: { marginBottom: 18 },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    border: "1px solid rgba(255,255,255,.18)",
    borderRadius: 999,
    fontSize: 12,
  },
  title: { margin: "10px 0 6px", fontSize: 32 },
  banner: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.16)",
  },
  card: {
    marginTop: 14,
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 16,
    padding: 16,
    background: "rgba(255,255,255,.03)",
  },
  h2: { marginBottom: 10, fontSize: 16 },
  row: {
    display: "flex",
    justifyContent: "space-between",
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
    background: "#f2ece6",
  },
  dotTodo: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "rgba(242,236,230,.25)",
  },
  actions: {
    marginTop: 18,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  btn: {
    padding: "12px 14px",
    borderRadius: 12,
    background: "#f2ece6",
    color: "#0b0b0c",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
  },
  btnGhost: {
    padding: "12px 14px",
    borderRadius: 12,
    background: "transparent",
    color: "#f2f2f2",
    fontWeight: 800,
    border: "1px solid rgba(255,255,255,.16)",
    cursor: "pointer",
  },
};