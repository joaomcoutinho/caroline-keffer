import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { Midia } from "@/components/ui/Midia";
import { Revelar } from "@/components/ui/Revelar";
import { hero } from "@/content/site";

/**
 * Dobra 1 — Asymmetric Split Hero, ocupando a tela inteira.
 *
 * `min-h-[100dvh]` (nunca `h-screen`: no iOS a barra do Safari faz a página
 * pular). Como o header é `fixed`, o hero começa no topo absoluto e a foto sobe
 * até a borda superior da tela, passando por trás da pílula de vidro.
 *
 * A mídia não é card: é uma camada de fundo. No desktop ocupa a metade direita
 * inteira; no mobile ocupa a dobra toda, com um véu por cima para a copy manter
 * contraste. Assim nada da próxima seção aparece antes do primeiro scroll.
 */
export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-surface"
    >
      {/* Mídia: camada de fundo, atrás da copy. */}
      <div className="absolute inset-0 -z-20 lg:left-auto lg:w-[48%]">
        <Revelar atraso={0.1} className="revelar-zoom h-full">
          <Midia
            src={hero.foto.src}
            alt={hero.foto.alt}
            briefing={hero.foto.briefing}
            posicao={hero.foto.posicao}
            prioridade
            mesclar
            sangrar
          />
        </Revelar>
      </div>

      {/* Véu: só no mobile, onde a copy fica por cima da foto. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--surface) 92%, transparent) 0%, color-mix(in srgb, var(--surface) 70%, transparent) 55%, color-mix(in srgb, var(--surface) 88%, transparent) 100%)",
        }}
      />

      {/* Lâmina de cor que puxa o olho para o lado da mídia. Decorativa. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={{
          background:
            "linear-gradient(100deg, var(--surface) 38%, color-mix(in srgb, var(--brand) 9%, var(--surface)) 82%)",
        }}
      />

      {/*
        Patinhas no lado da copy. Param onde a foto começa (`lg:right-[48%]`)
        para não virar textura por cima do retrato da Dra. Carol.
      */}
      <div
        aria-hidden
        className="fundo-patas pointer-events-none absolute inset-0 -z-[15] lg:right-[48%]"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:w-[52%] lg:py-24">
          <Revelar>
            <h1 className="font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
          </Revelar>

          <Revelar atraso={0.08}>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-text-2">
              {hero.subhead}
            </p>
          </Revelar>

          <Revelar atraso={0.16}>
            <div className="mt-9 flex flex-col items-start gap-3">
              <BotaoWhatsapp rotulo={hero.cta} />
              <p className="text-sm text-text-3">{hero.ctaMicrocopy}</p>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
