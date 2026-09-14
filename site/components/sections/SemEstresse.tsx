import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { Midia } from "@/components/ui/Midia";
import { CardDepoimento } from "@/components/ui/CardDepoimento";
import { semEstresse } from "@/content/site";

/**
 * Dobra 4 — a dobra de diferenciação.
 *
 * O argumento é "o pet não se estressa aqui", e quem sustenta esse argumento não
 * é a clínica falando de si: são os tutores.
 *
 * A foto ocupa a coluna da esquerda, alinhada com os cards de depoimento
 * empilhados à direita. `items-stretch` faz a coluna da foto acompanhar a
 * altura da pilha, então a imagem deixa de ter proporção fixa no desktop e
 * passa a preencher a coluna — é o que mantém os dois lados alinhados no topo
 * e na base.
 *
 * ⚠️ Este layout ESTICA a imagem numa caixa alta, então a foto que entra aqui
 * precisa tolerar recorte lateral. A foto do lema da recepção passou por aqui
 * em 09/09/2026 e foi revertida: frase pintada é conteúdo horizontal e saía
 * cortada no meio da palavra. Ficou a sala de espera, que é cena e não texto.
 */
export function SemEstresse() {
  const { citacaoDestaque: citacao } = semEstresse;

  return (
    <Secao tom="forte">
      <div className="mx-auto max-w-[62ch] text-center">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {semEstresse.headline}
          </h2>
        </Revelar>

        {semEstresse.corpo.map((paragrafo, i) => (
          <Revelar key={i} atraso={0.06 + i * 0.05}>
            <p className="mt-5 text-lg leading-relaxed text-text-2">{paragrafo}</p>
          </Revelar>
        ))}
      </div>

      {/* Foto à esquerda, depoimentos empilhados à direita. */}
      <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[13fr_7fr] lg:gap-10">
        <Revelar atraso={0.12} className="lg:h-full">
          <figure className="relative h-full">
            <Midia
              src={semEstresse.foto.src}
              posicao={semEstresse.foto.posicao}
              alt={semEstresse.foto.alt}
              briefing={semEstresse.foto.briefing}
              realce
              className="aspect-[3/2] w-full lg:aspect-auto lg:h-full"
            />

            {/* Cartão contido: a citação acompanha a foto, não compete com ela. */}
            <figcaption className="vidro absolute right-3 bottom-3 left-3 rounded-[var(--radius-card)] p-3 sm:right-5 sm:bottom-5 sm:left-5 sm:p-5">
              <QuotesIcon size={16} weight="fill" className="text-brand" aria-hidden />
              <blockquote className="mt-1 font-display text-sm leading-snug font-bold text-balance sm:mt-1.5 sm:text-lg">
                {citacao.texto}
              </blockquote>
              <p className="mt-1.5 text-xs text-text-3 sm:text-sm">{citacao.fonte}</p>
            </figcaption>
          </figure>
        </Revelar>

        <div className="grid gap-5">
          {semEstresse.depoimentosDestaque.map((item, i) => (
            <Revelar key={item.texto} atraso={0.16 + i * 0.08}>
              <CardDepoimento
                texto={item.texto}
                nome={item.nome}
                foto={item.foto}
                estrelas={item.estrelas}
              />
            </Revelar>
          ))}
        </div>
      </div>
    </Secao>
  );
}
