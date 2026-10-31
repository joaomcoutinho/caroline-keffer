import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["acupuntura"];

export const metadata = metadadosDe(pagina);

export default function PaginaAcupuntura() {
  return <PaginaSeo pagina={pagina} />;
}
