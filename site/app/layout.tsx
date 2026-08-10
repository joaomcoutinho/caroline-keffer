import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { meta, ehProposta } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2129" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
