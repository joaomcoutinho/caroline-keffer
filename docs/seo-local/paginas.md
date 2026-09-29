# Páginas de SEO local — mapa e pendências

> Construídas em 27/09/2026. Copy em `site/content/paginas.ts`, layout em
> `site/components/paginas/`. Régua: skill `checklist-final` (modo construção).
> **Estado: prévia local.** O site continua com `noindex` até a aprovação.

## Mapa

| URL | Título (≤ 62) | H1 | Termo principal |
|---|---|---|---|
| `/especialidades/` | Especialidades veterinárias na Torre, Recife \| Caroline Keffer | Cinco especialidades veterinárias atendendo na Torre. | especialista veterinário Recife |
| `/especialidades/cardiologia/` | Cardiologista veterinário na Torre, Recife \| Caroline Keffer | Cardiologia veterinária na Torre, em Recife. | cardiologista veterinário Recife |
| `/especialidades/dermatologia/` | Dermatologista veterinário na Torre, Recife \| Caroline Keffer | Dermatologia veterinária na Torre, em Recife. | dermatologista veterinário Recife |
| `/especialidades/nefrologia/` | Nefrologia veterinária na Torre, Recife \| Caroline Keffer | Nefrologia veterinária: os rins do seu pet, na Torre. | nefrologista veterinário, doença renal gato |
| `/especialidades/pneumologia/` | Pneumologia veterinária na Torre, Recife \| Caroline Keffer | Pneumologia veterinária na Torre, em Recife. | tosse cachorro, pneumologista veterinário |
| `/especialidades/nutricao-e-gastroenterologia/` | Nutrição e gastroenterologia veterinária \| Torre, Recife | Nutrição e gastroenterologia veterinária na Torre. | nutricionista veterinário Recife |
| `/cirurgia-veterinaria/` | Cirurgia veterinária na Torre, Recife \| Caroline Keffer | Cirurgia veterinária na Torre, em Recife. | cirurgia veterinária, castração, limpeza de tártaro |
| `/exames-de-imagem/` | Raio-x, ultrassom e eletro para pets \| Torre, Recife | Raio-x, ultrassom e eletrocardiograma para pets na Torre. | ultrassom veterinário Recife |
| `/check-up-veterinario/` | Check-up veterinário para cães e gatos \| Torre, Recife | Check-up veterinário: o que fazer em cada fase da vida. | check-up veterinário, pet idoso |
| `/planos-de-saude-pet/` | Plano de saúde pet aceito na Torre, Recife \| Caroline Keffer | Planos de saúde pet aceitos na clínica, na Torre. | clínica credenciada Petlove/Plamev/… Recife |
| `/equipe/` | Dra. Caroline Keffer e equipe \| Veterinária na Torre, Recife | Dra. Caroline Keffer e a equipe da clínica. | Dra. Caroline Keffer (busca pelo nome) |
| `/banho-e-tosa/` | Banho e tosa na Torre, Recife \| Clínica Pet Caroline Keffer | Banho e tosa na Torre, dentro da clínica veterinária. | banho e tosa Torre |

A home continua dona de "veterinário na Torre / clínica veterinária Recife". Nenhuma página
interna disputa esse termo (regra de canibalização).

## Esqueleto comum

1. **Topo** — sobretítulo (sem trilha de navegação, decisão de 27/09/2026) · H1 com o termo · **resposta direta na 1ª frase** · CTA de
   WhatsApp com mensagem própria da página · endereço, nota e horário · linha de revisão clínica.
2. **Blocos** alternando tom com a onda da parede do consultório (igual à home).
3. **Dúvidas** — perguntas reais, uma aberta por vez (`ListaFaq`).
4. **Continue por aqui** — três páginas relacionadas (link interno).
5. **Fechamento escuro** com o rodapé, que agora lista todas as páginas.

Dados estruturados por página (`@graph`, sem `BreadcrumbList` porque a trilha não aparece na tela): `VeterinaryCare` (mesmo `@id` da home) · `WebPage` ·
`Service` · `FAQPage`. `reviewedBy` só entra
quando a Dra. Carol revisar (`revisao.por` em `content/paginas.ts`).

## Check-up — estrutura do conteúdo

1. **Topo:** "de quanto em quanto tempo" respondido na 1ª frase (anual; semestral a partir de 7 anos).
2. **O check-up em cada fase da vida** — filhote, adulto, 7+ em três cartões **todos abertos**
   (na home é um seletor; aqui o texto precisa estar no HTML) + faixa de sinais de alerta.
3. **O que entra no check-up** — exame físico, hemograma, bioquímico, urinálise, fezes, imagem
   quando indicado (link para `/exames-de-imagem/`).
4. **Por que o check-up acha o que ele não mostra** — a lógica da linha de base, com a foto do laboratório.
5. **Dúvidas** — frequência, exames, jejum, cobertura do plano.

## ⚠️ Validar com a clínica antes de publicar

**Bloqueia a publicação (conteúdo de saúde, YMYL):**
- [ ] **Revisão clínica da Dra. Carol** de todas as páginas. Ao aprovar, preencher
      `revisao.por` em `content/paginas.ts` — a página passa a dizer "Revisado por" e o schema
      ganha `reviewedBy`.
- [ ] **CRMV** da Dra. Carol, Dra. Isa e de cada especialista (JM solicitando).
- [ ] **Nome de cada especialista** → `especialistas` em `content/paginas.ts`. Enquanto vazio,
      o site mostra "Nome a confirmar".

**Afirmações sobre a operação (marcadas `VALIDAR` no código):**
- [ ] Especialidades: marca direto com especialista sem passar pela clínica geral? Dias de atendimento?
- [ ] Cirurgia: faz **castração**? Lista de procedimentos de cada área. Orientação de jejum por escrito? Tipo de anestesia/monitoramento.
- [ ] Cardiologia: faz **ecocardiograma**? Afere **pressão arterial**? (hoje o texto só cita ECG e raio-x)
- [ ] Nefrologia: faz SDMA / pressão arterial?
- [ ] Dermatologia: raspado e citologia são feitos na clínica?
- [ ] Nutrição: formula **alimentação natural**?
- [ ] Exames de imagem: horas de jejum do ultrassom; sedação no raio-x; **aceita pedido de outro veterinário**; prazo do laudo.
- [ ] Check-up: tempo de jejum para exame de sangue.
- [ ] Planos: o que o tutor leva no dia (carteirinha digital? documento?).
- [ ] Equipe: dá para escolher a veterinária ao agendar? Formação da Dra. Carol.
- [ ] Banho e tosa: lista de serviços (hidratação, corte de unhas, limpeza de ouvido…).

**Fotos que faltam:**
- [ ] Aparelhos de raio-x, ultrassom e eletrocardiograma (a página de imagem usa o consultório).
- [ ] Especialistas (retrato no mesmo padrão da equipe).

## Também mudou nesta entrega

- Menu e rodapé usam `next/link` com `/#seção` — funcionam de qualquer página e somam o basePath do Pages.
- Rodapé ganhou a coluna **Serviços** com as 7 páginas (link rastreável em todas as páginas).
- Painel de serviços da home ganhou **"Saiba mais sobre …"** abaixo do CTA.
- Schema da home: `telephone` = WhatsApp e `@id` da clínica.
- `sitemap.xml` com as 12 páginas (`lastmod` = data de revisão, não do build).
- `llms.txt` corrigido: tirava vacinação (fora do catálogo) e tratava especialidade como encaminhamento.
