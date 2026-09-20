import Image from "next/image";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { caminhoPublico } from "@/lib/caminho";
import { draCarol } from "@/content/site";

/**
 * Dobra 5 — a pessoa. É a dobra que nenhum concorrente hospitalar tem.
 *
 * 09/09/2026 (JM): redesenhada. Antes era um split comum — foto paisagem à
 * esquerda, texto à direita, tudo com o mesmo peso. Numa dobra sobre a dona da
 * clínica, isso entregava a informação sem entregar a IMPORTÂNCIA dela.
 *
 * O que mudou, e por quê:
 *
 * 1. **Retrato vertical em coluna própria.** A foto veio do hero, é 4:5 e agora
 *    ocupa a coluna inteira. Retrato tem eixo vertical: espremido em paisagem,
 *    o rosto virava um detalhe no meio do quadro.
 *
 * 2. **Placa de vidro montada na base do oval**, com nome e papel. É o
 *    vocabulário de legenda de retrato — dá a ela o mesmo tratamento que uma
 *    foto institucional recebe, e ancora o nome NO rosto em vez de deixar os
 *    dois soltos. Ficava sobre a foto; desde 19/09/2026 a foto é um oval, e
 *    no pé de uma elipse não cabe texto.
 *
 * 3. **Aro branco das pontas de pata do hero** (`.moldura-pata`), igual ao
 *    das outras fotos do site. Era uma moldura deslocada da cor da marca;
 *    continua sendo o que separa "foto colada na página" de "retrato
 *    emoldurado".
 *
 * 4. **Primeiro parágrafo em corpo maior.** A frase do filhote que virou idoso
 *    é a melhor da página inteira; ela merece entrar como abertura, não como
 *    mais um parágrafo do bloco.
 *
 * A mídia continua à esquerda (o hero já não usa mais split, mas a dobra de
 * serviços à direita mantém o ritmo alternado da página).
 */
export function DraCarol() {
  return (
    <Secao id="a-clinica" tom="base">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Revelar>
          <figure className="relative">
            <div className="moldura-pata relative aspect-4/5">
              <Image
                src={caminhoPublico(draCarol.foto.src)}
                alt={draCarol.foto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                style={{ objectPosition: draCarol.foto.posicao }}
              />
            </div>

            {/*
              A placa MONTA na base do oval, metade dentro e metade fora. É o
              que mantém o nome ancorado no rosto agora que o pé da elipse é
              estreito demais para texto.
            */}
            <figcaption className="vidro absolute inset-x-8 bottom-0 translate-y-1/3 rounded-[var(--radius-card)] px-5 py-4 text-center">
              <p className="font-display text-lg leading-tight font-bold">
                Dra. Caroline Keffer
              </p>
              <p className="mt-1 text-sm text-text-3">{draCarol.papel}</p>
            </figcaption>
          </figure>
        </Revelar>

        <div>
          <Revelar atraso={0.06}>
            <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              {draCarol.headline}
            </h2>
          </Revelar>

          {draCarol.corpo.map((paragrafo, i) => (
            <Revelar key={i} atraso={0.1 + i * 0.05}>
              <p
                className={
                  i === 0
                    ? "mt-7 max-w-[54ch] text-xl leading-relaxed text-text-2 sm:text-[1.375rem]"
                    : "mt-5 max-w-[54ch] text-lg leading-relaxed text-text-2"
                }
              >
                {paragrafo}
              </p>
            </Revelar>
          ))}

          <Revelar atraso={0.2}>
            <p className="mt-8 border-t border-hairline pt-5 text-sm text-text-3">
              {draCarol.credencial}
            </p>
          </Revelar>
        </div>
      </div>
    </Secao>
  );
}
