"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ONLY CHANGE ↓↓↓
const TOP_PILL_COLOR = "#5f021f";

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
        {/* TOP PILL — ONLY COLOR CHANGED */}
        <div style={styles.badge}>Standard Issue Coffee Co</div>

        <h1 style={styles.title}>Subscription Confirmed</h1>
        <p style={styles.subtitle}>Portfolio demo — email is simulated.</p>

        <div style={styles.banner}>
          ✅ Confirmation email sent <strong>(demo)</strong> to{" "}
          <b>{email}</b> and company inbox.
        </div>

        <div style={styles.card}>
          <div style={styles.row}><span>Roast</span><b>{roast}</b></div>
          <div style={styles.row}><span>Size</span><b>{size}</b></div>
          <div style={styles.row}><span>Frequency</span><b>{frequency}</b></div>
          <div style={styles.row}><span>Estimated Price</span><b>${price}</b></div>
          <div style={styles.row}><span>Email</span><b>{email}</b></div>
        </div>

        <div style={styles.pipeline}>
          <strong>Email Pipeline (Demo)</strong>
          <ul>
            <li>Queued ✓</li>
            <li>Processed ✓</li>
            <li>Dispatched ✓</li>
            <li>Delivered ✓</li>
          </ul>
        </div>

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
    background: TOP_PILL_COLOR, // ONLY CHANGE
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
    background: "#eef6f0",
    border: "1px solid #cce3d3",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    background: "#fff6ee",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #e2c8c0",
    display: "grid",
    gap: 10,
    marginBottom: 16,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 15,
  },
  pipeline: {
    background: "#fff",
    borderRadius: 14,
    padding: 14,
    border: "1px solid #e2c8c0",
    marginBottom: 18,
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