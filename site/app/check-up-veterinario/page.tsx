import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["check-up"];

export const metadata = metadadosDe(pagina);

export default function PaginaCheckUp() {
  return <PaginaSeo pagina={pagina} />;
}
