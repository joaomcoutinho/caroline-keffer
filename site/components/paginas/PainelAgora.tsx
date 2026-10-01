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

  const opcoes = [
    { ...painelAgora.aberta, ativo: estado(true) },
    { ...painelAgora.fechada, ativo: estado(false) },
  ];

  return (
    <div className="agora">
      <p className="font-display text-xl font-bold">{painelAgora.titulo}</p>

      {/* As duas saídas lado a lado (01/10/2026, JM); o resto vem embaixo. */}
      <div className="agora-opcoes mt-5">
        {opcoes.map((o) => (
          <div key={o.quando} className="agora-opcao" data-ativo={o.ativo}>
            {/* A marca "agora" reserva a linha nos dois cartões: nada desalinha
                quando ela acende em um deles. */}
            <span className="agora-marca" data-visivel={o.ativo === "sim" ? "" : undefined} aria-hidden={o.ativo !== "sim"}>
              {painelAgora.marcaAgora}
            </span>
            <p className="agora-quando">{o.quando}</p>
            <p className="agora-condicao">{o.condicao}</p>
            <p className="agora-texto">{o.texto}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 leading-relaxed text-text-2">{painelAgora.seguir}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <BotaoWhatsapp rotulo={painelAgora.botao} tamanho="compacto" href={linkWhatsapp(painelAgora.mensagem)} />
        <a href={contato.telefoneFixoLink} className="agora-ligar">
          {painelAgora.ligar} {contato.telefoneFixo}
        </a>
      </div>

      {/* Só o expediente: o limite das 18h já está nos dois cartões (01/10/2026). */}
      <p className="agora-rodape">{horario}</p>
    </div>
  );
}
