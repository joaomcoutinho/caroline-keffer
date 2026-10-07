"use client";

import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { useDentroDaJanela } from "@/components/ui/StatusHorario";
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
 * ou o limite (18h). Dias seguidos com a mesma janela viram uma coluna
 * ("Seg a sex"). Segunda primeiro, domingo por último.
 */
function janelas(limite: string) {
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const lista: { dias: number[]; hora: string }[] = [];
  for (const d of ordem) {
    const dia = expediente.semana[d];
    const hora = dia ? `${humano(dia.abre)} às ${humano(dia.fecha < limite ? dia.fecha : limite)}` : "Fechado";
    const ultima = lista.at(-1);
    if (ultima && ultima.hora === hora) ultima.dias.push(d);
    else lista.push({ dias: [d], hora });
  }
  return lista.map((l) => ({
    hora: l.hora,
    nome:
      l.dias.length === 1
        ? maiuscula(expediente.nomes[l.dias[0]])
        : `${maiuscula(expediente.nomes[l.dias[0]].slice(0, 3))} a ${expediente.nomes[l.dias.at(-1)!].slice(0, 3)}`,
  }));
}

/**
 * "O que fazer agora", ao lado dos sinais de emergência.
 *
 * Só tipografia (06/10/2026, JM). O título diz o que fazer NESTE minuto, pelo
 * relógio de Recife (o mesmo do selo "aberto agora" do header); embaixo, os
 * horários de emergência na ficha de colunas do topo das páginas internas.
 * Antes da hidratação o título mostra a regra geral.
 */
export function PainelAgora() {
  /* "Aberta" aqui é a JANELA DE EMERGÊNCIA (até as 18h), não o expediente:
     depois disso não há tempo de estabilizar e encaminhar (clínica, 29/09/2026). */
  const aberto = useDentroDaJanela(painelAgora.limiteEmergencia);
  const estado = aberto === null ? "neutro" : aberto ? "aberta" : "fechada";
  const status = painelAgora.status[estado];
  const fechada = estado === "fechada";

  return (
    <div className="agora">
      <p className="font-display text-xl font-bold">{painelAgora.titulo}</p>

      <div aria-live="polite">
        <p className="agora-momento-titulo font-display">{status.titulo}</p>
        <p className="agora-momento-texto">{status.texto}</p>
      </div>

      <p className="agora-horarios-rotulo">{painelAgora.rotuloHorarios}</p>
      <dl className="topo-ficha agora-ficha">
        {janelas(painelAgora.limiteEmergencia).map((j) => (
          <div key={j.nome}>
            <dt>{j.nome}</dt>
            <dd>{j.hora}</dd>
          </div>
        ))}
      </dl>

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
