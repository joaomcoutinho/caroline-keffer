import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { meta, ehProposta } from "@/content/site";
import "./globals.css";

/*
  TIPOGRAFIA.

  18/09/2026 (JM): os títulos passam para o desenho da RECOLETA, a fonte que a
  Caroline já usa no Instagram — serifa macia, de terminais redondos, registro
  anos 70 e acolhedor. A Recoleta é paga (Latinotype) e não temos os arquivos,
  então entra a FRAUNCES, do Google, com o eixo `SOFT` no máximo: é o clone
  livre mais próximo. Os terminais e as gotas ficam quase iguais; a diferença
  fica no eixo óptico, que aqui joga a favor (`opsz` acompanha o tamanho).
  Se um dia os arquivos da Recoleta chegarem, basta trocar esta importação por
  `next/font/local` — a variável `--fonte-titulo` continua a mesma.

  O corpo continua na NUNITO SANS (decisão de 11/09/2026: "uma fonte mais suave
  e acolhedora"). Serifa no título e sans redonda no texto é o mesmo par que
  o Instagram dela já faz.

  ⚠️ As variáveis são nomeadas pelo PAPEL (`--fonte-titulo`/`--fonte-corpo`) e
  não pelo nome da fonte, que era o caso antes (`--font-bricolage`). Nomear pela
  fonte obriga a renomear tudo a cada troca de tipografia.
*/
const fonteTitulo = Fraunces({
  variable: "--fonte-titulo",
  subsets: ["latin"],
  display: "swap",
  // Variável: um arquivo só cobre todos os pesos. SOFT e opsz são os eixos
  // que aproximam da Recoleta (ver `--font-display` em globals.css).
  axes: ["SOFT", "opsz"],
});

const fonteCorpo = Nunito_Sans({
  variable: "--fonte-corpo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: meta.titulo,
  description: meta.descricao,
  alternates: { canonical: "/" },
  // Enquanto for proposta, nenhum buscador indexa (ver `ehProposta` em content/site.ts).
  robots: ehProposta ? { index: false, follow: false } : undefined,
  openGraph: {
    title: meta.titulo,
    description: meta.descricao,
    url: meta.url,
    siteName: "Clínica Pet Caroline Keffer",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${meta.url}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Fachada da Clínica Veterinária Caroline Keffer, na Torre, ao lado da chamada do site",
      },
    ],
  },
  // O WhatsApp, que é por onde este site mais circula, lê o card do Twitter.
  twitter: {
    card: "summary_large_image",
    title: meta.titulo,
    description: meta.descricao,
    images: [`${meta.url}/og.jpg`],
  },
};

export const viewport: Viewport = {
  // Uma cor só: o site não acompanha mais o tema do sistema (ver THEME LOCK
  // em globals.css). Duas entradas aqui pintariam a barra do navegador de
  // escuro numa página que é clara.
  // Acompanha --surface (atualizado com a escala mais azul de 09/09/2026).
  themeColor: "#cce4f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fonteTitulo.variable} ${fonteCorpo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
