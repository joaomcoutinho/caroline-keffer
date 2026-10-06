"use client";

import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { useDentroDaJanela, useDiaRecife } from "@/components/ui/StatusHorario";
import { contato, expediente, linkWhatsapp } from "@/content/site";
import { painelAgora } from "@/content/paginas";

/** "09:00" → "9h" · "16:30" → "16h30" */
function humano(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

const maiuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * A janela de EMERGÊNCIA de cada dia: do abrir até o que vier antes, o fechar
 * ou o limite (18h). Dias seguidos com a mesma janela formam um grupo
 * ("Segunda a sexta"). Segunda primeiro, domingo por último.
 */
function grupos(limite: string) {
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const lista: { dias: number[]; hora: string | null }[] = [];
  for (const d of ordem) {
    const dia = expediente.semana[d];
    const hora = dia ? `${humano(dia.abre)} às ${humano(dia.fecha < limite ? dia.fecha : limite)}` : null;
    const ultimo = lista.at(-1);
    if (ultimo && ultimo.hora === hora) ultimo.dias.push(d);
    else lista.push({ dias: [d], hora });
  }
  return lista.map((g) => ({
    ...g,
    nome:
      g.dias.length === 1
        ? maiuscula(expediente.nomes[g.dias[0]])
        : `${maiuscula(expediente.nomes[g.dias[0]])} a ${expediente.nomes[g.dias.at(-1)!]}`,
  }));
}

/** A pegada da trilha do hero, uma por dia. */
function Pegada() {
  return (
    <svg viewBox="0 0 40 40" className="semana-pegada" aria-hidden>
      <ellipse cx="20" cy="27" rx="10" ry="8.5" />
      <ellipse cx="8" cy="17" rx="4" ry="5" transform="rotate(-20 8 17)" />
      <ellipse cx="15.5" cy="9.5" rx="4" ry="5.2" />
      <ellipse cx="24.5" cy="9.5" rx="4" ry="5.2" />
      <ellipse cx="32" cy="17" rx="4" ry="5" transform="rotate(20 32 17)" />
    </svg>
  );
}

/** O coração do logo, o mesmo do canto da fachada no hero. */
function Coracao() {
  return (
    <svg viewBox="0 0 32 30" className="semana-coracao" aria-hidden>
      <path
        d="M16 28 C 5 20, 1 13, 3 7.5 C 5 2.5, 11.5 1.8, 16 7 C 20.5 1.8, 27 2.5, 29 7.5 C 31 13, 27 20, 16 28 Z"
        fill="#e2463f"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/**
 * "O que fazer agora", ao lado dos sinais de emergência.
 *
 * O título diz o que fazer NESTE minuto, pelo relógio de Recife (o mesmo do
 * selo "aberto agora" do header). Embaixo, a semana em pegadas: segunda a
 * sexta agrupadas sob um fio com a janela, sábado e domingo à parte, e o
 * coração do logo no canto da pegada de hoje.
 */
export function PainelAgora() {
  /* "Aberta" aqui é a JANELA DE EMERGÊNCIA (até as 18h), não o expediente:
     depois disso não há tempo de estabilizar e encaminhar (clínica, 29/09/2026). */
  const aberto = useDentroDaJanela(painelAgora.limiteEmergencia);
  const hoje = useDiaRecife();
  const estado = aberto === null ? "neutro" : aberto ? "aberta" : "fechada";
  const status = painelAgora.status[estado];
  const fechada = estado === "fechada";

  return (
    <div className="agora agora--emergencia">
      <p className="font-display text-xl font-bold">{painelAgora.titulo}</p>

      <div className="agora-momento" data-estado={estado} aria-live="polite">
        <p className="agora-momento-rotulo">{status.rotulo}</p>
        <p className="agora-momento-titulo font-display">{status.titulo}</p>
        <p className="agora-momento-texto">{status.texto}</p>
      </div>

      <p className="agora-semana-rotulo">{painelAgora.rotuloSemana}</p>
      <ul className="semana">
        {grupos(painelAgora.limiteEmergencia).map((g) => (
          <li key={g.nome} className="semana-grupo" data-fechado={g.hora ? undefined : ""}>
            <span className="sr-only">
              {g.nome}: {g.hora ?? "fechado"}
              {hoje !== null && g.dias.includes(hoje) ? " (hoje)" : ""}
            </span>
            <span className="semana-dias" aria-hidden>
              {g.dias.map((d) => (
                <span key={d} className="semana-dia" data-hoje={d === hoje ? "" : undefined}>
                  <span className="semana-inicial">{expediente.nomes[d].charAt(0).toUpperCase()}</span>
                  <span className="semana-marca">
                    <Pegada />
                    {d === hoje ? <Coracao /> : null}
                  </span>
                </span>
              ))}
            </span>
            <span className="semana-hora" aria-hidden>
              {g.hora ?? "fechado"}
            </span>
          </li>
        ))}
      </ul>

      <div className="agora-acoes">
        <BotaoWhatsapp
          rotulo={fechada ? painelAgora.botaoFechada : painelAgora.botao}
          tamanho="compacto"
          href={linkWhatsapp(fechada ? painelAgora.mensagemFechada : painelAgora.mensagem)}
        />
        <a href={contato.telefoneFixoLink} className="agora-ligar">
          {painelAgora.ligar} {contato.telefoneFixo}
        </a>
      </div>

      <p className="agora-nota">{painelAgora.nota}</p>
    </div>
  );
}
