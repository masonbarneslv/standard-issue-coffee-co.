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

export default function SubscribePage() {
  const router = useRouter();

  const [roast, setRoast] = useState(ROASTS[0].id);
  const [size, setSize] = useState(SIZES[0].id);
  const [frequency, setFrequency] = useState(FREQUENCIES[1].id);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    setLoading(true);

    // Demo flow: navigate to confirm with query params
    const qs = new URLSearchParams({
      roast,
      size,
      frequency,
      price: String(price),
      email: email.trim(),
      emailStatus: "sent_demo",
    });

    router.push(`/confirm?${qs.toString()}`);
  }

  return (
    <main style={styles.page}>
      {/* HEADER BAND */}
      <div style={styles.headerBand}>
        <div style={styles.shell}>
          <div style={styles.badge}>STANDARD ISSUE COFFEE CO</div>
          <h1 style={styles.heroTitle}>Subscription Signup</h1>
          <p style={styles.heroSubtitle}>
            Portfolio demo: simulates secure email delivery via a server API.
          </p>
        </div>
      </div>

      <div style={styles.shell}>
        <section style={styles.card}>
          <form onSubmit={onSubmit} style={styles.form}>
            <label style={styles.label}>
              Roast
              <select
                value={roast}
                onChange={(e) => setRoast(e.target.value)}
                style={styles.select}
              >
                {ROASTS.map((r) => (
                  <option key={r.id} value={r.id} style={styles.option}>
                    {r.name} — {r.note}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Size
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={styles.select}
              >
                {SIZES.map((s) => (
                  <option key={s.id} value={s.id} style={styles.option}>
                    {s.label} — ${s.price}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Frequency
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={styles.select}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.id} value={f.id} style={styles.option}>
                    {f.label} — {Math.round(f.discount * 100)}% off
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                inputMode="email"
                autoComplete="email"
              />
            </label>

            <div style={styles.summary}>
              <div style={styles.summaryRow}>
                <span>Estimated price</span>
                <b>${price.toFixed(2)}</b>
              </div>
              <div style={styles.summaryNote}>
                Demo only — no payment processed.
              </div>
            </div>

            {errorMsg && <div style={styles.error}>{errorMsg}</div>}

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Submitting…" : "Confirm Subscription"}
            </button>
          </form>
        </section>

        <footer style={styles.footer}>
          Client form → API route → simulated emails → confirmation page.
        </footer>
      </div>
    </main>
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

  card: {
    marginTop: 18,
    border: "1px solid rgba(139,0,0,.18)",
    borderRadius: 18,
    padding: 18,
    background: "#fff8f2",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  },

  form: { display: "grid", gap: 12 },

  label: {
    fontWeight: 800,
    fontSize: 14,
    display: "grid",
    gap: 6,
    color: "#1a1a1a",
  },

  select: {
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(139,0,0,.25)",
    background: "#ffffff",
    color: "#000000",
    fontSize: 16,
  },

  option: { color: "#000000", background: "#ffffff" },

  input: {
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(139,0,0,.25)",
    background: "#ffffff",
    color: "#000000",
    fontSize: 16,
  },

  summary: {
    border: "1px dashed rgba(139,0,0,.3)",
    borderRadius: 14,
    padding: 14,
    background: "rgba(139,0,0,.04)",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#000000",
    fontSize: 16,
  },

  summaryNote: { fontSize: 12, opacity: 0.8, marginTop: 6 },

  error: {
    background: "rgba(139,0,0,.08)",
    border: "1px solid rgba(139,0,0,.3)",
    padding: 10,
    borderRadius: 12,
    color: "#8b0000",
    fontWeight: 800,
  },

  button: {
    marginTop: 6,
    padding: "14px 16px",
    borderRadius: 14,
    border: "none",
    background: "#8b0000",
    color: "#f2ece6",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },

  footer: {
    marginTop: 16,
    paddingBottom: 28,
    fontSize: 12,
    opacity: 0.8,
    color: "#1a1a1a",
  },
};