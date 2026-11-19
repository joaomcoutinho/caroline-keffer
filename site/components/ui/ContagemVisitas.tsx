"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * CONTAGEM DE VISITAS SEM COOKIE (19/11/2026; JM: "tem que contar os que recusam… toda a contabilização de todos que
 * realmente visitam o site"). Mesmo modelo do site do Dr. Marcelo e da Belavion.
 *
 * O GA4 só carrega depois do Aceitar (content/medicao.ts): quem recusa ou ignora o aviso não aparece nele. Esta
 * contagem soma 1 por página aberta no total do dia, com ou sem aceite, e é o que o painel do Looker usa como
 * "todas as visitas". Pode rodar sem aceite porque NÃO usa cookie, NÃO grava nada no aparelho e NÃO manda
 * identificador: cada envio leva só o tipo do evento, a página (o Worker só aceita as páginas do mapa do site) e a
 * resposta ao aviso de cookies. O Worker keffer-contagem (~/.mxc-build/keffer-contagem, conta contato@ da MXC) soma 1
 * no total do dia e joga o resto fora. Está descrito na política de privacidade ("O que o site registra").
 *
 * Quem pede para não ser rastreado (Global Privacy Control ou Do Not Track) não é contado. Só conta no domínio
 * oficial (prévias e desenvolvimento ficam fora). `?mxc_teste=1` no endereço vai para o total "teste" até a aba fechar.
 */
const URL_C = "https://keffer-contagem.delicate-boat-7a84.workers.dev/c";

let primeira = true;
let teste = false;

function naoContar() {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return (
    location.hostname !== "clinicacarolinekeffer.com.br" ||
    nav.globalPrivacyControl === true ||
    nav.doNotTrack === "1" ||
    nav.webdriver === true
  );
}

/** Resposta ao aviso, lida da marca que o script do <head> e o aviso põem no <html>. */
function resposta() {
  const v = document.documentElement.dataset.cookies;
  return v === "sim" ? "a" : v === "nao" ? "r" : "n";
}

function enviar(o: Record<string, string | number>) {
  if (naoContar()) return;
  if (teste) o.teste = 1;
  try {
    const corpo = JSON.stringify(o);
    if (!(navigator.sendBeacon && navigator.sendBeacon(URL_C, corpo)))
      fetch(URL_C, { method: "POST", body: corpo, keepalive: true, credentials: "omit", mode: "no-cors" }).catch(() => {});
  } catch {
    /* a contagem é acessória: nunca atrapalha o site */
  }
}

/** "/especialidades/cardiologia/" vira "especialidades/cardiologia"; a home vira "inicio". */
const paginaDe = (caminho: string) => caminho.replace(/^\/+|\/+$/g, "") || "inicio";

export function ContagemVisitas() {
  const caminho = usePathname();

  // Uma página vista a cada endereço novo, inclusive na navegação dentro do site (o Next troca a página sem recarregar).
  useEffect(() => {
    let n = 0;
    if (primeira) {
      primeira = false;
      teste = /[?&]mxc_teste=1/.test(location.search);
      // começo de visita: chegou de fora do site (ou sem origem)
      try {
        n = new URL(document.referrer).hostname.replace(/^www\./, "") !== location.hostname.replace(/^www\./, "") ? 1 : 0;
      } catch {
        n = 1;
      }
    }
    enviar({ t: "v", g: paginaDe(caminho), n, c: resposta() });
  }, [caminho]);

  // Resposta ao aviso de cookies e toques em WhatsApp, Ligar e Como chegar (só que houve, nunca a mensagem).
  useEffect(() => {
    const raiz = document.documentElement;
    let antes = raiz.dataset.cookies;
    const observador = new MutationObserver(() => {
      const agora = raiz.dataset.cookies;
      if (agora !== antes && (agora === "sim" || agora === "nao")) enviar({ t: "e", c: agora === "sim" ? "a" : "r" });
      antes = agora;
    });
    observador.observe(raiz, { attributes: true, attributeFilter: ["data-cookies"] });

    const clique = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const h = a.getAttribute("href") || "";
      const t = /wa\.me|api\.whatsapp/.test(h) ? "w" : /^tel:/.test(h) ? "f" : /google\.[^/]+\/maps|maps\.app\.goo|maps\.google/.test(h) ? "r" : "";
      if (t) enviar({ t, g: paginaDe(location.pathname), c: resposta() });
    };
    document.addEventListener("click", clique, true);
    return () => {
      observador.disconnect();
      document.removeEventListener("click", clique, true);
    };
  }, []);

  return null;
}
