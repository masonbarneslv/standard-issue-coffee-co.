"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ROASTS = [
  { id: "first-light", name: "First Light", note: "Light Roast" },
  { id: "house-medium", name: "House Crafted", note: "Medium Roast" },
  { id: "admirals-reserve", name: "Admiral’s Reserve", note: "Dark Roast" },
];

const SIZES = [
  { id: "16oz", label: "16 oz", price: 18 },
  { id: "2lb", label: "2 lb", price: 32 },
];

const FREQUENCIES = [
  { id: "weekly", label: "Weekly", discount: 0.15 },
  { id: "biweekly", label: "Every 2 weeks", discount: 0.1 },
  { id: "monthly", label: "Monthly", discount: 0.05 },
];

const BURGUNDY = "#5f021f";

export default function SubscribePage() {
  const router = useRouter();

  const [roast, setRoast] = useState(ROASTS[0].id);
  const [size, setSize] = useState(SIZES[0].id);
  const [frequency, setFrequency] = useState(FREQUENCIES[1].id);
  const [email, setEmail] = useState("");

  const selectedSize = useMemo(() => SIZES.find((s) => s.id === size), [size]);
  const selectedFreq = useMemo(
    () => FREQUENCIES.find((f) => f.id === frequency),
    [frequency]
  );

  const price = useMemo(() => {
    const base = selectedSize?.price ?? 0;
    const discount = selectedFreq?.discount ?? 0;
    return Math.round(base * (1 - discount) * 100) / 100;
  }, [selectedSize, selectedFreq]);

  function onSubmit(e) {
    e.preventDefault();

    const qs = new URLSearchParams({
      roast,
      size,
      frequency,
      price: String(price),
      email,
      emailStatus: "sent_demo",
    });

    router.push(`/confirm?${qs.toString()}`);
  }

  return (
    <main style={styles.page}>
      <div style={styles.headerBand}>
        <div style={styles.shell}>
          <div style={styles.badge}>STANDARD ISSUE COFFEE CO</div>
          <h1 style={styles.heroTitle}>Subscription Signup</h1>
          <p style={styles.heroSubtitle}>
            Portfolio demo: simulates secure email delivery.
          </p>
        </div>
      </div>

      <div style={styles.shell}>
        <section style={styles.card}>
          <form onSubmit={onSubmit} style={styles.form}>
            <label style={styles.label}>
              Roast
              <select style={styles.select} value={roast} onChange={(e) => setRoast(e.target.value)}>
                {ROASTS.map((r) => (
                  <option key={r.id} value={r.id}>{r.name} — {r.note}</option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Size
              <select style={styles.select} value={size} onChange={(e) => setSize(e.target.value)}>
                {SIZES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label} — ${s.price}</option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Frequency
              <select style={styles.select} value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                {FREQUENCIES.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Email
              <input
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <div style={styles.summary}>
              <div style={styles.summaryRow}>
                <span>Estimated price</span>
                <b>${price.toFixed(2)}</b>
              </div>
            </div>

            <button type="submit" style={styles.primaryBtn}>
              Confirm Subscription
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f2ece6", fontFamily: "system-ui" },
  shell: { maxWidth: 720, margin: "0 auto", padding: "0 24px" },

  headerBand: { padding: "42px 0 22px" },

  badge: {
    background: BURGUNDY,
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 800,
    letterSpacing: 2,
    display: "inline-block",
  },

  heroTitle: { fontSize: 48, margin: "18px 0 6px", color: "#111" },
  heroSubtitle: { opacity: 0.8 },

  card: {
    background: "#fff8f2",
    borderRadius: 18,
    padding: 18,
    border: `1px solid ${BURGUNDY}33`,
  },

  form: { display: "grid", gap: 12 },
  label: { fontWeight: 700 },
  select: { padding: 14, borderRadius: 14, border: `1px solid ${BURGUNDY}55` },
  input: { padding: 14, borderRadius: 14, border: `1px solid ${BURGUNDY}55` },

  summary: {
    border: `1px dashed ${BURGUNDY}55`,
    borderRadius: 14,
    padding: 14,
  },

  summaryRow: { display: "flex", justifyContent: "space-between" },

  primaryBtn: {
    marginTop: 10,
    padding: "14px 16px",
    borderRadius: 999,
    background: BURGUNDY,
    color: "#fff",
    fontWeight: 900,
    border: "none",
    cursor: "pointer",
  },
};