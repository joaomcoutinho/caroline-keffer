import Image from "next/image";
import { ArrowUpRightIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { caminhoPublico } from "@/lib/caminho";
import { planos, linkWhatsapp, CTA_PRIMARIO } from "@/content/site";

/**
 * Planos de saúde pet aceitos, logo depois dos serviços.
 *
 * POSIÇÃO (11/09/2026, JM): a dobra estava lá embaixo, entre Pets e Dúvidas.
 * Subiu para logo abaixo de Serviços porque a sequência de perguntas do tutor é
 * essa: primeiro "vocês fazem o que meu pet precisa?", e imediatamente depois
 * "e quanto isso vai me custar?". Responder a segunda com "seu plano cobre aqui"
 * no exato momento em que ela aparece é o que tira o atrito de preço antes que
 * ele vire objeção.
 *
 * O CARTÃO É O CTA, não um logotipo decorativo. Quem tem plano chega ao site com
 * UMA pergunta ("o meu cobre aqui?"), e cada cartão abre o WhatsApp já com essa
 * pergunta escrita, nomeando o plano. Parede de logos que não clica obriga o
 * tutor a voltar ao topo e reescrever do zero o que já estava na tela.
 *
 * ⚠️ Os logos ainda não existem como arquivo (ver `planos` em content/site.ts).
 * Enquanto não chegam, o cartão renderiza o nome em tipografia sobre um traço na
 * cor da marca do plano — que é o que permite reconhecer de relance. O
 * componente já lê `logo`, então o dia que o arquivo entrar, o cartão troca
 * sozinho sem mexer no layout.
 */
export function Planos() {
  return (
    <Secao id="planos" tom="alt">
      <div className="mx-auto max-w-[60ch] text-center">
        <Revelar>
          <p className="flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.08em] text-brand uppercase">
            <ShieldCheckIcon size={18} weight="light" aria-hidden />
            Credenciada
          </p>
        </Revelar>
        <Revelar atraso={0.04}>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {planos.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.08}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">
            {planos.subhead}
          </p>
        </Revelar>
      </div>

      {/* `items-stretch`: sem ele, o cartão com linha de detalhe (CARE) fica mais
          alto que os outros e a fileira perde a base comum. */}
      <ul className="mx-auto mt-11 grid max-w-[1000px] grid-cols-2 items-stretch gap-4 sm:gap-5 lg:grid-cols-5">
        {planos.itens.map((plano, i) => (
          <li
            key={plano.nome}
            /*
              Cinco itens em duas colunas deixam o último sozinho na última
              linha. `last:col-span-2` faz ele ocupar a linha inteira em vez de
              abrir um buraco ao lado — some no desktop, onde cabem os cinco.
            */
            className="h-full last:col-span-2 lg:last:col-span-1"
          >
            <Revelar atraso={0.12 + i * 0.05} className="h-full">
              <a
                href={linkWhatsapp(
                  `Oi! Meu pet tem o plano ${plano.nome}. Vocês atendem por ele?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="cartao-plano group flex h-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-hairline bg-surface px-4 py-7 text-center"
              >
                {/* O traço na cor da marca do plano: reconhecimento sem o símbolo. */}
                <span
                  aria-hidden
                  className="plano-traco h-1 w-9 rounded-full"
                  style={{ backgroundColor: plano.cor }}
                />

                {/*
                  A caixa da marca é a PADRONIZAÇÃO: mesma altura e mesma
                  largura máxima em todos os cards, e cada logo se encaixa por
                  `object-contain`. Os cinco têm proporções muito diferentes
                  (Petlove é uma faixa larga, CARE é um lockup vertical), e é a
                  caixa comum que faz eles lerem com o mesmo peso óptico: os
                  largos ocupam a largura, os compactos ocupam a altura.

                  Sem a caixa, cada logo viria no tamanho do arquivo e a fileira
                  viraria uma escada.
                */}
                <span className="flex h-20 w-full max-w-[11rem] items-center justify-center">
                  <Image
                    src={caminhoPublico(plano.logo)}
                    alt={plano.nome}
                    width={360}
                    height={160}
                    sizes="176px"
                    className="max-h-full max-w-full w-auto object-contain"
                  />
                </span>

                {plano.detalhe ? (
                  <span className="text-xs leading-snug text-text-3">
                    {plano.detalhe}
                  </span>
                ) : null}

                <span className="plano-acao mt-1 flex items-center gap-1 text-sm font-semibold text-acao-texto">
                  Perguntar
                  <ArrowUpRightIcon size={14} weight="bold" aria-hidden />
                </span>
              </a>
            </Revelar>
          </li>
        ))}
      </ul>

      <Revelar atraso={0.4}>
        <div className="mx-auto mt-11 flex max-w-[60ch] flex-col items-center gap-4 border-t border-hairline pt-9 text-center">
          <p className="text-text-2">{planos.rodape}</p>
          <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
        </div>
      </Revelar>
    </Secao>
  );
}
