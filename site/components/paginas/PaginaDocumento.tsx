import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Cabecalho } from "@/components/sections/Cabecalho";
import { Fechamento } from "@/components/sections/Fechamento";
import { Onda } from "@/components/ui/Onda";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { BotaoFlutuante } from "@/components/ui/BotaoFlutuante";
import { contato, linkWhatsapp } from "@/content/site";
import type { Documento } from "@/content/documentos";

const dataBr = (iso: string) => iso.split("-").reverse().join("/");

/**
 * Página de documento (política de privacidade, termos de uso). Mesmo header, mesmo
 * fundo e mesmo fechamento das outras páginas, sem foto e sem blocos de
 * venda: é documento, para ler com calma. Coluna estreita (~68 caracteres),
 * cada seção com o título na margem esquerda no desktop.
 */
export function PaginaDocumento({ doc }: { doc: Documento }) {
  return (
    <>
      <Cabecalho />
      <main>
        <section className="fundo-patas relative bg-surface px-5 pt-32 pb-24 sm:px-8 sm:pt-40 md:pb-32">
          <div className="mx-auto w-full max-w-[920px]">
            <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">{doc.sobretitulo}</p>
            <h1 className="mt-3 font-display text-[2.05rem] leading-[1.08] font-bold tracking-tight sm:text-5xl">
              {doc.titulo}
            </h1>
            <p className="mt-3 text-sm text-text-3">Atualizada em {dataBr(doc.atualizadaEm)}</p>
            <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-text-2 sm:text-xl">{doc.intro}</p>

            <div className="politica mt-14">
              {doc.secoes.map((s) => (
                <section key={s.titulo} className="politica-secao">
                  <h2 className="font-display text-xl leading-snug font-bold sm:text-2xl">{s.titulo}</h2>
                  <div>
                    {s.paragrafos.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                    {s.lista ? (
                      <ul>
                        {s.lista.map((item) => (
                          <li key={item}>
                            <span className="lista-check" aria-hidden>
                              <CheckIcon size={12} weight="bold" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <div className="politica-contato">
              <p className="font-display text-xl font-bold">{doc.contato.titulo}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <BotaoWhatsapp
                  rotulo="Falar pelo WhatsApp"
                  tamanho="compacto"
                  href={linkWhatsapp(doc.contato.mensagem)}
                />
                <a href={contato.telefoneFixoLink} className="agora-ligar">
                  ou ligue {contato.telefoneFixo}
                </a>
              </div>
            </div>
          </div>
        </section>
        <Onda cor="#0b2129" />
      </main>
      <Fechamento />
      <BotaoFlutuante />
    </>
  );
}
