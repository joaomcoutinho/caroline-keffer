import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";

const pagina = paginas["banho-e-tosa"];

export const metadata = metadadosDe(pagina);

export default function PaginaBanhoTosa() {
  return <PaginaSeo pagina={pagina} />;
}
