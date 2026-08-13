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
 */
export function Prova() {
  return (
    <section className="fundo-patas relative isolate overflow-hidden bg-surface-2 px-5 py-14 sm:px-8 md:py-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(85% 150% at 50% 0%, color-mix(in srgb, var(--brand) 24%, transparent), transparent 72%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1100px] gap-4 sm:grid-cols-3 sm:gap-6">
        {prova.itens.map((item, i) => {
          const Icone = icones[item.icone];
          return (
            <Revelar key={item.rotulo} atraso={i * 0.08} className="h-full">
              <CartaoInclinavel className="h-full">
              <article className="numero-card vidro group flex h-full flex-col items-center rounded-[var(--radius-card)] px-6 py-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand/20">
                  <Icone size={24} weight="light" aria-hidden />
                </span>

                <p className="numero-valor mt-5 font-display text-5xl leading-none font-semibold text-brand sm:text-[3.25rem]">
                  <NumeroContado
                    alvo={item.alvo}
                    casas={item.casas}
                    sufixo={item.sufixo}
                  />
                </p>

                <p className="mt-4 text-base font-medium text-text">
                  {item.rotulo}
                </p>
                <p className="mt-1 text-sm text-text-3">{item.nota}</p>
              </article>
              </CartaoInclinavel>
            </Revelar>
          );
        })}
      </div>
    </section>
  );
}
