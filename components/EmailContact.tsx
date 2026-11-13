"use client";

import { useState, type ReactNode } from "react";
import { useLang } from "./LangProvider";

export default function EmailContact({ office, children, className, subject, body }: {
  office: string;
  children: ReactNode;
  className?: string;
  subject?: string;
  body?: string;
}) {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function openEmail() {
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ office }),
      });
      if (!response.ok) throw new Error("Email unavailable");
      const { email } = await response.json();
      const params = [
        subject && `subject=${encodeURIComponent(subject)}`,
        body && `body=${encodeURIComponent(body)}`,
      ].filter(Boolean).join("&");
      window.location.href = `mailto:${email}${params ? `?${params}` : ""}`;
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={openEmail} disabled={loading} aria-busy={loading}>
        {children}
      </button>
      {failed && <p role="status" className="mt-1 text-xs text-rose-700">{t.consult.emailUnavailable}</p>}
    </>
  );
}
