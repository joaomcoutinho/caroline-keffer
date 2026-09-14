import Image from "next/image";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { caminhoPublico } from "@/lib/caminho";
import { equipe, CTA_PRIMARIO } from "@/content/site";

/**
 * Dobra da equipe: grade rígida, quatro iguais, e HOLOFOTE no cursor.
 *
 * 11/09/2026 (JM): a versão em arco foi lida como hierarquia ("por que alguns
 * em destaque no meio?"), e a leitura está certa. Deslocamento vertical sempre
 * comunica importância, qualquer que seja a intenção. Numa equipe que o site
 * apresenta como equivalente, isso contradiz o argumento.
 *
 * Então os quatro voltam ao MESMO nível, e a interatividade muda de lugar: sai
 * do arranjo e vai para a resposta ao cursor. Em repouso ninguém se destaca; é
 * o visitante quem cria o destaque ao passar o mouse, e ele desaparece quando o
 * mouse sai. É o mesmo padrão de holofote que a galeria de pets já usa, então a
 * página continua falando uma língua só.
 *
 * O que acontece sob o cursor (ver `.membro-*` no globals.css):
 *   - o card sobe e a foto ganha o halo ciano do site;
 *   - os outros três recuam em opacidade, sem sair do lugar;
 *   - um CTA de WhatsApp sobe sobre a foto. Quem está olhando quem vai cuidar
 *     do pet dele está a um passo de agendar, e o botão é o mesmo do site
 *     inteiro, sem inventar uma segunda intenção.
 *
 * TECLADO: o CTA é focável, então `:focus-within` reproduz o holofote para
 * quem navega por Tab. TOQUE: não existe hover, o CTA não aparece, e quem faz
 * esse papel no celular é a barra fixa de agendamento.
 *
 * ⚠️ FOTOS DE CAMILA E LUCAS: são selfies com fundo recortado para branco (via
 * Vision do macOS, ver scripts/recorta-fundo.swift). O enquadramento delas é
 * bem mais fechado que o das duas veterinárias, que têm retrato de estúdio.
 * Vale pedir à clínica duas fotos no mesmo padrão.
 */
export function Equipe() {
  return (
    <Secao id="equipe" tom="forte">
      <div className="max-w-[52ch]">
        <Revelar>
          <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {equipe.headline}
          </h2>
        </Revelar>
        <Revelar atraso={0.06}>
          <p className="mt-5 text-lg leading-relaxed text-text-2">
            {equipe.subhead}
          </p>
        </Revelar>
      </div>

      <ul className="equipe-grade mt-12 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-7">
        {equipe.membros.map((membro, i) => (
          <li key={membro.nome}>
            <Revelar atraso={0.08 + i * 0.06}>
              <article className="membro-card">
                <div className="membro-foto relative overflow-hidden rounded-[var(--radius-card)] border border-brand/26">
                  <Image
                    src={caminhoPublico(membro.foto)}
                    alt={membro.alt}
                    width={640}
                    height={800}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 260px"
                    className="aspect-4/5 w-full object-cover"
                  />

                  {/* Sobe sobre a foto no hover e no foco. Some no toque. */}
                  <div className="membro-cta">
                    <BotaoWhatsapp rotulo={CTA_PRIMARIO} tamanho="compacto" />
                  </div>
                </div>

                <div className="mt-4 border-t border-hairline pt-4">
                  <h3 className="font-display text-base leading-snug font-bold text-balance sm:text-[1.0625rem]">
                    <span className="membro-nome">{membro.nome}</span>
                  </h3>
                  <p className="mt-1 text-sm text-text-3">{membro.papel}</p>
                </div>
              </article>
            </Revelar>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
