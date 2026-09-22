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
    <Secao tom="forte" className="lg:pb-44">
      <div className="mx-auto max-w-[62ch] text-center">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {semEstresse.headline}
          </h2>
        </Revelar>

        {semEstresse.corpo.map((paragrafo, i) => (
          <Revelar key={i} atraso={0.06 + i * 0.05}>
            <p className="mt-4 text-lg leading-relaxed text-text-2 sm:mt-5">{paragrafo}</p>
          </Revelar>
        ))}
      </div>

      {/*
        Foto à esquerda, depoimentos empilhados à direita.

        15/09/2026 (JM): a citação saiu de CIMA da foto e foi para baixo dela.
        No celular o cartão de vidro cobria metade do consultório. E no celular
        os depoimentos viram uma faixa em loop, em vez de três
        cards empilhados ocupando uma tela e meia: agora passam sozinhos.

        21/09/2026 (JM): o oval estava largo demais, quase um círculo. A foto
        não ocupa mais a coluna inteira: fica mais estreita e centrada, com a
        mesma altura, e vira um oval em pé, como os dedos do hero.
        No mesmo dia o oval voltou a arredondar um pouco (JM: "mais circular,
        para dar mais visibilidade"): fica entre o círculo e o oval estreito.

        22/09/2026 (JM: "mais largo" e "centraliza melhor verticalmente"): no
        desktop a legenda sai do fluxo e fica pendurada abaixo da coluna. Assim
        o oval ocupa a altura inteira da pilha de depoimentos e o centro dele
        bate com o centro dela. A legenda desce para o respiro de baixo da
        seção, que por isso é maior no desktop (`lg:pb-44`): a onda seguinte
        sobe até 4rem sobre esse respiro e cobria a frase.
      */}
      <div className="mt-10 grid grid-cols-1 items-stretch gap-8 sm:mt-14 lg:grid-cols-[13fr_7fr] lg:gap-10">
        <Revelar atraso={0.12} className="lg:h-full">
          <figure className="relative flex h-full flex-col">
            <Midia
              src={semEstresse.foto.src}
              posicao={semEstresse.foto.posicao}
              alt={semEstresse.foto.alt}
              briefing={semEstresse.foto.briefing}
              moldura
              className="mx-auto aspect-[6/7] w-[90%] lg:aspect-auto lg:min-h-0 lg:w-[84%] lg:flex-1"
            />

            <figcaption className="mt-4 flex items-start gap-3 sm:mt-5 lg:absolute lg:inset-x-0 lg:top-full lg:justify-center">
              <QuotesIcon size={22} weight="fill" className="mt-0.5 shrink-0 text-brand" aria-hidden />
              <span>
                <blockquote className="font-display text-lg leading-snug font-bold text-balance sm:text-xl">
                  {citacao.texto}
                </blockquote>
                <span className="mt-1 block text-sm text-text-3">{citacao.fonte}</span>
              </span>
            </figcaption>
          </figure>
        </Revelar>

        {/*
          No celular os depoimentos passam sozinhos numa faixa em loop, na
          mesma cadência dos planos (JM: "não precisa o usuário arrastar pra
          ver tudo"). No desktop a mesma lista vira a pilha ao lado da foto.
          `min-w-0`: sem ele a faixa alarga a coluna da grade e a página
          ganha rolagem lateral.
        */}
        <div className="faixa-loop depoimentos-faixa -mx-5 min-w-0 sm:-mx-8 lg:mx-0">
          <ul className="faixa-loop-trilho">
            {[...semEstresse.depoimentosDestaque, ...semEstresse.depoimentosDestaque].map((item, k) => {
              const copia = k >= semEstresse.depoimentosDestaque.length;
              return (
                <li key={`${item.texto}-${k}`} aria-hidden={copia || undefined}>
                  <CardDepoimento
                    texto={item.texto}
                    nome={item.nome}
                    foto={item.foto}
                    estrelas={item.estrelas}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Secao>
  );
}
