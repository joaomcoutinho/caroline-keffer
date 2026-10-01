import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["ortopedia"];

export const metadata = metadadosDe(pagina);

export default function PaginaOrtopedia() {
  return <PaginaSeo pagina={pagina} />;
}
