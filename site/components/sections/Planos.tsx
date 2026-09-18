import Image from "next/image";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { caminhoPublico } from "@/lib/caminho";
import { planos, linkWhatsapp, CTA_PRIMARIO } from "@/content/site";

/**
 * Planos de saúde pet aceitos, logo depois dos números.
 *
 * 17/09/2026 (JM): antes cada plano era um CARTÃO clicável passando em loop, e
 * quem tinha o plano precisava esperar o cartão dele chegar para clicar. Agora
 * são duas coisas separadas:
 *
 * 1. as marcas passam como MARCA D'ÁGUA, em loop, só como prova de
 *    credenciamento — decorativas, fora do Tab e sem link;
 * 2. embaixo, a pessoa ESCOLHE o plano numa fileira de pílulas, que está
 *    inteira na tela, e cai no WhatsApp com a pergunta já escrita.
 *
 * Quem não achou o plano tem a pílula "outro plano", que abre a conversa
 * perguntando pelo nome.
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
          <p className="mt-5 text-lg leading-relaxed text-text-2">{planos.subhead}</p>
        </Revelar>
      </div>

      {/*
        Marca d'água em loop. A lista é duplicada e o trilho anda até -50%, onde
        a cópia começa, então não há emenda. Tudo aqui é decoração: `aria-hidden`
        na faixa inteira, porque os nomes aparecem de novo, clicáveis, logo
        abaixo.
      */}
      <Revelar atraso={0.12}>
        <div aria-hidden className="faixa-loop faixa-marcas -mx-5 mt-8 sm:-mx-8 lg:mx-0">
          <ul className="faixa-loop-trilho">
            {[...planos.itens, ...planos.itens].map((plano, k) => (
              <li key={`${plano.nome}-${k}`}>
                <span className="marca-dagua">
                  <Image
                    src={caminhoPublico(plano.logo)}
                    alt=""
                    width={360}
                    height={160}
                    sizes="200px"
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Revelar>

      <Revelar atraso={0.16}>
        <div className="mx-auto mt-8 max-w-[52rem] text-center sm:mt-10">
          <p className="plano-pergunta">{planos.escolha}</p>

          <ul className="plano-escolhas">
            {planos.itens.map((plano) => (
              <li key={plano.nome}>
                <a
                  href={linkWhatsapp(
                    `Oi! Meu pet tem o plano ${plano.nome}. Vocês atendem por ele?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="plano-chip"
                  style={{ ["--plano-cor" as string]: plano.cor }}
                >
                  <span aria-hidden className="plano-ponto" />
                  {plano.nome}
                </a>
              </li>
            ))}
            <li>
              <a
                href={linkWhatsapp(
                  "Oi! Meu pet tem plano de saúde. Queria saber se vocês atendem por ele.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="plano-chip plano-chip--outro"
              >
                Outro plano
              </a>
            </li>
          </ul>
        </div>
      </Revelar>

      <Revelar atraso={0.24}>
        <div className="mx-auto mt-9 flex max-w-[60ch] flex-col items-center gap-4 border-t border-hairline pt-8 text-center">
          <p className="text-text-2">{planos.rodape}</p>
          <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
        </div>
      </Revelar>
    </Secao>
  );
}
