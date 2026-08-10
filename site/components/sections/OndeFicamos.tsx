import { MapPinIcon, PhoneIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { Midia } from "@/components/ui/Midia";
import { StatusHorario } from "@/components/ui/StatusHorario";
import { ondeFicamos, contato } from "@/content/site";

/**
 * Dobra 8 — endereço, horário e o aviso honesto sobre não ser 24h.
 * Dizer que não atende de madrugada constrói mais confiança do que omitir:
 * o tutor descobriria do jeito ruim.
 */
export function OndeFicamos() {
  return (
    <Secao id="onde-ficamos" tom="alt">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Revelar>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
              {ondeFicamos.headline}
            </h2>
          </Revelar>

          <Revelar atraso={0.06}>
            <a
              href={contato.mapa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex items-start gap-3 text-lg text-text-2 transition-colors hover:text-brand"
            >
              <MapPinIcon size={22} weight="light" className="mt-1 shrink-0" aria-hidden />
              <span>
                {contato.endereco}
                <span className="block text-base text-text-3">
                  {contato.bairro} · {contato.cep}
                </span>
              </span>
            </a>
          </Revelar>

          <Revelar atraso={0.1}>
            <a
              href={contato.telefoneFixoLink}
              className="mt-5 flex items-center gap-3 text-lg text-text-2 transition-colors hover:text-brand"
            >
              <PhoneIcon size={22} weight="light" className="shrink-0" aria-hidden />
              {contato.telefoneFixo}
            </a>
          </Revelar>

          <Revelar atraso={0.12}>
            {/* Responde antes de o tutor perguntar: "está aberto agora?". */}
            <div className="mt-7">
              <StatusHorario />
            </div>
          </Revelar>

          <Revelar atraso={0.14}>
            <dl className="mt-6 border-t border-hairline pt-6">
              {ondeFicamos.horarios.map((linha) => (
                <div
                  key={linha.dia}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <dt className="text-text-2">{linha.dia}</dt>
                  <dd className="font-medium">{linha.hora}</dd>
                </div>
              ))}
            </dl>
          </Revelar>

          <Revelar atraso={0.18}>
            <p className="mt-6 flex items-start gap-3 rounded-[var(--radius-card)] bg-surface p-5 text-sm leading-relaxed text-text-2">
              <WarningCircleIcon
                size={20}
                weight="light"
                className="mt-0.5 shrink-0 text-brand"
                aria-hidden
              />
              {ondeFicamos.avisoEmergencia}
            </p>
          </Revelar>
        </div>

        <Revelar atraso={0.1}>
          <Midia
            src={ondeFicamos.foto.src}
            posicao={ondeFicamos.foto.posicao}
            alt={ondeFicamos.foto.alt}
            briefing={ondeFicamos.foto.briefing}
            proporcao={ondeFicamos.foto.proporcao}
            realce
            className="w-full"
          />
        </Revelar>
      </div>
    </Secao>
  );
}
