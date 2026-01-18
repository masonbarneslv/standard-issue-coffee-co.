"use client";

import { useMemo, useState } from "react";

const ROASTS = [
  { id: "first-light", name: "First Light", note: "Light Roast" },
  { id: "house-medium", name: "House Crafted Small Batch", note: "Medium Roast" },
  { id: "admirals-reserve", name: "Admiral’s Reserve", note: "Dark Roast" },
];

const SIZES = [
  { id: "16oz", label: "16 oz", price: 18 },
  { id: "2lb", label: "2 lb", price: 32 },
];

const FREQUENCIES = [
  { id: "weekly", label: "Weekly", discount: 0.15 },
  { id: "biweekly", label: "Every 2 Weeks", discount: 0.1 },
  { id: "monthly", label: "Monthly", discount: 0.05 },
];

export default function SubscribePage() {
  const [roast, setRoast] = useState(ROASTS[0].id);
  const [size, setSize] = useState(SIZES[0].id);
  const [frequency, setFrequency] = useState("monthly");
  const [email, setEmail] = useState("");

  const selectedRoast = ROASTS.find((r) => r.id === roast);
  const selectedSize = SIZES.find((s) => s.id === size);
  const selectedFrequency = FREQUENCIES.find((f) => f.id === frequency);

  const price = useMemo(() => {
    const discounted = selectedSize.price * (1 - selectedFrequency.discount);
    return discounted.toFixed(2);
  }, [selectedSize, selectedFrequency]);

  function handleSubmit(e) {
    e.preventDefault();

    const subscription = {
      roast: selectedRoast.name,
      size: selectedSize.label,
      frequency: selectedFrequency.label,
      price,
      email,
    };

    console.log("Subscription (demo):", subscription);
    alert("Subscription created! (Demo only)");
    setEmail("");
  }

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.badge}>Standard Issue Coffee Co</div>
          <h1 style={styles.title}>Coffee Subscription</h1>
          <p style={styles.subtitle}>
            Small-batch roasted coffee, delivered on your schedule.
          </p>
        </header>

        <section style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <Field label="Roast">
              <select
                value={roast}
                onChange={(e) => setRoast(e.target.value)}
                style={styles.control}
              >
                {ROASTS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.note}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Bag Size">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={styles.control}
              >
                {SIZES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Delivery">
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={styles.control}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>

              <div style={styles.helper}>
                Weekly saves 15% • Every 2 weeks saves 10% • Monthly saves 5%
              </div>
            </Field>

            <Field label="Email">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.control}
              />
              <div style={styles.helper}>
                Demo only — no payment collected yet.
              </div>
            </Field>

            <div style={styles.summary}>
              <div style={styles.summaryTop}>
                <span style={styles.summaryPill}>
                  {selectedRoast.name} · {selectedSize.label}
                </span>
                <span style={styles.summaryMuted}>
                  {selectedFrequency.label} delivery
                </span>
              </div>

              <div style={styles.priceRow}>
                <div style={styles.price}>
                  ${price} <span style={styles.per}>/ shipment</span>
                </div>
                <div style={styles.miniNote}>Cancel anytime (demo)</div>
              </div>
            </div>

            <button type="submit" style={styles.button}>
              Start Subscription
            </button>

            <div style={styles.footerNote}>
              Tip: This page is a great portfolio demo. Next step is Stripe
              Checkout + deployment.
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2ece6",
    padding: "48px 18px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
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
  backgroundColor: "#5f021f", // deep red
  color: "#ffffff",          // white text
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
  control: {
    width: "100%",
    padding: "12px 12px",
    fontSize: 16,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.18)",
    outline: "none",
    background: "#fff",
  },
  helper: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
    marginTop: 4,
  },
  summary: {
    marginTop: 4,
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
  button: {
  backgroundColor: "#b11226", // same red as Standard Issue
  color: "#ffffff",
  padding: "14px",
  width: "100%",
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
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
  backgroundColor: "#5f021f", // SAME red as Standard Issue badge
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
  },
};
