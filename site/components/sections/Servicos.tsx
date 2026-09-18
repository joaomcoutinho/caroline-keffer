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
        {/*
          18/09/2026 (JM: "tem um espaço ocioso logo abaixo do hero"). O topo
          da dobra vira DUAS colunas: título à esquerda, e à direita o apoio, a
          lista dos seis nomes e o CTA. Antes o título sozinho deixava metade
          da faixa vazia logo depois do hero.
        */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <Revelar>
            <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              {servicos.headline}
            </h2>
          </Revelar>

          <div>
            <Revelar atraso={0.06}>
              <p className="max-w-[46ch] text-lg leading-relaxed text-text-2">
                {servicos.subhead}
              </p>
            </Revelar>

            <Revelar atraso={0.1}>
              <ul className="servicos-indice">
                {servicos.itens.map((item) => (
                  <li key={item.nome}>{item.nome}</li>
                ))}
              </ul>
            </Revelar>

            <Revelar atraso={0.14}>
              <div className="mt-7">
                <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
              </div>
            </Revelar>
          </div>
        </div>

        <Revelar atraso={0.12} className="mt-12">
          <ExploradorServicos
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
            rotulo="Serviços da clínica"
          />
        </Revelar>
      </div>
    </section>
  );
}
