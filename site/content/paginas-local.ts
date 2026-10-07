/**
 * COMO CHEGAR + PÁGINAS POR BAIRRO (01/10/2026).
 *
 * ⚠️ Decisão do JM, contra a régua da checklist-final (página de bairro com
 * unidade única é risco de "página-ponte"/doorway). Para não ser clone com o
 * nome trocado, cada página tem o que SÓ vale para aquele bairro: o trajeto
 * rua a rua, as distâncias, as referências do caminho e as perguntas com
 * esses números. Nunca dizemos que a clínica fica no bairro: ela fica na
 * Torre, e a página diz a que distância.
 *
 * DADOS DE ROTA (medidos em 01/10/2026, OpenStreetMap):
 * - ponto de partida = centro do limite oficial do bairro no OSM;
 * - carro: OSRM (sem trânsito: o tempo aparece como faixa, nunca exato);
 * - a pé e de bicicleta: routing.openstreetmap.de;
 * - vizinhança com a Torre: limites de bairro no OSM (Overpass). Madalena,
 *   Cordeiro, Zumbi, Jaqueira e Graças fazem divisa; Parnamirim e Iputinga não.
 * - referências: pontos do OSM a até ~80 m do trajeto.
 * VALIDAR: estacionamento em frente à clínica (exclusivo para clientes?).
 */

import type { Pagina, Pergunta } from "@/content/paginas";

const PENDENTE = { por: null, data: "2026-10-06" } as const;
const paiComoChegar = [{ rotulo: "Como chegar", caminho: "/como-chegar" }] as const;

/** O último trecho é o mesmo para todo mundo. */
const CHEGADA = {
  via: "Rua José Bonifácio",
  nota: "O Carrefour fica nessa rua, a uns 200 m da clínica. Vire na Rua Araguatins.",
} as const;

const perguntaUrgencia: Pergunta = {
  pergunta: "Vocês atendem urgência?",
  resposta:
    "Sim, até as 18h de segunda a sexta e até as 16h no sábado: a equipe estabiliza o pet e, se ele precisar ficar internado à noite, encaminha para um hospital 24h. Avise pelo WhatsApp antes de sair.",
};

const perguntaEstacionamento: Pergunta = {
  pergunta: "Tem onde estacionar?",
  resposta:
    "Sim, em frente à clínica. Se estiver cheio, o estacionamento do Carrefour da Rua José Bonifácio fica a uns 200 m.",
};

const servicosPerto = {
  tipo: "cartoes" as const,
  titulo: "O que o seu pet encontra aqui.",
  colunas: 3 as const,
  itens: [
    { titulo: "Consulta", texto: "Clínica geral para cães e gatos.", icone: "stethoscope", href: "/consulta-veterinaria", rotuloLink: "Ver consulta" },
    { titulo: "Vacinação", texto: "Polivalente, antirrábica e mais.", icone: "syringe", href: "/vacinacao-de-caes-e-gatos", rotuloLink: "Ver vacinas" },
    { titulo: "Urgência até 18h", texto: "Estabiliza e, se preciso, encaminha.", icone: "warning", href: "/urgencia-veterinaria", rotuloLink: "Ver urgência" },
    { titulo: "Exames", texto: "Imagem e laboratório, aqui na clínica.", icone: "scan", href: "/exames-de-imagem", rotuloLink: "Ver exames" },
    { titulo: "Cirurgia e castração", texto: "Com recuperação durante o dia.", icone: "firstAid", href: "/cirurgia-veterinaria", rotuloLink: "Ver cirurgia" },
    { titulo: "Banho e tosa", texto: "Dentro da clínica, para cães e gatos.", icone: "bath", href: "/banho-e-tosa", rotuloLink: "Ver banho e tosa" },
  ],
};

/* ------------------------------------------------------------------ */

export const comoChegar: Pagina = {
  caminho: "/como-chegar",
  rotulo: "Como chegar",
  seo: {
    titulo: "Como chegar à Clínica Caroline Keffer | Torre, Recife",
    descricao:
      "Rua Araguatins, 63, na Torre, Recife: ao lado da Praça Batista da Silva, perto da Rua José Bonifácio. Estacionamento, horário e rota a partir dos bairros vizinhos.",
  },
  topo: {
    sobretitulo: "Como chegar",
    h1: "Como chegar à clínica, na Torre.",
    lead:
      "A clínica fica na Rua Araguatins, 63, na Torre, ao lado da Praça Batista da Silva e a uma esquina da Rua José Bonifácio. Tem estacionamento em frente, e quem vem da Madalena, das Graças ou da Jaqueira chega em poucos minutos.",
    foto: {
      src: "/images/fachada_hero.webp",
      alt: "Fachada da Clínica Veterinária Caroline Keffer vista de frente, com a entrada e o estacionamento",
      posicao: "45% 45%",
      posicaoCelular: "25% 50%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de como chegar do site e queria marcar um horário.",
  },
  blocos: [
    {
      tipo: "rota",
      titulo: "O último trecho é sempre o mesmo.",
      intro: "Venha de onde vier, a chegada é pela Rua José Bonifácio. O botão abre a rota a partir de onde você está.",
      origem: "",
      medidas: [
        { rotulo: "Endereço", valor: "Rua Araguatins, 63" },
        { rotulo: "Bairro", valor: "Torre" },
        // Hífen que não quebra (U+2011): o CEP nunca parte em duas linhas.
        { rotulo: "CEP", valor: "50710\u2011060" },
      ],
      trajeto: [CHEGADA],
    },
    {
      tipo: "cartoes",
      titulo: "Na chegada.",
      colunas: 3,
      itens: [
        {
          titulo: "Estacionamento",
          texto: "Em frente à clínica. Se estiver cheio, o do Carrefour da José Bonifácio fica a uns 200 m.",
          icone: "car",
        },
        {
          titulo: "Ponto de referência",
          texto: "Ao lado da Praça Batista da Silva, a uns 300 m do Hospital Evangélico de Pernambuco.",
          icone: "mapPin",
        },
        {
          titulo: "Horário",
          texto: "Segunda a sexta, das 9h às 19h. Sábado, das 8h às 16h. Domingo, fechado.",
          icone: "clock",
        },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Saindo dos bairros vizinhos.",
      intro: "Distância de carro, medida no mapa. O tempo depende do trânsito.",
      colunas: 3,
      itens: [
        { titulo: "Graças", texto: "1,6 km pela Ponte da Torre. 5 a 10 min de carro.", icone: "bridge", href: "/como-chegar/gracas", rotuloLink: "Ver o caminho" },
        { titulo: "Madalena", texto: "2,0 km pela Rua Real da Torre. 5 a 10 min de carro.", icone: "path", href: "/como-chegar/madalena", rotuloLink: "Ver o caminho" },
        { titulo: "Jaqueira e Parnamirim", texto: "A partir de 1,1 km a pé, cruzando o Capibaribe.", icone: "tree", href: "/como-chegar/jaqueira-e-parnamirim", rotuloLink: "Ver o caminho" },
        { titulo: "Zumbi", texto: "2,5 km saindo da Av. Caxangá. 5 a 15 min de carro.", icone: "bus", href: "/como-chegar/zumbi", rotuloLink: "Ver o caminho" },
        { titulo: "Cordeiro", texto: "4,2 km pela Av. do Forte. 10 a 20 min de carro.", icone: "path", href: "/como-chegar/cordeiro", rotuloLink: "Ver o caminho" },
        { titulo: "Iputinga", texto: "5,0 km pela Av. Maurício de Nassau. 15 a 25 min de carro.", icone: "car", href: "/como-chegar/iputinga", rotuloLink: "Ver o caminho" },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre como chegar.",
    itens: [
      {
        pergunta: "Onde fica a Clínica Caroline Keffer?",
        resposta:
          "Na Rua Araguatins, 63, na Torre, em Recife (CEP 50710-060), ao lado da Praça Batista da Silva e perto da Rua José Bonifácio.",
      },
      perguntaEstacionamento,
      {
        pergunta: "Abre no domingo?",
        resposta:
          "Não. A clínica abre de segunda a sexta, das 9h às 19h, e no sábado, das 8h às 16h. Em urgência com a clínica fechada, procure um plantão veterinário 24h.",
      },
      {
        pergunta: "Quais bairros ficam mais perto?",
        resposta:
          "Graças, Madalena, Jaqueira, Zumbi e Cordeiro fazem divisa com a Torre. Das Graças e da Madalena, são uns 2 km de carro.",
      },
    ],
  },
  relacionados: ["consulta", "urgencia", "planos"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const madalena: Pagina = {
  caminho: "/como-chegar/madalena",
  rotulo: "Madalena",
  pais: paiComoChegar,
  seo: {
    titulo: "Veterinário perto da Madalena, Recife | Caroline Keffer",
    descricao:
      "Clínica veterinária a 2 km da Madalena, na Torre: consulta, vacina, exames, cirurgia e urgência até 18h para cães e gatos. Veja o caminho e agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Como chegar · Madalena",
    h1: "Clínica veterinária perto da Madalena, na Torre.",
    lead:
      "A Clínica Pet Caroline Keffer fica na Torre, vizinha da Madalena: são cerca de 2 km de carro pela Rua Real da Torre, ou uns 20 minutos a pé. Consulta, vacina, exames, cirurgia, urgência até as 18h e banho e tosa para cães e gatos.",
    foto: {
      src: "/images/clinica/fachada.webp",
      alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins, com o letreiro e o céu aberto",
      posicao: "50% 50%",
      posicaoCelular: "30% 50%",
    },
    mensagemWhatsapp: "Olá! Moro na Madalena, vim pelo site e queria marcar um horário para o meu pet.",
  },
  blocos: [
    {
      tipo: "rota",
      titulo: "Da Madalena até a clínica.",
      intro: "A Madalena faz divisa com a Torre. O caminho mais curto de carro sai pela Rua Real da Torre.",
      origem: "Madalena, Recife - PE",
      medidas: [
        { rotulo: "Distância", valor: "2,0 km" },
        { rotulo: "De carro", valor: "5 a 10 min" },
        { rotulo: "A pé", valor: "cerca de 20 min" },
      ],
      trajeto: [
        { via: "Rua Real da Torre", nota: "Saindo do centro da Madalena, perto da Praça Eça de Queiroz." },
        { via: "Rua Lopes de Carvalho" },
        { via: "Av. Visconde de Albuquerque", nota: "Passa pelo Hospital De Ávila." },
        CHEGADA,
      ],
    },
    servicosPerto,
  ],
  faq: {
    titulo: "Dúvidas de quem vem da Madalena.",
    itens: [
      {
        pergunta: "Tem clínica veterinária perto da Madalena?",
        resposta:
          "A Clínica Caroline Keffer fica na Torre, bairro vizinho: são cerca de 2 km de carro, ou uns 20 minutos a pé.",
      },
      {
        pergunta: "Qual o caminho da Madalena até a clínica?",
        resposta:
          "Pela Rua Real da Torre, Rua Lopes de Carvalho e Av. Visconde de Albuquerque, até a Rua José Bonifácio. A clínica fica na Rua Araguatins, logo ali.",
      },
      perguntaEstacionamento,
      perguntaUrgencia,
    ],
  },
  relacionados: ["como-chegar", "gracas", "consulta"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const cordeiro: Pagina = {
  caminho: "/como-chegar/cordeiro",
  rotulo: "Cordeiro",
  pais: paiComoChegar,
  seo: {
    titulo: "Veterinário perto do Cordeiro, Recife | Caroline Keffer",
    descricao:
      "Clínica veterinária a 4 km do Cordeiro, na Torre: consulta, vacina, exames, cirurgia e urgência até 18h para cães e gatos. Veja o caminho e agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Como chegar · Cordeiro",
    h1: "Clínica veterinária perto do Cordeiro, na Torre.",
    lead:
      "A Clínica Pet Caroline Keffer fica na Torre, que faz divisa com o Cordeiro: são cerca de 4 km de carro, saindo pela Av. do Forte. Consulta, vacina, exames, cirurgia, urgência até as 18h e banho e tosa para cães e gatos.",
    foto: {
      src: "/images/clinica/fachada.webp",
      alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins, com o letreiro e o céu aberto",
      posicao: "50% 50%",
      posicaoCelular: "30% 50%",
    },
    mensagemWhatsapp: "Olá! Moro no Cordeiro, vim pelo site e queria marcar um horário para o meu pet.",
  },
  blocos: [
    {
      tipo: "rota",
      titulo: "Do Cordeiro até a clínica.",
      intro: "O Cordeiro faz divisa com a Torre. De carro, o caminho cruza o bairro pela Av. do Forte e segue pelas ruas internas até a José Bonifácio.",
      origem: "Cordeiro, Recife - PE",
      medidas: [
        { rotulo: "Distância", valor: "4,2 km" },
        { rotulo: "De carro", valor: "10 a 20 min" },
        { rotulo: "De bicicleta", valor: "cerca de 16 min" },
      ],
      trajeto: [
        { via: "Av. do Forte", nota: "Saindo da Rua Eurico de Souza Leão." },
        { via: "Rua Gomes Taborda e Rua Gregório Júnior" },
        { via: "Rua Souza Bandeira e Rua Tomaz Gonzaga", nota: "Perto da Praça Professor Barreto Campelo." },
        { via: "Rua Conselheiro Teodoro, Rua Dom Manoel da Costa e Rua Padre Anchieta" },
        CHEGADA,
      ],
    },
    servicosPerto,
  ],
  faq: {
    titulo: "Dúvidas de quem vem do Cordeiro.",
    itens: [
      {
        pergunta: "Tem clínica veterinária perto do Cordeiro?",
        resposta:
          "A Clínica Caroline Keffer fica na Torre, que faz divisa com o Cordeiro: são cerca de 4 km de carro, de 10 a 20 minutos conforme o trânsito.",
      },
      {
        pergunta: "Qual o caminho do Cordeiro até a clínica?",
        resposta:
          "Pela Av. do Forte, seguindo pelas ruas Souza Bandeira, Tomaz Gonzaga e Padre Anchieta até a Rua José Bonifácio. A clínica fica na Rua Araguatins.",
      },
      perguntaEstacionamento,
      perguntaUrgencia,
    ],
  },
  relacionados: ["como-chegar", "zumbi", "consulta"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const zumbi: Pagina = {
  caminho: "/como-chegar/zumbi",
  rotulo: "Zumbi",
  pais: paiComoChegar,
  seo: {
    titulo: "Veterinário perto do Zumbi, Recife | Caroline Keffer",
    descricao:
      "Clínica veterinária a 2,5 km do Zumbi, na Torre: consulta, vacina, exames, cirurgia e urgência até 18h para cães e gatos. Veja o caminho e agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Como chegar · Zumbi",
    h1: "Clínica veterinária perto do Zumbi, na Torre.",
    lead:
      "A Clínica Pet Caroline Keffer fica na Torre, vizinha do Zumbi: são cerca de 2,5 km de carro saindo da Av. Caxangá, ou uns 30 minutos a pé. Consulta, vacina, exames, cirurgia, urgência até as 18h e banho e tosa para cães e gatos.",
    foto: {
      src: "/images/clinica/fachada.webp",
      alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins, com o letreiro e o céu aberto",
      posicao: "50% 50%",
      posicaoCelular: "30% 50%",
    },
    mensagemWhatsapp: "Olá! Moro no Zumbi, vim pelo site e queria marcar um horário para o meu pet.",
  },
  blocos: [
    {
      tipo: "rota",
      titulo: "Do Zumbi até a clínica.",
      intro: "O Zumbi faz divisa com a Torre. Saindo da Caxangá, são poucas quadras até a José Bonifácio.",
      origem: "Zumbi, Recife - PE",
      medidas: [
        { rotulo: "Distância", valor: "2,5 km" },
        { rotulo: "De carro", valor: "5 a 15 min" },
        { rotulo: "A pé", valor: "cerca de 30 min" },
      ],
      trajeto: [
        { via: "Av. Caxangá", nota: "Saindo perto do terminal do Zumbi e da Faculdade Santa Helena." },
        { via: "Rua Souza Bandeira e Rua Tomaz Gonzaga", nota: "Perto da Praça Professor Barreto Campelo." },
        { via: "Rua Conselheiro Teodoro, Rua Dom Manoel da Costa e Rua Padre Anchieta" },
        CHEGADA,
      ],
    },
    servicosPerto,
  ],
  faq: {
    titulo: "Dúvidas de quem vem do Zumbi.",
    itens: [
      {
        pergunta: "Tem clínica veterinária perto do Zumbi?",
        resposta:
          "A Clínica Caroline Keffer fica na Torre, bairro vizinho: são cerca de 2,5 km de carro, ou uns 30 minutos a pé.",
      },
      {
        pergunta: "Qual o caminho do Zumbi até a clínica?",
        resposta:
          "Da Av. Caxangá, entre na Rua Souza Bandeira e siga pela Tomaz Gonzaga e pela Padre Anchieta até a Rua José Bonifácio. A clínica fica na Rua Araguatins.",
      },
      perguntaEstacionamento,
      perguntaUrgencia,
    ],
  },
  relacionados: ["como-chegar", "cordeiro", "vacinacao"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const iputinga: Pagina = {
  caminho: "/como-chegar/iputinga",
  rotulo: "Iputinga",
  pais: paiComoChegar,
  seo: {
    titulo: "Veterinário perto da Iputinga, Recife | Caroline Keffer",
    descricao:
      "Clínica veterinária a 5 km da Iputinga, na Torre: consulta, vacina, exames, cirurgia e urgência até 18h para cães e gatos. Veja o caminho e agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Como chegar · Iputinga",
    h1: "Clínica veterinária para quem vem da Iputinga.",
    lead:
      "A Clínica Pet Caroline Keffer fica na Torre, a cerca de 5 km da Iputinga, passando pelo Cordeiro pela Av. Maurício de Nassau. Consulta, vacina, exames, cirurgia, urgência até as 18h e banho e tosa para cães e gatos.",
    foto: {
      src: "/images/clinica/fachada.webp",
      alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins, com o letreiro e o céu aberto",
      posicao: "50% 50%",
      posicaoCelular: "30% 50%",
    },
    mensagemWhatsapp: "Olá! Moro na Iputinga, vim pelo site e queria marcar um horário para o meu pet.",
  },
  blocos: [
    {
      tipo: "rota",
      titulo: "Da Iputinga até a clínica.",
      intro: "A Iputinga não faz divisa com a Torre: o caminho passa pelo Cordeiro. Vale avisar pelo WhatsApp quando sair.",
      origem: "Iputinga, Recife - PE",
      medidas: [
        { rotulo: "Distância", valor: "5,0 km" },
        { rotulo: "De carro", valor: "15 a 25 min" },
        { rotulo: "De bicicleta", valor: "cerca de 20 min" },
      ],
      trajeto: [
        { via: "Rua São Mateus", nota: "Saindo da Rua Doutor Virgínio Marquês." },
        { via: "Av. Maurício de Nassau", nota: "Passa perto do Parque do Caiara." },
        { via: "Rua Odete Monteiro, Rua Doutor João Lacerda e Rua Dez de Novembro", nota: "Perto do Parque de Exposições do Cordeiro." },
        { via: "Rua Tomaz Gonzaga, Rua Conselheiro Teodoro e Rua Padre Anchieta" },
        CHEGADA,
      ],
    },
    servicosPerto,
  ],
  faq: {
    titulo: "Dúvidas de quem vem da Iputinga.",
    itens: [
      {
        pergunta: "A clínica fica longe da Iputinga?",
        resposta:
          "São cerca de 5 km de carro, de 15 a 25 minutos conforme o trânsito, passando pelo Cordeiro até a Torre.",
      },
      {
        pergunta: "Qual o caminho da Iputinga até a clínica?",
        resposta:
          "Pela Av. Maurício de Nassau, cruzando o Cordeiro pelas ruas Dez de Novembro, Tomaz Gonzaga e Padre Anchieta, até a Rua José Bonifácio. A clínica fica na Rua Araguatins.",
      },
      perguntaEstacionamento,
      perguntaUrgencia,
    ],
  },
  relacionados: ["como-chegar", "cordeiro", "planos"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const jaqueiraParnamirim: Pagina = {
  caminho: "/como-chegar/jaqueira-e-parnamirim",
  rotulo: "Jaqueira e Parnamirim",
  pais: paiComoChegar,
  seo: {
    titulo: "Veterinário perto da Jaqueira e Parnamirim | Caroline Keffer",
    descricao:
      "Clínica veterinária do outro lado do Capibaribe, na Torre: a cerca de 1 km a pé da Jaqueira e do Parnamirim. Consulta, vacina, exames e urgência até 18h.",
  },
  topo: {
    sobretitulo: "Como chegar · Jaqueira e Parnamirim",
    h1: "Clínica veterinária perto da Jaqueira e do Parnamirim.",
    lead:
      "A Clínica Pet Caroline Keffer fica na Torre, do outro lado do Capibaribe: da Jaqueira e do Parnamirim são cerca de 1 km a pé, cruzando o rio pela Rua José Bonifácio. Consulta, vacina, exames, cirurgia, urgência até as 18h e banho e tosa para cães e gatos.",
    foto: {
      src: "/images/clinica/fachada.webp",
      alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins, com o letreiro e o céu aberto",
      posicao: "50% 50%",
      posicaoCelular: "30% 50%",
    },
    mensagemWhatsapp: "Olá! Moro na Jaqueira/Parnamirim, vim pelo site e queria marcar um horário para o meu pet.",
  },
  blocos: [
    {
      tipo: "rota",
      titulo: "Da Jaqueira até a clínica.",
      intro: "A Jaqueira faz divisa com a Torre, separada pelo Capibaribe. A pé, é o caminho mais curto de todos.",
      origem: "Jaqueira, Recife - PE",
      medidas: [
        { rotulo: "Distância a pé", valor: "1,1 km" },
        { rotulo: "A pé", valor: "cerca de 20 min" },
        { rotulo: "De carro", valor: "2,7 km" },
      ],
      trajeto: [
        { via: "Av. Conselheiro Rosa e Silva", nota: "Saindo da Rua Neto de Mendonça, perto do Parque da Jaqueira." },
        { via: "Rua Padre Roma e Rua João Tude de Melo", nota: "Passa pelo Hospital Correia Picanço." },
        { via: "Rua José Bonifácio, sobre o Capibaribe", nota: "A travessia do rio. Do outro lado já é a Torre." },
        CHEGADA,
      ],
    },
    {
      tipo: "rota",
      titulo: "Do Parnamirim até a clínica.",
      intro: "O Parnamirim não faz divisa com a Torre, mas fica a uma travessia do Capibaribe.",
      origem: "Parnamirim, Recife - PE",
      medidas: [
        { rotulo: "Distância a pé", valor: "1,1 km" },
        { rotulo: "A pé", valor: "cerca de 15 min" },
        { rotulo: "De carro", valor: "1,8 km" },
      ],
      trajeto: [
        { via: "Av. Parnamirim", nota: "Saindo da Av. Dezessete de Agosto, perto da Praça do Parnamirim." },
        { via: "Rua João Tude de Melo", nota: "Passa pelo Shopping Parnamirim." },
        { via: "Rua José Bonifácio, sobre o Capibaribe", nota: "A travessia do rio. Do outro lado já é a Torre." },
        CHEGADA,
      ],
    },
    servicosPerto,
  ],
  faq: {
    titulo: "Dúvidas de quem vem da Jaqueira e do Parnamirim.",
    itens: [
      {
        pergunta: "Tem clínica veterinária perto da Jaqueira?",
        resposta:
          "A Clínica Caroline Keffer fica na Torre, do outro lado do Capibaribe: cerca de 1 km a pé da Jaqueira, uns 20 minutos, atravessando o rio pela Rua José Bonifácio.",
      },
      {
        pergunta: "E do Parnamirim, quanto tempo leva?",
        resposta:
          "Uns 15 minutos a pé, cerca de 1 km, pela Rua João Tude de Melo e pela travessia do Capibaribe na José Bonifácio. De carro, são uns 2 km.",
      },
      perguntaEstacionamento,
      perguntaUrgencia,
    ],
  },
  relacionados: ["como-chegar", "gracas", "banho-e-tosa"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const gracas: Pagina = {
  caminho: "/como-chegar/gracas",
  rotulo: "Graças",
  pais: paiComoChegar,
  seo: {
    titulo: "Veterinário perto das Graças, Recife | Caroline Keffer",
    descricao:
      "Clínica veterinária a 1,6 km das Graças, na Torre, pela Ponte da Torre: consulta, vacina, exames, cirurgia e urgência até 18h para cães e gatos.",
  },
  topo: {
    sobretitulo: "Como chegar · Graças",
    h1: "Clínica veterinária perto das Graças, na Torre.",
    lead:
      "A Clínica Pet Caroline Keffer fica na Torre, logo depois da Ponte da Torre: das Graças são cerca de 1,6 km de carro, ou uns 15 a 20 minutos a pé. Consulta, vacina, exames, cirurgia, urgência até as 18h e banho e tosa para cães e gatos.",
    foto: {
      src: "/images/clinica/fachada.webp",
      alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins, com o letreiro e o céu aberto",
      posicao: "50% 50%",
      posicaoCelular: "30% 50%",
    },
    mensagemWhatsapp: "Olá! Moro nas Graças, vim pelo site e queria marcar um horário para o meu pet.",
  },
  blocos: [
    {
      tipo: "rota",
      titulo: "Das Graças até a clínica.",
      intro: "As Graças fazem divisa com a Torre pelo Capibaribe. O caminho atravessa o rio pela Ponte da Torre.",
      origem: "Graças, Recife - PE",
      medidas: [
        { rotulo: "Distância", valor: "1,6 km" },
        { rotulo: "De carro", valor: "5 a 10 min" },
        { rotulo: "A pé", valor: "15 a 20 min" },
      ],
      trajeto: [
        { via: "Rua Antônio Novais e Rua Alberto Paiva", nota: "Saindo da Rua Amélia, perto do Museu do Estado." },
        { via: "Ponte da Torre", nota: "A travessia do Capibaribe, ao lado da Praça Beira Rio." },
        { via: "Rua Conde de Irajá" },
        CHEGADA,
      ],
    },
    servicosPerto,
  ],
  faq: {
    titulo: "Dúvidas de quem vem das Graças.",
    itens: [
      {
        pergunta: "Tem clínica veterinária perto das Graças?",
        resposta:
          "A Clínica Caroline Keffer fica na Torre, logo depois da Ponte da Torre: cerca de 1,6 km de carro, ou uns 15 a 20 minutos a pé.",
      },
      {
        pergunta: "Qual o caminho das Graças até a clínica?",
        resposta:
          "Pela Rua Alberto Paiva até a Ponte da Torre, atravessando o Capibaribe, e depois pela Rua Conde de Irajá até a Rua José Bonifácio. A clínica fica na Rua Araguatins.",
      },
      perguntaEstacionamento,
      perguntaUrgencia,
    ],
  },
  relacionados: ["como-chegar", "madalena", "consulta"],
  revisao: PENDENTE,
};
