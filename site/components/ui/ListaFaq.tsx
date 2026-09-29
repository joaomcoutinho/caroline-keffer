"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Revelar } from "@/components/ui/Revelar";
import { ItemFaq } from "@/components/ui/ItemFaq";

type Props = {
  itens: readonly { pergunta: string; resposta: string }[];
};

/**
 * Lista do FAQ com UMA pergunta aberta por vez.
 *
 * 15/09/2026. Antes cada pergunta abria independente, e com três abertas a
 * dobra virava um bloco longo de texto onde era difícil achar a próxima
 * pergunta. Abrindo uma e fechando a anterior, a lista continua curta e o
 * movimento vira um só: a que fecha e a que abre deslizam juntas, na mesma
 * duração e na mesma curva (ver ItemFaq).
 *
 * Clicar na que já está aberta fecha ela.
 */
const useEfeitoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * ALTURA RESERVADA (28/09/2026, JM: "abrir o card não pode mexer a parte
 * esquerda; a seção já deve estar preparada para essa ação").
 *
 * A lista mede, antes de pintar, quanto ela ocupa com tudo fechado e quanto
 * cresce a MAIOR resposta aberta, e reserva a soma como altura mínima. Abrir
 * qualquer pergunta passa a acontecer dentro desse espaço: a seção não cresce,
 * e o bloco ao lado (centralizado nessa altura fixa) não se move.
 *
 * Mede só na montagem e quando a LARGURA muda (a quebra de linha das
 * respostas muda com ela). A medição abre e fecha cada <details> no mesmo
 * quadro, sem pintura no meio, então nada pisca.
 */
function reservarAltura(lista: HTMLElement) {
  const detalhes = Array.from(lista.querySelectorAll("details"));
  if (!detalhes.length) return;
  // Com animação de abertura em curso, a altura lida seria a animada: espera.
  if (detalhes.some((d) => d.getAnimations().length > 0)) return;

  const estado = detalhes.map((d) => d.open);
  const grade = lista.parentElement;
  lista.style.minHeight = "";
  lista.style.marginBottom = "";
  if (grade) grade.style.paddingBottom = "";
  detalhes.forEach((d) => (d.open = false));
  const fechada = lista.getBoundingClientRect().height;

  let maior = 0;
  for (const d of detalhes) {
    const antes = d.getBoundingClientRect().height;
    d.open = true;
    maior = Math.max(maior, d.getBoundingClientRect().height - antes);
    d.open = false;
  }

  detalhes.forEach((d, i) => (d.open = estado[i]));
  lista.style.minHeight = `${Math.ceil(fechada + maior)}px`;
  /* A sobra fica FORA da conta da centralização (28/09/2026, JM: "alinhar
     horizontalmente"): a margem negativa faz a grade centralizar o bloco da
     esquerda nas perguntas FECHADAS, e o padding da grade devolve o espaço,
     então abrir continua sem mexer em nada. */
  lista.style.marginBottom = `${-Math.ceil(maior)}px`;
  if (grade) grade.style.paddingBottom = `${Math.ceil(maior)}px`;
}

export function ListaFaq({ itens }: Props) {
  const [aberta, setAberta] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEfeitoLayout(() => {
    const lista = ref.current;
    if (!lista) return;
    reservarAltura(lista);

    let largura = lista.getBoundingClientRect().width;
    const observador = new ResizeObserver(([entrada]) => {
      const nova = entrada.contentRect.width;
      if (Math.abs(nova - largura) < 1) return;
      largura = nova;
      reservarAltura(lista);
    });
    observador.observe(lista);
    // A fonte do título pode chegar depois e mudar a quebra das respostas.
    document.fonts?.ready.then(() => reservarAltura(lista));
    return () => observador.disconnect();
  }, [itens]);

  return (
    <div ref={ref} className="faq-lista">
      {itens.map((item, i) => (
        <Revelar key={item.pergunta} atraso={i * 0.05}>
          <ItemFaq
            pergunta={item.pergunta}
            resposta={item.resposta}
            aberto={aberta === i}
            aoAlternar={() => setAberta((atual) => (atual === i ? null : i))}
          />
        </Revelar>
      ))}
    </div>
  );
}
