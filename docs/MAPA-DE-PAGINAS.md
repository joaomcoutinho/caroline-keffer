---
tags: [mxc, seo, mapa-de-paginas, caroline-keffer]
---

# Mapa de páginas — Clínica Pet Caroline Keffer

> **Proposta da MXC, ainda não aprovada pela clínica.** As páginas principais (home, consulta,
> gatos, planos, castração, vacinação, limpeza de tártaro, cirurgia, especialidades, equipe) só
> viram escopo depois do ok da Dra. Carol (0.27). Nada foi apagado nem mudado no site por este
> documento: ele registra o que a régua diz sobre as **38 páginas que estão no ar** em 29/10/2026.
>
> Base: `ESTUDO-DE-DEMANDA.md` (mesma pasta, coleta de 29/10/2026, local Recife) e o mapa antigo de
> `docs/seo-local/paginas.md` (12 páginas, 27/09/2026). Title e H1 lidos do HTML no ar em
> 29/10/2026 (`curl` de cada URL do `sitemap.xml`).


> **Decisão de 29/10/2026 (JM):** as 6 páginas `/como-chegar/<bairro>/` viraram seções do hub
> `/como-chegar/` (âncoras #gracas, #madalena, #jaqueira-e-parnamirim, #zumbi, #cordeiro,
> #iputinga), com 301 de cada URL antiga. Cardiologia × eletrocardiograma ficam separadas:
> no Google (aba anônima, 29/10) as duas buscas dividem só 3 de 10 resultados (Kardyo, Instagram
> da Kardyo e PetHealth Recife), então são vizinhas e passam a se linkar nos dois sentidos.

## Réguas deste site

- **Copy:** a home converte; as internas existem pra busca (H1 e H2 com o que se digita).
- **Tipo de negócio:** balcão com 1 unidade (Rua Araguatins, 63, Torre, Recife/PE).
- **Breadcrumb:** sem trilha na tela e sem `BreadcrumbList` (decisão de 27/09/2026). O site tem 2
  níveis (`/especialidades/…`, `/exames-de-imagem/…`, `/planos-de-saude-pet/…`, `/como-chegar/…`),
  então a régua pede trilha + `BreadcrumbList` nesses níveis: **pendência a decidir**, não mudada aqui.
- **Robôs de treino de IA:** liberados por padrão (`robots.txt` com `Allow: /`); decisão da clínica
  ainda não tomada (0.10).
- **Regra do conselho:** CFMV (Res. 1.649/2025): nome e CRMV-PE 3053 da responsável técnica em toda
  página; sem preço de procedimento (consulta pode). A tabela de preço da Lei PE 16.559/2019 está
  com o advogado da clínica (1.121).
- **Dono da revisão:** em todas as páginas, a revisão clínica é da **Dra. Carol** e está
  **pendente** (`revisao.por: null` no código; nenhuma página diz "Revisado por"; item 1.45). A MXC
  cuida da parte técnica no plano mensal. Por isso o portão 5 está ⚠ em todas.

## Páginas

Portões: **D** demanda · **I** intenção distinta pelo top 10 · **C** conteúdo que só a clínica tem
· **E** lugar na estrutura (recebe link e leva ao WhatsApp) · **R** dono da revisão.
✓ passa · ⚠ passa com ressalva · ✗ reprova. Demanda = sugestão do autocomplete (AC) ou busca com
fornecedor local; **sem dado de volume, prioridade por intenção**. Intenção = sobreposição do top 10
(DuckDuckGo, aproximação). E: todas recebem link do rodapé ou do hub e têm CTA de WhatsApp com
mensagem própria da página (conferido no HTML).

| Prio. | URL | Tipo | Busca dona | O que digitam (secundários) | Momento | Title atual | H1 atual | Perguntas que responde | Prova que só a clínica tem | CTA (WhatsApp) | Origem | Status | Portões D·I·C·E·R |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `/` | home | veterinário / clínica veterinária Torre Recife | Caroline Keffer, clínica caroline keffer, caroline keffer pet shop, clínica veterinária Recife | decisão | Veterinária na Torre, Recife \| Clínica Pet Caroline Keffer | Tudo para seu pet, onde ele se sente em casa. | quanto custa a consulta; atende gato; pet estressado; emergência 24h; agendar ou chegar; estacionamento; planos | 20+ anos, Dra. Carol (CRMV-PE 3053), 142 avaliações 4,8, fotos reais | por serviço e por plano | briefing | existe | ✓·✓·✓·✓·⚠ |
| 1 | `/veterinario-para-gatos/` | segmento (1.81) | veterinária gatos Recife (AC) | veterinário para gatos, gato não faz xixi, gato precisa ir todo ano | fornecedor | Veterinário para gatos na Torre, Recife \| Caroline Keffer | Veterinário para gatos na Torre, em Recife. | atende gato; todo ano; gato macho sem xixi; castra gato; vacina gato de casa | avaliação "orientações… para minha felina"; manejo calmo | página de gatos | briefing | existe | ✓·✓ (2/10 com consulta)·✓·✓·⚠ |
| 1 | `/planos-de-saude-pet/` | convênio (hub) | clínica que aceita plano de saúde pet Recife (AC "clínica veterinária que aceita petlove") | credenciada PetHealth, CARE, Petlove, Pet Top, Plamev | fornecedor | Plano de saúde pet aceito na Torre, Recife \| Caroline Keffer | Planos de saúde pet aceitos na clínica, na Torre. | aceita Petlove; plano fora da lista; carência; cobre cirurgia e imagem | os 5 convênios confirmados pela clínica (11/09) | por plano | briefing | existe | ✓·✓ (não disputa "plano de saúde pet Recife", que é de vendedor de plano)·✓·✓·⚠ |
| 1 | `/odontologia-veterinaria/` | serviço | limpeza de tártaro cachorro Recife (AC) | dentista veterinário Recife (AC), limpeza de tártaro valor, sem anestesia, idoso | fornecedor | Limpeza de tártaro em pets na Torre, Recife \| Caroline Keffer | Limpeza de tártaro e odontologia veterinária na Torre. | precisa de anestesia; idoso; de quanto em quanto tempo; pasta de gente; plano cobre | anestesia e cirurgia no mesmo endereço | avaliação da boca | briefing | existe (URL em jargão, title certo: não mudar URL) | ✓·✓ (1/10 com cirurgia)·⚠ (falta foto do procedimento)·✓·⚠ |
| 2 | `/consulta-veterinaria/` | serviço | consulta veterinária Recife (AC) | quanto custa uma consulta veterinária (AC), primeira consulta, horário | fornecedor | Consulta veterinária na Torre, Recife \| Caroline Keffer | Consulta veterinária de clínica geral, para cães e gatos. | precisa marcar; horário; quanto custa; atende gato; plano | Dra. Carol e Dra. Isa (CRMV-PE 6871), sempre os mesmos rostos | consulta / primeira vez | briefing | ajustar (diferenciar da home) | ✓·**⚠ 4-5/10 iguais a "veterinário/clínica veterinária Recife" (home)**·✓·✓·⚠ |
| 2 | `/castracao-de-caes-e-gatos/` | serviço | castração gato / cachorro Recife (AC) | castração preço/valor (sem preço: CFMV), idade, engorda | fornecedor | Castração de cães e gatos na Torre, Recife \| Caroline Keffer | Castração de cães e gatos na Torre, em Recife. | idade; internação à noite; engorda; exame antes; quanto custa; plano | exames antes, anestesia monitorada, internação de dia | avaliação | briefing | existe | ✓·✓ (gato × cachorro 5/10: 1 página certa; cirurgia 0/10)·✓·✓·⚠ — busca tomada pelo gratuito |
| 2 | `/cirurgia-veterinaria/` | serviço (hub de cirurgia) | cirurgia veterinária Recife | jejum, idoso pode operar, internação | fornecedor | Cirurgia veterinária na Torre, Recife \| Caroline Keffer | Cirurgia veterinária na Torre, em Recife. | dorme internado; castração; jejum; idade; idoso; plano | internação de dia, explicada | avaliação | briefing | existe | ✓·✓ (ortopedia 3/10: vizinhas com link)·⚠ (procedimentos a VALIDAR)·✓·⚠ |
| 2 | `/vacinacao-de-caes-e-gatos/` | serviço | vacina cachorro / gato Recife (AC) | **vacina V10, V8 (cão), V4, V5 (gato)** (AC), antirrábica, giárdia, gripe | solução | Vacinação de cães e gatos na Torre, Recife \| Caroline Keffer | Vacinação de cães e gatos na Torre, em Recife. | idade da 1ª; antirrábica anual; ProHeart; reforço atrasado; gato de casa; mesmo dia | calendário montado na consulta | vacinar | briefing | **ajustar: o texto diz "polivalente" e não tem "V10/V8/V4/V5" em lugar nenhum** | ✓·✓·✓·✓·⚠ — busca tomada pela campanha pública |
| 2 | `/especialidades/cardiologia/` | serviço | cardiologista veterinário Recife (AC) | sopro no coração cachorro (AC), ecocardiograma (VALIDAR), cardiopata | fornecedor | Cardiologista veterinário na Torre, Recife \| Caroline Keffer | Cardiologia veterinária na Torre, em Recife. | sopro é grave; cardiopata passeia; idoso antes de cirurgia | ECG e raio-x na clínica | cardiologia | briefing | ajustar (nome e CRMV do especialista) | ✓·**✗ 6/10 iguais ao eletrocardiograma**·⚠ (especialista sem nome)·✓·⚠ |
| 2 | `/especialidades/dermatologia/` | serviço | dermatologista veterinário Recife (AC) | cachorro com coceira (AC), otite, queda de pelo | fornecedor | Dermatologista veterinário na Torre, Recife \| Caroline Keffer | Dermatologia veterinária na Torre, em Recife. | coceira é alergia; otite volta; shampoo | exame de pele na consulta (VALIDAR) | dermatologia | briefing | ajustar (especialista) | ✓·✓·⚠·✓·⚠ |
| 2 | `/especialidades/nefrologia/` | serviço | nefrologista veterinário Recife (AC) | **doença renal gato, gato bebendo muita água** (AC) | fornecedor / problema | Nefrologia veterinária na Torre, Recife \| Caroline Keffer | Nefrologia veterinária: os rins do seu pet, na Torre. | doença renal tem cura; idade do exame; gato bebe muita água | sangue, urina e ultrassom no mesmo lugar | nefrologia | briefing | **ajustar title** (tutor busca "nefrologista" e "doença renal", o title diz "Nefrologia veterinária") | ✓·✓·⚠·✓·⚠ |
| 2 | `/equipe/` | sobre | Dra. Caroline Keffer (AC "caroline keffer veterinaria") | veterinária da Torre | decisão | Dra. Caroline Keffer e equipe \| Veterinária na Torre, Recife | Dra. Caroline Keffer e a equipe da clínica. | quem atende; mesma veterinária; há quanto tempo; banho e tosa | CRMV-PE 3053 e 6871, fotos reais | equipe | briefing | existe (falta formação e retratos, 1.44) | ✓·✓·✓·✓·⚠ |
| 2 | `/banho-e-tosa/` | serviço | banho e tosa Recife (AC); "banho e tosa Torre" sem sugestão | preço, gato | fornecedor | Banho e tosa na Torre, Recife \| Clínica Pet Caroline Keffer | Banho e tosa na Torre, dentro da clínica veterinária. | precisa agendar; banho em gato; pele alérgica | veterinária vê pele e ouvido na hora | banho e tosa | briefing | existe | ✓·✓·✓·✓·⚠ |
| 2 | `/especialidades/` | hub | especialista veterinário Recife | — | fornecedor | Especialidades veterinárias na Torre, Recife \| Caroline Keffer | Cinco especialidades veterinárias atendendo na Torre. | passar pelo clínico antes; plano cobre; atende gato | especialistas no mesmo endereço | especialista | briefing | ajustar (nomes dos especialistas) | ⚠ (sem AC própria; passa como hub)·✓·⚠·✓·⚠ |
| 2 | `/como-chegar/` | contato / lugar (hub) | clínica Caroline Keffer endereço (marca) | estacionamento, domingo, bairros perto | decisão | Como chegar à clínica na Torre, Recife \| Caroline Keffer | Como chegar à clínica, na Torre. | onde fica; estacionar; domingo; bairros perto | trajeto e referências medidos | como chegar | pesquisa (OSM, 01/10) | existe | ✓ (contato passa sem volume)·✓·✓·✓·⚠ |
| 2 | `/planos-de-saude-pet/petlove-saude/` | convênio | Petlove Recife rede credenciada (AC) | clínica que aceita petlove (AC), coparticipação | fornecedor | Clínica credenciada Petlove Saúde em Recife \| Caroline Keffer | Clínica credenciada Petlove Saúde na Torre, em Recife. | aceita Petlove; carência; cobre cirurgia e imagem | como usar o plano ali | confirmar cobertura | briefing + pesquisa | existe | ✓·✓·⚠ (56-64% do texto igual às outras de plano)·✓·⚠ |
| 2 | `/planos-de-saude-pet/pet-top/` | convênio | Pet Top rede credenciada Recife (AC) | plano pet top recife | fornecedor | Clínica credenciada Pet Top em Recife \| Caroline Keffer | Clínica credenciada Pet Top Saúde na Torre, em Recife. | aceita; o que faz pelo plano; carência; cobertura | carteirinha digital | confirmar cobertura | briefing + pesquisa | existe | ✓·✓·⚠·✓·⚠ |
| 2 | `/planos-de-saude-pet/plamev-pet/` | convênio | Plamev Recife (AC) | clínica que aceita plamev (AC), ID Pet | fornecedor | Clínica credenciada Plamev Pet em Recife \| Caroline Keffer | Clínica credenciada Plamev Pet na Torre, em Recife. | aceita; ID Pet; coparticipação; carência; cobertura | ID Pet no app | confirmar cobertura | briefing + pesquisa | existe | ✓·✓·⚠·✓·⚠ |
| 2 | `/planos-de-saude-pet/pethealth/` | convênio | Pet Health Recife (AC) | carteirinha, token | fornecedor | Clínica credenciada PetHealth na Torre, Recife \| Caroline Keffer | Clínica credenciada PetHealth na Torre, em Recife. | aceita; o que levar; carência; cobertura | token do app | confirmar cobertura | briefing + pesquisa | existe | ✓·✓·⚠·✓·⚠ |
| 3 | `/planos-de-saude-pet/care/` | convênio | CARE Saúde Animal Recife (sem sugestão no AC) | cartão virtual, coparticipação | fornecedor | Clínica credenciada CARE em Recife \| Caroline Keffer | Clínica credenciada CARE Saúde Animal na Torre, em Recife. | aceita; coparticipação; carência; cobertura | cartão virtual | confirmar cobertura | briefing + pesquisa | existe | ⚠ (sem sugestão; passa por ser convênio aceito)·✓·⚠·✓·⚠ |
| 3 | `/especialidades/pneumologia/` | serviço | pneumologista veterinária Recife (AC) | tosse cachorro (AC), Pug ronca, gato de boca aberta | fornecedor / problema | Pneumologia veterinária na Torre, Recife \| Caroline Keffer | Pneumologia veterinária na Torre, em Recife. | tosse é gripe; Pug ronca; gato respira de boca aberta | raio-x de tórax na clínica | pneumologia | briefing | ajustar (especialista) | ✓·✓·⚠·✓·⚠ |
| 3 | `/ortopedia-veterinaria/` | serviço | ortopedista veterinário Recife (AC) | cachorro mancando (AC), patela, ligamento | fornecedor / problema | Ortopedia veterinária na Torre, Recife \| Caroline Keffer | Ortopedia veterinária na Torre, em Recife. | mancando é urgente; patela; fratura; artrose | raio-x e cirurgia ortopédica no lugar | ortopedia | briefing | existe | ✓·✓ (3/10 com cirurgia: vizinhas)·⚠·✓·⚠ |
| 3 | `/exames-laboratoriais/` | serviço | exame de sangue cachorro (AC, sem cidade) | jejum, resultado, pedido de outro veterinário | solução | Exame de sangue para pets na Torre, Recife \| Caroline Keffer | Exames laboratoriais para cães e gatos, com coleta na Torre. | jejum; urina; prazo; pedido de fora; plano | coleta no lugar, resultado explicado | coleta | briefing | existe | ✓·✓·⚠ (prazo a VALIDAR)·✓·⚠ |
| 3 | `/exames-de-imagem/` | hub | exames de imagem veterinário Recife | raio-x, ultrassom, eletro | solução | Raio-x, ultrassom e eletro para pets em Recife \| Caroline Keffer | Raio-x, ultrassom e eletrocardiograma para pets na Torre. | feito na clínica; jejum; sedação; prazo; plano | aparelhos no lugar (foto falta) | pedido de outro vet | briefing | existe (muda se o eletro for fundido) | ⚠ (hub)·✓·⚠ (sem foto dos aparelhos)·✓·⚠ |
| 3 | `/exames-de-imagem/ultrassom-veterinario/` | serviço | ultrassom veterinário Recife (sem sugestão com cidade; "ultrassom cachorro" AC) | jejum, gravidez, valor | solução | Ultrassom veterinário na Torre, Recife \| Caroline Keffer | Ultrassom veterinário na Torre, em Recife. | jejum; sedação; gestação; feito na clínica; plano | — (foto do aparelho falta) | agendar exame | briefing | existe | ✓·✓ (1/10 com raio-x)·⚠·✓·⚠ |
| 3 | `/exames-de-imagem/raio-x-veterinario/` | serviço | raio-x veterinário Recife | objeto engolido, fratura | solução | Raio-x veterinário na Torre, Recife \| Caroline Keffer | Raio-x veterinário na Torre, em Recife. | jejum; sedação; objeto engolido; feito na clínica; plano | foto do raio-x (Perfil, 28/10) | agendar exame | briefing | existe | ⚠ (sem sugestão)·✓·⚠·✓·⚠ |
| 3 | `/check-up-veterinario/` | pergunta / serviço | de quanto em quanto tempo levar o cachorro ao veterinário (AC) | check up cachorro idoso (AC), exames do check-up | problema | Check-up veterinário na Torre, Recife \| Caroline Keffer | Check-up veterinário: o que fazer em cada fase da vida. | frequência; exames; jejum; plano | exames no mesmo lugar | check-up | briefing | **ajustar title** (busca dona é a pergunta; "check-up veterinário Recife" divide 4/10 com "veterinário Recife") | ✓·⚠·✓·✓·⚠ |
| 3 | `/especialidades/nutricao-e-gastroenterologia/` | serviço | nutricionista veterinário Recife (**sem sugestão**; "gastroenterologista" também sem) | cachorro vomitando (AC, informativa), alimentação natural, obesidade | fornecedor | Nutrição e gastro veterinária em Recife \| Caroline Keffer | Nutrição e gastroenterologia veterinária na Torre. | vômito semanal; alimentação natural; sobrepeso | — | nutrição | briefing | em observação | **⚠ D: demanda não comprovada** (entra só se aparecer 2+ vezes no WhatsApp ou a clínica disser que quer vender mais)·✓·⚠·✓·⚠ |
| 4 | `/exames-de-imagem/eletrocardiograma-veterinario/` | serviço | eletrocardiograma veterinário Recife (sem sugestão com cidade; "eletrocardiograma cachorro preparo" AC) | antes da cirurgia, dói, jejum | solução | Eletrocardiograma veterinário em Recife \| Caroline Keffer | Eletrocardiograma veterinário na Torre, em Recife. | dói; jejum; quanto tempo; antes de operar; plano | — | agendar exame | briefing | **candidata a seção de cardiologia** | ⚠·**✗ 6/10 iguais a "cardiologista veterinário Recife"**·⚠·✓·⚠ |
| 4 | `/urgencia-veterinaria/` | serviço | urgência / emergência veterinária Recife (AC) | 24h (não atrair), comeu chocolate | decisão | Urgência veterinária até 18h na Torre, Recife \| Caroline Keffer | Urgência veterinária na Torre: atendimento até as 18h. | é 24h; até que horas; chocolate; avisar antes; internação | honestidade: até 18h e encaminha ao 24h | estou indo | briefing | existe (manter pela objeção; não investir) | ✓·✓·✓·✓·⚠ — V=0: 10/10 hospitais 24h |
| 4 | `/como-chegar/madalena/` | lugar (decisão do JM) | veterinário Madalena Recife (AC) | hospital veterinário madalena (AC, é da VITA24h) | fornecedor | Veterinário perto da Madalena, Recife \| Caroline Keffer | Clínica veterinária perto da Madalena, na Torre. | tem clínica perto; caminho; estacionar; urgência | trajeto medido (2,0 km) | moro na Madalena | pesquisa (OSM, 01/10) | existe (decisão do JM) | ✓·✓·**✗ 1 prova local; 80-81% do texto igual aos outros bairros**·✓·⚠ |
| 4 | `/como-chegar/cordeiro/` | lugar (decisão do JM) | veterinário Cordeiro Recife (AC) | hospital veterinário cordeiro (público) | fornecedor | Veterinário perto do Cordeiro, Recife \| Caroline Keffer | Clínica veterinária perto do Cordeiro, na Torre. | idem | trajeto medido (4,2 km) | moro no Cordeiro | pesquisa | existe (decisão do JM) | ✓·✓·✗ (76% igual à Iputinga)·✓·⚠ |
| 4 | `/como-chegar/iputinga/` | lugar (decisão do JM) | veterinário Iputinga (AC) | — | fornecedor | Veterinário perto da Iputinga, Recife \| Caroline Keffer | Clínica veterinária para quem vem da Iputinga. | idem | trajeto medido (5,0 km) | moro na Iputinga | pesquisa | existe (decisão do JM) | ✓·✓·✗·✓·⚠ |
| 4 | `/como-chegar/gracas/` | lugar (decisão do JM) | veterinário Graças Recife (**sem sugestão**) | — | fornecedor | Veterinário perto das Graças, Recife \| Caroline Keffer | Clínica veterinária perto das Graças, na Torre. | idem | trajeto medido (1,6 km) | moro nas Graças | pesquisa | existe (decisão do JM) | ✗·✓·✗·✓·⚠ |
| 4 | `/como-chegar/zumbi/` | lugar (decisão do JM) | veterinário Zumbi Recife (**sem sugestão**) | — | fornecedor | Veterinário perto do Zumbi, Recife \| Caroline Keffer | Clínica veterinária perto do Zumbi, na Torre. | idem | trajeto medido (2,5 km) | moro no Zumbi | pesquisa | existe (decisão do JM) | ✗·✓·✗·✓·⚠ |
| 4 | `/como-chegar/jaqueira-e-parnamirim/` | lugar (decisão do JM) | veterinário Jaqueira / Parnamirim Recife (**sem sugestão**) | — | fornecedor | Veterinário perto da Jaqueira e Parnamirim \| Caroline Keffer | Clínica veterinária perto da Jaqueira e do Parnamirim. | idem | trajeto a pé (~1,1 km) | moro na Jaqueira/Parnamirim | pesquisa | existe (decisão do JM) | ✗·✓·✗ (64% igual à Madalena)·✓·⚠ |
| — | `/politica-de-privacidade/` | legal | — | — | — | Política de privacidade \| Clínica Pet Caroline Keffer | Política de privacidade | — | — | pedido sobre dados | briefing | existe | fora dos portões (legal) |
| — | `/termos-de-uso/` | legal | — | — | — | Termos de uso \| Clínica Pet Caroline Keffer | Termos de uso | — | — | dúvida | briefing | existe | fora dos portões (legal) |

**Origem do conteúdo:** `briefing` (o que a clínica disse ou o brief de 08/08 levantou) ·
`pesquisa` (fonte pública com data: OpenStreetMap em 01/10/2026 nos trajetos; páginas oficiais dos
planos). Nada aqui é `acervo`.

**Status:** existe · ajustar · criar · publicada. Todas as 38 estão no ar, no `sitemap.xml` e com
`index, follow` desde 06/10/2026.

**Conta:** 38 páginas = 36 que disputam busca + 2 legais. Passam nos portões 1 a 4 sem ✗: 28
(uma delas, nutrição e gastro, em observação no portão 1). Com ✗: 8 (6 de bairro no portão 3,
cardiologia e eletrocardiograma no portão 2). O portão 5 só fecha com a revisão clínica da Dra. Carol (1.45).

## Quem fica com qual busca

| Busca | Página dona | Observação |
|---|---|---|
| Caroline Keffer, clínica caroline keffer, caroline keffer pet shop | `/` | marca; o Perfil divide |
| veterinário / clínica veterinária Torre Recife | `/` | Pet Villa (hospital 24h, Torre) é o rival; título ok |
| veterinário Recife, clínica veterinária Recife | `/` | só reforço: é dos hospitais 24h e do mapa |
| consulta veterinária Recife, quanto custa uma consulta veterinária | `/consulta-veterinaria/` | **mesma página de resultados da home (4-5/10)**: diferenciar pela intenção "como é / quanto custa / primeira vez"; se o Search Console mostrar as duas alternando, fundir (301) |
| veterinária gatos Recife, veterinário para gatos | `/veterinario-para-gatos/` | — |
| clínica que aceita plano / [plano] rede credenciada | `/planos-de-saude-pet/` e as 5 de convênio | "plano de saúde pet Recife" fica de fora (é comprar plano) |
| limpeza de tártaro cachorro, dentista veterinário | `/odontologia-veterinaria/` | — |
| castração gato / cachorro Recife | `/castracao-de-caes-e-gatos/` | gato e cachorro na mesma página (5/10 iguais): certo |
| cirurgia veterinária Recife | `/cirurgia-veterinaria/` | linka castração, tártaro e ortopedia |
| vacina cachorro / gato, vacina V10, V8, V4, V5 | `/vacinacao-de-caes-e-gatos/` | falta o vocabulário V10/V8/V4/V5 no texto |
| cardiologista veterinário, sopro no coração, **eletrocardiograma veterinário** | `/especialidades/cardiologia/` | **canibalização com `/exames-de-imagem/eletrocardiograma-veterinario/` (6/10 iguais)**; decidir no dia 60 (05/12/2026) pelo Search Console: fundir com 301 ou diferenciar ("eletro antes da cirurgia / preparo") |
| dermatologista veterinário, cachorro com coceira | `/especialidades/dermatologia/` | — |
| nefrologista veterinário, doença renal gato, gato bebendo muita água | `/especialidades/nefrologia/` | — |
| pneumologista veterinária, tosse cachorro | `/especialidades/pneumologia/` | — |
| nutricionista / gastro veterinário, cachorro vomitando | `/especialidades/nutricao-e-gastroenterologia/` | em observação |
| ortopedista veterinário, cachorro mancando | `/ortopedia-veterinaria/` | vizinha de cirurgia (3/10) |
| especialista veterinário Recife | `/especialidades/` | hub |
| ultrassom veterinário / ultrassom cachorro | `/exames-de-imagem/ultrassom-veterinario/` | — |
| raio-x veterinário | `/exames-de-imagem/raio-x-veterinario/` | separada do ultrassom (1/10) |
| exame de sangue cachorro | `/exames-laboratoriais/` | — |
| de quanto em quanto tempo levar ao veterinário, check-up pet idoso | `/check-up-veterinario/` | title deve ter a pergunta, não "check-up … Recife" |
| emergência / urgência veterinária Recife | `/urgencia-veterinaria/` | não disputar "24h" |
| banho e tosa Recife / Torre | `/banho-e-tosa/` | — |
| Dra. Caroline Keffer | `/equipe/` | — |
| endereço da clínica, como chegar | `/como-chegar/` | — |
| veterinário [Madalena, Cordeiro, Iputinga, Graças, Zumbi, Jaqueira, Parnamirim] | `/como-chegar/<bairro>/` | decisão do JM; ver Páginas de lugar |

Duas páginas nunca disputam a mesma intenção. Post novo acrescenta linha aqui.

## Viraram seção (reprovaram em algum portão)

Nada foi mudado no site. Esta é a leitura da régua, para decidir com o Search Console:

| Candidata | Portão em que reprovou | Viraria seção de |
|---|---|---|
| `/exames-de-imagem/eletrocardiograma-veterinario/` | 2 (intenção: 6/10 iguais à cardiologia) | `/especialidades/cardiologia/` (e um bloco no hub de imagem), com 301 — **só se o Search Console confirmar a disputa no dia 60** |
| `/especialidades/nutricao-e-gastroenterologia/` | 1 ⚠ (sem sugestão no autocomplete) | `/especialidades/` — **só se aos 90 dias (04/01/2027) não tiver impressão** e o WhatsApp não trouxer a dúvida |
| `/consulta-veterinaria/` | 2 ⚠ (4-5/10 iguais à home) | não fundir agora: é o serviço principal; diferenciar e medir |
| 6 × `/como-chegar/<bairro>/` | 3 (1 prova local; texto 64-81% igual) e, em 3 delas, 1 (sem sugestão) | régua: seções de `/como-chegar/`. **Mantidas no ar por decisão do JM** |

## Páginas de lugar

Regra pelo tipo de negócio (item 1.83, `referencias/paginas.md` §5): **balcão com 1 unidade**:
nunca `/recife` (a home é a página da cidade, e não existe essa página: certo). Bairro vizinho só
com atendimento real e 2+ provas locais. Prioridade baixa. **Página de lugar traz orgânico, não
mapa.**

| Lugar | Atendimento real confirmado | Provas locais (2+) | Demanda | Publicada |
|---|---|---|---|---|
| Madalena | não confirmado pela clínica por escrito | 1: trajeto medido (2,0 km); falta paciente ou depoimento de lá | AC ✓ ("veterinario madalena recife"); top 10 = VITA24h e Harmonia da Madalena | sim (06/10), decisão do JM |
| Cordeiro | não confirmado | 1: trajeto (4,2 km) | AC ✓; top 10 = diretórios e Hospital Veterinário do Recife (público) | sim, decisão do JM |
| Iputinga | não confirmado | 1: trajeto (5,0 km) | AC ✓; top 10 = CVI e HS da Iputinga | sim, decisão do JM |
| Graças | não confirmado | 1: trajeto (1,6 km) | **AC sem sugestão**; top 10 = Meu Pet & Companhia, OhPet | sim, decisão do JM |
| Zumbi | não confirmado | 1: trajeto (2,5 km) | **AC sem sugestão**; top 10 = Unidog | sim, decisão do JM |
| Jaqueira e Parnamirim | não confirmado | 1: trajeto a pé (~1,1 km) | **AC sem sugestão** | sim, decisão do JM |

Portão de publicação da régua, como está hoje: atendimento real ✗ (não registrado) · 2+ provas ✗ ·
texto principal < ~50% igual ✗ (76-81% entre Madalena, Graças, Zumbi, Cordeiro e Iputinga; 64%
Jaqueira × Madalena; medido em 29/10 no `<main>` até "Continue por aqui") · title e H1 únicos ✓ ·
linkada pelo hub ✓ · dado estruturado a conferir (1.84). Em nenhum dos 6 bairros a Keffer aparece
no top 10 de "veterinário [bairro] Recife" (DuckDuckGo, 29/10). **Revisão aos 90 dias:
04/01/2027** (7.22): sem impressão, melhorar (paciente de lá, depoimento com bairro autorizado) ou
fundir no `/como-chegar/`.

## Lacunas (busca sem página)

| Busca (fonte) | Situação | Proposta |
|---|---|---|
| veterinário exótico Recife, veterinária de aves Recife (AC, 29/10) | a clínica atende exóticos e pássaros com o Dr. Rivaldo Júnior, só com hora marcada (28/10); o Perfil já tem esses serviços; o site fala só de cães e gatos; top 10 = Ninho e VITA24h silvestres | **candidata a página** (segmento por espécie, 1.81: a busca e o comprador mudam), se a Dra. Carol quiser mencionar e o Dr. Rivaldo der CRMV, foto e espécies atendidas. Sem isso, uma linha na home e no FAQ |
| caroline keffer pet shop, pet shop torre recife (AC) | a clínica tem loja; não há página | seção da home (o que vende), página só se tiver catálogo real |
| microchip em cachorro recife (AC) | não se sabe se a clínica faz | perguntar; se fizer, seção da vacinação |
| ecocardiograma | VALIDAR com a clínica | seção da cardiologia, se fizer |
| sintomas: cachorro vomitando, gato bebendo muita água, cachorro mancando, tosse cachorro, sopro no coração (AC) | hoje são seções das especialidades | artigos só na fase 3, no ritmo de revisão da Dra. Carol (0.25) |

## Fase 2 (decidida pelo Search Console aos 60-90 dias)

Em **05/12/2026** e **04/01/2027**: consulta com impressão sem página dona vira linha nova aqui;
página indexada sem impressão vira candidata a fundir. Já na fila: eletrocardiograma ×
cardiologia, consulta × home, nutrição e gastro, os 6 bairros, exóticos e aves.
