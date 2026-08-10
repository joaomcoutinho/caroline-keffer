import { contato, meta, faq } from "@/content/site";

/**
 * JSON-LD VeterinaryCare — é o que faz a clínica aparecer no mapa e ser citada
 * por buscador de IA. Os dados vêm todos do content/site.ts, então não há
 * chance de divergir do que está escrito na página.
 *
 * ⚠️ Horário e telefone ainda pendentes de validação com a clínica (ver brief.md).
 */
export function DadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: "Clínica Pet Caroline Keffer",
    description: meta.descricao,
    url: meta.url,
    telephone: "+558132685979",
    address: {
      "@type": "PostalAddress",
      streetAddress: contato.endereco,
      addressLocality: "Recife",
      addressRegion: "PE",
      postalCode: contato.cep,
      addressCountry: "BR",
    },
    sameAs: [contato.instagram],
    openingHoursSpecification: [
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
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "130",
    },
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
