"use client";

import { useState } from "react";
import {
  InfoIcon,
  DogIcon,
  CatIcon,
  SyringeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Secao } from "@/components/ui/Secao";
import { Revelar } from "@/components/ui/Revelar";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { vacinas, CTA_PRIMARIO } from "@/content/site";

/**
 * Calendário de vacinas.
 *
 * É a dobra que diferencia de verdade: nenhum concorrente de Recife oferece uma
 * ferramenta, todos oferecem só texto institucional. Dá motivo para o tutor
 * voltar ao site e termina exatamente onde o site inteiro quer terminar, no
 * WhatsApp.
 *
 * 09/09/2026 (JM: "melhorar o layout e a intuitividade, interatividade").
 * O que mudou:
 *
 * 1. **Espécie vira cartão com ícone**, não pílula. É o primeiro gesto da
 *    dobra e no celular precisa ser acertável com o polegar sem mira. Cão e
 *    gato são reconhecidos pelo desenho antes da palavra ser lida.
 *
 * 2. **Fase de vida vira TRILHA** (ver `.trilha` no globals.css). Pílula
 *    comunica categoria; filhote → adulto → idoso é progressão. A trilha diz
 *    que existe um antes e um depois, e mostra onde o animal está nela.
 *
 * 3. **Resultado em lista NUMERADA com fio de ligação**, no lugar de checks
 *    soltos. As doses da múltipla têm ordem e intervalo entre elas — o fio é o
 *    que comunica "isto continua", que o check não comunicava.
 *
 * 4. **Contagem de doses no topo do painel**, para a resposta ("são três
 *    doses") chegar antes da lista inteira ser lida.
 *
 * Os seletores continuam `radiogroup` de verdade (botões com `aria-checked`):
 * mudou o desenho, não a semântica nem a navegação por teclado.
 *
 * ⚠️ O conteúdo é orientação geral e está marcado como tal na interface. O
 * protocolo precisa da revisão da Dra. Carol antes de publicar (ver brief.md).
 */
export function Vacinas() {
  /*
    Tipado como `string` de propósito: `vacinas` é `as const`, então inferir do
    valor inicial travaria o estado em "cao" e "filhote" e nenhuma outra opção
    seria atribuível.
  */
  const [especieId, setEspecieId] = useState<string>(vacinas.especies[0].id);
  const [faseId, setFaseId] = useState<string>(vacinas.especies[0].fases[0].id);

  const especie =
    vacinas.especies.find((e) => e.id === especieId) ?? vacinas.especies[0];
  const indiceFase = Math.max(
    0,
    especie.fases.findIndex((f) => f.id === faseId),
  );
  const fase = especie.fases[indiceFase];
  /*
    Alargado para `number` de propósito: `vacinas` é `as const`, então o TS
    estreita `length` para os literais que existem hoje (2 | 3) e reprova a
    comparação com 1 como "sem sobreposição". O plural é regra de idioma, não
    de dado — não deve quebrar quando alguém editar a lista.
  */
  const quantidade: number = fase.itens.length;

  return (
    <Secao id="vacinas" tom="base">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Revelar>
            <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
              {vacinas.headline}
            </h2>
          </Revelar>
          <Revelar atraso={0.06}>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-text-2">
              {vacinas.subhead}
            </p>
          </Revelar>

          <Revelar atraso={0.12}>
            <div className="mt-9">
              <p
                id="rotulo-especie"
                className="text-xs font-semibold tracking-[0.09em] text-text-3 uppercase"
              >
                Espécie
              </p>
              <div
                role="radiogroup"
                aria-labelledby="rotulo-especie"
                className="mt-3 flex gap-3"
              >
                {vacinas.especies.map((e) => {
                  const Icone = e.id === "gato" ? CatIcon : DogIcon;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      role="radio"
                      aria-checked={e.id === especieId}
                      onClick={() => {
                        setEspecieId(e.id);
                        setFaseId(e.fases[0].id);
                      }}
                      className="especie-card"
                    >
                      <Icone size={26} weight="light" aria-hidden />
                      {e.rotulo}
                    </button>
                  );
                })}
              </div>
            </div>
          </Revelar>

          <Revelar atraso={0.16}>
            <div className="mt-8">
              <p
                id="rotulo-fase"
                className="text-xs font-semibold tracking-[0.09em] text-text-3 uppercase"
              >
                Fase de vida
              </p>
              <div
                role="radiogroup"
                aria-labelledby="rotulo-fase"
                className="trilha mt-4"
              >
                {especie.fases.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={f.id === faseId}
                    onClick={() => setFaseId(f.id)}
                    className="trilha-passo"
                    data-estado={
                      i < indiceFase
                        ? "feito"
                        : i === indiceFase
                          ? "ativo"
                          : "futuro"
                    }
                  >
                    <span className="trilha-linha" aria-hidden />
                    <span className="trilha-ponto" aria-hidden />
                    <span className="trilha-rotulo">{f.rotulo}</span>
                    <span className="trilha-detalhe">{f.detalhe}</span>
                  </button>
                ))}
              </div>
            </div>
          </Revelar>
        </div>

        <Revelar atraso={0.2}>
          <div className="vidro rounded-[var(--radius-card)] p-7 sm:p-8">
            {/*
              Resposta curta antes da lista: quem abriu a dobra quer saber
              QUANTAS são, e só depois quais.
            */}
            <p className="flex items-center gap-2.5 border-b border-hairline pb-5 text-sm text-text-2">
              <SyringeIcon
                size={20}
                weight="light"
                className="shrink-0 text-brand"
                aria-hidden
              />
              <span>
                <strong className="font-semibold text-text">
                  {especie.rotulo} {fase.rotulo.toLowerCase()}
                </strong>{" "}
                — {quantidade} {quantidade === 1 ? "item" : "itens"} no
                calendário
              </span>
            </p>

            {/* `key` remonta a lista a cada troca, então a entrada reanima. */}
            <ol
              key={`${especie.id}-${fase.id}`}
              className="lista-passos mt-6"
            >
              {fase.itens.map((item, i) => (
                <li
                  key={item.nome}
                  className="vacina-item"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <span className="lista-num" aria-hidden>
                    {i + 1}
                  </span>
                  <p className="font-medium text-text">{item.nome}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-2">
                    {item.quando}
                  </p>
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
              {vacinas.aviso}
            </p>

            {/* Peso de CTA de seção, igual ao dos Planos: aqui o tutor acabou de
                descobrir que o pet está atrasado, e é o momento de maior intenção. */}
            <div className="mt-7 flex justify-center">
              <BotaoWhatsapp rotulo={CTA_PRIMARIO} />
            </div>
          </div>
        </Revelar>
      </div>
    </Secao>
  );
}
