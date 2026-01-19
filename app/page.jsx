"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ROASTS = [
  { id: "first-light", name: "First Light", note: "Light Roast" },
  { id: "house-medium", name: "House Crafted", note: "Medium Roast" },
  { id: "admirals-reserve", name: "Admiral’s Reserve", note: "Dark Roast" },
];

const SIZES = [
  { id: "1lb", label: "1 lb", price: 18 },
  { id: "2lb", label: "2 lb", price: 32 },
];

const FREQUENCIES = [
  { id: "weekly", label: "Weekly", discount: 0.15 },
  { id: "biweekly", label: "Every 2 weeks", discount: 0.1 },
  { id: "monthly", label: "Monthly", discount: 0.05 },
];

// ONLY CHANGE ↓↓↓
const TOP_PILL_COLOR = "#5f021f";

export default function SubscribePage() {
  const router = useRouter();

  const [roast, setRoast] = useState(ROASTS[0].id);
  const [size, setSize] = useState(SIZES[0].id);
  const [frequency, setFrequency] = useState(FREQUENCIES[1].id);
  const [email, setEmail] = useState("");

  const selectedSize = useMemo(
    () => SIZES.find((s) => s.id === size),
    [size]
  );

  const selectedFreq = useMemo(
    () => FREQUENCIES.find((f) => f.id === frequency),
    [frequency]
  );

  const price = useMemo(() => {
    const base = selectedSize?.price ?? 0;
    const discount = selectedFreq?.discount ?? 0;
    return Math.round(base * (1 - discount) * 100) / 100;
  }, [selectedSize, selectedFreq]);

  function handleSubmit(e) {
    e.preventDefault();

    const params = new URLSearchParams({
      roast,
      size,
      frequency,
      price: price.toFixed(2),
      email,
      emailStatus: "sent_demo",
    });

    router.push(`/confirm?${params.toString()}`);
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* TOP PILL — ONLY COLOR CHANGED */}
        <div style={styles.badge}>Standard Issue Coffee Co</div>

        <h1 style={styles.title}>Subscription Signup</h1>
        <p style={styles.subtitle}>
          Portfolio demo: simulates secure email delivery via server API.
        </p>

        <form onSubmit={handleSubmit} style={styles.card}>
          <label style={styles.label}>
            Roast
            <select style={styles.input} value={roast} onChange={(e) => setRoast(e.target.value)}>
              {ROASTS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.note}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.label}>
            Size
            <select style={styles.input} value={size} onChange={(e) => setSize(e.target.value)}>
              {SIZES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} — ${s.price}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.label}>
            Frequency
            <select style={styles.input} value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              {FREQUENCIES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label} — {Math.round(f.discount * 100)}% off
                </option>
              ))}
            </select>
          </label>

          <label style={styles.label}>
            Email
            <input
              style={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div style={styles.priceBox}>
            <div>
              <strong>Estimated price</strong>
              <div style={styles.muted}>Demo only — no payment processed.</div>
            </div>
            <div style={styles.price}>${price.toFixed(2)}</div>
          </div>

          <button type="submit" style={styles.button}>
            Confirm Subscription
          </button>
        </form>

        <p style={styles.footer}>
          Client form → API route → simulated emails → confirmation page.
        </p>
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
    marginBottom: 20,
  },
  card: {
    background: "#fff6ee",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #e2c8c0",
    display: "grid",
    gap: 14,
  },
  label: {
    fontWeight: 600,
    color: "#222",
    display: "grid",
    gap: 6,
  },
  input: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #e2c8c0",
    fontSize: 16,
    color: "#111",
    background: "#fff",
  },
  priceBox: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px dashed #e2c8c0",
  borderRadius: 12,
  padding: 12,
  background: "#fdf3ec",
+ color: "#111",
},
  muted: {
    fontSize: 12,
    color: "#666",
  },
  price: {
  fontWeight: 800,
  fontSize: 18,
+ color: "#111",
},
  button: {
    marginTop: 8,
    padding: "14px",
    borderRadius: 999,
    background: "#8b0000",
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    border: "none",
    cursor: "pointer",
  },
  footer: {
    marginTop: 14,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
};