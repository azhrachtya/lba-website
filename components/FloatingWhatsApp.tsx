"use client";

import { useState } from "react";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  const phone = "+6281219769494"; // Ganti dengan nomor WhatsApp resmi perusahaan

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 block rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-lg"
        >
          Chat via WhatsApp
        </a>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Chat WhatsApp"
        className="rounded-full bg-green-500 px-5 py-3 font-semibold text-white shadow-lg hover:bg-green-600"
      >
        WhatsApp
      </button>
    </div>
  );
}