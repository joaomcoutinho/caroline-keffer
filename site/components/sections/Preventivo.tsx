"use client";

import { useState } from "react";
import { InfoIcon, PawPrintIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { preventivo, CTA_PRIMARIO } from "@/content/site";

/**
 * Cuidado preventivo por fase de vida.
 *
 * 11/09/2026 (JM). Era o "Guia do filhote", cuja espinha era o ciclo de
 * vacinação. Vacinação saiu do catálogo da clínica, então a dobra foi
 * REAPONTADA em vez de apagada: mesma mecânica de trilha, conteúdo novo, e cada
 * item agora corresponde a um serviço que a clínica presta de fato.
 *
 * O trabalho dela mudou também. Antes ensinava a cuidar de um filhote; agora
 * QUALIFICA: a pessoa descobre de quanto em quanto tempo o pet dela precisa de
 * consulta e exame, e chega no WhatsApp já sabendo o que pedir. É a dobra que
 * transforma visitante curioso em agendamento com intenção.
 *
 * A trilha ocupa a largura toda: com quatro fases, espremida em meia coluna os
 * rótulos quebravam em três linhas e o desenho de linha do tempo se perdia.
 *
 * ⚠️ Conteúdo de saúde. As periodicidades vêm das diretrizes da AAHA/AVMA (ver
 * `preventivo` em content/site.ts, que traz as fontes), e a interface diz que é
 * orientação geral. Ainda assim precisa do aval da Dra. Carol antes de publicar.
 */
export function Preventivo() {
  const [etapaId, setEtapaId] = useState<string>(preventivo.etapas[0].id);
  const indice = Math.max(
    0,
    preventivo.etapas.findIndex((e) => e.id === etapaId),
  );
  const etapa = preventivo.etapas[indice];

  return (
    <Secao id="preventivo" tom="base">
      <div className="max-w-[46ch]">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {preventivo.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">
            {preventivo.subhead}
          </p>
        </Revelar>
      </div>

      <Revelar atraso={0.12} className="mt-10">
        {/*
          `overflow-x-auto` porque quatro passos não cabem em 320px sem
          espremer rótulo. `min-w` garante que, ao rolar, cada passo mantenha
          largura legível em vez de encolher todos juntos.

          ⚠️ `py-3` NÃO é respiro estético, é correção de recorte (JM, 09/09/2026:
          "o circulozinho está com uma falha na parte superior"). Pela regra do
          CSS, `overflow-x: auto` com `overflow-y: visible` computa `overflow-y`
          para `auto` — ou seja, corta na vertical também. O halo do ponto ativo
          (`box-shadow: 0 0 0 5px` sobre um ponto em `scale(1.2)`) sobe ~7px
          acima do topo do trilho, e era isso que ficava decepado, dando a
          impressão de círculo mal construído. O padding devolve a folga por
          dentro da área que rola. `-my-3` cancela o efeito no espaçamento.
        */}
        <div className="trilho -mx-5 -my-3 overflow-x-auto px-5 py-3 sm:mx-0 sm:px-0">
          <div
            role="radiogroup"
            aria-label="Fase de vida do pet"
            className="trilha min-w-[34rem]"
          >
            {preventivo.etapas.map((e, i) => (
              <button
                key={e.id}
                type="button"
                role="radio"
                aria-checked={e.id === etapaId}
                onClick={() => setEtapaId(e.id)}
                className="trilha-passo"
                data-estado={
                  i < indice ? "feito" : i === indice ? "ativo" : "futuro"
                }
              >
                <span className="trilha-linha" aria-hidden />
                <span className="trilha-ponto" aria-hidden />
                <span className="trilha-rotulo">{e.rotulo}</span>
                <span className="trilha-detalhe">{e.detalhe}</span>
              </button>
            ))}
          </div>
        </div>
      </Revelar>

      <Revelar atraso={0.16} className="mt-9">
        <div className="vidro rounded-[var(--radius-card)] p-7 sm:p-8">
          <p className="flex items-center gap-2.5 border-b border-hairline pb-5 text-sm text-text-2">
            <PawPrintIcon
              size={20}
              weight="light"
              className="shrink-0 text-brand"
              aria-hidden
            />
            <span>
              <strong className="font-semibold text-text">{etapa.rotulo}</strong>
              <span className="text-text-3">, {etapa.detalhe}</span>
            </span>
          </p>

          {/*
            `key` remonta a lista a cada troca, então a entrada reanima.

            Coluna ÚNICA, e não o grid de duas que estava aqui antes: o fio que
            liga os números é o que transforma a lista em sequência, e em duas
            colunas ele ligaria o item 2 ao 3 atravessando o vão. Com quatro
            itens por etapa, uma coluna cabe sem alongar a dobra.
          */}
          <ol key={etapa.id} className="lista-passos mt-6">
            {etapa.itens.map((item, i) => (
              <li
                key={item}
                className="vacina-item"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="lista-num" aria-hidden>
                  {i + 1}
                </span>
                <p className="leading-relaxed text-text-2">{item}</p>
              </li>
            ))}
          </ol>

          <p className="mt-7 flex items-start gap-3 border-t border-hairline pt-6 text-sm leading-relaxed text-text-3">
            <InfoIcon
              size={18}
              weight="light"
              className="mt-0.5 shrink-0 text-brand"
              aria-hidden
            />
            {preventivo.aviso}
          </p>

          <div className="mt-6 flex justify-center">
            <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
          </div>
        </div>
      </Revelar>
    </Secao>
  );
}
