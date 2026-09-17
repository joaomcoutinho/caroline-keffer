"use client";

import { useLayoutEffect, useRef } from "react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

type Props = {
  pergunta: string;
  resposta: string;
  /** Controlado por `ListaFaq`: só uma pergunta aberta por vez. */
  aberto: boolean;
  aoAlternar: () => void;
};

/*
  15/09/2026 (JM: "animação fluida, natural, mais um clique, mais profissional").

  DURAÇÃO FIXA E IGUAL PARA TODOS. A versão anterior variava a duração com o
  tamanho da resposta. Com uma pergunta aberta por vez, abrir uma FECHA outra
  no mesmo instante, e se as duas tiverem durações diferentes uma termina antes
  da outra: a página faz um tremido no meio do movimento. Com a mesma duração e
  a mesma curva, a que fecha e a que abre se compensam, e o conjunto desliza
  como uma peça só.

  CURVA. Era `cubic-bezier(0.16, 1, 0.3, 1)`, uma saída exponencial: dispara nos
  primeiros quadros e se arrasta no fim. Em altura isso lê como "pulou e depois
  foi assentando". Esta é a curva de folha que o iOS usa: arranca firme, sem
  salto, e freia macio.
*/
const DURACAO = 440;
const CURVA = "cubic-bezier(0.32, 0.72, 0, 1)";

/**
 * Uma pergunta do FAQ, com abertura e fechamento animados de verdade.
 *
 * `<details>` NÃO ANIMA AO FECHAR sozinho: o navegador tira o `open` no mesmo
 * quadro e o conteúdo some. Aqui a altura do `<details>` é animada pela Web
 * Animations API e o `open` só sai quando a animação de fechar termina.
 *
 * O componente é CONTROLADO: quem decide se está aberto é `ListaFaq`, e este
 * efeito só executa o movimento quando a prop muda. É isso que permite a
 * lista fechar uma pergunta enquanto abre outra.
 *
 * INTERRUPÇÃO. A altura de partida é lida ANTES de cancelar a animação em curso,
 * porque durante uma animação `getBoundingClientRect()` devolve o valor animado.
 * É o que faz um clique no meio do movimento reverter de onde está.
 *
 * Sem JavaScript o `<details>` continua funcionando sozinho, e o Google lê o
 * conteúdo fechado.
 */
export function ItemFaq({ pergunta, resposta, aberto, aoAlternar }: Props) {
  const detalhes = useRef<HTMLDetailsElement>(null);
  const sumario = useRef<HTMLElement>(null);
  const corpo = useRef<HTMLDivElement>(null);
  const animacao = useRef<Animation | null>(null);
  const montado = useRef(false);

  useLayoutEffect(() => {
    const d = detalhes.current;
    const s = sumario.current;
    const c = corpo.current;
    if (!d || !s || !c) return;

    // Primeira montagem: só aplica o estado, sem animar.
    if (!montado.current) {
      montado.current = true;
      d.open = aberto;
      return;
    }

    /*
      Sem animação sob `prefers-reduced-motion` e com a aba oculta. Na aba
      oculta o navegador estrangula a régua de tempo, a animação pode não
      terminar, e como é no fim dela que o `open` sai, a pergunta ficaria presa
      aberta.
    */
    if (
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      animacao.current?.cancel();
      d.style.overflow = "";
      d.open = aberto;
      return;
    }

    // ⚠️ Medir ANTES de cancelar (ver INTERRUPÇÃO acima).
    const de = d.getBoundingClientRect().height;
    animacao.current?.cancel();

    if (aberto) d.open = true;
    /*
      A borda do card entra na conta: o <details> é border-box, então a altura
      animada inclui a borda. Sem ela o card pulava 2px no último quadro, ao
      abrir e ao fechar (16/09/2026, JM: "abertura sem travar").
    */
    const borda = d.offsetHeight - d.clientHeight;
    const para = borda + (aberto ? s.offsetHeight + c.offsetHeight : s.offsetHeight);

    d.style.overflow = "hidden";
    const anim = d.animate(
      { height: [`${de}px`, `${para}px`] },
      { duration: DURACAO, easing: CURVA },
    );
    animacao.current = anim;

    // A resposta desliza um pouco depois da altura começar a abrir.
    c.animate(
      aberto
        ? [
            { opacity: 0, transform: "translateY(-4px)" },
            { opacity: 1, transform: "none" },
          ]
        : [
            { opacity: 1, transform: "none" },
            { opacity: 0, transform: "translateY(-4px)" },
          ],
      {
        duration: aberto ? DURACAO * 0.9 : DURACAO * 0.5,
        delay: aberto ? DURACAO * 0.1 : 0,
        easing: CURVA,
        fill: "both",
      },
    );

    anim.finished
      .then(() => {
        d.style.overflow = "";
        if (!aberto) d.open = false;
        if (animacao.current === anim) animacao.current = null;
      })
      .catch(() => {
        /* cancelada: o próximo movimento já assumiu. */
      });
  }, [aberto]);

  return (
    <details ref={detalhes} className="faq-item group" data-aberto={aberto}>
      <summary
        ref={sumario}
        onClick={(e) => {
          // Quem conduz a abertura é a lista, não o navegador.
          e.preventDefault();
          aoAlternar();
        }}
        className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left"
      >
        <span className="faq-pergunta font-display text-lg leading-snug font-semibold text-balance">
          {pergunta}
        </span>
        <span className="faq-sinal flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-brand">
          <PlusIcon size={16} weight="bold" aria-hidden />
        </span>
      </summary>

      <div ref={corpo}>
        <p className="max-w-[60ch] pb-6 leading-relaxed text-text-2">
          {resposta}
        </p>
      </div>
    </details>
  );
}
