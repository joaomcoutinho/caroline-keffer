"use client";

import { useRef, useState, type KeyboardEvent } from "react";
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

  const irPara = (i: number) => {
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
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
      <div
        role="tablist"
        aria-label={rotulo}
        aria-orientation="vertical"
        className="trilho-abas -mx-5 flex snap-x scroll-pl-5 gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
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
              onClick={() => setAtivo(i)}
              onMouseEnter={() => setAtivo(i)}
              onKeyDown={(e) => aoTeclar(e, i)}
              className={`servico-aba group flex shrink-0 snap-start items-center gap-3 rounded-full border px-5 py-3 text-left whitespace-nowrap transition-[color,border-color,background-color] duration-300 ease-[var(--ease-soft)] lg:w-full lg:shrink lg:rounded-none lg:border-0 lg:border-b lg:border-hairline lg:px-0 lg:py-5 lg:whitespace-normal ${
                selecionado
                  ? "border-brand bg-brand/10 text-brand lg:bg-transparent"
                  : "border-hairline text-text-2 hover:text-brand"
              }`}
            >
              <Icone
                size={22}
                weight="light"
                className={`shrink-0 transition-colors duration-300 ${
                  selecionado ? "text-brand" : "text-text-3 group-hover:text-brand"
                }`}
                aria-hidden
              />
              <span className="font-display text-base font-semibold lg:text-lg">
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
        {/* `key` remonta o painel a cada troca, então a entrada reanima. */}
        <div key={atual.nome} className="servico-painel">
          <Midia
            src={atual.src || undefined}
            alt={atual.alt || `${atual.nome} na Clínica Pet Caroline Keffer`}
            briefing={atual.briefing}
            posicao={atual.posicao || undefined}
            proporcao="16 / 11"
            realce
            className="w-full"
          />
          <h3 className="mt-6 font-display text-2xl leading-tight font-semibold text-balance">
            {atual.nome}
          </h3>
          <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-text-2">
            {atual.texto}
          </p>
        </div>
      </div>
    </div>
  );
}
