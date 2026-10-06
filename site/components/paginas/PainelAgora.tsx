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
 * ou o limite (18h). Dias seguidos com a mesma janela viram uma linha
 * ("Segunda a sexta"). Segunda primeiro, domingo por último.
 */
function janelas(limite: string) {
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const linhas: { dias: number[]; hora: string }[] = [];
  for (const d of ordem) {
    const dia = expediente.semana[d];
    const hora = dia ? `${humano(dia.abre)} às ${humano(dia.fecha < limite ? dia.fecha : limite)}` : "Fechado";
    const ultima = linhas.at(-1);
    if (ultima && ultima.hora === hora) ultima.dias.push(d);
    else linhas.push({ dias: [d], hora });
  }
  return linhas.map((l) => ({
    ...l,
    rotulo:
      l.dias.length === 1
        ? maiuscula(expediente.nomes[l.dias[0]])
        : `${maiuscula(expediente.nomes[l.dias[0]])} a ${expediente.nomes[l.dias.at(-1)!]}`,
  }));
}

/**
 * "O que fazer agora", ao lado dos sinais de emergência.
 *
 * 06/10/2026 (JM: "organize os horários, algo mais intuitivo e menos
 * poluído"). Uma faixa diz o que fazer NESTE minuto, pelo relógio de Recife
 * (o mesmo do selo "aberto agora" do header); embaixo, a janela de emergência
 * de cada dia, com o dia de hoje marcado. Antes da hidratação a faixa mostra a
 * regra geral, sem acender nada.
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
    <div className="agora">
      <p className="font-display text-xl font-bold">{painelAgora.titulo}</p>

      <div className="agora-status" data-estado={estado} aria-live="polite">
        <p className="agora-status-rotulo">{status.rotulo}</p>
        <p className="agora-status-texto">{status.texto}</p>
      </div>

      <p className="agora-horarios-titulo">{painelAgora.rotuloHorarios}</p>
      <dl className="agora-horarios">
        {janelas(painelAgora.limiteEmergencia).map((l) => {
          const ehHoje = hoje !== null && l.dias.includes(hoje);
          return (
            <div key={l.rotulo} data-hoje={ehHoje ? "" : undefined}>
              <dt>
                {l.rotulo}
                {ehHoje ? <span className="agora-hoje">{painelAgora.rotuloHoje}</span> : null}
              </dt>
              <dd>{l.hora}</dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
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
