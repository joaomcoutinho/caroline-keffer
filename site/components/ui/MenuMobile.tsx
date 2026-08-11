"use client";

import { useEffect, useRef, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { navegacao } from "@/content/site";

/**
 * Menu de seções no mobile.
 *
 * Substitui o botão de WhatsApp que ficava aqui: com a barra fixa embaixo e o
 * CTA do hero, o header era o terceiro pedido de clique na primeira tela. Três
 * CTAs competindo entre si diluem todos. Agendar continua a um toque, na barra.
 *
 * Fecha ao escolher uma seção, ao tocar fora e no Esc — as três saídas que o
 * usuário tenta por instinto.
 */
export function MenuMobile() {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    const aoTocarFora = (e: PointerEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };

    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("pointerdown", aoTocarFora);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("pointerdown", aoTocarFora);
    };
  }, [aberto]);

  return (
    <div ref={caixa} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="menu-secoes"
        aria-label={aberto ? "Fechar menu" : "Abrir menu de seções"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-text transition-[border-color,color] duration-200 hover:border-brand hover:text-brand"
      >
        {aberto ? (
          <XIcon size={20} weight="bold" aria-hidden />
        ) : (
          <ListIcon size={20} weight="bold" aria-hidden />
        )}
      </button>

      {aberto ? (
        <nav
          id="menu-secoes"
          className="vidro menu-secoes absolute top-[calc(100%+0.75rem)] right-0 w-56 rounded-[var(--radius-card)] p-2"
        >
          {navegacao.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              className="block rounded-[var(--radius-field)] px-4 py-3 text-[15px] text-text-2 transition-colors hover:bg-brand/10 hover:text-brand"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
