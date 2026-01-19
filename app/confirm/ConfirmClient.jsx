"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmClient() {
  const params = useSearchParams();

  const roast = params.get("roast") || "Subscription";
  const size = params.get("size") || "";
  const frequency = params.get("frequency") || "";
  const price = params.get("price") || "";
  const email = params.get("email") || "";

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.badge}>Standard Issue Coffee Co</div>
          <h1 style={styles.title}>Subscription Confirmed</h1>
          <p style={styles.subtitle}>
            Thanks for signing up — your subscription is locked in.
          </p>
        </header>

        <section style={styles.card}>
          <div style={styles.form}>
            <div style={styles.summary}>
              <div style={styles.summaryTop}>
                <span style={styles.summaryPill}>
                  {roast}
                  {size && ` · ${size}`}
                </span>
                {frequency && (
                  <span style={styles.summaryMuted}>
                    {frequency} delivery
                  </span>
                )}
              </div>

              {price && (
                <div style={styles.priceRow}>
                  <div style={styles.price}>
                    ${price} <span style={styles.per}>/ shipment</span>
                  </div>
                  <div style={styles.miniNote}>
                    Manage or cancel anytime
                  </div>
                </div>
              )}
            </div>

            {email && (
              <div style={styles.summary}>
                <div style={styles.field}>
                  <div style={styles.label}>Email</div>
                  <div style={styles.controlLike}>{email}</div>
                </div>
              </div>
            )}

            <button
              type="button"
              style={styles.button}
              onClick={() => {
                window.location.href =
                  "https://standardissuecoffecco.wpcomstaging.com";
              }}
            >
              Back to Home
            </button>

            <div style={styles.footerNote}>
              You’ll receive a confirmation email shortly.  
              Thank you for supporting small-batch coffee.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2ece6",
    padding: "48px 18px",
    fontFamily:
      "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    color: "#1a1a1a",
  },
  shell: {
    maxWidth: 760,
    margin: "0 auto",
  },
  header: {
    marginBottom: 18,
  },
  badge: {
    backgroundColor: "#5f021f",
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: 999,
    letterSpacing: "0.12em",
    fontWeight: 600,
    fontSize: 12,
    marginBottom: 14,
    display: "inline-block",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 38,
    margin: 0,
    lineHeight: 1.1,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 0,
    color: "rgba(0,0,0,0.65)",
    fontSize: 16,
  },
  card: {
    background: "#ffffff",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid rgba(0,0,0,0.08)",
    padding: 22,
  },
  form: {
    display: "grid",
    gap: 16,
  },
  field: {
    display: "grid",
    gap: 8,
  },
  label: {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  controlLike: {
    width: "100%",
    padding: "12px",
    fontSize: 16,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "rgba(0,0,0,0.02)",
  },
  summary: {
    padding: 14,
    borderRadius: 14,
    background: "rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  summaryTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  summaryPill: {
    fontSize: 13,
    fontWeight: 700,
  },
  summaryMuted: {
    color: "rgba(0,0,0,0.65)",
    fontSize: 13,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 10,
    gap: 10,
    flexWrap: "wrap",
  },
  price: {
    fontSize: 28,
    fontWeight: 800,
  },
  per: {
    fontSize: 14,
    fontWeight: 600,
    color: "rgba(0,0,0,0.6)",
  },
  miniNote: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
  },
  button: {
    marginTop: 6,
    backgroundColor: "#5f021f",
    color: "#ffffff",
    padding: "14px",
    width: "100%",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
  },
  footerNote: {
    fontSize: 12,
    color: "rgba(0,0,0,0.55)",
    marginTop: 6,
    lineHeight: 1.35,
    textAlign: "center",
  },
};