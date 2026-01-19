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

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    setLoading(true);

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
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.badge}>Standard Issue Coffee Co</div>
          <h1 style={styles.title}>Subscription Signup</h1>
          <p style={styles.subtitle}>
            Portfolio demo: simulates secure email delivery via server API.
          </p>
        </header>

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
    display: "flex",
    justifyContent: "center",
    padding: 24,
    background: "#f2ece6",
    color: "#1a1a1a",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  shell: { width: "100%", maxWidth: 720 },
  header: { marginBottom: 16 },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(139,0,0,.1)",
    border: "1px solid rgba(139,0,0,.25)",
    color: "#8b0000",
    fontWeight: 700,
    fontSize: 12,
  },
  title: {
    margin: "10px 0 6px",
    fontSize: 34,
    color: "#8b0000",
  },
  subtitle: { margin: 0, opacity: 0.85 },

  card: {
    border: "1px solid rgba(139,0,0,.18)",
    borderRadius: 16,
    padding: 16,
    background: "#fff8f2",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  },

  form: { display: "grid", gap: 12 },

  label: {
    fontWeight: 700,
    fontSize: 14,
    display: "grid",
    gap: 6,
    color: "#1a1a1a",
  },

  select: {
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(139,0,0,.25)",
    background: "#ffffff",
    color: "#000000",
    fontSize: 16,
  },

  option: {
    color: "#000000",
    background: "#ffffff",
  },

  input: {
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(139,0,0,.25)",
    background: "#ffffff",
    color: "#000000",
    fontSize: 16,
  },

  summary: {
    border: "1px dashed rgba(139,0,0,.3)",
    borderRadius: 12,
    padding: 12,
    background: "rgba(139,0,0,.04)",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#000000",
  },

  summaryNote: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 6,
  },

  error: {
    background: "rgba(139,0,0,.08)",
    border: "1px solid rgba(139,0,0,.3)",
    padding: 10,
    borderRadius: 12,
    color: "#8b0000",
    fontWeight: 700,
  },

  button: {
    marginTop: 6,
    padding: "12px 14px",
    borderRadius: 12,
    border: "none",
    background: "#8b0000",
    color: "#f2ece6",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },

  footer: {
    marginTop: 14,
    fontSize: 12,
    opacity: 0.8,
    color: "#1a1a1a",
  },
};