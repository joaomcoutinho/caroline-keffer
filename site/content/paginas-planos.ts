/**
 * UMA PÁGINA POR PLANO DE SAÚDE PET (01/10/2026, JM decidiu pelas cinco).
 *
 * Para não virar cinco cópias trocando o nome, cada página traz o que é
 * PRÓPRIO daquele plano: quem é, como o tutor se identifica na clínica
 * (app, carteirinha, token, ID), e os níveis de plano como a operadora
 * publica. Tudo lido nos sites oficiais em 01/10/2026 (fontes ao lado).
 *
 * Regra: carência e cobertura são do CONTRATO de cada tutor, então a página
 * nunca promete prazo nem procedimento coberto — manda confirmar.
 * Os prazos publicados mudam e variam por plano; por isso ficam fora da copy.
 */

import type { Pagina, Bloco, Pergunta } from "@/content/paginas";

const PENDENTE = { por: null, data: "2026-10-01" } as const;
const paiPlanos = [{ rotulo: "Planos de saúde pet", caminho: "/planos-de-saude-pet" }] as const;

/* Peças que se repetem de verdade (o fluxo da clínica é o mesmo para os
   cinco). O que muda por plano vem antes delas. */
const chamadaSemPlano: Bloco = {
  tipo: "chamada",
  titulo: "Ainda não tem plano?",
  texto:
    "A clínica atende particular também. Conte o caso no WhatsApp que a gente passa o valor antes de você vir.",
  icone: "wallet",
  rotuloBotao: "Pedir o valor",
  mensagem: "Olá! Vim pelo site. Não tenho plano de saúde pet e queria saber o valor do atendimento.",
};

function perguntaCarencia(plano: string): Pergunta {
  return {
    pergunta: `O ${plano} tem carência?`,
    resposta: `Tem, e ela muda conforme o nível do plano e o procedimento. Os prazos do seu contrato aparecem no app do ${plano}, e a gente confirma se o atendimento já está liberado antes de marcar.`,
  };
}

function perguntaCobertura(plano: string): Pergunta {
  return {
    pergunta: `O ${plano} cobre cirurgia e exame de imagem?`,
    resposta: `Depende do nível do plano que você contratou. Mande o nome do plano e o número da carteirinha no WhatsApp que a gente confirma o que está coberto, antes de agendar.`,
  };
}

/* ------------------------------------------------------------------ */

export const pethealth: Pagina = {
  caminho: "/planos-de-saude-pet/pethealth",
  rotulo: "PetHealth",
  pais: paiPlanos,
  seo: {
    titulo: "Clínica credenciada PetHealth na Torre, Recife | Caroline Keffer",
    descricao:
      "A Clínica Caroline Keffer é credenciada Plano Pet Health na Torre, Recife. Veja como usar a carteirinha e o token do app e confirme a cobertura pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Planos de saúde pet · PetHealth",
    h1: "Clínica credenciada PetHealth na Torre, em Recife.",
    lead:
      "Sim, a clínica atende pelo Plano Pet Health. No dia, você apresenta a carteirinha digital do app, e o procedimento é autorizado pelo token de segurança que aparece no próprio aplicativo. A cobertura depende do plano que você contratou, e a gente confirma antes.",
    foto: {
      src: "/images/clinica/consultorio-mesa.webp",
      alt: "Consultório da clínica com a mesa de atendimento e o selo da Dra. Caroline Keffer",
      posicao: "50% 50%",
      posicaoCelular: "50% 55%",
    },
    mensagemWhatsapp: "Olá! Vim pela página do PetHealth no site. Tenho o plano e queria confirmar a cobertura.",
  },
  servico: { nome: "Atendimento veterinário pelo Plano Pet Health", tipo: "Clínica veterinária credenciada" },
  blocos: [
    {
      tipo: "passos",
      titulo: "Como usar o PetHealth aqui.",
      // Fonte: planopethealth.com.br e app "Plano Pet Health" (Google Play), lidos em 01/10/2026.
      itens: [
        { titulo: "Confirme pelo WhatsApp", texto: "Nome do plano e número da carteirinha: a gente diz o que está coberto." },
        { titulo: "Carteirinha no app", texto: "No dia, apresente a carteirinha digital do app Plano Pet Health." },
        {
          titulo: "Token de segurança",
          texto: "O procedimento é autorizado pelo token que aparece no app, na hora do atendimento.",
        },
        { titulo: "Sem surpresa no caixa", texto: "O que não estiver coberto é avisado antes, com o valor." },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Os planos PetHealth em Recife.",
      intro: "Cada um cobre uma coisa. Na dúvida, mande o nome do seu que a gente confere.",
      colunas: 2,
      itens: [
        {
          titulo: "Pet Max",
          texto: "Ambulatorial, cirurgias e internamento, na rede credenciada.",
          icone: "shield",
        },
        { titulo: "Pet Cat", texto: "Plano exclusivo para gatos.", icone: "cat" },
        { titulo: "Pet Family", texto: "Um plano só para três a cinco pets da mesma família.", icone: "paw" },
        {
          titulo: "Pet Basic",
          texto: "Plano por reembolso: o tutor paga o atendimento e pede o reembolso, dentro do limite do plano.",
          icone: "wallet",
        },
      ],
    },
    chamadaSemPlano,
  ],
  faq: {
    titulo: "Dúvidas sobre o PetHealth.",
    itens: [
      {
        pergunta: "A Clínica Caroline Keffer aceita PetHealth?",
        resposta:
          "Sim. A clínica é credenciada Plano Pet Health e aparece na rede de Recife, na Rua Araguatins, 63, na Torre.",
      },
      {
        pergunta: "O que levar no dia do atendimento?",
        resposta:
          "O celular com o app Plano Pet Health: é nele que estão a carteirinha digital e o token que autoriza o procedimento.",
      },
      perguntaCarencia("PetHealth"),
      perguntaCobertura("PetHealth"),
    ],
  },
  relacionados: ["planos", "consulta", "check-up"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const care: Pagina = {
  caminho: "/planos-de-saude-pet/care",
  rotulo: "CARE",
  pais: paiPlanos,
  seo: {
    titulo: "Clínica credenciada CARE Saúde Animal | Torre, Recife",
    descricao:
      "A Clínica Caroline Keffer é credenciada CARE Saúde Animal na Torre, Recife. Veja como usar o cartão virtual do app e confirme a cobertura pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Planos de saúde pet · CARE",
    h1: "Clínica credenciada CARE Saúde Animal na Torre, em Recife.",
    lead:
      "Sim, a clínica atende pelo CARE Saúde Animal, o plano de saúde pet daqui de Recife. No dia, você apresenta o cartão virtual do app CARE, e a cobertura depende do nível de plano que você contratou. A gente confirma antes de marcar.",
    foto: {
      src: "/images/clinica/consultorio-mesa.webp",
      alt: "Consultório da clínica com a mesa de atendimento e o selo da Dra. Caroline Keffer",
      posicao: "50% 50%",
      posicaoCelular: "50% 55%",
    },
    mensagemWhatsapp: "Olá! Vim pela página do CARE no site. Tenho o plano e queria confirmar a cobertura.",
  },
  servico: { nome: "Atendimento veterinário pelo CARE Saúde Animal", tipo: "Clínica veterinária credenciada" },
  blocos: [
    {
      tipo: "passos",
      titulo: "Como usar o CARE aqui.",
      // Fonte: caresaudeanimal.com.br e app "Care Plano de Saude Animal" (Google Play), lidos em 01/10/2026.
      itens: [
        { titulo: "Confirme pelo WhatsApp", texto: "Nome do plano e número do cartão: a gente diz o que está coberto." },
        { titulo: "Cartão virtual no app", texto: "No dia, apresente o cartão virtual do app CARE." },
        {
          titulo: "Carência no app",
          texto: "Os prazos de carência do seu plano também estão no app, junto com o prontuário do pet.",
        },
        { titulo: "Sem surpresa no caixa", texto: "O que não estiver coberto é avisado antes, com o valor." },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Os níveis do plano CARE.",
      intro: "Cada nível inclui tudo do anterior. Na dúvida, mande o nome do seu que a gente confere.",
      colunas: 3,
      itens: [
        { titulo: "Fast", texto: "Telemedicina 24h e vacinas básicas.", icone: "syringe" },
        { titulo: "Clássico", texto: "Soma urgência, consultas e exames de laboratório.", icone: "stethoscope" },
        { titulo: "Plus", texto: "Soma internação e cirurgias.", icone: "firstAid" },
        { titulo: "Premium", texto: "Soma exames de imagem avançados, odontologia e fisioterapia.", icone: "scan" },
        { titulo: "Max", texto: "O mais completo da CARE.", icone: "shield" },
      ],
    },
    chamadaSemPlano,
  ],
  faq: {
    titulo: "Dúvidas sobre o CARE.",
    itens: [
      {
        pergunta: "A Clínica Caroline Keffer aceita o plano CARE?",
        resposta: "Sim, a clínica é credenciada CARE Saúde Animal, na Torre.",
      },
      {
        pergunta: "O CARE tem coparticipação?",
        resposta:
          "Não. Nos planos CARE não tem coparticipação. O que o seu nível cobre, a gente confirma antes.",
      },
      perguntaCarencia("CARE"),
      perguntaCobertura("CARE"),
    ],
  },
  relacionados: ["planos", "urgencia", "cirurgia"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const petloveSaude: Pagina = {
  caminho: "/planos-de-saude-pet/petlove-saude",
  rotulo: "Petlove Saúde",
  pais: paiPlanos,
  seo: {
    titulo: "Clínica credenciada Petlove Saúde na Torre, Recife",
    descricao:
      "A Clínica Caroline Keffer é credenciada Petlove Saúde na Torre, Recife. Veja como usar o plano na clínica e confirme a cobertura pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Planos de saúde pet · Petlove Saúde",
    h1: "Clínica credenciada Petlove Saúde na Torre, em Recife.",
    lead:
      "Sim, a clínica atende pelo plano Petlove Saúde e aparece na rede credenciada da Petlove em Recife. No app Petlove você vê a carteirinha, as carências e o que o seu plano cobre, e a gente confirma a cobertura antes do atendimento.",
    foto: {
      src: "/images/clinica/consultorio-mesa.webp",
      alt: "Consultório da clínica com a mesa de atendimento e o selo da Dra. Caroline Keffer",
      posicao: "50% 50%",
      posicaoCelular: "50% 55%",
    },
    mensagemWhatsapp: "Olá! Vim pela página da Petlove Saúde no site. Tenho o plano e queria confirmar a cobertura.",
  },
  servico: { nome: "Atendimento veterinário pelo plano Petlove Saúde", tipo: "Clínica veterinária credenciada" },
  blocos: [
    {
      tipo: "passos",
      titulo: "Como usar a Petlove Saúde aqui.",
      // Fonte: regulamento publicado pela Petlove (tabela de procedimentos, PDF) e página da rede, lidos em 01/10/2026.
      itens: [
        { titulo: "Confirme pelo WhatsApp", texto: "Nome do plano e número da carteirinha: a gente diz o que está coberto." },
        {
          titulo: "Tudo no app Petlove",
          texto: "Carteirinha, carências, limites e coparticipação do seu plano ficam no app.",
        },
        {
          titulo: "Microchip primeiro",
          texto: "Nos planos da Petlove, a carência começa a contar a partir da microchipagem do pet.",
        },
        { titulo: "Sem surpresa no caixa", texto: "O que não estiver coberto é avisado antes, com o valor." },
      ],
    },
    {
      tipo: "texto",
      titulo: "Plano com coparticipação: o que muda no dia.",
      paragrafos: [
        "Em plano com coparticipação, uma parte de cada procedimento é paga pelo tutor. Na Petlove, parte é paga direto na clínica e parte é cobrada pela própria Petlove depois.",
        "Como isso muda de plano para plano, a gente confirma com você, antes de marcar, o que é coberto e se existe valor a pagar.",
      ],
      lista: [
        "Antes: a gente confirma o que é coberto",
        "No dia: a parte do tutor, paga aqui",
        "Depois: o restante, cobrado pela Petlove",
      ],
    },
    chamadaSemPlano,
  ],
  faq: {
    titulo: "Dúvidas sobre a Petlove Saúde.",
    itens: [
      {
        pergunta: "A Clínica Caroline Keffer aceita Petlove?",
        resposta:
          "Sim, a clínica é credenciada Petlove Saúde e aparece na rede da Petlove em Recife, na Torre.",
      },
      {
        pergunta: "Quando a carência da Petlove começa a contar?",
        resposta:
          "Nos planos da Petlove, a partir da microchipagem do pet. Os prazos de cada procedimento aparecem no app.",
      },
      perguntaCarencia("Petlove Saúde"),
      perguntaCobertura("Petlove Saúde"),
    ],
  },
  relacionados: ["planos", "vacinacao", "check-up"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const petTop: Pagina = {
  caminho: "/planos-de-saude-pet/pet-top",
  rotulo: "Pet Top",
  pais: paiPlanos,
  seo: {
    titulo: "Clínica credenciada Pet Top Saúde na Torre, Recife",
    descricao:
      "A Clínica Caroline Keffer é credenciada Pet Top Saúde, plano de Recife, na Torre. Veja como usar a carteirinha digital e confirme a cobertura pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Planos de saúde pet · Pet Top",
    h1: "Clínica credenciada Pet Top Saúde na Torre, em Recife.",
    lead:
      "Sim, a clínica atende pelo Pet Top Saúde, o plano de saúde pet daqui de Recife, e está na rede dos quatro planos Pet Top em Pernambuco. No dia, você apresenta a carteirinha digital da área do cliente, e a gente confirma a cobertura antes.",
    foto: {
      src: "/images/clinica/consultorio-mesa.webp",
      alt: "Consultório da clínica com a mesa de atendimento e o selo da Dra. Caroline Keffer",
      posicao: "50% 50%",
      posicaoCelular: "50% 55%",
    },
    mensagemWhatsapp: "Olá! Vim pela página do Pet Top no site. Tenho o plano e queria confirmar a cobertura.",
  },
  servico: { nome: "Atendimento veterinário pelo Pet Top Saúde", tipo: "Clínica veterinária credenciada" },
  blocos: [
    {
      tipo: "passos",
      titulo: "Como usar o Pet Top aqui.",
      // Fonte: pettopsaude.com.br (planos e página da clínica na rede), lido em 01/10/2026.
      itens: [
        { titulo: "Confirme pelo WhatsApp", texto: "Nome do plano e número da carteirinha: a gente diz o que está coberto." },
        { titulo: "Carteirinha digital", texto: "Fica na área do cliente do Pet Top, junto com as carências e a rede." },
        { titulo: "Apresente no dia", texto: "A carteirinha digital, no celular, serve." },
        { titulo: "Sem surpresa no caixa", texto: "O que não estiver coberto é avisado antes, com o valor." },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "O que você faz aqui pelo Pet Top.",
      intro: "Nos planos Prata, Ouro, Diamante e Premium. O que o seu cobre, a gente confirma.",
      colunas: 3,
      itens: [
        { titulo: "Clínica geral", texto: "Consulta e acompanhamento.", icone: "stethoscope", href: "/consulta-veterinaria", rotuloLink: "Ver consulta" },
        { titulo: "Especialistas", texto: "As cinco especialidades da clínica.", icone: "heartbeat", href: "/especialidades", rotuloLink: "Ver especialidades" },
        { titulo: "Cirurgia", texto: "Geral, odontológica e ortopédica.", icone: "firstAid", href: "/cirurgia-veterinaria", rotuloLink: "Ver cirurgia" },
        { titulo: "Internação", texto: "Durante o dia, na recuperação.", icone: "moon" },
        { titulo: "Exames de imagem", texto: "Raio-x, ultrassom e eletrocardiograma.", icone: "scan", href: "/exames-de-imagem", rotuloLink: "Ver exames" },
        { titulo: "Laboratório", texto: "Coleta aqui na clínica.", icone: "testTube", href: "/exames-laboratoriais", rotuloLink: "Ver laboratório" },
      ],
    },
    chamadaSemPlano,
  ],
  faq: {
    titulo: "Dúvidas sobre o Pet Top.",
    itens: [
      {
        pergunta: "A Clínica Caroline Keffer aceita Pet Top?",
        resposta:
          "Sim. A clínica está na rede credenciada do Pet Top Saúde em Pernambuco, nos quatro planos: Prata, Ouro, Diamante e Premium.",
      },
      {
        pergunta: "O que posso fazer na clínica pelo Pet Top?",
        resposta:
          "Clínica geral, especialistas, cirurgia, internação, exames de imagem e laboratório. O que o seu plano cobre, a gente confirma antes.",
      },
      perguntaCarencia("Pet Top"),
      perguntaCobertura("Pet Top"),
    ],
  },
  relacionados: ["planos", "especialidades", "cirurgia"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const plamevPet: Pagina = {
  caminho: "/planos-de-saude-pet/plamev-pet",
  rotulo: "Plamev Pet",
  pais: paiPlanos,
  seo: {
    titulo: "Clínica credenciada Plamev Pet na Torre, Recife",
    descricao:
      "A Clínica Caroline Keffer é credenciada Plamev Pet na Torre, Recife. Veja como ativar o ID Pet no app e confirme a cobertura pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Planos de saúde pet · Plamev Pet",
    h1: "Clínica credenciada Plamev Pet na Torre, em Recife.",
    lead:
      "Sim, a clínica atende pelo Plamev Pet. Antes da primeira consulta, ative o ID Pet no app Plamev Appet: é ele que você apresenta no dia. A cobertura depende do plano que você contratou, e a gente confirma antes.",
    foto: {
      src: "/images/galeria/atendimento-18.webp",
      alt: "Colaboradora abraçando um yorkshire",
      posicao: "50% 35%",
      posicaoCelular: "50% 45%",
    },
    mensagemWhatsapp: "Olá! Vim pela página do Plamev no site. Tenho o plano e queria confirmar a cobertura.",
  },
  servico: { nome: "Atendimento veterinário pelo Plamev Pet", tipo: "Clínica veterinária credenciada" },
  blocos: [
    {
      tipo: "passos",
      titulo: "Como usar o Plamev aqui.",
      // Fonte: páginas oficiais da Plamev e FAQ oficial, lidos em 01/10/2026.
      itens: [
        {
          titulo: "Ative o ID Pet antes",
          texto: "No app Plamev Appet, com o CPF do titular. A validação pode levar até 72 horas: não deixe para o dia.",
        },
        { titulo: "Confirme pelo WhatsApp", texto: "Nome do plano e número do ID: a gente diz o que está coberto." },
        { titulo: "Apresente o ID Pet", texto: "No dia, o ID digital no app identifica o seu pet." },
        { titulo: "Sem surpresa no caixa", texto: "O que não estiver coberto é avisado antes, com o valor." },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Os planos Plamev.",
      intro: "Cada plano inclui tudo do anterior. Na dúvida, mande o nome do seu que a gente confere.",
      colunas: 3,
      itens: [
        { titulo: "Slim", texto: "Emergência, vacinas e exames de laboratório.", icone: "syringe" },
        { titulo: "Advance", texto: "Soma exames de imagem e cirurgias.", icone: "scan" },
        { titulo: "Platinum", texto: "Soma vacinas extras e especialidades.", icone: "shield" },
      ],
    },
    chamadaSemPlano,
  ],
  faq: {
    titulo: "Dúvidas sobre o Plamev.",
    itens: [
      {
        pergunta: "A Clínica Caroline Keffer aceita Plamev?",
        resposta: "Sim, a clínica é credenciada Plamev Pet, na Torre.",
      },
      {
        pergunta: "O que é o ID Pet do Plamev?",
        resposta:
          "É a identificação digital do seu pet no app Plamev Appet. Ative no primeiro acesso, com o CPF do titular, alguns dias antes da consulta: a validação pode levar até 72 horas.",
      },
      {
        pergunta: "O Plamev tem coparticipação?",
        resposta: "Não. Os planos Plamev são sem coparticipação. O que o seu cobre, a gente confirma antes.",
      },
      perguntaCarencia("Plamev"),
      perguntaCobertura("Plamev"),
    ],
  },
  relacionados: ["planos", "vacinacao", "laboratorio"],
  revisao: PENDENTE,
};
