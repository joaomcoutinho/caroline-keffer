"use client";

import { useRef, useState } from "react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

type Props = {
  pergunta: string;
  resposta: string;
};

/**
 * Uma pergunta do FAQ, com abertura e fechamento animados de verdade.
 *
 * ─ POR QUE ISTO EXISTE ─────────────────────────────────────────────────────
 *
 * Antes era `<details>` puro com uma transição de `grid-template-rows: 0fr → 1fr`
 * no corpo. Dois defeitos, e o segundo é o que dava a sensação de travamento:
 *
 *   1. `<details>` NÃO ANIMA AO FECHAR. O navegador tira o atributo `open` no
 *      mesmo quadro do clique e o conteúdo deixa de ser renderizado na hora —
 *      não sobra nada para a transição animar. Ou seja: abria deslizando e
 *      fechava com um corte seco. Metade da interação era um salto.
 *
 *   2. a regra estava dentro de `@supports (interpolate-size: allow-keywords)`,
 *      mas a técnica usada ali (0fr → 1fr) não depende de `interpolate-size`.
 *      O teste barrava navegadores perfeitamente capazes de animar, que caíam
 *      no salto instantâneo mesmo na abertura.
 *
 * ─ COMO FUNCIONA AGORA ─────────────────────────────────────────────────────
 *
 * O clique no `<summary>` é interceptado e a altura do `<details>` é animada
 * pela Web Animations API, do valor atual até o alvo:
 *
 *   - ABRIR:  põe `open` (o conteúdo passa a existir e pode ser medido), mede
 *             o alvo e anima da altura antiga até ele.
 *   - FECHAR: anima até a altura só do `<summary>` e SÓ ENTÃO tira o `open`,
 *             no `onfinish`. É isto que dá o fechamento suave que o elemento
 *             nativo não entrega.
 *
 * INTERRUPÇÃO. A altura de partida é lida com `getBoundingClientRect()` ANTES
 * de cancelar a animação em curso — durante uma animação esse método devolve o
 * valor animado, não o de repouso. Lendo depois do cancel, o card saltaria para
 * a altura final antes de começar o movimento novo. É o que faz cliques rápidos
 * reverterem de onde estão, em vez de piscar.
 *
 * DURAÇÃO PROPORCIONAL. Resposta curta abre rápido, resposta longa ganha um
 * pouco mais de tempo, com teto de 520ms. Duração fixa é o que faz um acordeão
 * parecer lento nos itens pequenos e apressado nos grandes.
 *
 * O "+" é girado por `data-aberto`, que vem do estado do React, e não por
 * `[open]`: no fechamento o `open` só sai no fim da animação, então preso a ele
 * o ícone ficaria parado esperando o card terminar de fechar.
 *
 * Anima só `height` e `transform`/`opacity`. Sem `prefers-reduced-motion`, e
 * sem JavaScript, o `<details>` continua abrindo e fechando sozinho — a
 * semântica, o teclado e a leitura do conteúdo pelo Google não dependem disto.
 */
export function ItemFaq({ pergunta, resposta }: Props) {
  const detalhes = useRef<HTMLDetailsElement>(null);
  const sumario = useRef<HTMLElement>(null);
  const corpo = useRef<HTMLDivElement>(null);
  const animacao = useRef<Animation | null>(null);
  const [aberto, setAberto] = useState(false);

  function alternar(evento: React.MouseEvent) {
    const d = detalhes.current;
    const s = sumario.current;
    const c = corpo.current;
    if (!d || !s || !c) return;

    // Quem conduz a abertura daqui em diante é este handler, não o navegador.
    evento.preventDefault();

    const alvo = !d.open;

    /*
      Sem animação em dois casos:

        - `prefers-reduced-motion`, que é a razão óbvia;
        - `document.hidden`, que é a menos óbvia e vale um parágrafo. Numa aba
          em segundo plano o navegador estrangula a régua de tempo, a animação
          pode nunca chegar ao fim e o `finished` nunca resolver. Como é no fim
          da animação que o `open` é retirado, o item ficaria preso ABERTO até a
          pessoa voltar para a aba. Aqui o estado é aplicado direto — ninguém
          está olhando o movimento mesmo.
    */
    if (
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      d.open = alvo;
      setAberto(alvo);
      return;
    }

    // ⚠️ Ordem importa: medir ANTES de cancelar (ver INTERRUPÇÃO no topo).
    const de = d.getBoundingClientRect().height;
    animacao.current?.cancel();

    // Para medir o alvo da abertura, o conteúdo precisa estar renderizado.
    if (alvo) d.open = true;
    const para = alvo ? s.offsetHeight + c.offsetHeight : s.offsetHeight;

    setAberto(alvo);

    const duracao = Math.min(520, 220 + Math.abs(para - de) * 0.42);

    d.style.overflow = "hidden";
    const anim = d.animate(
      { height: [`${de}px`, `${para}px`] },
      { duration: duracao, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    animacao.current = anim;

    /*
      A resposta entra deslizando um pouco depois da altura começar a abrir.
      Sem esse defasamento o texto aparece inteiro num contêiner ainda apertado
      e dá a impressão de que ele "empurrou" o card.
    */
    c.animate(
      alvo
        ? [
            { opacity: 0, transform: "translateY(-8px)" },
            { opacity: 1, transform: "none" },
          ]
        : [
            { opacity: 1, transform: "none" },
            { opacity: 0, transform: "translateY(-8px)" },
          ],
      {
        duration: duracao * 0.8,
        delay: alvo ? duracao * 0.15 : 0,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    );

    /*
      `finished` em vez de `onfinish`: a promessa REJEITA quando a animação é
      cancelada, então o `catch` distingue "terminou" de "foi interrompida por
      outro clique". Com `onfinish` o cancelamento é silencioso, e quem cancela
      precisaria lembrar de desfazer o `overflow` na mão.
    */
    anim.finished
      .then(() => {
        d.style.overflow = "";
        if (!alvo) d.open = false;
        if (animacao.current === anim) animacao.current = null;
      })
      .catch(() => {
        /* cancelada: quem cancelou já assumiu o comando e vai reconfigurar. */
      });
  }

  return (
    <details ref={detalhes} className="faq-item group" data-aberto={aberto}>
      <summary
        ref={sumario}
        onClick={alternar}
        className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-lg leading-snug font-medium text-balance transition-colors duration-200 group-hover:text-acao-texto">
          {pergunta}
        </span>
        <span className="faq-sinal mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-brand transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-soft)] group-hover:border-brand">
          <PlusIcon size={16} weight="bold" aria-hidden />
        </span>
      </summary>

      <div ref={corpo}>
        <p className="max-w-[58ch] pb-6 leading-relaxed text-text-2">
          {resposta}
        </p>
      </div>
    </details>
  );
}
