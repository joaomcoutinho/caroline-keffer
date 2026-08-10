import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { planos, CTA_PRIMARIO } from "@/content/site";

/**
 * Dobra 6 — mata a objeção de preço. Faixa estreita e direta, sem grade.
 *
 * ⚠️ A lista real de planos credenciados ainda não foi confirmada (ver brief.md).
 * Quando vier, entra aqui como parede de logos reais, sem rótulo de categoria.
 */
export function Planos() {
  return (
    <Secao id="planos" tom="alt">
      <div className="mx-auto max-w-[58ch] text-center">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            {planos.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">{planos.subhead}</p>
        </Revelar>
        <Revelar atraso={0.12}>
          <div className="mt-8 flex justify-center">
            <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
          </div>
        </Revelar>
      </div>
    </Secao>
  );
}
