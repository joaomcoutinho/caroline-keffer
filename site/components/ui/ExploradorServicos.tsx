"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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
      (foto 16:11 + título + texto + pílulas), e a do painel é bem maior. Com as
      duas coladas no topo, a diferença virava buraco no pé da coluna esquerda.
      Agora as abas se distribuem na altura inteira da fileira, e os fios entre
      elas passam a dividir o espaço em vez de amontoar no topo.
    */
    <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
      <div
        role="tablist"
        aria-label={rotulo}
        aria-orientation="vertical"
        className="trilho-abas -mx-5 flex snap-x scroll-pl-5 gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:-mx-3 lg:h-full lg:flex-col lg:justify-between lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
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
              className={`servico-aba group flex shrink-0 snap-start items-center gap-3 rounded-full border px-5 py-3 text-left whitespace-nowrap transition-[color,border-color,background-color] duration-300 ease-[var(--ease-soft)] lg:w-full lg:flex-1 lg:shrink lg:rounded-none lg:border-0 lg:border-b lg:border-hairline lg:px-3 lg:py-5 lg:whitespace-normal ${
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
                className={`servico-icone shrink-0 transition-[color,transform] duration-300 ease-[var(--ease-soft)] ${
                  selecionado ? "text-brand" : "text-text-3 group-hover:text-acao-texto"
                }`}
                aria-hidden
              />
              <span className="font-display text-base font-bold lg:text-lg">
                {item.nome}
              </span>
              {/*
                Traço do item ativo: largura FIXA e ancorado na borda direita.
                Com `flex-1` ele ocupava a sobra da linha, então cada serviço
                ganhava um traço de tamanho diferente conforme o nome fosse mais
                curto ou mais longo. Travando em 40px e colando na direita, todos
                ficam iguais e alinhados. Cresce da direita para a esquerda
                (`origin-right`), como quem chega.
              */}
              <span
                aria-hidden
                className={`ml-auto hidden h-px w-10 origin-right bg-brand transition-transform duration-500 ease-[var(--ease-soft)] lg:block ${
                  selecionado ? "scale-x-100" : "scale-x-0"
                }`}
              />
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
        <div className="servico-pilha relative aspect-16/9 w-full">
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

        {/* Só o TEXTO remonta: é barato e mantém a entrada escalonada. */}
        <div key={atual.nome} className="servico-painel">
          <h3 className="mt-6 font-display text-2xl leading-tight font-bold text-balance">
            {atual.nome}
          </h3>
          <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-text-2">
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
        </div>
      </div>
    </div>
  );
}
