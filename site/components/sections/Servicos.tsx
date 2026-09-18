import Image from "next/image";
import { MapPinIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Revelar } from "@/components/ui/Revelar";
import { caminhoPublico } from "@/lib/caminho";
import { ExploradorServicos } from "@/components/ui/ExploradorServicos";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { servicos, contato, linkWhatsapp, CTA_PRIMARIO } from "@/content/site";

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
          CABEÇALHO EM DUAS METADES (18/09/2026, opção O1 refinada). O título
          fica à esquerda e, à direita, o apoio e o cartão da casa — a fachada
          no recorte em cúpula da pata do logo, com o endereço. As duas metades
          são CENTRADAS na mesma linha, então o título deixa de flutuar num
          vazio e ganha um par do outro lado. É o padrão de cabeçalho dividido
          dos sites editoriais: afirmação de um lado, prova do outro.
        */}
        <div className="servicos-topo">
          <Revelar>
            <h2 className="font-display text-3xl leading-[1.08] font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.85rem]">
              {servicos.headline}
            </h2>
          </Revelar>

          <div className="servicos-topo-lado">
            <Revelar atraso={0.06}>
              <p className="text-lg leading-relaxed text-text-2">{servicos.subhead}</p>
            </Revelar>

            <Revelar atraso={0.12}>
              <a href="#onde-ficamos" className="casa-cartao">
                <span className="casa-cupula">
                  <Image
                    src={caminhoPublico("/images/fachada_ceu.webp")}
                    alt="Fachada da Clínica Veterinária Caroline Keffer"
                    fill
                    sizes="160px"
                    className="object-cover"
                    style={{ objectPosition: "18% 44%" }}
                  />
                </span>
                <span className="casa-texto">
                  <span className="casa-rotulo">Tudo na mesma casa</span>
                  <span className="casa-endereco">
                    <MapPinIcon size={15} weight="fill" aria-hidden />
                    {contato.endereco} · Torre, Recife
                  </span>
                  <span className="casa-link">
                    Como chegar
                    <ArrowRightIcon size={14} weight="bold" aria-hidden />
                  </span>
                </span>
              </a>
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
