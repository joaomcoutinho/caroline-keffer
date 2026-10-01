import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["castracao"];

export const metadata = metadadosDe(pagina);

export default function PaginaCastracao() {
  return <PaginaSeo pagina={pagina} />;
}
