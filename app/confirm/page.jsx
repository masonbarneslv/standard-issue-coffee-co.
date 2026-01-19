import { Suspense } from "react";
import ConfirmClient from "./ConfirmClient";

export const dynamic = "force-dynamic";

export default function ConfirmPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ConfirmClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f2ece6",
        padding: "48px 18px",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        color: "#1a1a1a",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: 22,
          }}
        >
          Loading…
        </div>
      </div>
    </main>
  );
}