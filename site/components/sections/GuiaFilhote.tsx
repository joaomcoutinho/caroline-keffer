"use client";

import { useState } from "react";
import { CheckCircleIcon, InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { guiaFilhote, CTA_PRIMARIO } from "@/content/site";

/**
 * Guia do filhote, em etapas.
 *
 * Adoção de filhote é o momento de maior busca e maior valor de vida do
 * cliente: quem resolve a dúvida do primeiro mês costuma ficar com o animal
 * pelos dez anos seguintes.
 *
 * Usa o MESMO seletor em pílulas do calendário de vacinas, de propósito — as
 * duas dobras fazem a mesma promessa ("escolha sua situação, veja o que fazer")
 * e inventar um terceiro padrão de interação só aumentaria a carga cognitiva.
 *
 * ⚠️ Conteúdo de saúde: precisa da revisão da Dra. Carol antes de publicar.
 */
export function GuiaFilhote() {
  const [etapaId, setEtapaId] = useState<string>(guiaFilhote.etapas[0].id);
  const etapa =
    guiaFilhote.etapas.find((e) => e.id === etapaId) ?? guiaFilhote.etapas[0];

  const pilula =
    "rounded-full border px-5 py-2.5 text-sm font-medium transition-[background-color,color,border-color] duration-200 ease-[var(--ease-soft)]";
  const ativa = "border-transparent bg-action text-on-action";
  const inativa = "border-hairline text-text-2 hover:border-brand hover:text-brand";

  return (
    <Secao id="filhote" tom="base">
      <div className="max-w-[46ch]">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            {guiaFilhote.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">
            {guiaFilhote.subhead}
          </p>
        </Revelar>
      </div>

      <Revelar atraso={0.12} className="mt-10">
        <div
          role="radiogroup"
          aria-label="Fase do filhote"
          className="flex flex-wrap gap-3"
        >
          {guiaFilhote.etapas.map((e, i) => (
            <button
              key={e.id}
              type="button"
              role="radio"
              aria-checked={e.id === etapaId}
              onClick={() => setEtapaId(e.id)}
              className={`${pilula} ${e.id === etapaId ? ativa : inativa}`}
            >
              <span className="mr-2 opacity-60">{i + 1}</span>
              {e.rotulo}
              <span className="ml-1.5 opacity-70">{e.detalhe}</span>
            </button>
          ))}
        </div>
      </Revelar>

      <Revelar atraso={0.16} className="mt-8">
        <div className="vidro rounded-[var(--radius-card)] p-7 sm:p-8">
          {/* `key` remonta a lista a cada troca, então a entrada reanima. */}
          <ul key={etapa.id} className="grid gap-5 sm:grid-cols-2">
            {etapa.itens.map((item, i) => (
              <li
                key={item}
                className="vacina-item flex gap-3.5"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <CheckCircleIcon
                  size={22}
                  weight="light"
                  className="mt-0.5 shrink-0 text-brand"
                  aria-hidden
                />
                <span className="leading-relaxed text-text-2">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-7 flex items-start gap-3 border-t border-hairline pt-6 text-sm leading-relaxed text-text-3">
            <InfoIcon
              size={18}
              weight="light"
              className="mt-0.5 shrink-0 text-brand"
              aria-hidden
            />
            {guiaFilhote.aviso}
          </p>

          <div className="mt-6 flex justify-center">
            <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
          </div>
        </div>
      </Revelar>
    </Secao>
  );
}
