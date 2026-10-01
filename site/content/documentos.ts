/**
 * DOCUMENTOS DO SITE: política de privacidade e termos de uso (01/10/2026).
 *
 * Régua: módulo 06 da checklist-final (LGPD).
 * - O site NÃO carrega rastreador nem cookie (conferido no código e no
 *   navegador em 01/10/2026): sem banner, porque não há o que consentir
 *   (T-04/GL-02). A política existe porque a clínica TRATA dado pessoal no
 *   atendimento pelo WhatsApp e pelo telefone (0.3).
 * - As sete informações do art. 9º (L-08), com prazo NUMÉRICO (L-12 proíbe
 *   "pelo tempo necessário"): o prontuário segue a Resolução CFMV nº
 *   1.321/2020, art. 9º §3º (pelo menos 5 anos após o último atendimento,
 *   conferido no texto consolidado com a Res. 1.653/2025).
 * - Canal do titular identificado na página (L-01, o que a ANPD autua) e
 *   prazo de resposta do art. 19 da LGPD (15 dias).
 * - CNPJ e endereço em destaque (L-10): vêm de `empresa` em content/site.ts.
 *
 * ⚠️ Se entrar analytics, pixel, formulário ou mapa embutido, a política
 * muda ANTES do deploy, e aí sim entra banner com Aceitar e Recusar.
 */

import { contato, empresa } from "@/content/site";

export type Documento = {
  caminho: string;
  sobretitulo: string;
  titulo: string;
  seo: { titulo: string; descricao: string };
  atualizadaEm: string;
  intro: string;
  secoes: readonly { titulo: string; paragrafos: readonly string[]; lista?: readonly string[] }[];
  contato: { titulo: string; mensagem: string };
};

const identificacao = [
  empresa.razaoSocial ? `Clínica Pet Caroline Keffer (${empresa.razaoSocial})` : "Clínica Pet Caroline Keffer",
  empresa.cnpj ? `CNPJ ${empresa.cnpj}` : null,
  `${contato.endereco}, ${contato.bairro}, CEP ${contato.cep}`,
]
  .filter(Boolean)
  .join(", ");

export const politica: Documento = {
  caminho: "/politica-de-privacidade",
  sobretitulo: "Institucional",
  titulo: "Política de privacidade",
  seo: {
    titulo: "Política de privacidade | Clínica Pet Caroline Keffer",
    descricao:
      "Como a Clínica Pet Caroline Keffer trata os dados de quem visita o site e fala com a clínica pelo WhatsApp: sem cookies, sem rastreamento, conforme a LGPD.",
  },
  atualizadaEm: "2026-10-01",
  intro:
    "Este site não usa cookies, não tem formulário e não acompanha a sua navegação. Os seus dados só chegam até a clínica quando você escolhe falar com a gente pelo WhatsApp ou pelo telefone. Abaixo, o que acontece com eles, em linguagem simples.",
  secoes: [
    {
      titulo: "Quem cuida dos seus dados",
      paragrafos: [
        `${identificacao}. A clínica é a responsável (controladora, nos termos da Lei Geral de Proteção de Dados, a Lei 13.709/2018) pelos dados pessoais tratados no atendimento.`,
      ],
    },
    {
      titulo: "Cookies",
      paragrafos: [
        "O site não usa cookies, nem de análise, nem de anúncio, nem de terceiros, e não guarda nenhuma informação no seu navegador. Por isso não existe aviso de cookies: não há o que aceitar ou recusar.",
        "Se um dia isso mudar, esta política muda antes, e o site passa a pedir a sua escolha, com a opção de recusar no mesmo lugar e do mesmo jeito que a de aceitar.",
      ],
    },
    {
      titulo: "O que o site registra",
      paragrafos: [
        "Por conta própria, nada. Como qualquer site, ele é entregue por um serviço de hospedagem, que registra dados técnicos de acesso, como o endereço IP e o tipo de navegador, para manter o serviço funcionando e seguro. Esses registros ficam com o provedor de hospedagem e não são usados pela clínica para identificar ninguém.",
      ],
    },
    {
      titulo: "Quando você fala com a clínica",
      paragrafos: [
        "Ao tocar em um botão de WhatsApp ou de telefone, você sai do site e fala direto com a clínica. Nessa conversa, você pode nos passar o seu nome, o seu telefone e informações sobre o seu pet.",
        "Usamos esses dados só para isto:",
      ],
      lista: [
        "Responder, agendar e confirmar o horário",
        "Atender e acompanhar a saúde do seu pet",
        "Confirmar a cobertura do seu plano de saúde pet, quando você pedir",
        "Manter o prontuário do atendimento, como exige a medicina veterinária",
      ],
    },
    {
      titulo: "Com quem compartilhamos, e para quê",
      paragrafos: [
        "Nunca para venda ou publicidade. Os dados só saem da clínica quando o próprio atendimento exige:",
      ],
      lista: [
        "Com o seu plano de saúde pet, para autorizar e cobrar o que ele cobre",
        "Com laboratórios e profissionais que fazem exames do seu pet, para realizar o exame",
        "Com um hospital 24h, se for preciso encaminhar o seu pet",
      ],
    },
    {
      titulo: "Por quanto tempo guardamos",
      paragrafos: [
        "O prontuário do seu pet, com os dados de quem é responsável por ele, é guardado por pelo menos 5 anos depois do último atendimento, como exige o Conselho Federal de Medicina Veterinária (Resolução CFMV nº 1.321/2020, art. 9º).",
        "Conversas que não viraram atendimento, como uma dúvida ou um pedido de valor, são apagadas em até 12 meses.",
      ],
    },
    {
      titulo: "Como os dados são protegidos",
      paragrafos: [
        "Só a equipe da clínica acessa os dados, e só para as finalidades acima. A clínica responde pelo tratamento que faz e exige o mesmo cuidado de quem recebe dados no atendimento, como o plano e o laboratório.",
      ],
    },
    {
      titulo: "Os seus direitos",
      paragrafos: [
        "A LGPD garante a você, a qualquer momento: confirmar se tratamos dados seus, acessar, corrigir, pedir a anonimização ou a eliminação do que não for mais necessário, pedir a portabilidade, saber com quem compartilhamos e revogar um consentimento que tenha dado.",
      ],
    },
    {
      titulo: "Canal para falar sobre os seus dados",
      paragrafos: [
        `Quem responde pelos dados pessoais é a própria clínica. Para qualquer pedido sobre os seus dados, escreva para ${contato.email} ou fale pelo WhatsApp ${contato.whatsappExibicao}, dizendo que o assunto é dados pessoais. A resposta vem em até 15 dias.`,
        "Se não ficar satisfeito com a resposta, você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).",
      ],
    },
    {
      titulo: "Mudanças nesta política",
      paragrafos: [
        "Se o site passar a coletar alguma informação, esta página muda antes, e a data de atualização no topo mostra quando.",
      ],
    },
  ],
  contato: {
    titulo: "Fale com a clínica sobre os seus dados",
    mensagem: "Olá! Vim pela política de privacidade do site e tenho um pedido sobre os meus dados.",
  },
};

export const termos: Documento = {
  caminho: "/termos-de-uso",
  sobretitulo: "Institucional",
  titulo: "Termos de uso",
  seo: {
    titulo: "Termos de uso | Clínica Pet Caroline Keffer",
    descricao:
      "As regras de uso do site da Clínica Pet Caroline Keffer: conteúdo informativo, agendamento, valores, planos de saúde pet e emergência.",
  },
  atualizadaEm: "2026-10-01",
  intro:
    "O site existe para você conhecer a clínica, tirar dúvidas e chegar até a gente. Estas são as regras de uso dele, curtas e sem letra miúda.",
  secoes: [
    {
      titulo: "O conteúdo informa, não substitui a consulta",
      paragrafos: [
        "Os textos sobre saúde, doenças, exames e vacinas são orientação geral, para ajudar você a reconhecer sinais e saber quando procurar atendimento. Eles não são diagnóstico nem prescrição: o que vale para o seu pet sai da consulta com a veterinária.",
      ],
    },
    {
      titulo: "Emergência",
      paragrafos: [
        "O site não é canal de emergência. A clínica atende urgência até as 18h, nos dias de funcionamento. Fora disso, ou com a clínica fechada, procure um plantão veterinário 24h e não espere a resposta de uma mensagem.",
      ],
    },
    {
      titulo: "Agendamento",
      paragrafos: [
        "O agendamento é feito pelo WhatsApp ou pelo telefone, e só está confirmado quando a clínica responde com o dia e o horário.",
      ],
    },
    {
      titulo: "Valores e planos de saúde pet",
      paragrafos: [
        "O site não publica preço: o valor de cada atendimento é informado pelo WhatsApp, antes de você vir.",
        "As informações sobre os planos de saúde pet são um resumo de como cada um funciona. Cobertura, carência e coparticipação são as do contrato de cada tutor com o plano, e a clínica confirma antes do atendimento.",
      ],
    },
    {
      titulo: "Fotos, textos e marca",
      paragrafos: [
        "As fotos, os textos, o nome e o logo da Clínica Pet Caroline Keffer pertencem à clínica. Não podem ser copiados ou usados em outro lugar sem autorização. As marcas dos planos de saúde pet pertencem às respectivas empresas.",
      ],
    },
    {
      titulo: "Links para outros serviços",
      paragrafos: [
        "Os botões levam ao WhatsApp, ao Google Maps e ao Instagram, que são serviços de outras empresas, com regras e políticas de privacidade próprias.",
      ],
    },
    {
      titulo: "Privacidade",
      paragrafos: [
        "O site não usa cookies nem rastreia a sua navegação. Como os dados que você passa no atendimento são tratados está na política de privacidade.",
      ],
    },
    {
      titulo: "Mudanças nestes termos",
      paragrafos: [
        "Quando estes termos mudarem, a data de atualização no topo mostra quando. Eles seguem a lei brasileira, incluindo o Código de Defesa do Consumidor.",
      ],
    },
  ],
  contato: {
    titulo: "Ficou alguma dúvida?",
    mensagem: "Olá! Vim pelos termos de uso do site e tenho uma dúvida.",
  },
};
