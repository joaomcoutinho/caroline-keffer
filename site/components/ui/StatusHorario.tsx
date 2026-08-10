"use client";

import { useSyncExternalStore } from "react";
import { expediente } from "@/content/site";

type Estado = { aberto: boolean; texto: string };

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
    return { aberto: true, texto: `Aberto agora, até ${humano(hoje.fecha)}` };
  }

  // Ainda vai abrir hoje.
  if (hoje && minutos < emMinutos(hoje.abre)) {
    return { aberto: false, texto: `Abre hoje às ${humano(hoje.abre)}` };
  }

  // Procura o próximo dia com expediente.
  for (let i = 1; i <= 7; i++) {
    const proximoDia = (dia + i) % 7;
    const proximo = expediente.semana[proximoDia];
    if (!proximo) continue;
    const quando = i === 1 ? "amanhã" : expediente.nomes[proximoDia];
    return { aberto: false, texto: `Abre ${quando} às ${humano(proximo.abre)}` };
  }

  return { aberto: false, texto: "Fechado agora" };
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
  const { aberto, texto } = calcular();
  return `${aberto ? "1" : "0"}|${texto}`;
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

  const [marca, ...resto] = bruto.split("|");
  const estado: Estado = { aberto: marca === "1", texto: resto.join("|") };

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}
    >
      <span
        aria-hidden
        className={`relative flex h-2.5 w-2.5 shrink-0 rounded-full ${
          estado.aberto ? "bg-emerald-400" : "bg-text-3"
        }`}
      >
        {estado.aberto ? (
          <span className="pulso-status absolute inset-0 rounded-full bg-emerald-400" />
        ) : null}
      </span>
      <span className={estado.aberto ? "text-text" : "text-text-3"}>
        {estado.texto}
      </span>
    </span>
  );
}
