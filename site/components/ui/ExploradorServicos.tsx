"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
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
export function ExploradorServicos({ itens, rotulo }: Props) {
  const [ativo, setAtivo] = useState(0);
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);
  const pendente = useRef<number | null>(null);

  /*
    INDICADOR DESLIZANTE (14/09/2026, JM: "melhora o card seletor quando passa o
    mouse").

    Antes cada aba acendia a própria lâmina no hover, e trocar de aba era uma
    apagar e outra acender em lugares diferentes. Agora existe UMA lâmina só,
    que DESLIZA até a aba sob o cursor. O olho acompanha o movimento em vez de
    procurar onde acendeu, e é esse deslocamento contínuo que dá a sensação de
    interface fluida.

    Duas velocidades de propósito:
      - a LÂMINA vai para a aba sob o cursor na hora (sem espera), então o
        retorno visual é imediato;
      - o PAINEL só troca depois dos 90ms de intenção (ver abaixo), então passar
        o mouse por cima não faz o conteúdo piscar.
    Ao sair da lista, a lâmina volta para a aba ativa.

    A posição é MEDIDA (`offsetTop`/`offsetHeight`) e aplicada por `transform`,
    que o compositor anima sem recalcular layout.
  */
  const lista = useRef<HTMLDivElement>(null);
  const [destaque, setDestaque] = useState<number | null>(null);
  const [lamina, setLamina] = useState<{ y: number; h: number } | null>(null);

  const medir = useCallback((i: number) => {
    const b = botoes.current[i];
    if (!b) return;
    setLamina({ y: b.offsetTop, h: b.offsetHeight });
  }, []);

  /*
    HOVER COM INTENÇÃO.

    Trocar de serviço no primeiro pixel de contato faz a dobra piscar quando o
    cursor só está ATRAVESSANDO a lista para chegar em outro lugar: seis
    serviços trocam em sequência em poucos milissegundos. Os 90ms de espera
    separam "passei por cima" de "quis ver este". Clique e teclado continuam
    instantâneos, porque ali a intenção já está declarada.
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

  const alvoLamina = destaque ?? ativo;
  // Lido pelo ResizeObserver, que vive fora do ciclo de render. Escrito só
  // dentro do efeito: escrever em ref durante o render é proibido no React 19.
  const alvoRef = useRef(alvoLamina);

  /*
    Depende de `ativo` TAMBÉM, e não só do alvo. Trocar de serviço muda a altura
    do painel, e a lista, esticada junto, redistribui as abas. Com o cursor
    parado na mesma aba o alvo não muda, então sem `ativo` aqui a lâmina ficava
    na posição de antes da troca: medido, 69px fora da aba de Banho e tosa.

    `useLayoutEffect` roda depois que o DOM novo já foi aplicado e antes da
    pintura, e ler `offsetTop` ali força o layout na hora. A posição lida é a
    definitiva, sem depender de o navegador estar pintando a página.
  */
  useLayoutEffect(() => {
    alvoRef.current = alvoLamina;
    medir(alvoLamina);
  }, [alvoLamina, ativo, medir]);

  /*
    Rede de segurança para mudanças de tamanho que NÃO vêm de trocar de
    serviço: redimensionar a janela, a fonte terminar de carregar e mudar a
    quebra de linha. A troca de serviço é coberta pelo efeito acima, de forma
    síncrona; o ResizeObserver só entrega aviso quando a página está sendo
    pintada, então ele não serve de única garantia.
  */
  useEffect(() => {
    const el = lista.current;
    if (!el) return;
    const obs = new ResizeObserver(() => medir(alvoRef.current));
    obs.observe(el);
    return () => obs.disconnect();
  }, [medir]);

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
      `items-stretch` + a lista virando coluna com `justify-between` resolvem o
      vão morto que sobrava embaixo dos seletores (JM, 11/09/2026).

      A causa: a lista de abas tem altura própria (5 nomes), o painel tem outra
      (foto 4:5 com o texto ao lado), e a do painel é bem maior. Com as
      duas coladas no topo, a diferença virava buraco no pé da coluna esquerda.
      Agora as abas se distribuem na altura inteira da fileira, e os fios entre
      elas passam a dividir o espaço em vez de amontoar no topo.
    */
    <div className="grid items-stretch gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-12">
      <div
        ref={lista}
        role="tablist"
        aria-label={rotulo}
        aria-orientation="vertical"
        onMouseLeave={() => setDestaque(null)}
        className="trilho-abas relative -mx-5 flex snap-x scroll-pl-5 gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:-mx-3 lg:h-full lg:flex-col lg:justify-between lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {/*
          A lâmina que desliza. Só no desktop; no celular as abas são pílulas.

          Existe SEMPRE no HTML, mesmo antes de medir. Quando ela era condicional
          (`lamina ? <span/> : null`), o servidor mandava a lista sem lâmina e
          ela só nascia depois da hidratação: a aba ativa carregava sem
          destaque e o realce aparecia de estalo. Agora ela fica invisível até a
          primeira medida (`data-pronta`) e entra com fade, sem pulo.
        */}
        <span
          aria-hidden
          className="servico-lamina"
          data-pronta={lamina !== null}
          data-hover={destaque !== null && destaque !== ativo}
          style={
            lamina
              ? { transform: `translateY(${lamina.y}px)`, height: `${lamina.h}px` }
              : undefined
          }
        />
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
              onMouseEnter={() => {
                setDestaque(i);
                aoPassar(i);
              }}
              onMouseLeave={cancelar}
              onKeyDown={(e) => aoTeclar(e, i)}
              className={`servico-aba group relative z-[1] flex shrink-0 snap-start items-center gap-3 rounded-full border px-5 py-3 text-left whitespace-nowrap transition-[color,border-color,background-color] duration-300 ease-[var(--ease-soft)] lg:w-full lg:flex-1 lg:shrink lg:rounded-none lg:border-0 lg:border-b lg:border-hairline lg:px-3 lg:py-5 lg:whitespace-normal ${
                /*
                  O rótulo da aba selecionada usa `text-text`, não `text-brand`.
                  Com as superfícies mais claras, o teal da marca sobre a
                  pílula tingida caía para 3,56 — reprovado em AA. Reduzir a
                  tinta não resolvia (nem a 5% passava de 4,49). A seleção já é
                  sinalizada pela borda, pelo preenchimento e, no desktop, pelo
                  traço; a cor no texto era redundante e era o elo fraco.
                */
                selecionado
                  ? "border-brand bg-brand/10 text-text lg:bg-transparent"
                  : "border-hairline text-text-2 hover:text-acao-texto"
              }`}
            >
              <Icone
                size={22}
                weight="light"
                className={`servico-icone shrink-0 transition-colors duration-300 ease-[var(--ease-soft)] ${
                  selecionado ? "text-brand" : "text-text-3 group-hover:text-acao-texto"
                }`}
                aria-hidden
              />
              <span className="font-display text-base font-bold lg:text-lg">
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
        className="sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-stretch lg:gap-12"
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
        <div className="servico-pilha relative aspect-4/5 w-full">
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
          COLUNA DE TEXTO NA ALTURA DA FOTO (15/09/2026, JM: "ocupar o espaço da
          parte direita"). Centralizado, o texto curto deixava um vão em cima e
          embaixo, e a direita lia como vazia. Agora a coluna é estreita e fixa
          (19rem), a foto cresce para a direita, e o texto se ancora nas duas
          pontas: contador, título e descrição no topo, alinhados com o topo da
          foto; o CTA do serviço no pé, alinhado com a
          base dela.
        */}
        <div key={atual.nome} className="servico-painel flex flex-col">
          <p className="mt-6 text-sm font-semibold tracking-[0.08em] text-brand tabular-nums sm:mt-0 lg:pt-1">
            {String(ativo + 1).padStart(2, "0")}
            <span className="text-text-3"> / {String(itens.length).padStart(2, "0")}</span>
          </p>
          <h3 className="mt-3 font-display text-2xl leading-tight font-bold text-balance lg:text-[1.75rem]">
            {atual.nome}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-text-2">
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
          {atual.cta ? <div className="mt-8 lg:mt-auto">{atual.cta}</div> : null}
        </div>
      </div>
    </div>
  );
}
