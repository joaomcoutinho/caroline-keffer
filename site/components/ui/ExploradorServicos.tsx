"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  StethoscopeIcon,
  FirstAidKitIcon,
  FlaskIcon,
  SyringeIcon,
  HeartbeatIcon,
  ScissorsIcon,
  HandSwipeRightIcon,
  ScanIcon,
  HouseIcon,
  BabyIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Midia } from "@/components/ui/Midia";

/*
  O mapa de ícones vive AQUI, no cliente, e a seção passa só o nome do ícone.
  Componente de ícone é função, e função não atravessa a fronteira
  servidor → cliente: o build quebra com "Functions cannot be passed directly
  to Client Components". Trafegar a string e resolver deste lado é o caminho.
*/
const icones: Record<string, Icon> = {
  stethoscope: StethoscopeIcon,
  firstAid: FirstAidKitIcon,
  flask: FlaskIcon,
  syringe: SyringeIcon,
  heartbeat: HeartbeatIcon,
  scissors: ScissorsIcon,
  scan: ScanIcon,
  casa: HouseIcon,
  bebe: BabyIcon,
};

type Servico = {
  nome: string;
  texto: string;
  briefing: string;
  icone: string;
  /** Vazio enquanto a foto real não existe: o slot renderiza o briefing. */
  src: string;
  alt: string;
  posicao: string;
  /**
   * Desdobramento do serviço, quando ele tem partes NOMEÁVEIS — as cinco
   * especialidades, os três tipos de cirurgia, as três modalidades de imagem.
   *
   * Existe porque nome genérico esconde capacidade: "Especialidades" não diz
   * nada, "Cardiologia · Dermatologia · Nefrologia…" diz tudo. É a diferença
   * entre o tutor achar que vai ser encaminhado e saber que resolve aqui.
   */
  itens?: readonly string[];
  /** CTA de WhatsApp com a mensagem do serviço, renderizado no servidor. */
  cta?: ReactNode;
};

type Props = {
  itens: Servico[];
  rotulo: string;
  /** Bloco editorial da dobra (título, apoio, CTA) na MESMA coluna das abas. */
  cabecalho?: ReactNode;
};

/**
 * Índice + painel (master/detail) para os serviços.
 *
 * Substituiu o acordeão de seis tiras: seis itens dividindo a largura davam
 * 190px cada, e nada ficava legível em repouso — o nome quebrava, a foto virava
 * uma tira. Aqui os seis nomes ficam sempre visíveis e o painel dá à foto e ao
 * texto o espaço que eles precisam.
 *
 * NÃO gira sozinho, de propósito. Quem chega nesta dobra costuma procurar UM
 * serviço; rotação automática tira o controle de quem já sabe o que quer, e faz
 * o item desejado sumir no meio da leitura.
 *
 * Semântica de abas real (`tablist`/`tab`/`tabpanel`) com roving tabindex: passa
 * o mouse para explorar rápido, ou navega pelas setas do teclado. Um Tab só
 * entra na lista, e as setas percorrem — que é o comportamento esperado.
 */
export function ExploradorServicos({ itens, rotulo, cabecalho }: Props) {
  const [ativo, setAtivo] = useState(0);
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);
  const pendente = useRef<number | null>(null);

  /*
    HOVER COM INTENÇÃO.

    Trocar de serviço no primeiro pixel de contato faz a dobra piscar quando o
    cursor só está ATRAVESSANDO a lista para chegar em outro lugar. Os 90ms de
    espera separam "passei por cima" de "quis ver este". Clique e teclado
    continuam instantâneos.
  */
  const cancelar = () => {
    if (pendente.current !== null) {
      window.clearTimeout(pendente.current);
      pendente.current = null;
    }
  };

  const aoPassar = (i: number) => {
    cancelar();
    pendente.current = window.setTimeout(() => setAtivo(i), 90);
  };

  useEffect(() => cancelar, []);

  const irPara = (i: number) => {
    cancelar();
    const alvo = (i + itens.length) % itens.length;
    setAtivo(alvo);
    botoes.current[alvo]?.focus();
  };

  const aoTeclar = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const mapa: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: itens.length - 1,
    };
    const destino = mapa[e.key];
    if (destino === undefined) return;
    e.preventDefault();
    irPara(destino);
  };

  const atual = itens[ativo];

  return (
    /*
      18/09/2026 (JM escolheu a opção S3 entre três protótipos): cabeçalho,
      SEIS PÍLULAS numa linha e um painel largo embaixo. A grade de duas
      colunas (abas altas à esquerda, painel à direita) desalinhava foto e
      texto e deixava espaço ocioso no topo da dobra.
    */
    <div className="flex flex-col gap-8">
      {cabecalho}

      <div
        role="tablist"
        aria-label={rotulo}
        aria-orientation="horizontal"
        className="trilho-abas relative -mx-5 flex snap-x scroll-pl-5 flex-nowrap gap-1.5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:justify-between lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {itens.map((item, i) => {
          const selecionado = i === ativo;
          const Icone = icones[item.icone];
          return (
            <button
              key={item.nome}
              ref={(el) => {
                botoes.current[i] = el;
              }}
              role="tab"
              id={`servico-aba-${i}`}
              aria-selected={selecionado}
              aria-controls="servico-painel"
              tabIndex={selecionado ? 0 : -1}
              onClick={() => {
                cancelar();
                setAtivo(i);
              }}
              onMouseEnter={() => aoPassar(i)}
              onMouseLeave={cancelar}
              onKeyDown={(e) => aoTeclar(e, i)}
              /*
                CADA PÍLULA TEM O PRÓPRIO REALCE (JM, 18/09/2026: "hover
                independente, sem acompanhar de um card para o outro"). Saiu a
                lâmina que deslizava entre as abas: ela criava a impressão de
                um realce que "escapava" do card quando o cursor saía.
              */
              className={`servico-aba group relative flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2.5 text-left whitespace-nowrap transition-[color,background-color,border-color] duration-250 ease-[var(--ease-soft)] lg:px-4 ${
                selecionado
                  ? "border-brand bg-brand/12 text-text"
                  : "border-hairline text-text-2 hover:border-brand/45 hover:bg-brand/6 hover:text-acao-texto"
              }`}
            >
              <Icone
                size={18}
                weight="light"
                className={`servico-icone shrink-0 transition-colors duration-300 ease-[var(--ease-soft)] ${
                  selecionado ? "text-brand" : "text-text-3 group-hover:text-acao-texto"
                }`}
                aria-hidden
              />
              <span className="font-display text-[0.9rem] font-bold lg:text-[0.95rem]">
                {item.nome}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 flex items-center gap-2 text-sm text-text-3 lg:hidden">
        <HandSwipeRightIcon
          size={18}
          weight="light"
          className="dica-arraste shrink-0 text-brand"
          aria-hidden
        />
        Arraste para ver mais serviços
      </p>

      <div
        role="tabpanel"
        id="servico-painel"
        aria-labelledby={`servico-aba-${ativo}`}
        tabIndex={0}
        className="servico-painel sm:grid sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-center sm:gap-8 lg:gap-14"
      >
        {/*
          AS MÍDIAS FICAM TODAS MONTADAS, empilhadas, e só a ativa aparece.

          Antes havia um `key={atual.nome}` aqui que remontava o painel inteiro
          a cada troca. Remontar destrói e recria a `<Image>`, então o navegador
          tinha que decodificar e pintar a foto de novo a cada hover — num
          passar de mouse pela lista, seis decodificações em sequência. Era essa
          a travada entre um card e outro.

          Empilhadas, cada foto é decodificada UMA vez e a troca vira só
          opacidade, que o compositor resolve sem tocar no layout.
        */}
        {/*
          RETRATO 4:5 PARA TODAS (15/09/2026). No 16:9 as fotos em pé só
          cabiam cortando ou com faixa desfocada nas laterais, e o card mudava
          de cara de um serviço para outro. Agora é um formato só, sangrado, e o
          texto vai ao lado da foto em vez de embaixo.
        */}
        <div className="servico-pilha relative aspect-4/3 w-full sm:aspect-4/5 lg:aspect-[5/4]">
          {itens.map((item, i) => (
            <div
              key={item.nome}
              className="servico-quadro absolute inset-0"
              data-ativo={i === ativo}
              aria-hidden={i !== ativo}
            >
              <Midia
                src={item.src || undefined}
                alt={item.alt || `${item.nome} na Clínica Pet Caroline Keffer`}
                briefing={item.briefing}
                posicao={item.posicao || undefined}
                realce
                className="h-full w-full"
              />
            </div>
          ))}
        </div>

        {/*
          COLUNA DE TEXTO (15/09/2026, duas rodadas com o JM). A coluna é
          estreita e fixa (21rem) para a foto crescer. Primeiro o CTA ficava
          ancorado no pé, alinhado com a base da foto, mas em serviço de texto
          curto sobrava um vão enorme entre a descrição e o botão, e os dois
          liam como coisas separadas. Agora título, descrição, pílulas e CTA
          são UM bloco, centrado na altura da foto, com o texto maior
          ocupando o espaço.
        */}
        <div key={atual.nome} className="servico-painel flex flex-col lg:justify-center">
          <p className="mt-6 text-sm font-semibold tracking-[0.08em] text-brand tabular-nums sm:mt-0">
            {String(ativo + 1).padStart(2, "0")}
            <span className="text-text-3"> / {String(itens.length).padStart(2, "0")}</span>
          </p>
          <h3 className="mt-3 font-display text-2xl leading-tight font-bold text-balance lg:text-[2.35rem] lg:leading-[1.1]">
            {atual.nome}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-text-2 lg:mt-4 lg:text-xl">
            {atual.texto}
          </p>

          {/*
            As partes nomeadas do serviço. Ficam em pílulas e não em frase
            corrida porque aqui a leitura é de VARREDURA: o tutor procura a
            especialidade do caso dele, e lista com fio em volta se percorre
            mais rápido que texto separado por vírgula.
          */}
          {atual.itens && atual.itens.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {atual.itens.map((sub) => (
                <li
                  key={sub}
                  className="rounded-full border border-hairline bg-surface/55 px-3.5 py-1.5 text-sm text-text-2"
                >
                  {sub}
                </li>
              ))}
            </ul>
          ) : null}

          {/*
            CTA do serviço (15/09/2026, JM: "um CTA mais destacado"). É o botão
            único do site, com o mesmo rótulo, e só a mensagem que chega no
            WhatsApp já vem com o nome do serviço. Vem pronto do servidor
            (`Servicos.tsx`): assim o conteúdo do site não entra no pacote de
            JavaScript deste componente.
          */}
          {atual.cta ? <div className="mt-8">{atual.cta}</div> : null}
        </div>
      </div>
    </div>
  );
}
