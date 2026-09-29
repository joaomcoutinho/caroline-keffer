# Perfil da Empresa no Google — o que ajustar

> Régua: skill `checklist-final` (`referencias/local-e-mapa.md` e `guia-configuracao.md`).
> Anotado em 27/09/2026. **Regra deste projeto: o SITE é a fonte da verdade.** O perfil do
> Google é ajustado para bater com o que está em `site/content/site.ts`, nunca o contrário.

## Decisões já tomadas (JM, 27/09/2026)

- **Telefone principal: o WhatsApp (81) 99303-7584.** O fixo (81) 3268-5979 entra como adicional.
- **São vários profissionais atendendo no endereço.** Pela diretriz do Google isso permite
  **um perfil da clínica + um perfil por profissional** que atende público próprio ali.
  Nunca um perfil por especialidade da mesma pessoa.

## Pendências de dado (resolver no site primeiro, depois copiar pro perfil)

- [ ] **Nome oficial** = o que está no letreiro. Hoje o site usa "Clínica Pet Caroline Keffer" e
      em outros pontos "Clínica Veterinária Caroline Keffer". Escolher um e usar igual em tudo.
      Sem "Torre"/"Recife" no nome (palavra-chave no nome = suspensão).
- [ ] **Horário** confirmado. Fontes públicas divergem (9h–19h / sáb 8h–16h × 9h–18h / sáb 9h–13h).
- [ ] **CRMV** da Dra. Carol, da Dra. Isa e de cada especialista (JM vai solicitar).
- [ ] **Data de abertura** (o CNPJ é mais novo que os "20 anos").

## 1. Propriedade e limpeza — primeiro, é o passo mais lento
- [ ] Dra. Carol como **Proprietária Principal**; MXC como **gerente**.
- [ ] Buscar no Maps "Caroline Keffer", "Clínica Pet Caroline Keffer", "Clínica Veterinária
      Caroline Keffer" → **duplicatas/fantasmas**: reivindicar e pedir remoção antes de otimizar.
- [ ] Perfis individuais: só para profissionais que atendem público próprio no endereço
      verificado, no formato "Nome do profissional" (não "Clínica X — Cardiologia").

## 2. NAP — igual ao site, letra por letra
- [ ] Nome (ver pendência acima).
- [ ] Endereço: Rua Araguatins, 63 — Torre, Recife - PE, 50710-060. **Pino sobre a fachada.**
- [ ] Telefone principal: WhatsApp (81) 99303-7584 · adicional: (81) 3268-5979.
- [ ] Horário regular + **horários de feriado** (12/10, 02/11, 15/11, 20/11, 25/12).

## 3. Categoria e serviços
- [ ] **Categoria principal testada:** buscar "veterinário Torre Recife" e "clínica veterinária
      Recife", ver a categoria dos 3 primeiros do mapa e usar a mesma (provável: *Veterinário*).
      **Nunca** "Hospital veterinário" nem "Emergência" — ela não é 24h.
- [ ] Secundárias só do que existe: banho e tosa (e pet shop, se vende produto).
- [ ] **Serviços nomeados = as páginas do site**, com a mesma descrição curta:
      consulta clínica geral · cirurgia geral · cirurgia odontológica · cirurgia ortopédica ·
      cardiologia · dermatologia · nefrologia · pneumologia · nutrição e gastroenterologia ·
      raio-x · ultrassonografia · eletrocardiograma · exames laboratoriais · check-up ·
      internação para recuperação · banho e tosa.
- [ ] Descrição (até 750 caracteres): 20+ anos na Torre, especialidades atendendo ali mesmo,
      planos aceitos, e que não é 24h.

## 4. Atributos e links
- [ ] Estacionamento no local · acessibilidade da entrada · Pix/cartão · "empresa de propriedade
      de mulher" (se aparecer).
- [ ] **Site com UTM:** `https://<domínio>/?utm_source=google&utm_medium=organic&utm_campaign=perfil_empresa`
- [ ] **Link de agendamento:** WhatsApp com mensagem própria ("Oi! Vim pelo Google…") para
      separar essa origem da do site.
- [ ] Instagram e Facebook nos perfis sociais.

## 5. Fotos e conteúdo
- [ ] Logo, capa, **fachada**, recepção, consultórios, sala cirúrgica, laboratório, internação,
      equipe (`_fontes/originais/clinica-2026-09/` + fachada).
- [ ] ⚠️ **Não subir `consultorio_melhorado_ia.jpeg`** — foto alterada por IA fere a regra de
      foto representativa.
- [ ] Pedir foto do **raio-x, ultrassom e eletrocardiograma** (serve pro perfil e pro site).
- [ ] Geotag de EXIF não funciona — não gastar tempo.
- [ ] Posts semanais (pautas: fase de vida, uma especialidade por semana, planos, feriados).
- [ ] Perguntas e respostas publicadas pela clínica (as do FAQ do site), se o recurso estiver ativo.

## 6. Avaliações (4,8 · ~130)
- [ ] Responder **todas**, inclusive as antigas, **sem citar dado clínico**.
- [ ] Link curto + **QR no balcão** + mensagem no WhatsApp dias depois do atendimento.
- [ ] ⚠️ Pedir a **todos**, nunca só a quem gostou, e **nunca** com brinde.

## 7. Fora do Google
- [ ] **Rede credenciada dos 5 planos** (PetHealth, CARE, Petlove Saúde, Pet Top, Plamev Pet):
      conferir se o cadastro dela está certo em cada busca de credenciados.
- [ ] Apple Business Connect · Página do Facebook · Apontador · CRMV-PE.
- [ ] Corrigir horário no BenditoGuia e TutorCanino.
- [ ] Bio do Instagram apontando para o site (com UTM), não mais direto pro WhatsApp.

## 8. Ligação site ↔ perfil (no lançamento)
- [ ] `NEXT_PUBLIC_SITE_APROVADO=1` (tira o noindex e libera o robots).
- [ ] Schema: `telephone` = WhatsApp (feito em 27/09/2026) e **URL do perfil no `sameAs`**
      quando existir.
- [ ] Botão "Como chegar" com o link direto da ficha (hoje é busca por texto).
- [ ] Search Console + sitemap enviado.

## 9. Medição
- [ ] **Geogrid de base antes de mexer** (Local Falcon / BrightLocal) para "veterinário" e
      "clínica veterinária".
- [ ] **Exportar o relatório de Desempenho todo mês.**
