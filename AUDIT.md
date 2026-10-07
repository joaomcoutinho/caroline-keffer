# Auditoria — Clínica Pet Caroline Keffer · 2026-10-06

**URL auditada:** https://joaomcoutinho.github.io/caroline-keffer/ (prévia no GitHub Pages)
**Domínio do cliente:** clinicapetcarolinekeffer.com.br — **ainda não resolve** (DNS vazio)
**Perfil:** institucional estático (Next.js `output: export`, GitHub Pages) · **Jurisdição:** BR
**Recorrência:** não respondida — tratada como **não** até alguém dizer o contrário
**Escopo pedido:** arquivos e configuração técnica de SEO, política de privacidade, termos e cookies
**Módulos rodados:** 00, 01, 02, 06 (régua: blocos 1, 2, 3, 5, 6, 11, 12, 15)

> ⚠️ Auditado no subdomínio da plataforma, não no domínio do cliente.
> O que depende do domínio (www × apex, e-mail, robô na borda) ficou em "Não verificado".

## Resumo

A base técnica estava boa: 404 de verdade, sitemap fiel às 38 páginas, OG e canônica
em todas as páginas, zero rastreador, e uma política de privacidade que descreve este
site de fato. Foram corrigidos 6 defeitos, nenhum crítico. O que falta agora não é
código: é o **domínio no ar** e a **decisão sobre medição**.

## Crítico

- [ ] **O site ainda não está no domínio da clínica** — ausência (P0-1).
  **Evidência:** `dig +short clinicapetcarolinekeffer.com.br` → vazio.
  **Conserto:** registrar/apontar o domínio e fazer a virada (abaixo) · **Custo:** 30 min + propagação

- [ ] **Nenhuma medição instalada** — ausência (P0-4). Não é falha de conformidade: é a
  clínica sem nenhum dado sobre o próprio site.
  **Evidência:** navegador em 2 páginas → 0 cookie, 0 storage, único host carregado
  `joaomcoutinho.github.io`.
  **Conserto:** responder a pergunta de recorrência e então decidir. Search Console e Bing
  Webmaster **não usam cookie** e entram em qualquer cenário assim que o domínio existir.
  GA4/Clarity só com banner (Aceitar/Recusar em peso igual) **e** a política atualizada antes.

## Importante — corrigido nesta auditoria

- [x] **Nota do Google marcada como avaliação da clínica** — defeito (bloco 16).
  `aggregateRating` (4,8 · 130) no `VeterinaryCare` da home, sem avaliação publicada no site.
  Removido do JSON-LD; a nota continua no texto. `components/DadosEstruturados.tsx`
- [x] **Urgência "até as 18h nos dias de funcionamento"** — defeito: no sábado a clínica fecha
  às 16h. Estava em 7 textos, incluindo FAQ com `FAQPage`, termos de uso e `llms.txt`.
  Agora: "até as 18h de segunda a sexta e até as 16h no sábado".
- [x] **`llms.txt` listava a Gerlane (recepção)**, que saiu da equipe em 02/10.
- [x] **404 com canônica para a home e duas metas robots** — defeito (bloco 2).
  `app/not-found.tsx`: canônica removida; fica só o `noindex` que o Next emite.
- [x] **`lastmod` da home era a data do build** — defeito (bloco 2): mudava a cada deploy.
  Agora vem de `meta.revisao` em `content/site.ts`. Saíram `changefreq` e `priority`
  (ignorados pelo Google). Páginas que mudaram de texto hoje ganharam `2026-10-06`.
- [x] **Virada para o domínio dependia de 3 ajustes manuais** (basePath, URL, liberar
  indexação) — esquecer um deixava o site no ar sem indexar ou com canônica no github.io.
  Agora é **uma variável** no GitHub. Build dos dois modos testado (ver "Passou").

## Nice-to-have

- [ ] **`BreadcrumbList`** nas páginas internas, junto com uma trilha visível
  (ex.: Especialidades › Cardiologia). Hoje não há nenhuma das duas — não é defeito.
- [ ] **`og:image` por página.** Todas usam `og.jpg` (carrega, 1200×630). Uma imagem por
  serviço melhora o card no WhatsApp, que é por onde o site mais circula.
- [ ] **Decisão escrita sobre robô de treino de IA** (GPTBot, Google-Extended).
  Hoje nenhum é bloqueado, o que é o padrão seguro. É do dono, não da agência.

## Como virar para o domínio

1. Apontar o DNS do domínio para o GitHub Pages (apex: registros A do Pages; `www`: CNAME
   para `joaomcoutinho.github.io`).
2. Repositório → Settings → Pages → **Custom domain** = `clinicapetcarolinekeffer.com.br`
   e marcar **Enforce HTTPS** depois do certificado sair.
3. Settings → Secrets and variables → Actions → **Variables** → `SITE_DOMINIO` =
   `clinicapetcarolinekeffer.com.br`. Rodar o workflow (aba Actions → Run workflow).
4. Conferir: `curl -sI https://www.clinicapetcarolinekeffer.com.br/equipe/` → 301 para o
   apex **com o caminho**; `robots.txt` com `Allow: /`; home sem `noindex`.
5. Search Console + Bing Webmaster, enviar `sitemap.xml`.

## Passou

- 404 real: URL inventada → status 404, página na identidade do site, com atalhos e WhatsApp
- `robots.txt` e `noindex` na prévia — correto: a prévia não compete com o domínio (GP-01)
- Build no modo domínio: `Allow: /` + sitemap absoluto, home indexável, canônica/OG/JSON-LD
  no domínio, arquivos na raiz; servido localmente, 7/7 URLs → 200
- Sitemap com as 38 páginas reais, sem página morta, `lastmod` pela revisão de conteúdo
- Título, descrição, canônica para si mesma e OG/Twitter em cada página (amostra de 6)
- `og:image` absoluta e carregando (200, `image/jpeg`)
- Favicon: `.ico` (200) + PNG 512 + apple-icon. Na home o Next não lista o `.ico`, mas o
  navegador pede `/favicon.ico` na raiz e ele existe — não é achado
- `lang="pt-BR"`, um `<h1>` por página, conteúdo e links no HTML servido (sem depender de JS)
- JSON-LD: `VeterinaryCare` com razão social, CNPJ, endereço e horário; `WebPage` com
  `dateModified`, `FAQPage` e `Service` nas internas
- Zero cookie, zero `localStorage`/`sessionStorage`, zero iframe, zero host de terceiro,
  fontes servidas pelo próprio site — **sem banner, porque não há o que consentir**
- Política de privacidade: controlador com razão social e CNPJ, finalidades, compartilhamento,
  prazo numérico (prontuário ≥ 5 anos, CFMV 1.321/2020), canal do titular com prazo de 15 dias
- Termos de uso: conteúdo informativo, emergência, agendamento, valores, planos
- Rodapé: links de política e termos em todas as páginas; CNPJ visível
- Toda imagem com `alt`; console sem erro em 2 páginas

## Não verificado

- **www × apex e HTTPS no domínio** — o domínio não existe ainda
- **Robô de IA bloqueado na borda** (`OAI-SearchBot` etc.) — só dá para testar no domínio
- **E-mail** (SPF/DMARC/MX) — o contato é `@gmail.com`, então não se aplica ao domínio hoje
- **Rich Results Test** — rodar depois da virada, uma amostra por tipo de página
- **Perfil da Empresa no Google** — fora do escopo pedido
- **Contraste e teclado** — fora do escopo pedido

## Limites desta auditoria

GitHub Pages não deixa definir cabeçalho HTTP; sem login no site, a falta de CSP/HSTS não é
achado (bloco 15). Dado de campo de performance não existe num site sem tráfego.
O playbook usado tem menos de 12 meses de revisão.
