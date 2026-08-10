import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { Midia } from "@/components/ui/Midia";
import { draCarol } from "@/content/site";

/**
 * Dobra 5 — a pessoa. É a dobra que nenhum concorrente hospitalar tem.
 * Split com a mídia à esquerda (o hero já usou mídia à direita).
 */
export function DraCarol() {
  return (
    <Secao id="a-clinica" tom="base">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Revelar>
          <Midia
            src={draCarol.foto.src}
            posicao={draCarol.foto.posicao}
            alt={draCarol.foto.alt}
            briefing={draCarol.foto.briefing}
            proporcao={draCarol.foto.proporcao}
            realce
            /* Sem teto de largura: a foto virou paisagem e precisa da coluna toda. */
            className="w-full"
          />
        </Revelar>

        <div>
          <Revelar atraso={0.06}>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
              {draCarol.headline}
            </h2>
          </Revelar>

          {draCarol.corpo.map((paragrafo, i) => (
            <Revelar key={i} atraso={0.1 + i * 0.05}>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-text-2">
                {paragrafo}
              </p>
            </Revelar>
          ))}

          <Revelar atraso={0.2}>
            <p className="mt-7 border-t border-hairline pt-5 text-sm text-text-3">
              {draCarol.credencial}
            </p>
          </Revelar>
        </div>
      </div>
    </Secao>
  );
}
