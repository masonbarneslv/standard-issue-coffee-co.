"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const BURGUNDY = "#5f021f";

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

  return (
    <main style={styles.page}>
      <div style={styles.headerBand}>
        <div style={styles.shell}>
          <div style={styles.badge}>STANDARD ISSUE COFFEE CO</div>
          <h1 style={styles.heroTitle}>Subscription Details</h1>
        </div>
      </div>

      <div style={styles.shell}>
        <div style={styles.actions}>
          <button style={styles.outlineBtn} onClick={() => router.push("/subscribe")}>
            Edit Subscription
          </button>

          <button
            style={styles.primaryBtn}
            onClick={() => (window.location.href = "https://standardissuecoffecco.wpcomstaging.com")}
          >
            Back to Website
          </button>
        </div>
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

  actions: {
    marginTop: 24,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 18px",
    borderRadius: 999,
    background: BURGUNDY,
    color: "#fff",
    fontWeight: 900,
    border: "none",
    cursor: "pointer",
  },

  outlineBtn: {
    padding: "14px 18px",
    borderRadius: 999,
    background: "transparent",
    color: BURGUNDY,
    fontWeight: 900,
    border: `2px solid ${BURGUNDY}`,
    cursor: "pointer",
  },
};