import { HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { ParedeAtendimentos } from "@/components/ui/ParedeAtendimentos";
import { pets, CTA_PRIMARIO } from "@/content/site";

/**
 * Dobra da galeria: coluna editorial à esquerda, parede viva à direita.
 *
 * 14/09/2026 (JM: "um layout bem disruptivo, fora da caixinha... essa galeria
 * tem potencial muito grande pra criar conexão através dos atendimentos").
 *
 * A dobra era uma faixa horizontal de cães sozinhos. Virou prova de VÍNCULO:
 * 20 fotos da equipe com os pacientes, todas visíveis ao mesmo tempo numa
 * parede de colunas em contrafluxo (ver ParedeAtendimentos).
 *
 * O texto fica numa coluna estreita e FIXA (`lg:sticky`) enquanto a parede
 * passa ao lado. É o que dá leitura editorial à dobra: o argumento parado, as
 * provas em movimento. E ela termina num CTA, porque é o momento de maior
 * conexão emocional da página, e desperdiçar esse ponto sem pedido de ação é
 * deixar conversão na mesa.
 */
export function Pets() {
  return (
    <Secao tom="alt" className="overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start lg:py-10">
          <Revelar>
            <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-brand uppercase">
              <HeartIcon size={17} weight="fill" aria-hidden />
              {pets.itens.length} atendimentos reais
            </p>
          </Revelar>
          <Revelar atraso={0.05}>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] font-bold tracking-tight text-balance sm:text-4xl lg:text-[3.1rem]">
              {pets.headline}
            </h2>
          </Revelar>
          <Revelar atraso={0.1}>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-text-2">
              {pets.subhead}
            </p>
          </Revelar>
          <Revelar atraso={0.15}>
            <p className="mt-6 max-w-[40ch] text-sm text-text-3">
              Toque em qualquer foto para ver de perto.
            </p>
          </Revelar>
          <Revelar atraso={0.2}>
            <div className="mt-9">
              <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
            </div>
          </Revelar>
        </div>

        <Revelar atraso={0.1}>
          <ParedeAtendimentos fotos={pets.itens} />
        </Revelar>
      </div>
    </Secao>
  );
}
