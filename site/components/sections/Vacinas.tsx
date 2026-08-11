"use client";

import { useState } from "react";
import { InfoIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { vacinas, CTA_PRIMARIO } from "@/content/site";

/**
 * Calendário de vacinas.
 *
 * É a dobra que diferencia de verdade: nenhum concorrente de Recife oferece uma
 * ferramenta, todos oferecem só texto institucional. Dá motivo para o tutor
 * voltar ao site e termina exatamente onde o site inteiro quer terminar, no
 * WhatsApp.
 *
 * Os seletores são `radiogroup` de verdade (botões com `aria-checked`), então
 * funcionam no teclado e são anunciados corretamente pelo leitor de tela.
 *
 * ⚠️ O conteúdo é orientação geral e está marcado como tal na interface. O
 * protocolo precisa da revisão da Dra. Carol antes de publicar (ver brief.md).
 */
export function Vacinas() {
  /*
    Tipado como `string` de propósito: `vacinas` é `as const`, então inferir do
    valor inicial travaria o estado em "cao" e "filhote" e nenhuma outra opção
    seria atribuível.
  */
  const [especieId, setEspecieId] = useState<string>(vacinas.especies[0].id);
  const [faseId, setFaseId] = useState<string>(vacinas.especies[0].fases[0].id);

  const especie =
    vacinas.especies.find((e) => e.id === especieId) ?? vacinas.especies[0];
  const fase = especie.fases.find((f) => f.id === faseId) ?? especie.fases[0];

  const pilula =
    "rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,color,border-color] duration-200 ease-[var(--ease-soft)] border";
  const ativa = "border-transparent bg-action text-on-action";
  const inativa = "border-hairline text-text-2 hover:border-brand hover:text-brand";

  return (
    <Secao id="vacinas" tom="base">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Revelar>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
              {vacinas.headline}
            </h2>
          </Revelar>
          <Revelar atraso={0.06}>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-text-2">
              {vacinas.subhead}
            </p>
          </Revelar>

          <Revelar atraso={0.12}>
            <div className="mt-8 space-y-5">
              <div role="radiogroup" aria-label="Espécie" className="flex gap-3">
                {vacinas.especies.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    role="radio"
                    aria-checked={e.id === especieId}
                    onClick={() => {
                      setEspecieId(e.id);
                      setFaseId(e.fases[0].id);
                    }}
                    className={`${pilula} ${e.id === especieId ? ativa : inativa}`}
                  >
                    {e.rotulo}
                  </button>
                ))}
              </div>

              <div
                role="radiogroup"
                aria-label="Fase de vida"
                className="flex flex-wrap gap-3"
              >
                {especie.fases.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={f.id === faseId}
                    onClick={() => setFaseId(f.id)}
                    className={`${pilula} ${f.id === faseId ? ativa : inativa}`}
                  >
                    {f.rotulo}
                    <span className="ml-1.5 opacity-70">{f.detalhe}</span>
                  </button>
                ))}
              </div>
            </div>
          </Revelar>
        </div>

        <Revelar atraso={0.16}>
          <div className="vidro rounded-[var(--radius-card)] p-7 sm:p-8">
            {/* `key` remonta a lista a cada troca, então a entrada reanima. */}
            <ul key={`${especie.id}-${fase.id}`} className="space-y-5">
              {fase.itens.map((item, i) => (
                <li
                  key={item.nome}
                  className="vacina-item flex gap-3.5"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <CheckCircleIcon
                    size={22}
                    weight="light"
                    className="mt-0.5 shrink-0 text-brand"
                    aria-hidden
                  />
                  <span>
                    <span className="block font-medium text-text">{item.nome}</span>
                    <span className="block text-sm leading-relaxed text-text-2">
                      {item.quando}
                    </span>
                  </span>
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
              {vacinas.aviso}
            </p>

            {/* Peso de CTA de seção, igual ao dos Planos: aqui o tutor acabou de
                descobrir que o pet está atrasado, e é o momento de maior intenção. */}
            <div className="mt-7 flex justify-center">
              <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
            </div>
          </div>
        </Revelar>
      </div>
    </Secao>
  );
}
