export default function ConfirmPage() {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.card}>
          <div style={styles.badge}>Standard Issue Coffee Co</div>

          <h1 style={styles.title}>Subscription Confirmed</h1>

          <p style={styles.subtitle}>
            Thank you for subscribing. This is a demo confirmation page.
          </p>

          <p style={styles.note}>
            No payment has been collected. This page exists to demonstrate a
            complete subscription flow for portfolio purposes.
          </p>

          <a href="/subscribe" style={styles.link}>
            Back to Subscription
          </a>
        </div>
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
  card: {
    background: "#ffffff",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid rgba(0,0,0,0.08)",
    padding: 28,
    textAlign: "center",
  },
  badge: {
    backgroundColor: "#5f021f",
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: 999,
    letterSpacing: "0.12em",
    fontWeight: 600,
    fontSize: 12,
    marginBottom: 16,
    display: "inline-block",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 36,
    margin: "0 0 12px",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(0,0,0,0.7)",
    marginBottom: 14,
  },
  note: {
    fontSize: 14,
    color: "rgba(0,0,0,0.55)",
    lineHeight: 1.5,
    marginBottom: 22,
  },
  link: {
    display: "inline-block",
    marginTop: 8,
    color: "#5f021f",
    fontWeight: 700,
    textDecoration: "none",
  },
};
