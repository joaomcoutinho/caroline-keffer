import { Revelar } from "@/components/ui/Revelar";
import { lema } from "@/content/site";

/**
 * O lema da parede do consultório, em destaque (17/09/2026, JM).
 *
 * A dobra imita a própria parede: fundo claro em cima, a curva azul subindo
 * por baixo (a `Onda` que vem logo depois) e a frase no meio, com o
 * coraçãozinho vermelho no fim, como está pintado lá.
 */
export function Lema() {
  return (
    <section aria-label="Nosso lema" className="lema fundo-patas relative bg-surface px-5 pt-2 pb-20 sm:px-8 md:pb-24">
      <figure className="mx-auto max-w-[780px] text-center">
        <Revelar>
          <p className="mb-4 text-xs font-bold tracking-[0.16em] text-acao-texto uppercase sm:text-sm">
            {lema.rotulo}
          </p>
        </Revelar>
        <Revelar atraso={0.04}>
          <blockquote className="lema-frase font-display font-bold tracking-tight text-balance">
            <span aria-hidden className="lema-aspas">“</span>
            {lema.frase}
            <span aria-hidden className="lema-aspas">”</span>
            <svg aria-hidden viewBox="0 0 32 30" className="lema-coracao">
              <path
                d="M16 28 C 5 20, 1 13, 3 7.5 C 5 2.5, 11.5 1.8, 16 7 C 20.5 1.8, 27 2.5, 29 7.5 C 31 13, 27 20, 16 28 Z"
                fill="#e2463f"
              />
            </svg>
          </blockquote>
        </Revelar>
        <Revelar atraso={0.1}>
          <figcaption className="mx-auto mt-6 flex max-w-[52ch] flex-col items-center gap-4 text-base leading-relaxed text-text-2 sm:text-lg">
            <span aria-hidden className="lema-fio" />
            {lema.missao}
          </figcaption>
        </Revelar>
      </figure>
    </section>
  );
}
