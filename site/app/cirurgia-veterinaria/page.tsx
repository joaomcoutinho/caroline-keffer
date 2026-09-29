import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["cirurgia"];

export const metadata = metadadosDe(pagina);

export default function PaginaCirurgia() {
  return <PaginaSeo pagina={pagina} />;
}
