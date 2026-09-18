"use client";

import { useSyncExternalStore } from "react";
import { expediente } from "@/content/site";

/**
 * O selo tem DUAS informações com pesos diferentes: o estado (o que a pessoa
 * quer saber em 100ms) e o detalhe (que só importa depois). Guardar as duas
 * separadas é o que permite dar hierarquia tipográfica em vez de despejar tudo
 * numa frase de peso uniforme.
 */
type Estado = { aberto: boolean; principal: string; complemento: string };

const DIAS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Minutos desde a meia-noite, a partir de "HH:MM". */
function emMinutos(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "09:00" → "9h" · "16:30" → "16h30" */
function humano(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

/**
 * Que horas são NA CLÍNICA, não no relógio de quem acessa.
 *
 * Recife não tem horário de verão, mas fixar o fuso pelo nome em vez de por
 * offset é o que garante que isso continue certo se a regra mudar, e para quem
 * abrir o site de outro estado ou de fora do país.
 */
function agoraEmRecife() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: expediente.fuso,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const pega = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const hora = Number(pega("hour")) % 24;

  return {
    dia: Math.max(0, DIAS_EN.indexOf(pega("weekday"))),
    minutos: hora * 60 + Number(pega("minute")),
  };
}

function calcular(): Estado {
  const { dia, minutos } = agoraEmRecife();
  const hoje = expediente.semana[dia];

  if (hoje && minutos >= emMinutos(hoje.abre) && minutos < emMinutos(hoje.fecha)) {
    return {
      aberto: true,
      principal: "Aberto agora",
      complemento: `até ${humano(hoje.fecha)}`,
    };
  }

  // Ainda vai abrir hoje.
  if (hoje && minutos < emMinutos(hoje.abre)) {
    return {
      aberto: false,
      principal: "Fechado",
      complemento: `abre às ${humano(hoje.abre)}`,
    };
  }

  // Procura o próximo dia com expediente.
  for (let i = 1; i <= 7; i++) {
    const proximoDia = (dia + i) % 7;
    const proximo = expediente.semana[proximoDia];
    if (!proximo) continue;
    const quando = i === 1 ? "amanhã" : expediente.nomes[proximoDia];
    return {
      aberto: false,
      principal: "Fechado",
      complemento: `abre ${quando} às ${humano(proximo.abre)}`,
    };
  }

  return { aberto: false, principal: "Fechado", complemento: "" };
}

/*
  O relógio é uma fonte externa que muda sozinha, então quem lê é
  `useSyncExternalStore` — não `useState` dentro de efeito.

  O snapshot é uma STRING de propósito: ele é recalculado a cada render, e
  string com o mesmo conteúdo é igual por `Object.is`. Devolver um objeto novo
  a cada chamada faria o React re-renderizar em laço infinito.
*/
function assinar(aoMudar: () => void) {
  const id = setInterval(aoMudar, 30_000);
  return () => clearInterval(id);
}

function snapshot() {
  const { aberto, principal, complemento } = calcular();
  return `${aberto ? "1" : "0"}|${principal}|${complemento}`;
}

/** No servidor não há relógio do usuário: devolve vazio e o selo não renderiza. */
function snapshotServidor() {
  return "";
}

type Props = { className?: string };

/**
 * Selo de "aberto agora", calculado de verdade.
 *
 * É a informação que o tutor com o animal doente mais quer, e que nenhum
 * concorrente de bairro mostra.
 *
 * O estado começa nulo e só é preenchido depois da montagem: horário depende
 * do relógio, e renderizar no servidor daria divergência de hidratação. Até lá
 * não há buraco no layout, só ausência do selo.
 */
export function StatusHorario({ className = "" }: Props) {
  const bruto = useSyncExternalStore(assinar, snapshot, snapshotServidor);

  if (!bruto) return null;

  const [marca, principal, complemento] = bruto.split("|");
  const aberto = marca === "1";

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm ${className}`}
      // Uma frase só para quem ouve, em vez de dois pedaços soltos.
      aria-label={`${principal}${complemento ? `, ${complemento}` : ""}`}
    >
      <span
        aria-hidden
        className={`relative flex h-2 w-2 shrink-0 rounded-full ${
          aberto ? "bg-emerald-400" : "bg-text-3"
        }`}
      >
        {/* O ponto verde não pulsa mais (JM, 17/09/2026: nada de halo). */}
      </span>

      {/*
        Hierarquia em vez de frase uniforme: o ESTADO vem em peso e cor cheios,
        porque é o que se lê num relance; o horário vem apagado, porque só
        importa depois de saber se está aberto. Antes a linha inteira tinha o
        mesmo peso e o olho precisava ler tudo para extrair o que interessa.
      */}
      <span aria-hidden className="truncate">
        <span
          className={`font-semibold ${aberto ? "text-text" : "text-text-2"}`}
        >
          {principal}
        </span>
        {complemento ? (
          <span className="text-text-3"> · {complemento}</span>
        ) : null}
      </span>
    </span>
  );
}
