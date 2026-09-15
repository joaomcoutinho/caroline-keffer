"use client";

import { useState } from "react";
import {
  CheckIcon,
  DogIcon,
  HeartbeatIcon,
  InfoIcon,
  PawPrintIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
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
 * As fases ocupam a largura toda, em cartões (ver o comentário no JSX).
 *
 * ⚠️ Conteúdo de saúde. As periodicidades vêm das diretrizes da AAHA/AVMA (ver
 * `preventivo` em content/site.ts, que traz as fontes), e a interface diz que é
 * orientação geral. Ainda assim precisa do aval da Dra. Carol antes de publicar.
 */
/* Ícone por fase, pelo `id` de `preventivo.etapas`. */
const iconesFase: Record<string, Icon> = {
  filhote: PawPrintIcon,
  adulto: DogIcon,
  setemais: HeartbeatIcon,
  alerta: WarningCircleIcon,
};

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

      {/*
        FASES EM CARTÕES (15/09/2026, JM: "ficou ruim essa segmentação... mais
        visível, maior destaque, organizado pra aparecer tudo de uma vez, sem
        scroll pro lado, que já tem muito no site").

        A linha do tempo com pontos só funcionava com largura: no celular os
        rótulos viravam texto miúdo em quatro colunas apertadas. Aqui cada fase
        é um cartão com ícone, nome e detalhe: 2×2 no celular, uma fileira de
        quatro no desktop. Tudo visível sem rolar, alvo de toque grande, e a
        fase escolhida vira o cartão preenchido na cor de ação, sem ambiguidade.

        Continua `radiogroup`/`radio`, com setas do teclado trocando a fase.
      */}
      <Revelar atraso={0.12} className="mt-8 sm:mt-10">
        <div
          role="radiogroup"
          aria-label="Fase de vida do pet"
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {preventivo.etapas.map((e, i) => {
            const Icone = iconesFase[e.id] ?? PawPrintIcon;
            const ativo = e.id === etapaId;
            return (
              <button
                key={e.id}
                type="button"
                role="radio"
                aria-checked={ativo}
                tabIndex={ativo ? 0 : -1}
                onClick={() => setEtapaId(e.id)}
                onKeyDown={(ev) => {
                  const passo = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[ev.key];
                  if (!passo) return;
                  ev.preventDefault();
                  const n = preventivo.etapas.length;
                  const alvo = preventivo.etapas[(i + passo + n) % n];
                  setEtapaId(alvo.id);
                  const irmaos = ev.currentTarget.parentElement?.querySelectorAll("button");
                  (irmaos?.[(i + passo + n) % n] as HTMLButtonElement | undefined)?.focus();
                }}
                className="fase-cartao"
                data-ativo={ativo}
              >
                <span className="fase-icone" aria-hidden>
                  <Icone size={20} weight={ativo ? "fill" : "light"} />
                </span>
                <span className="fase-marca" aria-hidden>
                  <CheckIcon size={12} weight="bold" />
                </span>
                <span className="fase-rotulo">{e.rotulo}</span>
                <span className="fase-detalhe">{e.detalhe}</span>
              </button>
            );
          })}
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
