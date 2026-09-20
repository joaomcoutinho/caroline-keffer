import Image from "next/image";
import { Revelar } from "@/components/ui/Revelar";
import { NumeroContado } from "@/components/ui/NumeroContado";
import { caminhoPublico } from "@/lib/caminho";
import { prova } from "@/content/site";

/**
 * Dobra dos três números reais.
 *
 * 17/09/2026 (JM: "um ícone, um número grande e uma descrição está muito
 * genérico; use uma imagem da Carol ou da clínica"). Cada número virou um
 * CARTAZ: a foto real que prova aquele número. Desde 19/09/2026 ela é um
 * OVAL — o dedo do hero sem o giro — e o número fica embaixo dela, centrado:
 * no pé de uma elipse não cabe texto.
 *
 * - 4,8 → uma tutora com o pet no colo (quem avalia);
 * - 20+ anos → a fachada (o mesmo endereço desde sempre);
 * - 5 especialidades → o especialista atendendo.
 *
 * A ordem da página mudou junto: esta dobra vem DEPOIS de serviços (JM, mesma
 * data: "a segunda seção tem que ser o que ela faz").
 *
 * Os cartazes NÃO são clicáveis, então não têm hover de card nem halo. O que
 * se move é a foto: entra sem cor e ganha cor quando chega na tela.
 */
export function Prova() {
  return (
    <section className="faixa-numeros fundo-patas relative isolate overflow-hidden bg-surface-2 px-4 py-8 sm:px-8 sm:py-14 md:py-16">
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-3 gap-2.5 sm:gap-5">
        {prova.itens.map((item, i) => (
          <Revelar key={item.rotulo} atraso={i * 0.08} className="h-full">
            <figure className="cartaz-numero">
              <div className="cartaz-oval moldura-pata">
                <Image
                  src={caminhoPublico(item.foto)}
                  alt={item.fotoAlt}
                  fill
                  sizes="(max-width: 640px) 33vw, 360px"
                  className="cartaz-foto object-cover"
                  style={{ objectPosition: item.fotoPosicao }}
                />
              </div>

              <figcaption className="cartaz-texto">
                <p className="cartaz-valor font-display">
                  <NumeroContado alvo={item.alvo} casas={item.casas} sufixo={item.sufixo} />
                </p>
                <p className="cartaz-rotulo">{item.rotulo}</p>
                <p className="cartaz-nota">{item.nota}</p>
              </figcaption>
            </figure>
          </Revelar>
        ))}
      </div>
    </section>
  );
}
