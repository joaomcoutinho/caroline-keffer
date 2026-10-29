import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { paginas } from "@/content/paginas";
import { RolarAteAncora } from "@/components/ui/RolarAteAncora";

const pagina = paginas["como-chegar"];

export const metadata = metadadosDe(pagina);

export default function PaginaComoChegar() {
  return (
    <>
      <PaginaSeo pagina={pagina} />
      <RolarAteAncora />
    </>
  );
}
