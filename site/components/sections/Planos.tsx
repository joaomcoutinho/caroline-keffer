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

      {/*
        FAIXA EM LOOP (15/09/2026, JM: "em loop passando automaticamente... pra
        não ocupar tanto espaço", e "tem quatro cards de um tamanho e um de
        tamanho diferente, não pode ser assim").

        A grade de duas colunas no celular deixava o quinto plano sozinho numa
        linha inteira, com o dobro da largura, e empilhava três fileiras. Agora
        é UMA fileira de cartões idênticos, que desliza sozinha. Mesmo padrão
        da parede de atendimentos: a lista é duplicada e o trilho anda até
        -50%, onde a cópia começa, então o loop não tem emenda. O espaço entre
        cartões é `padding-right` em cada item (e não `gap`) pelo mesmo motivo.

        Não pausa nunca, nem no toque (ver `.faixa-loop` no globals.css). As
        cópias são `aria-hidden` e fora do Tab. Sem movimento (`prefers-reduced-motion`),
        vira faixa rolável com o dedo, sem as cópias.
      */}
      <Revelar atraso={0.12}>
        <div className="faixa-loop planos-faixa -mx-5 mt-10 sm:-mx-8 sm:mt-11 lg:mx-0">
          <ul className="faixa-loop-trilho">
            {[...planos.itens, ...planos.itens].map((plano, k) => {
              const copia = k >= planos.itens.length;
              return (
                <li key={`${plano.nome}-${k}`} aria-hidden={copia || undefined}>
                  <a
                    href={linkWhatsapp(
                      `Oi! Meu pet tem o plano ${plano.nome}. Vocês atendem por ele?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copia ? -1 : undefined}
                    className="cartao-plano group flex h-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-hairline bg-surface px-4 py-6 text-center sm:py-7"
                  >
                    {/* O traço na cor da marca do plano: reconhecimento sem o símbolo. */}
                    <span
                      aria-hidden
                      className="plano-traco h-1 w-9 rounded-full"
                      style={{ backgroundColor: plano.cor }}
                    />

                    {/*
                      A caixa da marca é a PADRONIZAÇÃO: mesma altura e mesma
                      largura máxima em todos os cards, e cada logo se encaixa
                      por `object-contain`. Os cinco têm proporções muito
                      diferentes (Petlove é uma faixa larga, CARE é um lockup
                      vertical), e é a caixa comum que faz eles lerem com o
                      mesmo peso óptico.
                    */}
                    <span className="flex h-16 w-full max-w-[9.5rem] items-center justify-center sm:h-20 sm:max-w-[11rem]">
                      <Image
                        src={caminhoPublico(plano.logo)}
                        alt={copia ? "" : plano.nome}
                        width={360}
                        height={160}
                        sizes="176px"
                        className="max-h-full max-w-full w-auto object-contain"
                      />
                    </span>

                    <span className="plano-acao mt-1 flex items-center gap-1 text-sm font-semibold text-acao-texto">
                      Perguntar
                      <ArrowUpRightIcon size={14} weight="bold" aria-hidden />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Revelar>

      <Revelar atraso={0.4}>
        <div className="mx-auto mt-8 flex max-w-[60ch] flex-col items-center gap-4 border-t border-hairline pt-8 text-center sm:mt-11 sm:pt-9">
          <p className="text-text-2">{planos.rodape}</p>
          <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
        </div>
      </Revelar>
    </Secao>
  );
}
