import {
  StarIcon,
  ClockCounterClockwiseIcon,
  StethoscopeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Revelar } from "@/components/ui/Revelar";
import { CartaoInclinavel } from "@/components/ui/CartaoInclinavel";
import { NumeroContado } from "@/components/ui/NumeroContado";
import { prova } from "@/content/site";

const icones: Record<string, Icon> = {
  estrela: StarIcon,
  relogio: ClockCounterClockwiseIcon,
  estetoscopio: StethoscopeIcon,
};

/**
 * Dobra 2 — três números reais, logo abaixo do hero (nunca dentro dele).
 *
 * É a faixa de respiro entre o hero e o corpo do site, então é a mais baixa da
 * página: um número por card, tudo centralizado, sem fio divisório.
 *
 * O que dá vida:
 * - cada número conta de zero ao valor ao entrar na tela, uma vez só;
 * - as cinco estrelas saíram: a última ficava cortada ao 4,8 e lia como
 *   render quebrado, não como precisão. O número sozinho já diz a nota;
 * - os cards são de vidro sobre a lâmina ciano, amarrando com o header;
 * - no hover o card sobe, acende halo e risca um traço sob o número.
 *
 * CELULAR (15/09/2026, JM: "um abaixo do outro não é bom... que apareça os três
 * ao mesmo tempo"). Os três ficam LADO A LADO em qualquer largura, numa versão
 * compacta: ícone e número menores, a nota de rodapé some e o rótulo desce para
 * texto pequeno. A faixa inteira cabe em pouco mais de um terço da tela.
 */
export function Prova() {
  return (
    <section className="fundo-patas relative isolate overflow-hidden bg-surface-2 px-4 py-8 sm:px-8 sm:py-14 md:py-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(85% 150% at 50% 0%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 72%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-3 gap-2.5 sm:gap-6">
        {prova.itens.map((item, i) => {
          const Icone = icones[item.icone];
          return (
            <Revelar key={item.rotulo} atraso={i * 0.08} className="h-full">
              <CartaoInclinavel className="h-full">
              <article className="numero-card vidro group flex h-full flex-col items-center rounded-[var(--radius-card)] px-2 py-5 text-center sm:px-6 sm:py-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand/20 sm:h-14 sm:w-14">
                  <Icone weight="light" aria-hidden className="h-[18px] w-[18px] sm:h-6 sm:w-6" />
                </span>

                <p className="numero-valor mt-3 font-display text-[2rem] leading-none font-bold text-brand sm:mt-5 sm:text-[3.25rem]">
                  <NumeroContado
                    alvo={item.alvo}
                    casas={item.casas}
                    sufixo={item.sufixo}
                  />
                </p>

                <p className="mt-2 text-xs leading-snug font-medium text-balance text-text sm:mt-4 sm:text-base">
                  {item.rotulo}
                </p>
                <p className="mt-1 hidden text-sm text-text-3 sm:block">{item.nota}</p>
              </article>
              </CartaoInclinavel>
            </Revelar>
          );
        })}
      </div>
    </section>
  );
}
