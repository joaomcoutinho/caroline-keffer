# Regra de UTM — Clínica Pet Caroline Keffer (seo-mxc 3.13, 29/10/2026)

Tudo em minúsculas, sem acento, palavras separadas por `_`. Nunca em link interno do site
(o UTM num link de dentro do site apaga a origem verdadeira da visita).

| Onde o link aparece | utm_source | utm_medium | utm_campaign |
|---|---|---|---|
| Site no Perfil da Empresa no Google | google | organic | perfil_empresa |
| Botão dos posts do Perfil | google | organic | perfil_post |
| Bio do Instagram | instagram | social | bio |
| Stories / posts do Instagram | instagram | social | nome_da_acao (ex.: vacinacao_nov26) |
| WhatsApp (mensagem enviada pela clínica) | whatsapp | mensagem | nome_da_acao |
| QR do balcão | balcao | qr | avaliacao ou site |
| Selo "Feito por MXC" (só no site da MXC) | caroline-keffer | rodape | assinatura |

Links prontos:
- Perfil: `https://clinicacarolinekeffer.com.br/?utm_source=google&utm_medium=organic&utm_campaign=perfil_empresa`
- Bio do Instagram: `https://clinicacarolinekeffer.com.br/?utm_source=instagram&utm_medium=social&utm_campaign=bio`

## Marca × descoberta no Search Console

O filtro automático de marca só aparece com volume. Até lá, em Desempenho → Consulta →
"Expressão regular personalizada":
- Marca (corresponde): `keffer|kefer|keffe|caroline vet|carol vet`
- Descoberta: a mesma expressão com "Não corresponde à expressão regular".
