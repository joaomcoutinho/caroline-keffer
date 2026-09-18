import { Revelar } from "@/components/ui/Revelar";
import { ExploradorServicos } from "@/components/ui/ExploradorServicos";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { servicos, linkWhatsapp, CTA_PRIMARIO } from "@/content/site";

/**
 * Dobra 3 — os seis serviços em índice + painel.
 *
 * O acordeão anterior comprimia seis cards em 190px cada e nada ficava legível
 * em repouso. Aqui os nomes ficam sempre visíveis à esquerda e o painel dá foto
 * larga e texto respirado ao serviço selecionado. Ver ExploradorServicos para o
 * porquê de não girar sozinho e para o mapa de ícones morar do lado do cliente.
 */
export function Servicos() {
  return (
    <section
      id="servicos"
      className="fundo-patas relative scroll-mt-24 bg-surface px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <Revelar atraso={0.08}>
          <ExploradorServicos
            rotulo="Serviços da clínica"
            cabecalho={
              <div>
                <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                  {servicos.headline}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-text-2">{servicos.subhead}</p>
                <div className="mt-7">
                  <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
                </div>
              </div>
            }
            itens={servicos.itens.map((i) => ({
              ...i,
              cta: (
                <BotaoWhatsapp
                  rotulo={CTA_PRIMARIO}
                  href={linkWhatsapp(`Olá! Gostaria de agendar: ${i.nome.toLowerCase()}.`)}
                  className="w-full"
                />
              ),
            }))}
          />
        </Revelar>
      </div>
    </section>
  );
}
