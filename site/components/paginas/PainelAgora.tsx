"use client";

import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { useDentroDaJanela } from "@/components/ui/StatusHorario";
import { contato, linkWhatsapp, ondeFicamos } from "@/content/site";
import { painelAgora } from "@/content/paginas";

/**
 * "O que fazer agora" — a decisão pronta, ao lado dos sinais de emergência
 * (27/09/2026, JM: o aviso anterior era "genérico e com cara de IA").
 *
 * Em vez de uma frase dizendo "fora do horário, procure um plantão", o painel
 * mostra as duas saídas e ACENDE a que vale neste minuto, pelo relógio de
 * Recife (o mesmo do selo "aberto agora" do header). Antes da hidratação
 * nenhuma acende: as duas ficam legíveis, e nada pula depois.
 */
export function PainelAgora() {
  /* "Aberta" aqui é a JANELA DE EMERGÊNCIA (até as 18h), não o expediente:
     depois disso não há tempo de estabilizar e encaminhar (clínica, 29/09/2026). */
  const aberto = useDentroDaJanela(painelAgora.limiteEmergencia);
  const horario = ondeFicamos.horarios
    .filter((h) => h.hora !== "Fechado")
    .map((h) => `${h.dia} ${h.hora}`)
    .join(" · ");

  const estado = (daVez: boolean) =>
    aberto === null ? undefined : aberto === daVez ? "sim" : "nao";

  return (
    <div className="agora">
      <p className="font-display text-xl font-bold">{painelAgora.titulo}</p>

      <div className="agora-opcao mt-5" data-ativo={estado(true)}>
        <p className="agora-quando">
          {painelAgora.aberta.quando}
          {aberto === true ? <span className="agora-marca">{painelAgora.marcaAgora}</span> : null}
        </p>
        <p className="mt-1 leading-relaxed text-text-2">{painelAgora.aberta.texto}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <BotaoWhatsapp
            rotulo={painelAgora.aberta.botao}
            tamanho="compacto"
            href={linkWhatsapp(painelAgora.aberta.mensagem)}
          />
          <a href={contato.telefoneFixoLink} className="agora-ligar">
            {painelAgora.aberta.ligar} {contato.telefoneFixo}
          </a>
        </div>
      </div>

      <div className="agora-opcao mt-3" data-ativo={estado(false)}>
        <p className="agora-quando">
          {painelAgora.fechada.quando}
          {aberto === false ? <span className="agora-marca">{painelAgora.marcaAgora}</span> : null}
        </p>
        <p className="mt-1 leading-relaxed text-text-2">{painelAgora.fechada.texto}</p>
      </div>

      <p className="mt-4 text-sm text-text-3">
        {horario}
        <span className="mt-1 block font-semibold text-text-2">{painelAgora.rodape}</span>
      </p>
    </div>
  );
}
