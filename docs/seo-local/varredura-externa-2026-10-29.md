# Varredura externa — Clínica Pet Caroline Keffer (29/10/2026)

> Pesquisa feita de fora em 29/10/2026, só com curl, whois, WebSearch e WebFetch (sem navegador, sem login,
> sem formulário, sem contato com ninguém). Cada achado traz o link e a data em que foi lido.
> Itens da lista mestre: 0.01, 0.28, 4.09, 4.10, 4.16, 4.17, 4.36, 4.37.

**Dado certo (referência desta varredura)**
- Nome: Clínica Pet Caroline Keffer (aparece também como "Clínica Veterinária Caroline Keffer")
- Empresa: Caroline Pet Shop Ltda, CNPJ 15.786.546/0001-97
- Endereço: Rua Araguatins, 63, Torre, Recife/PE, CEP 50710-060
- Telefones: WhatsApp (81) 99303-7584 · fixo (81) 3082-0083
- Horário: seg a sex 9h–19h · sáb 8h–16h
- Site: https://clinicacarolinekeffer.com.br · Instagram @clinicapet_carolinekeffer

> ⚠️ **Divergência interna:** `docs/seo-local/perfil-google.md` (27/09) ainda dá o fixo como
> **(81) 3268-5979**. Esse é o número que está na **Receita Federal** (abaixo) e nos sites que copiam o CNPJ.
> O certo, pelo site no ar e por este pedido, é **(81) 3082-0083**. Corrigir a ficha quando alguém for mexer nela.
> Conferido em 29/10: o site no ar mostra só 99303-7584 e 3082-0083.

---

## Resumo do que é tarefa de quem

| # | Tarefa | De quem |
|---|---|---|
| 1 | Trocar o telefone do CNPJ na Receita (3268-5979 → 3082-0083 ou o WhatsApp) | Clínica (contador, via Redesim/JUCEPE) |
| 2 | Pet Top: corrigir horário (está 9h–13h/14h30–17h30, sáb 9h30–12h30) e pôr o fixo | Clínica (canal de credenciado do Pet Top) |
| 3 | PetHealth: corrigir horário (está 8h30–17h30, sáb 8h–17h30) | Clínica (canal de credenciado) |
| 4 | CARE: nome está "CAROLINE KEFFER PET SHOP", número "63 A", sem fixo, sem horário, e lista "Urgência e Emergência" (a clínica não é 24h) | Clínica (canal de credenciado) |
| 5 | Petlove Saúde e Plamev Pet: conferir a ficha na busca de credenciados (não deu pra ler de fora) | MXC pelo navegador, ou a clínica pelo portal do credenciado |
| 6 | Reclamação no Reclame Aqui (contra PetSaúde/Petlove) citando a clínica, **sem resposta** desde 07/06/2025 | Clínica decide se responde; e confirmar se ainda faz banho |
| 7 | Duas páginas no Facebook + Instagram antigo parado desde 11/2021 | Clínica (só quem administra) |
| 8 | Domínio em nome de pessoa física (Mateus Xavier), não do CNPJ da clínica | MXC + clínica (transferência no Registro.br) |
| 9 | Correções em diretórios (BenditoGuia, Solutudo, TutorCanino, PetShopPertoDeMim, Guia Mania) | MXC pelos links de correção (sem formulário nesta varredura) |
| 10 | Marca no INPI e Waze | Não deu pra ver de fora: MXC pelo navegador (pePI exige formulário; Waze exige o mapa) |

---

## 1. Domínio, homônimo, INPI e .vet.br (0.01 e 0.28)

### whois (rodado em 29/10/2026 00:50, `whois -h whois.registro.br clinicacarolinekeffer.com.br`)
- **Titular:** `Mateus Xavier` — documento do titular é **CPF** (`ownerid: ***.121.354-**`), não o CNPJ da clínica.
- **Contatos (owner-c e tech-c):** Mateus Xavier, e-mail pessoal dele.
- **Criado:** 02/10/2026 · **Alterado:** 06/10/2026 · **Vence:** 02/10/2029.
- **Provedor:** HSTDOMAINS (Hostinger) · **DNS:** Cloudflare (audrey/guy.ns.cloudflare.com), status publicado, SACI ativo.
- **Leitura:** a regra do 0.01 pede o domínio no nome de quem é o negócio (CNPJ do cliente). Hoje está no CPF
  de uma pessoa da MXC. Pede transferência de titularidade no Registro.br para o CNPJ 15.786.546/0001-97, com
  a conta da clínica. Isso depende da clínica (e de quem tem a conta hoje).
- `docs/solicitar-clinica.md` ainda pergunta se o domínio "`clinicapetcarolinekeffer.com.br`" foi registrado.
  O domínio no ar é **`clinicacarolinekeffer.com.br`** (sem "pet"). `clinicapetcarolinekeffer.com.br` está **livre**
  (whois "No match", 29/10). `clinicacarolinekeffer.com` também está livre.

### Homônimo do mesmo ramo
- **CNPJ da clínica** (BrasilAPI, dado da Receita, lido em 29/10/2026 — https://brasilapi.com.br/api/cnpj/v1/15786546000197):
  razão social **CAROLINE PET SHOP LTDA**, nome fantasia **CAROLINE KEFFER PET SHOP**, ativa desde 22/06/2012,
  matriz, Rua Araguatins, 63, Torre, CEP 50710-060, **telefone 81 3268-5979**, CNAE principal comércio varejista
  pet, secundários com atividades veterinárias, banho/tosa e alojamento. Sócia-administradora: Caroline Keffer
  Oliveira de Souza (desde 2012).
  - Isso explica o "Caroline Keffer Pet Shop" e o 3268-5979 em vários sites (item 4).
  - Detalhe: o `perfil-google.md` diz "o CNPJ é mais novo que os 20 anos". Confirma: abertura 22/06/2012.
- **Outra empresa com nome parecido, mesmo ramo:**
  - **"Clínica Veterinária Dra. Jenneffer Keffer"**, Andradina/SP — página no Facebook
    (https://www.facebook.com/veterinariajennefferkeffer, lida em 29/10/2026). Outra cidade e outro estado.
    Risco baixo para a busca local em Recife, mas é o único homônimo do ramo encontrado.
  - **"Caroline Petshop Ltda"**, CNPJ 46.892.968/0001-70, Pompéu/MG, casa de ração
    (https://www.solutudo.com.br/empresas/mg/pompeu/casas-de-racao/caroline-petshop-ltda-25336372, lida em 29/10/2026).
    Nome igual à razão social da clínica, mas outra cidade. Risco baixo.
  - Nenhuma outra empresa "Keffer" do ramo em Recife/PE nas buscas (WebSearch "Keffer clínica veterinária",
    "Caroline Keffer Recife", 29/10/2026).
- **Vizinho de rua (não é homônimo, mas vale saber):** "Focus Veterinary Diagnostic" aparece na **mesma rua**
  (Rua Araguatins, Torre, mesmo CEP) no Guia Fácil (https://guiafacil.com/encontre/clinicas-veterinarias/recife/pe,
  por resumo de busca em 29/10/2026). Conferir no Maps que os dois pinos não se misturam.
- **Pessoa:** a Dra. Caroline Keffer Oliveira foi aprovada em 2º lugar em Clínica Cirúrgica numa seleção da
  Secretaria Executiva dos Direitos dos Animais do Recife (Portaria Conjunta SEPLAGP/SEDA nº 273, de 13/09/2017),
  publicada pelo Jornal do Commercio
  (https://pt.slideshare.net/slideshow/resultado-de-seleo-da-secretaria-executiva-dos-direitos-dos-animais-do-recife/79821825,
  lido em 29/10/2026). Achado neutro/positivo, serve de prova de trajetória.

### Marca no INPI
- **Não consultado.** A busca pública do INPI (pePI, busca.inpi.gov.br) exige preencher e enviar formulário,
  o que esta varredura não podia fazer. A busca na web (29/10/2026) não achou nenhum registro de marca
  "Keffer"/"Caroline Keffer". **Pendente:** alguém da MXC rodar a busca no pePI pelo navegador
  (marca "KEFFER" e "CAROLINE KEFFER", classe 44 serviços veterinários e 35 comércio pet).

### Domínio de categoria profissional (.vet.br)
- **Existe** a categoria `.vet.br` (veterinários) no Registro.br.
- Disponibilidade (API pública do Registro.br e whois, 29/10/2026):
  `carolinekeffer.vet.br` **livre** (`{"status":0}`), `clinicacarolinekeffer.vet.br` **livre**,
  `keffer.vet.br` **livre**, `carolkeffer.vet.br` **livre**. `carolinekeffer.com.br` também **livre**.
- A regra de quem pode registrar `.vet.br` (CPF do profissional com prova de registro no CRMV, ou outra) não
  apareceu em fonte oficial lida nesta varredura. O site de categorias do Registro.br é montado por JavaScript
  e não abriu pelo curl. **Pendente:** confirmar a regra no Registro.br antes de oferecer.
  Se for registrar, é em nome da Dra. Caroline (CPF + CRMV) e só como redirecionamento para o domínio principal.

---

## 2. Reputação fora do Google (4.37)

| Fonte | O que tem | Link | Lido em |
|---|---|---|---|
| **Reclame Aqui — PetSaúde (Petlove)** | Reclamação "Pacotes de banho descontados e serviço não prestado pela PETLOVE". O cliente comprou pacotes de banho pela Petlove para usar na Clínica Veterinária Caroline Keffer, e a clínica teria dito que **não oferece mais o serviço**. Status: **Não respondida**, datada de **07/06/2025**. A reclamação é contra a Petlove, mas cita a clínica pelo nome. | https://www.reclameaqui.com.br/empresa/petsaude/lista-reclamacoes/ (a lista dá 403 pro robô; o texto veio do resumo de busca, não abri a reclamação em si) | 29/10/2026 |
| Reclame Aqui — página própria da clínica | **Nenhuma** encontrada (busca no domínio reclameaqui.com.br por "Caroline Keffer") | — | 29/10/2026 |
| Notícias | Nenhuma notícia negativa. Só a seleção da prefeitura de 2017 (positiva, item 1) | ver item 1 | 29/10/2026 |
| TutorCanino | 4,8 com 130 avaliações (copiadas do Google) | https://www.tutorcanino.com.br/veterinarios/pe/recife/clinica-pet-caroline-keffer | 29/10/2026 |
| Petlove Saúde (rede) | 5,0 com 162 avaliações (resumo de busca; a página dá 403 pro robô) | https://saude.petlove.com.br/rede-credenciada/pe/recife/clinica-veterinaria-caroline-keffer | 29/10/2026 |
| VetClinicasBR / OndePet / AcheiPerto | 4,8 com 130 (copiado do Google) | ver item 3 | 29/10/2026 |

**Tarefas da clínica (4.37):**
- [ ] **Reclamação no Reclame Aqui sem resposta (07/06/2025):** a reclamação é contra a Petlove, então quem
      responde no Reclame Aqui é a Petlove, não a clínica. Mas ela mostra que a **Petlove ainda vendia banho
      para usar na clínica** quando a clínica já não fazia. Tarefas:
      1. A clínica confirma se **faz ou não banho e tosa hoje**. O `perfil-google.md` lista banho e tosa como
         secundária e serviço, e o perfil do Instagram antigo também.
      2. Se não faz: pedir à Petlove Serviços que tire a clínica da venda de banho, e tirar banho e tosa do
         site e do Perfil do Google.
      3. Se faz: alinhar com a Petlove para aceitar os pacotes.
      (Decisão e contato são da clínica.)
- [ ] Nenhuma outra reclamação ou nota ruim achada fora do Google.

---

## 3. Listas "melhores veterinários/clínicas em Recife" (4.36)

Nenhuma lista **editorial** (escolhida por jornalista ou blogueiro, sem patrocínio) foi encontrada.
As buscas no Diario de Pernambuco, JC e Folha PE (29/10/2026) só trouxeram notícias soltas, não listas.
Todas as listas achadas são **montadas por dado automático** (nota e número de avaliações do Google).
Pela regra do 4.36, **não contam pro Google** como lista genuína, mas ajudam a marca e a IA.

| Lista | A clínica está? | Posição / dado | Link | Lido em |
|---|---|---|---|---|
| OndePet — clínicas veterinárias em Recife (ranking) | **Sim** | 36º, "Clínica Pet Caroline Keffer", endereço certo, só o WhatsApp +55 81 99303-7584, **sem site** | https://ondepet.com/clinicas-veterinarias/recife/ | 29/10/2026 |
| OndePet — Torre | **Sim** | 3º, mesmos dados | https://ondepet.com/clinicas-veterinarias/recife/torre/ | 29/10/2026 |
| AcheiPerto — Torre | **Sim** | **1º**, mesmos dados | https://acheiperto.com/clinicas-veterinarias/recife/torre/ | 29/10/2026 |
| VetClinicasBR — Recife | **Sim** | listada, 4,8 · 130 avaliações | https://vetclinicasbr.com/cidade/recife-pe/ | 29/10/2026 |
| TutorCanino — "melhores veterinários em Recife" (15 de 336, atualizado em out/2026) | **Não** | Critério publicado: nota + nº de avaliações + **completude do perfil** (telefone, WhatsApp, site, horário). Diz que não há posição paga. | https://www.tutorcanino.com.br/guias/melhores-veterinarios-recife | 29/10/2026 |
| Guia Fácil — "melhores clínicas veterinárias em Recife" | **Não** | — | https://guiafacil.com/encontre/clinicas-veterinarias/recife/pe | 29/10/2026 |
| Apontador — clínicas veterinárias Recife / Torre | **Não** | — | https://www.apontador.com.br/em/torre-recife-pe/animais/clinicas-e-hospitais-veterinarios | 29/10/2026 |
| Yelp — Recife | não deu pra ver (403) | — | https://www.yelp.com/search?find_desc=Veterinarians&find_loc=Recife%2C+PE | 29/10/2026 |
| Econodata — "maiores" (por faturamento) | não deu pra ver (403); ranking por porte, não por qualidade | — | https://www.econodata.com.br/maiores-empresas/pe-recife/busca-clinica-veterinaria | 29/10/2026 |

**Como pedir inclusão (só descrição, nada foi enviado):**
- **TutorCanino:** o guia é por fórmula. Para entrar, **reivindicar o perfil** dela
  (botão "Reivindicar perfil" na página da clínica; passo a passo em https://www.tutorcanino.com.br/ajuda/como-reivindicar-um-perfil)
  e completar site, WhatsApp e horário. Hoje o perfil não tem o site.
- **OndePet / AcheiPerto:** puxam do Google. O que sobe a posição é nota, volume de avaliações e perfil completo
  no Google (site no Perfil). Não há pedido de inclusão a fazer.
- **Guia Fácil / Apontador:** cadastro gratuito de empresa no próprio site (o Apontador só vale se aparecer na
  busca do nicho, 4.09). Hoje não aparecem na busca "veterinário Torre Recife".
- **Lista editorial:** não existe hoje em Recife. Uma pauta possível é a coluna Folha Pet (Folha PE), que já cobre
  clínicas do Recife (https://www.folhape.com.br/colunistas/folha-pet/). Seria **sugestão de pauta**, nunca pagar
  posição.

---

## 4. Cadastros antigos com dado errado (4.17 e 4.10)

Legenda: ✅ igual ao certo · ❌ diferente · — não mostra

| Onde | Nome como aparece | Endereço | Telefone | Horário | Link de correção | Lido em |
|---|---|---|---|---|---|---|
| **Receita Federal (CNPJ)** — fonte de todos os sites de CNPJ | "CAROLINE KEFFER PET SHOP" (fantasia) | ✅ Rua Araguatins, 63, Torre, 50710-060 | ❌ **(81) 3268-5979** | — | Alteração cadastral pela Redesim/JUCEPE (contador da clínica) | 29/10/2026 (BrasilAPI) |
| **BenditoGuia** https://www.benditoguia.com.br/empresa/clinica-veterinaria-caroline-keffer-torre-recife-pe | ❌ "Clínica Veterinária Caroline Keffer **Torre Recife PE**" (bairro e cidade no nome) | ✅ R. Araguatins, 63 - Torre, 50710-060 | ✅ (81) 3082-0083, ❌ sem o WhatsApp | ❌ "Não informado" | https://www.benditoguia.com.br/contato?assunto=correcao&empresa=https%3A%2F%2Fwww.benditoguia.com.br%2Fempresa%2Fclinica-veterinaria-caroline-keffer-torre-recife-pe | 29/10/2026 |
| **Guia Mania** https://guiamania.com.br/pe/empresa/clinica-veterinaria-caroline-keffer-torre-recife-pe/ | ❌ mesmo nome com "Torre Recife PE" | (403 pro robô) | (81) 3082-0083 pelo resumo de busca | não visto | não visto (403) | 29/10/2026 |
| **TutorCanino** https://www.tutorcanino.com.br/veterinarios/pe/recife/clinica-pet-caroline-keffer | ✅ "Clínica Pet Caroline Keffer" | ✅ | número escondido atrás de "Mostrar" (não lido) | ✅ seg–sex 9h–19h, sáb 8h–16h | "Reivindicar perfil" / "sugerir alteração" na própria página | 29/10/2026 |
| **Solutudo** https://www.solutudo.com.br/empresas/pe/recife/casas-de-racao/caroline-keffer-pet-shop-3883749 | ❌ "Caroline Keffer Pet Shop", categoria **Casas de Ração** | ✅ | ❌ **(81) 3268-5979** | — | "Essa empresa é minha" / "Corrigir dados" na página | 29/10/2026 |
| **Pet Shop Perto de Mim** https://petshoppertodemim.com/e/caroline-keffer-pet-shop-bbruni/ | ❌ "Caroline Keffer Pet Shop" | ✅ | ❌ **(81) 3268-5979** | — | só "Excluir" para o proprietário, na página | 29/10/2026 |
| **cnpj.biz** https://cnpj.biz/15786546000197 | ❌ "Caroline Keffer Pet Shop" | ✅ (resumo de busca) | ❌ 3268-5979 (resumo de busca; a página dá 403) | — | sai sozinho quando a Receita for corrigida | 29/10/2026 |
| **Descubra Online** https://www.descubraonline.com/guia/pe/recife/caroline-keffer-pet-shop-15786546000197/ | ❌ "Caroline Keffer Pet Shop" | ✅ | ❌ 3268-5979 (resumo de busca) | — | site não respondeu ao curl | 29/10/2026 |
| **Diário Cidade** https://www.diariocidade.com/pe/recife/guia/caroline-keffer-pet-shop-15786546000197/ | ❌ "Caroline Keffer Pet Shop" | ✅ | ❌ 3268-5979 (resumo de busca) | — | **domínio fora do ar** (DNS não resolve em 29/10). Se o Google ainda mostrar, entra no pedido "Remover conteúdo desatualizado" | 29/10/2026 |
| **Pet Life** (plano, fora dos 5) https://rede.petlife.com.br/clinica-pet-caroline-keffer/recife-pe/62a09ff9d344d13c71d5d581 | ✅ "Clínica Pet Caroline Keffer" | dados carregam por JavaScript, não lidos | — | — | — | 29/10/2026 |
| **Facebook "Clínica Caroline Keffer"** https://www.facebook.com/clinicaveterinariacarolinekeffer/ | "Clínica Caroline Keffer" (~42 curtidas pelo resumo de busca) | não lido (Facebook pede login) | não lido | não lido | só quem administra a página | 29/10/2026 |
| **Facebook — 2ª página** https://www.facebook.com/clinicavetkeffer/ | ❌ "Clínica Veterinária Caroline Keffer \| Recife PE" (~1 curtida pelo resumo) | não lido | não lido | não lido | só quem administra: **página duplicada**, apagar ou mesclar | 29/10/2026 |
| **Instagram antigo @clinicacaroline_keffer** https://www.instagram.com/clinicacaroline_keffer/ | "Caroline Keffer". Bio: clínica veterinária, Dra Caroline Keffer médica titular, pet shop, exames/vacina/medicamentos, **banho e tosa** | — | — (um resumo de busca citou "993614756", mas a página lida não mostra número: **não confirmado**) | — | **parado desde 11/11/2021**, 844 seguidores: pôr na bio "nos mudamos para @clinicapet_carolinekeffer" + link do site, ou arquivar (só quem tem a senha) | 29/10/2026 |
| **Apontador** | **não encontrado** (busca do bairro Torre, categorias veterinária e pet shop, e busca no domínio) | — | — | — | — | 29/10/2026 |
| **GuiaMais** | **não encontrado** (busca no domínio por "Keffer Recife") | — | — | — | — | 29/10/2026 |
| **Doctoralia** | não se aplica (não lista veterinário) | — | — | — | — | 29/10/2026 |

**Leitura (4.10):** o endereço está igual em todo lugar. O que diverge:
1. **Telefone 3268-5979**, que vem da Receita: Solutudo, Pet Shop Perto de Mim, cnpj.biz, Descubra Online, Diário Cidade.
   **Corrigir na fonte (Receita)** resolve a maioria com o tempo. A Solutudo tem botão próprio de correção.
2. **Nome**: "Caroline Keffer Pet Shop" (nome fantasia do CNPJ), "… Torre Recife PE" (BenditoGuia e Guia Mania,
   que parecem ter copiado um nome antigo do Perfil do Google com bairro e cidade) e duas variações no Facebook.
   Depende da decisão do **nome oficial** (pendência aberta no `perfil-google.md`).
3. **Horário** ausente na maioria. Só o TutorCanino está certo.

**Pedidos na ferramenta "Remover conteúdo desatualizado" (4.17, MXC):** nenhum pode ser feito ainda. A regra
exige que o dado velho já tenha saído da página. Só o Diário Cidade está fora do ar: fazer o pedido se ele ainda
aparecer no Google para "Caroline Keffer".

---

## 5. Rede credenciada dos 5 planos (4.09)

| Plano | Aparece? | Nome | Endereço | Telefone | Horário | Outros | Link | Lido em |
|---|---|---|---|---|---|---|---|---|
| **PetHealth** | **Sim** | "CLÍNICA VETERINÁRIA CAROLINE KEFFER" | ✅ Rua Araguatins, N°63, Torre, 50710-060 | ✅ (81) 3082-0083 / (81) 9 9303-7584 | ❌ **"Segunda á Sexta das 08:30 ás 17:30 / Sábado das 08:00 ás 17:30"** | serviços: consultas de rotina, emergência e urgência, vacinas, exames laboratoriais (terceirizado) | busca em https://planopethealth.com.br/clinicas (Recife, tipo Clínicas; dado lido da consulta pública `/aj_listar_clinicas.php?tipo=1&cidade=9`) | 29/10/2026 |
| **CARE Saúde Animal** | **Sim** | ❌ "CAROLINE KEFFER PET SHOP" | ❌ "Rua Araguatins - Torre, **63 A**" | ❌ só (81) 99303-7584 (sem fixo) | ❌ não mostra | ⚠️ lista **"Urgência e Emergência"**, oftalmologia, cirurgia oftálmica e urologista: conferir se a clínica faz. Ela **não é 24h**. Página criada em 30/05/2025, modificada em 28/10/2026. | https://caresaudeanimal.com.br/rede-credenciada/caroline-keffer-pet-shop/ | 29/10/2026 |
| **Petlove Saúde** | **Sim** | "Clínica Veterinária Caroline Keffer" | ✅ Rua Araguatins, 63, Torre (resumo de busca) | ✅ (81) 3082-0083 e (81) 99303-7584 (resumo de busca) | ⚠️ resumo mostra "abre às 08h30": **possível erro** (o certo é 9h), não confirmado | 5,0 · 162 avaliações. Também no PDF da rede Petlove/Porto Seguro de 16/10/2025: "Clínica Veterinária Caroline Keffer", Torre, 50710060, tipo "Clínica" | https://saude.petlove.com.br/rede-credenciada/pe/recife/clinica-veterinaria-caroline-keffer (403 pro robô) · PDF: https://www.portoseguro.com.br/content/dam/petlove/rede-credenciada-pet-love.pdf | 29/10/2026 |
| **Pet Top** | **Sim** | "Caroline Keffer" | ✅ R. Araguatins, 63 – Torre, Recife – PE, 50710-060 | ❌ só (81) 99303-7584 (sem fixo) | ❌ **"SEG – SEX: 9h às 13h e 14h30 às 17h30 / SAB: 9h30 às 12h30"** (o mesmo erro anotado em 01/10: **não foi corrigido**; a página não muda desde 30/07/2025 pelo sitemap) | serviços: clínica geral, especialista, cirurgia, internamento, imagem, laboratório | https://pettopsaude.com.br/rede/clinica-pet-caroline-keffer/ | 29/10/2026 |
| **Plamev Pet** | **Não verificado** | — | — | — | — | A busca de credenciados (https://www.plamev.com.br/rede) é montada por JavaScript, e a consulta direta foi bloqueada pela permissão desta sessão. Nenhum resultado de busca liga a clínica à Plamev. | https://www.plamev.com.br/rede | 29/10/2026 |

**Tarefas (4.09):**
- [ ] **Clínica:** pedir correção de horário ao **Pet Top** e ao **PetHealth**.
- [ ] **Clínica:** pedir à **CARE** nome ("Clínica Pet Caroline Keffer"), número (63, sem "A"), fixo, horário e
      revisão das especialidades (tirar "Urgência e Emergência" se não atende 24h).
- [ ] **Pet Top e CARE:** incluir o fixo 3082-0083.
- [ ] **MXC (navegador):** abrir a ficha da Petlove Saúde e a busca da Plamev (Recife > Torre) e anotar
      nome, endereço, telefone e horário. Se a Plamev não listar a clínica, perguntar à clínica se o
      credenciamento ainda vale (o site tem página `/planos-de-saude-pet/plamev-pet/`).
- Fora dos 5: a **Pet Life** também lista a clínica (dados não lidos). Perguntar se ela é credenciada Pet Life.
  Se for, entra no site; se não for, pedir para sair.

---

## 6. Waze (4.16)

- **Não deu pra ver sem login/navegador.** A busca pública do mapa do Waze (live-map) devolve 403 para
  requisição fora do navegador (29/10/2026), e a busca na web não acha página do lugar.
- O Waze puxa do Perfil do Google. Ordem pela regra: corrigir o Perfil primeiro, depois abrir
  https://www.waze.com/pt-BR/live-map/ no navegador, buscar "Clínica Pet Caroline Keffer" e conferir se o pino
  cai na Rua Araguatins, 63. Só criar lugar no Waze se continuar errado. **Pendente (MXC, pelo navegador).**

---

## Fontes consultadas sem achado (29/10/2026)
- WebSearch: "Caroline Keffer" veterinária; "Keffer" clínica veterinária CNPJ; "CAROLINE KEFFER OLIVEIRA DE SOUZA";
  "Caroline Keffer" reclame aqui/notícia; "99361-4756"; "3268-5979"; INPI "Keffer"; waze "Caroline Keffer";
  Keffer Recife em guiamais/apontador/telelistas/doctoralia/yelp.
- Bloqueados pro robô (403): Petlove Saúde, Reclame Aqui, Yelp, Econodata, cnpj.biz, Guia Mania, Escavador,
  Petlove Serviços, Waze. Facebook e Instagram só mostram o título sem login.
