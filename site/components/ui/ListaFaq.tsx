"use client";

import { useState } from "react";
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
export function ListaFaq({ itens }: Props) {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <div className="faq-lista">
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
