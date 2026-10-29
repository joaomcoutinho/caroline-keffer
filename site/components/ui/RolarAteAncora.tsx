"use client";

import { useEffect } from "react";

/**
 * Rola até a âncora do endereço depois que a página monta (29/10/2026).
 *
 * As páginas antigas de bairro fazem 301 para /como-chegar/#<bairro>. Aberto
 * direto, o navegador já desce até a seção; vindo pelo redirecionamento, o
 * Chrome chega com o #bairro no endereço mas fica no topo. Isto cobre esse caso.
 */
export function RolarAteAncora() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const alvo = document.getElementById(id);
    if (!alvo) return;
    const quadro = requestAnimationFrame(() => {
      if (Math.abs(alvo.getBoundingClientRect().top) > 200) alvo.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(quadro);
  }, []);
  return null;
}
