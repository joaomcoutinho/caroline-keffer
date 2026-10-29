"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { COOKIE_ESCOLHA, avisoCookies } from "@/content/medicao";

/**
 * Aviso de cookies (28/10/2026, seo-mxc 1.28).
 *
 * Faixa fixa no rodapé da tela, por cima da página: não entra no fluxo, então
 * não empurra nada (sem CLS) e não vira página intermediária. Texto curto para
 * não virar o LCP no celular. Recusar e Aceitar têm o mesmo peso.
 *
 * Quem já escolheu não vê a faixa: o script do <head> marca o <html> com
 * `data-cookies` antes da primeira pintura e o CSS esconde (ver
 * `.aviso-cookies` em globals.css). "Preferências de cookies", no rodapé,
 * tira a marca e a faixa volta.
 *
 * A altura da faixa vira `--altura-cookies`, que sobe a barra de agendamento
 * e o botão flutuante: o aviso nunca tapa o botão de WhatsApp.
 */
/**
 * Grava a escolha e liga ou desliga a medição. Fica fora do componente porque
 * mexe em `document` e `window`, que o compilador do React não deixa alterar
 * de dentro de um componente.
 */
function escolher(aceitou: boolean) {
  const valor = aceitou ? "v1.sim" : "v1.nao";
  document.cookie = `${COOKIE_ESCOLHA}=${valor}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
  document.documentElement.dataset.cookies = aceitou ? "sim" : "nao";
  const janela = window as unknown as {
    kfMedir?: () => void;
    kfMedindo?: number;
    gtag?: (...args: unknown[]) => void;
  };
  if (aceitou) {
    janela.kfMedir?.();
    return;
  }
  // Mudou de ideia depois de aceitar: para de medir e apaga os cookies do GA.
  janela.gtag?.("consent", "update", { analytics_storage: "denied" });
  janela.kfMedindo = 0;
  for (const par of document.cookie.split("; ")) {
    const nome = par.split("=")[0];
    if (!/^_ga/.test(nome)) continue;
    for (const dominio of ["", `; Domain=.${location.hostname.replace(/^www\./, "")}`]) {
      document.cookie = `${nome}=; Max-Age=0; Path=/${dominio}`;
    }
  }
}

export function AvisoCookies() {
  const faixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = faixa.current;
    if (!el) return;
    const raiz = document.documentElement;
    const medir = () => raiz.style.setProperty("--altura-cookies", `${el.offsetHeight}px`);
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    medir();
    return () => {
      observador.disconnect();
      raiz.style.removeProperty("--altura-cookies");
    };
  }, []);

  return (
    <div
      ref={faixa}
      role="region"
      aria-label="Aviso de cookies"
      className="aviso-cookies fixed inset-x-0 bottom-0 z-[60] border-t border-hairline bg-surface pb-[env(safe-area-inset-bottom)] print:hidden"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
        <p className="text-[13.5px] leading-[1.45] text-text-2 sm:flex-1">
          {avisoCookies.texto}{" "}
          <Link href="/politica-de-privacidade/#cookies" className="text-text underline underline-offset-2">
            {avisoCookies.politica}
          </Link>
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:shrink-0">
          {[false, true].map((aceitar) => (
            <button
              key={String(aceitar)}
              type="button"
              onClick={() => escolher(aceitar)}
              className="h-10 rounded-full border border-text-3/70 px-5 text-sm font-semibold text-text transition-colors duration-200 hover:border-brand hover:text-acao-texto sm:min-w-[120px]"
            >
              {aceitar ? avisoCookies.aceitar : avisoCookies.recusar}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Link do rodapé que reabre o aviso para a pessoa mudar a escolha. */
export function BotaoPreferenciasCookies({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        delete document.documentElement.dataset.cookies;
      }}
    >
      {avisoCookies.preferencias}
    </button>
  );
}
