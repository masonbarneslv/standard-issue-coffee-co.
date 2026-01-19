"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const TOP_PILL_COLOR = "#5f021f";

/* ---------------- HELPERS ---------------- */

// Capitalize each hyphen-separated word
function formatLabel(value) {
  if (!value) return "";
  return value
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("-");
}

// Convert size IDs to human-friendly labels
function formatSize(value) {
  if (value === "16oz") return "1 lb";
  if (value === "2lb") return "2 lb";
  return value;
}

// Capitalize single words (frequency)
function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* ----------------------------------------- */

export default function ConfirmPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmInner />
    </Suspense>
  );
}

function ConfirmInner() {
  const params = useSearchParams();
  const router = useRouter();

  const roast = params.get("roast") || "";
  const size = params.get("size") || "";
  const frequency = params.get("frequency") || "";
  const price = params.get("price") || "";
  const email = params.get("email") || "";

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>Standard Issue Coffee Co</div>

        <h1 style={styles.title}>Subscription Confirmed</h1>
        <p style={styles.subtitle}>Portfolio demo — email is simulated.</p>

        <div style={styles.banner}>
          ✅ Confirmation email sent <strong>(demo)</strong> to{" "}
          <b>{email}</b> and company inbox.
        </div>

        {/* DETAILS */}
        <div style={styles.card}>
          <div style={styles.row}>
            <span>Roast</span>
            <b>{formatLabel(roast)}</b>
          </div>
          <div style={styles.row}>
            <span>Size</span>
            <b>{formatSize(size)}</b>
          </div>
          <div style={styles.row}>
            <span>Frequency</span>
            <b>{capitalize(frequency)}</b>
          </div>
          <div style={styles.row}>
            <span>Estimated Price</span>
            <b>${price}</b>
          </div>
          <div style={styles.row}>
            <span>Email</span>
            <b>{email}</b>
          </div>
        </div>

        {/* PIPELINE */}
        <div style={styles.pipelineCard}>
          <strong style={styles.pipelineTitle}>Email Pipeline (Demo)</strong>

          <div style={styles.pipelineRow}><span>Queued</span><span>✓</span></div>
          <div style={styles.pipelineRow}><span>Processed</span><span>✓</span></div>
          <div style={styles.pipelineRow}><span>Dispatched</span><span>✓</span></div>
          <div style={styles.pipelineRow}><span>Delivered</span><span>✓</span></div>
        </div>

        {/* ACTIONS */}
        <div style={styles.actions}>
          <button
            style={styles.outlineBtn}
            onClick={() => router.push("/subscribe")}
          >
            Edit Subscription
          </button>

          <button
            style={styles.primaryBtn}
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

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2ece6",
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: 420,
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 999,
    background: "#5f021f",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: 800,
    color: "#111",
    marginBottom: 6,
  },
  subtitle: {
    color: "#555",
    marginBottom: 14,
  },
  banner: {
    background: "#90ee90",
    border: "1px solid #cce3d3",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    color: "#111",
  },
  card: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #e2c8c0",
    display: "grid",
    gap: 10,
    marginBottom: 16,
    color: "#111",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 15,
  },
  pipelineCard: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #e2c8c0",
    marginBottom: 20,
    color: "#111",
    display: "grid",
    gap: 10,
  },
  pipelineTitle: {
    fontSize: 16,
    fontWeight: 800,
  },
  pipelineRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 15,
  },
  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryBtn: {
    flex: 1,
    padding: "14px",
    borderRadius: 999,
    background: "#8b0000",
    color: "#fff",
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
  },
  outlineBtn: {
    flex: 1,
    padding: "14px",
    borderRadius: 999,
    background: "transparent",
    color: "#8b0000",
    fontWeight: 800,
    border: "2px solid #8b0000",
    cursor: "pointer",
  },
};
