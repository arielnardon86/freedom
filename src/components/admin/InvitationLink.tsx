"use client";

import { useState } from "react";

export function InvitationLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API no disponible (ej. contexto no seguro); no hacemos nada más.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
      <code className="flex-1 truncate text-sm text-foreground">{url}</code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-gold hover:text-gold-light"
      >
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}
