import { contato, empresa, meta, faq } from "@/content/site";

/**
 * JSON-LD VeterinaryCare — é o que faz a clínica aparecer no mapa e ser citada
 * por buscador de IA. Os dados vêm todos do content/site.ts, então não há
 * chance de divergir do que está escrito na página.
 *
 * ⚠️ Horário e telefone ainda pendentes de validação com a clínica (ver brief.md).
 */
/** Pino da ficha no Google Maps (pelo CID, lido em 28/10/2026). */
export const geoClinica = {
  "@type": "GeoCoordinates",
  latitude: -8.04408,
  longitude: -34.91758,
};

/* Horário confirmado pela clínica em 01/10/2026 — o mesmo do Perfil da Empresa.
   Exportado para as páginas internas repetirem na entidade (seo-mxc 1.41). */
export const horarioClinica = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:00",
    closes: "16:00",
  },
];

export function DadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    /* VeterinaryCare herda de MedicalOrganization, não de LocalBusiness: o par
       é o que faz o Google ler endereço e horário como negócio local. */
    "@type": ["VeterinaryCare", "LocalBusiness"],
    /* Âncora da entidade: as páginas internas apontam para este @id em vez de
       repetir o objeto inteiro (ver components/paginas/DadosPagina.tsx). */
    "@id": `${meta.url}/#clinica`,
    name: "Clínica Pet Caroline Keffer",
    /* O Perfil da Empresa e o letreiro dizem "Clínica Veterinária" (28/10/2026):
       o nome alternativo liga as duas formas à mesma entidade. */
    alternateName: contato.nomePerfilGoogle,
    description: meta.descricao,
    url: meta.url,
    /* O WhatsApp é o telefone principal (JM, 27/09/2026) — é o mesmo número que
       vai como principal no Perfil da Empresa no Google. */
    telephone: "+5581993037584",
    email: contato.email,
    legalName: empresa.razaoSocial ?? undefined,
    taxID: empresa.cnpj ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: contato.endereco,
      addressLocality: "Recife",
      addressRegion: "PE",
      postalCode: contato.cep,
      addressCountry: "BR",
    },
    /* O Perfil da Empresa no Google (pelo CID) entra no `sameAs` e no `hasMap`:
       é o que amarra o site à ficha do mapa. */
    sameAs: [contato.instagram, contato.mapa],
    hasMap: contato.mapa,
    geo: geoClinica,
    openingHoursSpecification: horarioClinica,
    /* Sem `aggregateRating` (06/10/2026, checklist-final bloco 16): a nota é
       do Google, não de avaliações publicadas aqui. Marcá-la como da própria
       clínica é avaliação auto-atribuída, que o Google trata como marcação
       enganosa e não exibe. A nota continua no texto da página. */
  } satisfies Record<string, unknown>;

  /**
   * FAQPage: é o que permite ao Google mostrar as respostas direto no resultado
   * de busca. As perguntas vêm do mesmo `content/site.ts` que a dobra renderiza,
   * então o que o buscador lê é exatamente o que o tutor vê — que é a regra do
   * schema, e o que evita penalização por conteúdo divergente.
   */
  const perguntas = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  } satisfies Record<string, unknown>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(perguntas) }}
      />
    </>
  );
}
