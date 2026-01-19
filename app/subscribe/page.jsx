"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
  { id: "biweekly", label: "Every 2 weeks", discount: 0.1 },
  { id: "monthly", label: "Monthly", discount: 0.05 },
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SubscribePage() {
  const router = useRouter();

  const [roast, setRoast] = useState(ROASTS[0].id);
  const [size, setSize] = useState(SIZES[0].id);
  const [frequency, setFrequency] = useState(FREQUENCIES[1].id);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedSize = useMemo(() => SIZES.find((s) => s.id === size), [size]);
  const selectedFreq = useMemo(() => FREQUENCIES.find((f) => f.id === frequency), [frequency]);

  const price = useMemo(() => {
    const base = selectedSize?.price ?? 0;
    const discount = selectedFreq?.discount ?? 0;
    const final = base * (1 - discount);
    return Math.round(final * 100) / 100;
  }, [selectedSize, selectedFreq]);

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const trimmed = email.trim();

    if (!trimmed) {
      setErrorMsg("Please enter your email.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setErrorMsg("Please enter a valid email (example: you@email.com).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roast,
          size,
          frequency,
          price, // send it so server can include in previews
          email: trimmed,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setErrorMsg(json?.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      // Store previews locally so confirm page can show them (no long query strings)
      try {
        localStorage.setItem(
          "demoEmailPayload",
          JSON.stringify({
            timestamp: json.timestamp,
            ids: json.ids,
            companyInbox: json.companyInbox,
            previews: json.previews,
          })
        );
      } catch {
        // If storage fails, confirm page will still work without previews
      }

      const qs = new URLSearchParams({
        roast,
        size,
        frequency,
        price: String(price),
        email: trimmed,
        emailStatus: json.emailStatus, // sent_demo
      });

      router.push(`/confirm?${qs.toString()}`);
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.badge}>Standard Issue Coffee Co</div>
          <h1 style={styles.title}>Subscription Signup</h1>
          <p style={styles.subtitle}>
            Portfolio demo: simulates sending emails securely via a server API route.
          </p>
        </header>

        <section style={styles.card}>
          <form onSubmit={onSubmit} style={styles.form}>
            <label style={styles.label}>
              Roast
              <select value={roast} onChange={(e) => setRoast(e.target.value)} style={styles.select}>
                {ROASTS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.note}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Size
              <select value={size} onChange={(e) => setSize(e.target.value)} style={styles.select}>
                {SIZES.map((s) => (
                  <option key={s.id} value={s.id}>
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
                  <option key={f.id} value={f.id}>
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
                Demo only — no payment is processed. Email is simulated server-side.
              </div>
            </div>

            {errorMsg ? <div style={styles.error}>{errorMsg}</div> : null}

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Submitting…" : "Confirm Subscription"}
            </button>
          </form>
        </section>

        <footer style={styles.footer}>
          You can show employers the architecture: client form → API route → simulated emails → confirmation.
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
    background: "#0b0b0c",
    color: "#f2f2f2",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
  },
  shell: { width: "100%", maxWidth: 720 },
  header: { marginBottom: 18 },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    border: "1px solid rgba(255,255,255,.18)",
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 0.4,
    opacity: 0.9,
  },
  title: { margin: "10px 0 6px", fontSize: 32, lineHeight: 1.1 },
  subtitle: { margin: 0, opacity: 0.8 },
  card: {
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 16,
    padding: 16,
    background: "rgba(255,255,255,.03)",
  },
  form: { display: "grid", gap: 12 },
  label: { display: "grid", gap: 6, fontSize: 14, opacity: 0.95 },
  select: {
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)",
    background: "#111114",
    color: "#f2f2f2",
    outline: "none",
  },
  input: {
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)",
    background: "#111114",
    color: "#f2f2f2",
    outline: "none",
  },
  summary: {
    marginTop: 6,
    border: "1px dashed rgba(255,255,255,.18)",
    borderRadius: 12,
    padding: 12,
  },
  summaryRow: { display: "flex", justifyContent: "space-between" },
  summaryNote: { marginTop: 6, fontSize: 12, opacity: 0.75 },
  error: {
    border: "1px solid rgba(255,80,80,.35)",
    background: "rgba(255,80,80,.10)",
    padding: 10,
    borderRadius: 12,
    fontSize: 13,
  },
  button: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.16)",
    background: "#f2ece6",
    color: "#0b0b0c",
    fontWeight: 800,
    cursor: "pointer",
  },
  footer: { marginTop: 14, fontSize: 12, opacity: 0.75 },
};