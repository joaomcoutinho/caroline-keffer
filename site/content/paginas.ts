/**
 * PÁGINAS DE SEO LOCAL — toda a copy e os dados das páginas internas.
 *
 * Mesma regra do content/site.ts: os componentes só montam layout, o texto vive
 * aqui. Criado em 27/09/2026 a partir do catálogo real da clínica (11/09/2026).
 *
 * Régua aplicada (skill `checklist-final`):
 * - Uma página por INTENÇÃO de busca, nunca por bairro (página-ponte é spam) e
 *   nunca disputando a intenção da home ("veterinário na Torre").
 * - A resposta vem na PRIMEIRA frase abaixo do H1 (`topo.lead`): é o trecho
 *   que o Google e a IA extraem.
 * - Nicho YMYL: todo conteúdo de saúde sai com revisão clínica visível e data.
 *   Enquanto a Dra. Carol não revisar, a página DIZ que a revisão está pendente
 *   e o schema NÃO declara `reviewedBy` — declarar antes seria marcação mentirosa.
 * - Cada página leva uma mensagem de WhatsApp própria, para saber qual página
 *   converte sem precisar de pixel.
 *
 * ⚠️ VALIDAR: itens marcados assim são afirmações sobre a operação da clínica
 * que ainda não foram confirmadas. A lista completa está em
 * docs/seo-local/paginas.md.
 */

import {
  castracao,
  consulta,
  gatos,
  laboratorio,
  odontologia,
  ortopedia,
  urgencia,
  vacinacao,
} from "@/content/paginas-servicos";
import { eletrocardiograma, raioX, ultrassom } from "@/content/paginas-exames";
import { care, pethealth, petloveSaude, petTop, plamevPet } from "@/content/paginas-planos";
import {
  comoChegar,
  cordeiro,
  gracas,
  iputinga,
  jaqueiraParnamirim,
  madalena,
  zumbi,
} from "@/content/paginas-local";

export type Foto = {
  src: string;
  alt: string;
  /** `object-position` do recorte. No topo, vale para o desktop (o oval ao lado da copy). */
  posicao?: string;
  /** Só no topo: enquadramento no celular (foto de ponta a ponta), se diferente. */
  posicaoCelular?: string;
  /**
   * Só no topo: outra foto para o celular, quando o rosto da principal fica
   * por trás da navbar (a foto do celular sobe até o topo da tela).
   */
  srcCelular?: string;
  altCelular?: string;
};

export type Cartao = {
  titulo: string;
  texto: string;
  /** Nome do ícone (mapa em components/paginas/Icone.tsx). */
  icone?: string;
  /** Link interno ("/rota") ou externo (WhatsApp). O cartão inteiro vira link. */
  href?: string;
  rotuloLink?: string;
};

export type Passo = { titulo: string; texto: string };

export type Bloco =
  | { tipo: "cartoes"; titulo: string; intro?: string; itens: readonly Cartao[]; colunas?: 2 | 3 }
  | { tipo: "passos"; titulo: string; intro?: string; itens: readonly Passo[] }
  | {
      tipo: "texto";
      titulo: string;
      paragrafos: readonly string[];
      lista?: readonly string[];
      /** Lista em destaque: cartões com ícone, nome e uma linha de explicação. */
      causas?: readonly { titulo: string; detalhe: string; icone: string; selo?: string }[];
      foto?: Foto;
    }
  /** Quem tem mais risco: fichas com foto, a condição em etiqueta e as raças em chips. */
  | {
      tipo: "perfis";
      titulo: string;
      intro?: string;
      itens: readonly {
        titulo: string;
        condicao: string;
        texto: string;
        racas: readonly string[];
        foto: Foto;
      }[];
      nota?: { texto: string; href: string; rotuloLink: string; icone: string };
    }
  /** Faixa de chamada: uma pergunta, a resposta curta e o botão que resolve. */
  | {
      tipo: "chamada";
      titulo: string;
      texto: string;
      icone: string;
      rotuloBotao: string;
      mensagem: string;
    }
  /**
   * Emergência: os sinais que não podem esperar, um por linha, e ao lado o
   * painel "O que fazer agora", que acende a opção certa pelo horário real.
   */
  | {
      tipo: "aviso";
      titulo: string;
      intro?: string;
      sinais: readonly { titulo: string; detalhe: string; icone: string }[];
    }
  /** Honestidade sobre o limite de um serviço: o que É e o que NÃO É. */
  | {
      tipo: "limites";
      titulo: string;
      intro?: string;
      e: { titulo: string; itens: readonly string[] };
      naoE: { titulo: string; itens: readonly string[] };
      rodape: string;
    }
  /**
   * Como chegar (01/10/2026): as medidas do trajeto (distância e tempos), o
   * caminho rua a rua até a porta e o botão que abre a rota no Google Maps
   * saindo de `origem`. Dados de rota medidos no OpenStreetMap.
   */
  | {
      tipo: "rota";
      titulo: string;
      intro?: string;
      origem: string;
      medidas: readonly { rotulo: string; valor: string }[];
      trajeto: readonly { via: string; nota?: string }[];
    }
  /* Blocos que reaproveitam dado que já existe no site. */
  | { tipo: "fases"; titulo: string; intro?: string }
  | { tipo: "planos" }
  | { tipo: "equipe" }
  | { tipo: "especialistas"; titulo: string; intro?: string };

export type Pergunta = { pergunta: string; resposta: string };

export type Pagina = {
  /** Rota com barra inicial e sem barra final. */
  caminho: string;
  /** Nome curto: migalha, cartão de relacionados, rodapé. */
  rotulo: string;
  /** Trilha até a página (sem "Início" e sem ela mesma). */
  pais?: readonly { rotulo: string; caminho: string }[];
  seo: { titulo: string; descricao: string };
  topo: {
    sobretitulo: string;
    h1: string;
    /** A resposta direta. Primeira frase = o que a busca quer saber. */
    lead: string;
    foto: Foto;
    mensagemWhatsapp: string;
  };
  /** Vira `Service` no JSON-LD. Ausente em página que não é serviço (equipe). */
  servico?: { nome: string; tipo: string };
  blocos: readonly Bloco[];
  faq: { titulo: string; itens: readonly Pergunta[] };
  relacionados: readonly string[];
  /** YMYL: quem revisou e quando. `por: null` = pendente. */
  revisao: { por: string | null; data: string };
};

const HOJE = "2026-09-27";
const PENDENTE = { por: null, data: HOJE } as const;

/* ------------------------------------------------------------------ */
/* ESPECIALIDADES                                                       */
/* ------------------------------------------------------------------ */

const paiEspecialidades = [{ rotulo: "Especialidades", caminho: "/especialidades" }] as const;

const especialidades: Pagina = {
  caminho: "/especialidades",
  rotulo: "Especialidades",
  seo: {
    titulo: "Especialidades veterinárias na Torre, Recife | Caroline Keffer",
    descricao:
      "Cardiologia, dermatologia, nefrologia, pneumologia e nutrição veterinária na Torre, Recife, com especialistas atendendo na clínica. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Especialidades",
    h1: "Cinco especialidades veterinárias atendendo na Torre.",
    lead:
      "Cardiologia, dermatologia, nefrologia, pneumologia e nutrição com gastroenterologia atendem aqui dentro, na Rua Araguatins. Quando a consulta pede um olhar específico, seu pet continua na mesma casa, com o histórico dele à mão.",
    foto: {
      src: "/images/servico_especialista.webp",
      alt: "Veterinário sorrindo ao lado de um golden retriever sobre a mesa de exame",
      posicao: "58% 22%",
      // No celular a foto sobe até o topo da tela e o rosto ficava atrás da
      // navbar. Esta versão tem 140px de parede a mais no alto (estendida a
      // partir da própria parede, sem inventar nada): o rosto desce para
      // baixo da navbar e não sobra borda acima dela (01/10/2026).
      srcCelular: "/images/servico_especialista_celular.webp",
      posicaoCelular: "50% 0%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de especialidades do site e gostaria de marcar com um especialista.",
  },
  servico: { nome: "Consulta com especialista veterinário", tipo: "Especialidades veterinárias" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Qual especialista o seu pet precisa?",
      intro: "Pelos sinais que ele mostra em casa. Na dúvida, a consulta clínica aponta o caminho.",
      colunas: 3,
      itens: [
        {
          titulo: "Cardiologia",
          texto: "Tosse à noite, cansaço no passeio, desmaio ou sopro descoberto na consulta.",
          icone: "heartbeat",
          href: "/especialidades/cardiologia",
          rotuloLink: "Ver cardiologia",
        },
        {
          titulo: "Dermatologia",
          texto: "Coceira que não passa, queda de pelo, feridas e otite que volta.",
          icone: "bug",
          href: "/especialidades/dermatologia",
          rotuloLink: "Ver dermatologia",
        },
        {
          titulo: "Nefrologia",
          texto: "Bebe e faz xixi demais, emagrece, vomita ou está com o rim alterado no exame.",
          icone: "drop",
          href: "/especialidades/nefrologia",
          rotuloLink: "Ver nefrologia",
        },
        {
          titulo: "Pneumologia",
          texto: "Tosse persistente, chiado, espirro frequente ou respiração com esforço.",
          icone: "wind",
          href: "/especialidades/pneumologia",
          rotuloLink: "Ver pneumologia",
        },
        {
          titulo: "Nutrição e gastroenterologia",
          texto: "Vômito e diarreia que vão e voltam, falta de apetite, peso fora do ideal.",
          icone: "bowl",
          href: "/especialidades/nutricao-e-gastroenterologia",
          rotuloLink: "Ver nutrição e gastro",
        },
      ],
    },
    {
      tipo: "passos",
      titulo: "Do clínico ao especialista, sem trocar de endereço.",
      // VALIDAR: o fluxo real de encaminhamento e se os exames são pedidos antes.
      itens: [
        {
          titulo: "Consulta clínica",
          texto: "A veterinária examina, ouve a história e decide se o caso pede especialista.",
        },
        {
          titulo: "Exames aqui na clínica",
          texto: "Sangue, urina, raio-x, ultrassom ou eletrocardiograma, quando o caso pede.",
        },
        {
          titulo: "Especialista na mesma casa",
          texto: "O especialista atende seu pet aqui, com os exames e o histórico em mãos.",
        },
        {
          titulo: "Acompanhamento",
          texto: "O retorno volta para quem já conhece o seu pet, com o plano do especialista em mãos.",
        },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre as especialidades.",
    itens: [
      {
        pergunta: "Preciso passar pela clínica geral antes de ver um especialista?",
        // VALIDAR: se a clínica marca direto com o especialista.
        resposta:
          "Não necessariamente. Se você já sabe o que o seu pet tem, ou veio encaminhado por outro veterinário, conte no WhatsApp e a gente marca direto com o especialista. Se não sabe por onde começar, a consulta clínica aponta o caminho.",
      },
      /* 29/09/2026 (JM): o site não fala de dias nem de como o especialista
         chega; só que a especialidade existe e o que ela resolve. */
      {
        pergunta: "O plano de saúde pet cobre consulta com especialista?",
        resposta:
          "Depende do plano e da modalidade contratada. Mande o nome do plano no WhatsApp que a gente confirma a cobertura antes da consulta.",
      },
      {
        pergunta: "As especialidades atendem gato?",
        resposta: "Sim. Cães e gatos, de filhote a idoso, em todas as cinco especialidades.",
      },
    ],
  },
  relacionados: ["exames-de-imagem", "check-up", "planos"],
  revisao: PENDENTE,
};

const cardiologia: Pagina = {
  caminho: "/especialidades/cardiologia",
  rotulo: "Cardiologia",
  pais: paiEspecialidades,
  seo: {
    titulo: "Cardiologista veterinário na Torre, Recife | Caroline Keffer",
    descricao:
      "Cardiologia para cães e gatos na Torre, Recife: sopro, tosse, cansaço e desmaio, com eletrocardiograma e raio-x feitos na clínica. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Especialidades · Cardiologia",
    h1: "Cardiologia veterinária na Torre, em Recife.",
    lead:
      "O cardiologista avalia sopro, tosse, cansaço e desmaio em cães e gatos. Eletrocardiograma e raio-x de tórax são feitos aqui na clínica, sem levar seu pet a outro endereço.",
    foto: {
      src: "/images/galeria/atendimento-04.webp",
      alt: "Veterinário examinando um border collie deitado na mesa de atendimento",
      posicao: "50% 35%",
      posicaoCelular: "50% 80%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de cardiologia do site e gostaria de marcar uma consulta.",
  },
  servico: { nome: "Cardiologia veterinária", tipo: "Cardiologia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Quando procurar o cardiologista.",
      intro: "Coração doente costuma dar sinal fora do coração. Estes são os mais comuns:",
      colunas: 3,
      itens: [
        { titulo: "Tosse à noite", texto: "Principalmente quando ele deita, ou logo ao acordar.", icone: "moon" },
        { titulo: "Cansaço no passeio", texto: "Para no meio do caminho, senta, não acompanha mais o ritmo.", icone: "dog" },
        { titulo: "Respiração acelerada", texto: "Mesmo em repouso, dormindo, sem ter feito esforço.", icone: "wind" },
        { titulo: "Desmaio ou fraqueza", texto: "Um apagão rápido, perna que falha, língua arroxeada.", icone: "warning" },
        { titulo: "Barriga inchada", texto: "Acúmulo de líquido pode ser sinal de coração sobrecarregado.", icone: "drop" },
        { titulo: "Sopro na consulta", texto: "Achado da ausculta de rotina, antes de qualquer sintoma.", icone: "stethoscope" },
      ],
    },
    {
      tipo: "perfis",
      titulo: "Quem precisa de mais atenção.",
      intro: "Cada porte e cada espécie tem a sua doença do coração mais comum.",
      itens: [
        {
          titulo: "Cães pequenos, da meia-idade em diante",
          condicao: "Doença da válvula mitral",
          texto:
            "É a cardiopatia mais comum em cães. O primeiro sinal costuma ser um sopro na consulta de rotina, antes de qualquer sintoma.",
          racas: ["Poodle", "Pinscher", "Yorkshire", "Shih-tzu", "Cavalier"],
          foto: { src: "/images/galeria/atendimento-18.webp", alt: "Colaboradora abraçando um yorkshire", posicao: "50% 35%" },
        },
        {
          titulo: "Cães de porte grande",
          condicao: "Cardiomiopatia dilatada",
          texto:
            "O músculo do coração perde força aos poucos. Pode passar despercebida até o cansaço ou o desmaio aparecerem.",
          racas: ["Dobermann", "Boxer", "Dogue alemão"],
          foto: {
            src: "/images/galeria/atendimento-02.webp",
            alt: "Veterinária sentada no chão do consultório com dois cães dinamarqueses",
            /* 10%: o rosto da Dra. Carol fica no terço de cima da foto (28/09/2026, JM). */
            posicao: "50% 10%",
          },
        },
        {
          titulo: "Gatos",
          condicao: "Cardiomiopatia hipertrófica",
          texto:
            "A mais frequente nos gatos, e muitas vezes não dá sinal nenhum até ficar grave.",
          racas: ["Maine Coon", "Ragdoll", "Sem raça definida"],
          foto: { src: "/images/galeria/atendimento-12.webp", alt: "Colaboradora abraçando um gato maine coon cinza e branco", posicao: "50% 35%" },
        },
      ],
      nota: {
        texto: "Nos três casos, quem pega cedo é a ausculta do check-up anual.",
        href: "/check-up-veterinario",
        rotuloLink: "Ver o check-up",
        icone: "stethoscope",
      },
    },
    {
      tipo: "passos",
      titulo: "Como é a consulta de cardiologia.",
      // VALIDAR: se há ecocardiograma e aferição de pressão na clínica.
      itens: [
        { titulo: "Histórico e ausculta", texto: "O que você vê em casa conta tanto quanto o estetoscópio." },
        { titulo: "Eletrocardiograma", texto: "Registra o ritmo e a frequência do coração. Feito aqui, em poucos minutos." },
        { titulo: "Raio-x de tórax", texto: "Mostra o tamanho do coração e se há líquido no pulmão." },
        { titulo: "Plano de tratamento", texto: "Remédio, dieta e a frequência de retorno para o estágio da doença." },
      ],
    },
    {
      tipo: "aviso",
      titulo: "Quando não dá para esperar a consulta.",
      intro: "Qualquer um destes sinais é emergência.",
      sinais: [
        { titulo: "Gengiva roxa ou azulada", detalhe: "Sinal de pouco oxigênio no sangue.", icone: "tooth" },
        { titulo: "Respira de boca aberta", detalhe: "Em gato, é sempre urgência.", icone: "cat" },
        { titulo: "Desmaio que não passa", detalhe: "Ou fraqueza súbita que não melhora em minutos.", icone: "warning" },
        { titulo: "Falta de ar parado", detalhe: "Respiração acelerada mesmo em repouso.", icone: "wind" },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre cardiologia.",
    itens: [
      {
        pergunta: "Meu cachorro tem sopro no coração. É grave?",
        resposta:
          "Nem sempre. Sopro é o som de uma turbulência no sangue dentro do coração, e a gravidade depende da causa e do estágio. O cardiologista investiga com exame físico e exames de imagem para dizer se precisa tratar agora ou só acompanhar.",
      },
      {
        pergunta: "Cachorro cardiopata pode passear?",
        resposta:
          "Na maioria dos casos, sim, com intensidade ajustada ao estágio da doença. O cardiologista diz o limite certo para o seu cão.",
      },
      {
        pergunta: "Pet idoso precisa de avaliação do coração antes de cirurgia?",
        resposta:
          "Em geral, sim. A avaliação pré-anestésica com exames de sangue e, quando indicado, eletrocardiograma, é o que dá segurança à anestesia.",
      },
    ],
  },
  relacionados: ["exames-de-imagem", "pneumologia", "check-up"],
  revisao: PENDENTE,
};

const dermatologia: Pagina = {
  caminho: "/especialidades/dermatologia",
  rotulo: "Dermatologia",
  pais: paiEspecialidades,
  seo: {
    titulo: "Dermatologista veterinário na Torre, Recife | Caroline Keffer",
    descricao:
      "Coceira, queda de pelo, otite e alergia em cães e gatos: dermatologia veterinária na Torre, Recife, com exames de pele na consulta. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Especialidades · Dermatologia",
    h1: "Dermatologia veterinária na Torre, em Recife.",
    lead:
      "Coceira que não passa, queda de pelo, feridas, otite que volta e alergia são casos de dermatologia. Com o calor e a umidade de Recife, problema de pele é dos motivos mais comuns de consulta, e quase sempre tem uma causa que dá para identificar.",
    foto: {
      src: "/images/galeria/atendimento-13.webp",
      alt: "Colaboradora no consultório com dois shih-tzus de gravata",
      posicao: "50% 35%",
      posicaoCelular: "50% 85%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de dermatologia do site e gostaria de marcar uma consulta.",
  },
  servico: { nome: "Dermatologia veterinária", tipo: "Dermatologia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Sinais de que a pele precisa de especialista.",
      colunas: 3,
      itens: [
        { titulo: "Coceira constante", texto: "Coça, lambe ou morde as patas o dia inteiro.", icone: "paw" },
        { titulo: "Falhas no pelo", texto: "Queda em placas, pelo ralo, pele aparecendo.", icone: "scissors" },
        { titulo: "Vermelhidão e crostas", texto: "Bolinhas, feridas, caspa ou pele oleosa com cheiro.", icone: "drop" },
        { titulo: "Otite de repetição", texto: "Balança a cabeça, coça a orelha, ouvido com cheiro forte.", icone: "ear" },
        { titulo: "Pele escura e grossa", texto: "Axilas, virilha e barriga mudando de textura.", icone: "eye" },
        { titulo: "Não melhora com banho", texto: "Trocou de shampoo e nada mudou.", icone: "bath" },
      ],
    },
    {
      tipo: "texto",
      titulo: "As causas mais comuns.",
      paragrafos: [
        "Coceira quase nunca é o diagnóstico: é o sintoma. O trabalho do dermatologista é descobrir o que está por trás, porque o tratamento muda completamente de uma causa para outra.",
      ],
      causas: [
        { titulo: "Picada de pulga", detalhe: "Uma picada basta para a alergia coçar por dias.", icone: "bug", selo: "Mais comum" },
        { titulo: "Dermatite atópica", detalhe: "Alergia a ácaro, pólen e ao ambiente.", icone: "wind" },
        { titulo: "Alergia alimentar", detalhe: "Reação a algum ingrediente da ração ou do petisco.", icone: "bowl" },
        { titulo: "Fungos e bactérias", detalhe: "Infecção que costuma vir junto com a alergia.", icone: "flask" },
        { titulo: "Sarnas", detalhe: "Causadas por ácaros que vivem na pele.", icone: "microscope" },
      ],
      foto: { src: "/images/galeria/atendimento-06.webp", alt: "Colaboradora abraçando um dachshund de peitoral verde", posicao: "50% 35%" },
    },
    {
      tipo: "passos",
      titulo: "Como é a consulta de dermatologia.",
      // VALIDAR: quais exames de pele são feitos na clínica.
      itens: [
        { titulo: "Histórico detalhado", texto: "Quando começou, se piora em alguma época, o que ele come, onde dorme." },
        { titulo: "Exame da pele e do ouvido", texto: "Em toda a extensão, com lupa e otoscópio." },
        { titulo: "Exames na consulta", texto: "Raspado de pele e citologia, coletados na hora, quando o caso pede." },
        { titulo: "Tratamento e retorno", texto: "Remédio, banho terapêutico e dieta, com retorno para ver a resposta." },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre dermatologia.",
    itens: [
      {
        pergunta: "Coceira em cachorro é sempre alergia?",
        resposta:
          "Não. Pulga, sarna, fungo e bactéria também causam coceira, e muitas vezes aparecem junto com uma alergia. Por isso o exame de pele vem antes do remédio.",
      },
      {
        pergunta: "Por que a otite do meu cachorro sempre volta?",
        resposta:
          "Otite que volta quase sempre tem uma causa de fundo, geralmente alergia. Tratando só o ouvido, ela melhora e retorna; tratando a causa, os intervalos aumentam ou a otite para.",
      },
      {
        pergunta: "Posso dar banho com qualquer shampoo?",
        resposta:
          "Em pele saudável, com shampoo próprio para pets. Em pele com problema, o shampoo faz parte do tratamento e deve ser o indicado pelo veterinário.",
      },
    ],
  },
  relacionados: ["banho-e-tosa", "nutricao-e-gastroenterologia", "especialidades"],
  revisao: PENDENTE,
};

const nefrologia: Pagina = {
  caminho: "/especialidades/nefrologia",
  rotulo: "Nefrologia",
  pais: paiEspecialidades,
  seo: {
    titulo: "Nefrologia veterinária na Torre, Recife | Caroline Keffer",
    descricao:
      "Doença renal em cães e gatos: diagnóstico precoce e acompanhamento com exames de sangue, urina e ultrassom na Torre, Recife. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Especialidades · Nefrologia",
    h1: "Nefrologia veterinária: os rins do seu pet, na Torre.",
    lead:
      "A nefrologia cuida dos rins e do trato urinário. A doença renal crônica é das mais comuns em gatos idosos e costuma dar sinal só quando boa parte do rim já foi perdida, por isso o exame de rotina faz tanta diferença.",
    foto: {
      src: "/images/galeria/atendimento-11.webp",
      alt: "Duas colaboradoras sorrindo, cada uma com um gato persa no colo",
      posicao: "50% 35%",
      posicaoCelular: "50% 25%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de nefrologia do site e gostaria de marcar uma consulta.",
  },
  servico: { nome: "Nefrologia veterinária", tipo: "Nefrologia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Sinais de que os rins pedem atenção.",
      colunas: 3,
      itens: [
        { titulo: "Bebe muita água", texto: "O pote esvazia mais rápido que antes.", icone: "drop" },
        { titulo: "Urina demais", texto: "Mais xixi, caixa de areia mais pesada, escapes em casa.", icone: "drop" },
        { titulo: "Emagrece", texto: "Perde peso comendo o mesmo, ou come menos.", icone: "scales" },
        { titulo: "Vômito", texto: "Enjoo frequente, principalmente em gatos mais velhos.", icone: "warning" },
        { titulo: "Hálito forte", texto: "Cheiro diferente na boca, às vezes com feridinhas.", icone: "tooth" },
        { titulo: "Exame alterado", texto: "Creatinina ou ureia alta no check-up, mesmo sem sintoma.", icone: "flask" },
      ],
    },
    {
      tipo: "aviso",
      titulo: "Gato que não consegue urinar é emergência.",
      intro: "Principalmente o macho: pode ser obstrução da uretra, e ela não espera.",
      sinais: [
        { titulo: "Vai à caixa e não sai nada", detalhe: "Várias vezes seguidas, fazendo força.", icone: "cat" },
        { titulo: "Sai pouco, com sangue", detalhe: "Gotas avermelhadas ou xixi escuro.", icone: "drop" },
        { titulo: "Chora ou lambe a região", detalhe: "Sinal de dor na hora de urinar.", icone: "warning" },
        { titulo: "Vômito e prostração", detalhe: "Quando a obstrução já afeta o corpo todo.", icone: "bowl" },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como a nefrologia investiga e acompanha.",
      // VALIDAR: se a clínica afere pressão arterial e faz SDMA.
      itens: [
        { titulo: "Exames de sangue", texto: "Hemograma e bioquímico, com creatinina e ureia, coletados aqui." },
        { titulo: "Urinálise", texto: "Mostra se o rim está concentrando a urina e se há perda de proteína." },
        { titulo: "Ultrassom de rins e bexiga", texto: "Tamanho, forma, cálculos e cistos, feito aqui na clínica." },
        { titulo: "Plano de acompanhamento", texto: "Dieta renal, hidratação e retornos no ritmo que o estágio pede." },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre os rins.",
    itens: [
      {
        pergunta: "Doença renal em gato tem cura?",
        resposta:
          "A crônica não tem cura, mas tem tratamento: com dieta, hidratação e acompanhamento, muitos gatos vivem anos com boa qualidade de vida. A aguda, tratada cedo, pode ser revertida.",
      },
      {
        pergunta: "A partir de que idade fazer exame dos rins?",
        resposta:
          "No adulto, uma vez por ano, junto com o check-up. A partir dos 7 anos, a cada seis meses, porque é nessa fase que a doença renal mais aparece.",
      },
      {
        pergunta: "Meu gato bebe muita água. É normal?",
        resposta:
          "Não é o esperado. Gato bebe pouca água por natureza, então aumento de sede é sinal para investigar rim, diabetes e tireoide.",
      },
    ],
  },
  relacionados: ["check-up", "nutricao-e-gastroenterologia", "exames-de-imagem"],
  revisao: PENDENTE,
};

const pneumologia: Pagina = {
  caminho: "/especialidades/pneumologia",
  rotulo: "Pneumologia",
  pais: paiEspecialidades,
  seo: {
    titulo: "Pneumologia veterinária na Torre, Recife | Caroline Keffer",
    descricao:
      "Tosse, espirro, chiado e falta de ar em cães e gatos: pneumologia veterinária com raio-x de tórax na clínica, na Torre, Recife. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Especialidades · Pneumologia",
    h1: "Pneumologia veterinária na Torre, em Recife.",
    lead:
      "A pneumologia investiga tosse, espirro, chiado e respiração difícil. Nem toda tosse vem do pulmão: pode ser traqueia, coração ou garganta, e o raio-x de tórax, feito aqui na clínica, é o primeiro passo para saber de onde ela vem.",
    foto: {
      src: "/images/galeria/atendimento-14.webp",
      alt: "Colaboradora agachada com dois buldogues franceses",
      posicao: "50% 40%",
      // No celular o rosto dela ficava atrás da navbar. O shih-tzu é
      // braquicefálico, paciente típico da pneumologia (o pug já está nos perfis).
      srcCelular: "/images/galeria/atendimento-17.webp",
      altCelular: "Colaboradora abraçando um shih-tzu de laço rosa",
      posicaoCelular: "50% 50%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de pneumologia do site e gostaria de marcar uma consulta.",
  },
  servico: { nome: "Pneumologia veterinária", tipo: "Pneumologia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Sinais para investigar.",
      colunas: 3,
      itens: [
        { titulo: "Tosse que não passa", texto: "Mais de alguns dias, ou que piora à noite.", icone: "wind" },
        { titulo: "Tosse de ganso", texto: "Som de buzina, comum em raças pequenas com traqueia frágil.", icone: "dog" },
        { titulo: "Ronco e chiado forte", texto: "Frequente em Pug, Buldogue e Shih-tzu, e não é normal.", icone: "moon" },
        { titulo: "Espirro e secreção", texto: "Nariz escorrendo, espirro em crise, sangramento nasal.", icone: "drop" },
        { titulo: "Cansaço fácil", texto: "Respira pesado depois de pouco esforço.", icone: "heartbeat" },
        { titulo: "Gato ofegante", texto: "Gato não respira de boca aberta. Se respirar, é urgência.", icone: "cat" },
      ],
    },
    {
      tipo: "perfis",
      titulo: "Quem precisa de mais atenção.",
      intro: "No calor de Recife, esses três grupos sofrem mais, e é aí que o acompanhamento evita a crise.",
      itens: [
        {
          titulo: "Cães de focinho curto",
          condicao: "Síndrome braquicefálica",
          texto:
            "Nascem com as vias aéreas mais estreitas: roncam, cansam no calor e respiram com esforço.",
          racas: ["Pug", "Buldogue francês", "Shih-tzu", "Buldogue inglês"],
          foto: { src: "/images/galeria/atendimento-16.webp", alt: "Colaboradora sorrindo com um pug no colo", posicao: "50% 35%" },
        },
        {
          titulo: "Raças pequenas",
          condicao: "Colapso de traqueia",
          texto:
            "A traqueia perde firmeza e a tosse soa como buzina, a tosse de ganso. Piora com agitação e com coleira no pescoço.",
          racas: ["Yorkshire", "Pinscher", "Lulu da Pomerânia", "Poodle"],
          foto: { src: "/images/dra/dra-carol-lulu.webp", alt: "Dra. Caroline Keffer sorrindo de rosto colado a um lulu da pomerânia branco", posicao: "50% 45%" },
        },
        {
          titulo: "Gatos",
          condicao: "Asma felina",
          texto:
            "Tosse, chiado e crises de respiração difícil. Tem tratamento e controle, mas gato respirando de boca aberta é urgência.",
          racas: ["Qualquer raça"],
          foto: { src: "/images/galeria/atendimento-19.webp", alt: "Colaboradora com dois gatos persas no colo", posicao: "50% 35%" },
        },
      ],
      nota: {
        texto: "O primeiro passo é o raio-x de tórax, feito aqui na clínica.",
        href: "/exames-de-imagem",
        rotuloLink: "Ver exames de imagem",
        icone: "scan",
      },
    },
    {
      tipo: "passos",
      titulo: "Como a pneumologia investiga.",
      itens: [
        { titulo: "Ausculta e histórico", texto: "Quando a tosse aparece, como ela soa, o que piora." },
        { titulo: "Raio-x de tórax", texto: "Pulmão, traqueia e o tamanho do coração, feito aqui na clínica." },
        { titulo: "Descartar o coração", texto: "Eletrocardiograma quando a tosse pode ter origem cardíaca." },
        { titulo: "Tratamento", texto: "Remédio, controle de peso e manejo do calor e do esforço." },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre respiração.",
    itens: [
      {
        pergunta: "Tosse de cachorro é gripe?",
        resposta:
          "Pode ser uma infecção respiratória, mas tosse também vem de traqueia, coração ou pulmão. Se dura mais de alguns dias, piora à noite ou vem com cansaço, vale investigar.",
      },
      {
        pergunta: "Meu Pug ronca muito. É normal?",
        resposta:
          "É comum, mas não é normal: é sinal de via aérea estreita. Vale avaliar, porque o esforço para respirar piora com o calor, o peso e a idade.",
      },
      {
        pergunta: "Meu gato está respirando de boca aberta. O que faço?",
        resposta:
          "Trate como emergência e procure atendimento imediato. Fora do horário da clínica, vá a um plantão veterinário 24h.",
      },
    ],
  },
  relacionados: ["cardiologia", "exames-de-imagem", "especialidades"],
  revisao: PENDENTE,
};

const nutricaoGastro: Pagina = {
  caminho: "/especialidades/nutricao-e-gastroenterologia",
  rotulo: "Nutrição e gastroenterologia",
  pais: paiEspecialidades,
  seo: {
    titulo: "Nutrição e gastroenterologia veterinária | Torre, Recife",
    descricao:
      "Vômito, diarreia, falta de apetite, obesidade e dieta para doenças: nutrição e gastroenterologia para cães e gatos na Torre, Recife. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Especialidades · Nutrição e gastro",
    h1: "Nutrição e gastroenterologia veterinária na Torre.",
    lead:
      "Vômito, diarreia que vai e volta, falta de apetite e peso fora do ideal são casos de gastroenterologia e nutrição. Aqui as duas áreas andam juntas, porque boa parte do tratamento do intestino passa pelo que vai no pote.",
    /* Sala de espera REAL (01/10/2026, JM: "uma imagem mais genérica, que não
       fique fora de contexto"; e depois: "não coloca fotos feitas por IA").
       Foto inteira, em pé, como a clínica mandou. */
    foto: {
      src: "/images/clinica/sala-de-espera.webp",
      alt: "Sala de espera da clínica, com as cadeiras e o mural de cão e gato na parede",
      posicao: "50% 55%",
      posicaoCelular: "50% 60%",
    },
    mensagemWhatsapp:
      "Olá! Vim pela página de nutrição e gastroenterologia do site e gostaria de marcar uma consulta.",
  },
  servico: { nome: "Nutrição e gastroenterologia veterinária", tipo: "Gastroenterologia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Quando procurar.",
      colunas: 3,
      itens: [
        { titulo: "Vômito frequente", texto: "Mais de uma vez por semana não é normal, nem em gato.", icone: "warning" },
        { titulo: "Diarreia que volta", texto: "Com muco, sangue ou que melhora e retorna.", icone: "drop" },
        { titulo: "Falta de apetite", texto: "Recusa comida ou come só o petisco.", icone: "bowl" },
        { titulo: "Emagrecimento", texto: "Perde peso sem mudar a rotina.", icone: "scales" },
        { titulo: "Sobrepeso", texto: "Costela difícil de sentir, sem cintura vista de cima.", icone: "scales" },
        { titulo: "Dieta para doença", texto: "Rim, coração, alergia ou intestino sensível.", icone: "pill" },
      ],
    },
    {
      tipo: "texto",
      titulo: "O que a nutrição veterinária resolve.",
      paragrafos: [
        "Ração boa para um pet saudável pode ser errada para um pet com doença. A dieta certa ajuda a controlar doença renal, cardíaca, alergia alimentar e intestino sensível, e às vezes faz mais diferença que o remédio.",
      ],
      // VALIDAR: se a clínica formula alimentação natural.
      causas: [
        { titulo: "Dieta terapêutica", detalhe: "Para rim, coração e outras doenças crônicas.", icone: "pill" },
        { titulo: "Emagrecimento", detalhe: "Com meta de peso e acompanhamento.", icone: "scales" },
        { titulo: "Dieta de exclusão", detalhe: "Para descobrir se a alergia vem da comida.", icone: "bowl" },
        { titulo: "Filhote e idoso", detalhe: "A alimentação certa para cada fase da vida.", icone: "dog" },
        { titulo: "Alimentação natural", detalhe: "Cardápio balanceado, sem faltar nutriente.", icone: "clipboard" },
      ],
      /* Pet na balança da clínica (foto real enviada em 01/10/2026): a seção
         fala de emagrecimento e meta de peso. */
      foto: {
        src: "/images/clinica/pet-na-balanca.webp",
        alt: "Cachorro preto sentado na balança da clínica, com o visor do peso na parede",
        posicao: "45% 62%",
      },
    },
    {
      tipo: "passos",
      titulo: "Como a investigação acontece.",
      itens: [
        { titulo: "Histórico alimentar", texto: "O que ele come, quanto, quando começou o problema." },
        { titulo: "Exames de sangue e fezes", texto: "Coletados aqui, para ver órgãos, anemia e parasitas." },
        { titulo: "Ultrassom de abdome", texto: "Estômago, intestino, fígado e pâncreas, feito aqui na clínica." },
        { titulo: "Plano alimentar", texto: "Dieta, transição e retorno para ajustar." },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre alimentação e intestino.",
    itens: [
      {
        pergunta: "Vômito uma vez por semana é normal?",
        resposta:
          "Não. Vômito frequente, mesmo em gato que vomita bola de pelo, merece investigação. Pode ser dieta, parasita, doença inflamatória intestinal ou outro órgão.",
      },
      {
        pergunta: "Posso fazer alimentação natural para o meu pet?",
        resposta:
          "Pode, desde que a receita seja formulada por veterinário para o seu pet. Receita genérica costuma faltar cálcio, vitaminas e minerais, e o problema aparece meses depois.",
      },
      {
        pergunta: "Como saber se meu pet está acima do peso?",
        resposta:
          "Você deve sentir as costelas com facilidade, sem apertar, e ver a cintura olhando de cima. Se não sente, vale uma avaliação.",
      },
    ],
  },
  relacionados: ["nefrologia", "dermatologia", "check-up"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */
/* SERVIÇOS                                                             */
/* ------------------------------------------------------------------ */

const cirurgia: Pagina = {
  caminho: "/cirurgia-veterinaria",
  rotulo: "Cirurgia",
  seo: {
    titulo: "Cirurgia veterinária na Torre, Recife | Caroline Keffer",
    descricao:
      "Cirurgia geral, castração, cirurgia odontológica e ortopédica para cães e gatos na Torre, Recife, com exames pré-operatórios e internação de dia para a recuperação.",
  },
  topo: {
    sobretitulo: "Cirurgia",
    h1: "Cirurgia veterinária na Torre, em Recife.",
    lead:
      "Cirurgia geral, castração, cirurgia odontológica e ortopédica para cães e gatos, com exames pré-operatórios e internação durante o dia para a recuperação. Do primeiro exame à retirada dos pontos, seu pet fica com a mesma equipe.",
    foto: {
      src: "/images/servico_cirurgia.webp",
      alt: "Veterinária paramentada realizando procedimento em um cão anestesiado na mesa cirúrgica",
      posicao: "center center",
      posicaoCelular: "50% 20%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de cirurgia do site e gostaria de uma avaliação.",
  },
  servico: { nome: "Cirurgia veterinária", tipo: "Cirurgia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "O que é operado aqui.",
      colunas: 3,
      // Castração confirmada pela clínica (29/09/2026). VALIDAR: o resto da lista de cada área.
      itens: [
        {
          titulo: "Cirurgia geral",
          texto: "Castração de cães e gatos, retirada de nódulos, hérnias e outras cirurgias de tecidos moles.",
          icone: "firstAid",
        },
        {
          titulo: "Cirurgia odontológica",
          texto: "Limpeza de tártaro com anestesia, extração de dentes comprometidos e tratamento de gengiva.",
          icone: "tooth",
        },
        {
          titulo: "Cirurgia ortopédica",
          texto: "Fraturas, luxação de patela e lesões de ligamento, com raio-x feito aqui na clínica.",
          icone: "bone",
        },
      ],
    },
    {
      tipo: "passos",
      titulo: "Do começo ao fim, na mesma casa.",
      // VALIDAR: jejum por escrito, tipo de anestesia e monitoramento.
      itens: [
        {
          titulo: "Avaliação pré-operatória",
          texto: "Consulta, hemograma e bioquímico e, quando indicado, eletrocardiograma e raio-x, feitos aqui na clínica.",
        },
        {
          titulo: "Orientação antes do dia",
          texto: "Jejum, medicação e horário explicados com antecedência, sem dúvida de última hora.",
        },
        {
          titulo: "Cirurgia com anestesia monitorada",
          texto: "Anestesia e acompanhamento dos sinais vitais durante todo o procedimento.",
        },
        {
          titulo: "Recuperação na internação, de dia",
          texto: "Ele acorda e se recupera na internação da clínica durante o dia, e à noite vai para casa com as orientações.",
        },
        { titulo: "Retorno e pontos", texto: "Revisão da cicatrização e retirada dos pontos com quem operou." },
      ],
    },
    {
      tipo: "texto",
      titulo: "Por que a limpeza de tártaro precisa de anestesia.",
      paragrafos: [
        "A doença fica embaixo da gengiva, não no branco do dente. Raspar e polir ali só dá com o pet anestesiado: sem dor e sem risco de engolir o tártaro.",
        "Sem anestesia, sai só o que aparece. E 7 em cada 10 cães e gatos já têm doença dentária aos 3 anos: por isso a boca é avaliada em toda consulta.",
      ],
      /* Foto genérica de exame (06/10/2026, JM) até chegar uma da limpeza de
         tártaro na clínica. Antes era a internação, que não tinha relação. */
      foto: {
        src: "/images/galeria/atendimento-04.webp",
        alt: "Veterinário examinando um cão deitado na mesa de atendimento",
        posicao: "35% 60%",
      },
    },
    {
      tipo: "limites",
      titulo: "O que a nossa internação é, e o que não é.",
      intro: "Dito com clareza antes, para ninguém descobrir no dia.",
      /* Confirmado pela clínica (29/09/2026): a internação não é 24h. Os pets
         ficam durante o dia e vão para casa à noite. */
      e: {
        titulo: "É",
        itens: [
          "Recuperação durante o dia, logo depois da cirurgia",
          "Acompanhada pela mesma equipe que operou",
          "Medicação e curativos do pós-operatório imediato",
        ],
      },
      naoE: {
        titulo: "Não é",
        itens: ["Internação à noite: no fim do dia, ele vai para casa", "UTI ou terapia intensiva", "Plantão 24 horas"],
      },
      rodape:
        "Se o caso pede internação à noite ou UTI, a gente encaminha a um hospital 24h e ajuda nesse caminho.",
    },
  ],
  faq: {
    titulo: "Dúvidas sobre cirurgia.",
    itens: [
      {
        pergunta: "O pet dorme internado depois da cirurgia?",
        resposta:
          "Não. A internação da clínica funciona durante o dia: ele se recupera aqui e, à noite, vai para casa com as orientações. Se o caso pedir internação à noite, a gente encaminha para um hospital 24h.",
      },
      {
        pergunta: "Vocês fazem castração?",
        resposta:
          "Sim, de cães e gatos, com avaliação pré-operatória antes. A idade certa é decidida caso a caso, conforme espécie, porte e sexo.",
      },
      {
        pergunta: "Quanto tempo de jejum antes da cirurgia?",
        resposta:
          "Depende da idade, da espécie e do procedimento. A equipe passa a orientação exata na consulta pré-operatória, junto com o horário de chegada.",
      },
      {
        pergunta: "Qual a melhor idade para castrar?",
        resposta:
          "É decidido caso a caso, conforme espécie, porte e sexo. A conversa começa ainda na fase de filhote, nas primeiras consultas.",
      },
      {
        pergunta: "Meu pet é idoso. Ele pode ser operado?",
        resposta:
          "Idade não é doença. O que decide é a avaliação pré-anestésica: com exames em dia e o coração avaliado, muitos idosos operam com segurança.",
      },
      {
        pergunta: "O plano de saúde pet cobre cirurgia?",
        resposta:
          "Depende do plano, da modalidade e da carência. Mande o nome do plano no WhatsApp que a gente confirma antes de marcar.",
      },
    ],
  },
  relacionados: ["exames-de-imagem", "check-up", "planos"],
  revisao: PENDENTE,
};

const examesImagem: Pagina = {
  caminho: "/exames-de-imagem",
  rotulo: "Exames de imagem",
  seo: {
    titulo: "Raio-x, ultrassom e eletro para pets | Torre, Recife",
    descricao:
      "Raio-x, ultrassonografia e eletrocardiograma para cães e gatos na Torre, Recife, com o resultado explicado por quem acompanha seu pet. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Exames de imagem",
    h1: "Raio-x, ultrassom e eletrocardiograma para pets na Torre.",
    lead:
      "Radiografia, ultrassonografia e eletrocardiograma feitos aqui na clínica, com hora marcada. Seu pet faz o exame no lugar que já conhece, e o resultado volta para quem acompanha o caso.",
    /* ⚠️ Os aparelhos NÃO ficam na clínica (29/09/2026): vêm com médicos
       volantes, em serviço terceirizado. A fachada ficou aqui até chegarem as
       fotos dos exames; em 02/10/2026 chegaram as do raio-x feito na clínica.
       A da página do raio-x é a outra foto da mesma sessão, para não repetir. */
    foto: {
      src: "/images/clinica/raio-x-preparo.webp",
      alt: "Veterinário de avental de chumbo preparando o aparelho de raio-x ao lado de um cão na mesa de exame",
      posicao: "50% 40%",
      posicaoCelular: "55% 40%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de exames de imagem do site e gostaria de agendar um exame.",
  },
  servico: { nome: "Exames de imagem veterinários", tipo: "Diagnóstico por imagem veterinário" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Os três exames, e o que cada um mostra.",
      colunas: 3,
      itens: [
        {
          titulo: "Radiografia (raio-x)",
          texto:
            "Ossos, articulações, tórax e objeto engolido. É o exame da fratura, da tosse que não passa e do tamanho do coração.",
          icone: "bone",
          href: "/exames-de-imagem/raio-x-veterinario",
          rotuloLink: "Ver o exame",
        },
        {
          titulo: "Ultrassonografia",
          texto:
            "Órgãos do abdome: fígado, rins, bexiga, intestino, baço e útero. Mostra cálculo, nódulo, inflamação e gestação.",
          icone: "scan",
          href: "/exames-de-imagem/ultrassom-veterinario",
          rotuloLink: "Ver o exame",
        },
        {
          titulo: "Eletrocardiograma",
          texto:
            "O ritmo e a atividade elétrica do coração. Pedido em arritmia, sopro, desmaio e na avaliação antes de cirurgia.",
          icone: "waveform",
          href: "/exames-de-imagem/eletrocardiograma-veterinario",
          rotuloLink: "Ver o exame",
        },
      ],
    },
    {
      tipo: "passos",
      titulo: "Do agendamento ao resultado.",
      intro: "O exame é feito aqui, em dia marcado. Em geral, o preparo é assim:",
      // VALIDAR: horas de jejum e se há sedação para raio-x.
      itens: [
        {
          titulo: "Agendamento",
          texto: "A equipe marca o horário e confirma o preparo do exame.",
        },
        {
          titulo: "Ultrassom de abdome",
          texto: "Jejum de algumas horas e bexiga cheia: evite que ele faça xixi logo antes do exame.",
        },
        {
          titulo: "Raio-x",
          texto: "Normalmente sem preparo. Em pet muito agitado ou com dor, pode ser indicada sedação leve.",
        },
        {
          titulo: "Eletrocardiograma",
          texto: "Sem preparo. Ele fica deitado e calmo por alguns minutos, com o tutor por perto.",
        },
      ],
    },
    {
      tipo: "chamada",
      titulo: "Veio com pedido de outro veterinário?",
      // VALIDAR: se a clínica faz exame com pedido externo e como entrega o laudo.
      texto:
        "Pode fazer o exame aqui. Mande uma foto do pedido pelo WhatsApp que a gente agenda e diz como o resultado chega até o seu veterinário.",
      icone: "clipboard",
      rotuloBotao: "Enviar o pedido",
      mensagem: "Olá! Vim pelo site. Tenho um pedido de exame de outro veterinário e queria agendar aqui.",
    },
  ],
  faq: {
    titulo: "Dúvidas sobre os exames.",
    itens: [
      {
        pergunta: "O exame é feito na clínica mesmo?",
        resposta:
          "Sim, aqui na clínica, com hora marcada. Seu pet não precisa ir a outro endereço.",
      },
      {
        pergunta: "Precisa de jejum para ultrassom em cachorro?",
        resposta:
          "Para ultrassom de abdome, sim: algumas horas de jejum melhoram a imagem do estômago e do intestino. A equipe confirma o tempo certo ao agendar.",
      },
      {
        pergunta: "O pet precisa ser sedado para o raio-x?",
        resposta:
          "Na maioria das vezes, não. A sedação leve só é indicada quando ele está com dor ou agitado demais para ficar na posição certa.",
      },
      {
        pergunta: "Em quanto tempo sai o resultado?",
        // VALIDAR: prazo do laudo.
        resposta:
          "Depende do exame. O prazo é informado no agendamento, e o resultado é explicado por quem acompanha o seu pet.",
      },
      {
        pergunta: "O plano de saúde pet cobre exame de imagem?",
        resposta: "Depende do plano e da modalidade. Mande o nome do plano no WhatsApp que a gente confirma.",
      },
    ],
  },
  relacionados: ["check-up", "cardiologia", "cirurgia"],
  revisao: PENDENTE,
};

const checkUp: Pagina = {
  caminho: "/check-up-veterinario",
  rotulo: "Check-up",
  seo: {
    titulo: "Check-up veterinário para cães e gatos | Torre, Recife",
    descricao:
      "De quanto em quanto tempo levar o pet ao veterinário e quais exames fazer em cada fase da vida. Check-up com exames na clínica, na Torre, Recife.",
  },
  topo: {
    sobretitulo: "Check-up preventivo",
    h1: "Check-up veterinário: o que fazer em cada fase da vida.",
    lead:
      "Cão e gato adultos precisam de consulta pelo menos uma vez por ano e, a partir dos 7 anos, a cada seis meses. O check-up junta exame físico e exames de sangue e urina para achar mudanças antes do sintoma, com a coleta feita aqui mesmo, na Torre.",
    foto: {
      src: "/images/servico_clinica_geral.webp",
      alt: "Dra. Caroline Keffer sorrindo no consultório com um lulu da pomerânia no colo",
      posicao: "center 30%",
      posicaoCelular: "50% 30%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de check-up do site e gostaria de marcar um check-up para o meu pet.",
  },
  servico: { nome: "Check-up veterinário", tipo: "Medicina veterinária preventiva" },
  blocos: [
    {
      tipo: "fases",
      titulo: "O check-up em cada fase da vida.",
      intro: "Orientação geral, com base nas diretrizes da AAHA e da AVMA. O intervalo certo para o seu pet sai da consulta.",
    },
    {
      tipo: "cartoes",
      titulo: "O que entra no check-up.",
      colunas: 3,
      itens: [
        {
          titulo: "Exame físico completo",
          texto: "Peso, coração, pulmão, pele, ouvidos, olhos, boca e abdome.",
          icone: "stethoscope",
          href: "/consulta-veterinaria",
          rotuloLink: "Ver consulta",
        },
        { titulo: "Hemograma", texto: "Anemia, infecção, inflamação e plaquetas.", icone: "drop", href: "/exames-laboratoriais", rotuloLink: "Ver exames laboratoriais" },
        { titulo: "Bioquímico", texto: "Rins, fígado e glicose, os órgãos que adoecem calados.", icone: "flask", href: "/exames-laboratoriais", rotuloLink: "Ver exames laboratoriais" },
        { titulo: "Urinálise", texto: "Como o rim está trabalhando e sinais de infecção urinária.", icone: "testTube", href: "/exames-laboratoriais", rotuloLink: "Ver exames laboratoriais" },
        { titulo: "Exame de fezes", texto: "Verminose e alterações do intestino.", icone: "microscope", href: "/exames-laboratoriais", rotuloLink: "Ver exames laboratoriais" },
        {
          titulo: "Imagem, quando indicado",
          texto: "Ultrassom, raio-x ou eletro, se o exame físico ou o sangue pedirem.",
          icone: "scan",
          href: "/exames-de-imagem",
          rotuloLink: "Ver exames de imagem",
        },
      ],
    },
    {
      tipo: "texto",
      titulo: "Por que o check-up acha o que ele não mostra.",
      paragrafos: [
        "Cão e gato escondem dor e desconforto. Quando o tutor percebe, a doença de rim, fígado ou coração muitas vezes já avançou.",
        "Com o exame feito todo ano no mesmo lugar, a clínica compara o resultado de agora com o do ano passado do mesmo pet. É a mudança, mais que o número isolado, que acende o alerta cedo.",
      ],
      /* A Dra. com os cães no lugar do laboratório (28/09/2026, JM): a seção fala
         de acompanhar o mesmo pet ano a ano, e isso é gente com bicho, não
         bancada. O lulu fica só no topo da página, para não repetir. */
      foto: {
        src: "/images/dra/dra-carol-shih-tzus.webp",
        alt: "Dra. Caroline Keffer sentada no chão com três shih-tzus, em preto e branco",
        posicao: "50% 55%",
      },
    },
  ],
  faq: {
    titulo: "Dúvidas sobre o check-up.",
    itens: [
      {
        pergunta: "De quanto em quanto tempo levar o cachorro ao veterinário?",
        resposta:
          "Filhote, a cada retorno indicado no primeiro ano. Adulto, pelo menos uma vez por ano. A partir dos 7 anos, a cada seis meses. Vale o mesmo para gatos.",
      },
      {
        pergunta: "Quais exames entram no check-up?",
        resposta:
          "Exame físico completo, hemograma, bioquímico e urinálise, com exame de fezes e imagem conforme a idade e o que o exame físico mostrar.",
      },
      {
        pergunta: "Precisa de jejum para o exame de sangue?",
        // VALIDAR: tempo de jejum que a clínica orienta.
        resposta:
          "Em geral, sim, algumas horas. A equipe confirma o tempo certo quando você agendar.",
      },
      {
        pergunta: "O plano de saúde pet cobre check-up?",
        resposta:
          "Muitos planos cobrem consulta e exames de rotina. Mande o nome do plano no WhatsApp que a gente confirma o que o seu cobre.",
      },
    ],
  },
  relacionados: ["exames-de-imagem", "nefrologia", "planos"],
  revisao: PENDENTE,
};

const planos: Pagina = {
  caminho: "/planos-de-saude-pet",
  rotulo: "Planos de saúde pet",
  seo: {
    titulo: "Plano de saúde pet aceito na Torre, Recife | Caroline Keffer",
    descricao:
      "Clínica credenciada PetHealth, CARE, Petlove Saúde, Pet Top e Plamev Pet na Torre, Recife. Confirme a cobertura do seu plano pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Planos de saúde pet",
    h1: "Planos de saúde pet aceitos na clínica, na Torre.",
    lead:
      "A clínica é credenciada a cinco planos de saúde pet: PetHealth, CARE, Petlove Saúde, Pet Top e Plamev Pet. A cobertura muda conforme o plano e a modalidade que você contratou, e a gente confirma a sua antes do atendimento.",
    foto: {
      src: "/images/consultorio_card.webp",
      alt: "Consultório da clínica com a mesa de atendimento e o selo da Dra. Caroline Keffer na parede",
      posicao: "center center",
      posicaoCelular: "50% 60%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de planos do site e queria confirmar a cobertura do meu plano.",
  },
  servico: { nome: "Atendimento veterinário por plano de saúde pet", tipo: "Clínica veterinária credenciada" },
  blocos: [
    { tipo: "planos" },
    {
      tipo: "cartoes",
      titulo: "Credenciada aos cinco, na Torre.",
      intro: "Toque no seu plano para ver como ele funciona aqui na clínica.",
      colunas: 3,
      itens: [
        {
          titulo: "PetHealth",
          texto: "Clínica credenciada PetHealth na Torre, Recife.",
          icone: "shield",
          href: "/planos-de-saude-pet/pethealth",
          rotuloLink: "Como usar aqui",
        },
        {
          titulo: "CARE",
          texto: "Clínica credenciada CARE na Torre, Recife.",
          icone: "shield",
          href: "/planos-de-saude-pet/care",
          rotuloLink: "Como usar aqui",
        },
        {
          titulo: "Petlove Saúde",
          texto: "Clínica credenciada Petlove Saúde na Torre, Recife.",
          icone: "shield",
          href: "/planos-de-saude-pet/petlove-saude",
          rotuloLink: "Como usar aqui",
        },
        {
          titulo: "Pet Top",
          texto: "Clínica credenciada Pet Top na Torre, Recife.",
          icone: "shield",
          href: "/planos-de-saude-pet/pet-top",
          rotuloLink: "Como usar aqui",
        },
        {
          titulo: "Plamev Pet",
          texto: "Clínica credenciada Plamev Pet na Torre, Recife.",
          icone: "shield",
          href: "/planos-de-saude-pet/plamev-pet",
          rotuloLink: "Como usar aqui",
        },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como usar o seu plano aqui.",
      // VALIDAR: o que levar no dia (carteirinha digital? documento do tutor?).
      itens: [
        { titulo: "Mande o plano e a carteirinha", texto: "Nome do plano e número da carteirinha, pelo WhatsApp." },
        {
          titulo: "A gente confirma a cobertura",
          texto: "O que a sua modalidade cobre: consulta, exame, cirurgia, e se há carência.",
        },
        { titulo: "No dia, traga a carteirinha", texto: "A versão digital, no celular, serve." },
        {
          titulo: "Sem surpresa no caixa",
          texto: "O que não estiver coberto é avisado antes, com o valor.",
        },
      ],
    },
    {
      tipo: "chamada",
      titulo: "Não tem plano?",
      texto:
        "A clínica atende particular também. Conte o caso no WhatsApp que a gente passa o valor antes de você vir, sem compromisso.",
      icone: "wallet",
      rotuloBotao: "Pedir o valor",
      mensagem: "Olá! Vim pelo site. Não tenho plano de saúde pet e queria saber o valor do atendimento.",
    },
  ],
  faq: {
    titulo: "Dúvidas sobre os planos.",
    itens: [
      {
        pergunta: "Vocês aceitam Petlove?",
        resposta:
          "Sim, a clínica é credenciada Petlove Saúde. A cobertura depende da modalidade do seu plano, e a gente confirma pelo WhatsApp.",
      },
      {
        pergunta: "O meu plano não está na lista. E agora?",
        resposta: "Mande o nome dele no WhatsApp que a gente confirma na hora se atende.",
      },
      {
        pergunta: "Tem carência?",
        resposta:
          "Carência é regra do plano, não da clínica. Ao confirmar a cobertura, a gente já diz se o procedimento está liberado para você.",
      },
      {
        pergunta: "O plano cobre cirurgia e exame de imagem?",
        resposta:
          "Depende da modalidade contratada. Muitos planos cobrem, alguns com coparticipação. Confirmamos antes de marcar.",
      },
    ],
  },
  relacionados: ["check-up", "especialidades", "cirurgia"],
  revisao: PENDENTE,
};

const equipe: Pagina = {
  caminho: "/equipe",
  rotulo: "Dra. Carol e equipe",
  seo: {
    titulo: "Dra. Caroline Keffer e equipe | Veterinária na Torre, Recife",
    descricao:
      "Conheça a Dra. Caroline Keffer, médica veterinária há mais de 20 anos na Torre, e a equipe que atende seu pet na Rua Araguatins, em Recife.",
  },
  topo: {
    sobretitulo: "Quem cuida do seu pet",
    h1: "Dra. Caroline Keffer e a equipe da clínica.",
    lead:
      "A Dra. Caroline Keffer (CRMV-PE 3053) é médica veterinária e responsável técnica da clínica, há mais de 20 anos na Torre, em Recife. Ao lado dela, a Dra. Isa Lopes (CRMV-PE 6871), a gerente Camila Amaral e o Lucas Leal no banho e tosa: as mesmas pessoas a cada visita.",
    foto: {
      src: "/images/hero_dra_keffer.webp",
      alt: "Dra. Caroline Keffer sorrindo, retrato em fundo claro",
      posicao: "55% 18%",
      posicaoCelular: "50% 8%",
    },
    mensagemWhatsapp: "Olá! Vim pela página da equipe no site e gostaria de marcar uma consulta.",
  },
  blocos: [
    {
      tipo: "texto",
      titulo: "Dra. Caroline Keffer",
      // CRMV confirmado pela clínica (29/09/2026). VALIDAR: formação e especializações.
      paragrafos: [
        "Em mais de 20 anos na Torre, ela viu filhote virar idoso e tutor virar cliente de casa. Não é rodízio de plantonista: é a mesma veterinária acompanhando a história do seu pet.",
        "É pouco comum, e é exatamente o que faz diferença quando o diagnóstico depende de saber como ele era antes de adoecer.",
      ],
      lista: ["Médica Veterinária · CRMV-PE 3053", "Responsável técnica da clínica", "Mais de 20 anos atendendo na Torre"],
      foto: {
        src: "/images/dra/dra-carol-corgi.webp",
        alt: "Dra. Caroline Keffer gargalhando com um filhote de corgi no colo",
        posicao: "50% 35%",
      },
    },
    { tipo: "equipe" },
    {
      tipo: "especialistas",
      titulo: "As especialidades da clínica.",
      intro:
        "Cinco especialidades para quando o caso pede um olhar específico, no lugar que seu pet já conhece e com o histórico à mão.",
    },
  ],
  faq: {
    titulo: "Dúvidas sobre a equipe.",
    itens: [
      {
        pergunta: "Quem atende na clínica?",
        resposta:
          "A Dra. Caroline Keffer (CRMV-PE 3053) e a Dra. Isa Lopes (CRMV-PE 6871) na clínica geral. A clínica tem ainda especialistas em cardiologia, dermatologia, nefrologia, pneumologia e nutrição com gastroenterologia.",
      },
      {
        pergunta: "Meu pet vai ser atendido sempre pela mesma veterinária?",
        // VALIDAR: se dá para escolher a veterinária ao agendar.
        resposta:
          "Essa é a ideia da casa. Ao agendar pelo WhatsApp, diga com quem o seu pet já é acompanhado.",
      },
      {
        pergunta: "Há quanto tempo a Dra. Carol atende na Torre?",
        resposta:
          "Há mais de 20 anos. É a mesma veterinária acompanhando o seu pet de filhote a idoso, sem rodízio de plantonista.",
      },
      {
        pergunta: "Quem cuida do banho e tosa?",
        resposta:
          "O Lucas Leal, do banho e tosa. Se ele notar algo na pele ou no ouvido durante o banho, a veterinária avalia no mesmo dia.",
      },
    ],
  },
  relacionados: ["especialidades", "check-up", "cirurgia"],
  revisao: PENDENTE,
};

const banhoTosa: Pagina = {
  caminho: "/banho-e-tosa",
  rotulo: "Banho e tosa",
  seo: {
    titulo: "Banho e tosa na Torre, Recife | Clínica Pet Caroline Keffer",
    descricao:
      "Banho e tosa para cães e gatos dentro da clínica veterinária, na Torre, Recife. Se algo aparecer na pele ou no ouvido, a veterinária vê na hora.",
  },
  topo: {
    sobretitulo: "Banho e tosa",
    h1: "Banho e tosa na Torre, dentro da clínica veterinária.",
    lead:
      "Banho e tosa feitos pelo Lucas Leal, pet groomer da casa, dentro da clínica. Se durante o banho aparecer algo na pele, no ouvido ou um carocinho novo, a veterinária está a poucos passos para olhar.",
    foto: {
      src: "/images/servico_banho_tosa.webp",
      alt: "Sala de banho e tosa da clínica, com banheira, secador profissional e mural de cão no banho",
      posicao: "center 50%",
      posicaoCelular: "50% 40%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de banho e tosa do site e gostaria de agendar um horário.",
  },
  servico: { nome: "Banho e tosa", tipo: "Banho e tosa" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "O que você pode pedir.",
      colunas: 3,
      // VALIDAR: a lista de serviços do banho e tosa.
      itens: [
        { titulo: "Banho", texto: "Com produto adequado ao tipo de pelo e à pele dele.", icone: "bath" },
        { titulo: "Tosa higiênica", texto: "Barriga, patas e regiões íntimas, para o dia a dia.", icone: "scissors" },
        { titulo: "Tosa na máquina ou tesoura", texto: "No padrão da raça ou do jeito que você preferir.", icone: "scissors" },
        { titulo: "Hidratação", texto: "Para pelo ressecado ou embaraçado.", icone: "drop" },
        { titulo: "Corte de unhas", texto: "No comprimento certo, sem atingir a parte viva.", icone: "paw" },
        { titulo: "Limpeza de ouvidos", texto: "Com produto próprio e olhar atento a otite.", icone: "ear" },
      ],
    },
    {
      tipo: "texto",
      titulo: "O que muda quando o banho é dentro da clínica.",
      paragrafos: [
        "Quem dá o banho vê a pele inteira do seu pet, e aqui isso vira cuidado: uma vermelhidão, uma pulga, um nódulo ou um ouvido inflamado vão direto para a veterinária, no mesmo dia.",
        "Pet com problema de pele toma banho com o produto que a dermatologia indicou, e pet ansioso é manejado com calma, por uma equipe acostumada com bicho nervoso.",
      ],
      /* Pet de banho tomado na bancada da clínica, no lugar do retrato do Lucas
         (28/09/2026, JM: "não tem nada a ver"). A seção fala do banho, não de quem dá. */
      foto: {
        src: "/images/cao.webp",
        alt: "Maltês de gravatinha azul na bancada, depois do banho na clínica",
        posicao: "50% 35%",
      },
    },
    {
      tipo: "passos",
      titulo: "De quanto em quanto tempo dar banho.",
      intro: "Orientação geral. O intervalo certo depende da pele, do pelo e da rotina do seu pet.",
      itens: [
        { titulo: "Cão de pelo curto", texto: "Em geral, a cada 15 a 30 dias. Banho demais resseca a pele." },
        { titulo: "Cão de pelo longo", texto: "Pode pedir intervalo menor, com escovação em casa entre um e outro." },
        { titulo: "Gato", texto: "Raramente precisa de banho. Tosa higiênica e desembaraço ajudam nos de pelo longo, como o persa." },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre banho e tosa.",
    itens: [
      {
        pergunta: "Precisa agendar o banho e tosa?",
        resposta: "Sim, pelo WhatsApp. Assim ele é atendido na hora marcada e não fica esperando.",
      },
      {
        pergunta: "Vocês dão banho em gato?",
        resposta: "Sim. Cão e gato, com manejo calmo e produto próprio para cada espécie.",
      },
      {
        pergunta: "Meu cachorro tem alergia de pele. Pode tomar banho aí?",
        resposta:
          "Pode, e é até o melhor lugar: o banho é feito com o produto indicado no tratamento, e qualquer piora é vista pela veterinária no mesmo dia.",
      },
    ],
  },
  relacionados: ["dermatologia", "check-up", "planos"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

/** Todas as páginas, pela chave usada em `relacionados`. */
export const paginas = {
  especialidades,
  cardiologia,
  dermatologia,
  nefrologia,
  pneumologia,
  "nutricao-e-gastroenterologia": nutricaoGastro,
  cirurgia,
  "exames-de-imagem": examesImagem,
  "check-up": checkUp,
  planos,
  equipe,
  "banho-e-tosa": banhoTosa,
  /* 2ª leva (01/10/2026): serviços, um exame por página e um plano por página. */
  vacinacao,
  castracao,
  odontologia,
  consulta,
  laboratorio,
  gatos,
  urgencia,
  ortopedia,
  ultrassom,
  "raio-x": raioX,
  eletrocardiograma,
  pethealth,
  care,
  "petlove-saude": petloveSaude,
  "pet-top": petTop,
  "plamev-pet": plamevPet,
  "como-chegar": comoChegar,
  madalena,
  cordeiro,
  zumbi,
  iputinga,
  "jaqueira-e-parnamirim": jaqueiraParnamirim,
  gracas,
} as const satisfies Record<string, Pagina>;

export type ChavePagina = keyof typeof paginas;

/** As cinco especialidades, na ordem do cartão da home. Alimenta a rota dinâmica. */
export const especialidadesFilhas = {
  cardiologia,
  dermatologia,
  nefrologia,
  pneumologia,
  "nutricao-e-gastroenterologia": nutricaoGastro,
} as const;

/** Um exame por página, filhas de /exames-de-imagem. Alimenta a rota dinâmica. */
export const examesFilhos = {
  "ultrassom-veterinario": ultrassom,
  "raio-x-veterinario": raioX,
  "eletrocardiograma-veterinario": eletrocardiograma,
} as const;

/** Um plano por página, filhas de /planos-de-saude-pet. Alimenta a rota dinâmica. */
export const planosFilhos = {
  pethealth,
  care,
  "petlove-saude": petloveSaude,
  "pet-top": petTop,
  "plamev-pet": plamevPet,
} as const;

/** Um bairro por página, filhas de /como-chegar. Alimenta a rota dinâmica. */
export const bairros = {
  madalena,
  cordeiro,
  zumbi,
  iputinga,
  "jaqueira-e-parnamirim": jaqueiraParnamirim,
  gracas,
} as const;

/**
 * Especialidades atendidas por especialistas que VÊM ATÉ A CLÍNICA em dias
 * agendados (29/09/2026: a equipe fixa são a Dra. Carol e a Dra. Isa; exames
 * de imagem e especialidades vêm com médicos volantes).
 * Se um dia a clínica quiser mostrar o nome de cada especialista, entra aqui.
 */
export const especialistas: readonly {
  especialidade: string;
  caminho: string;
  icone: string;
  resumo: string;
}[] = [
  { especialidade: "Cardiologia", caminho: "/especialidades/cardiologia", icone: "heartbeat", resumo: "Coração, sopro e cansaço" },
  { especialidade: "Dermatologia", caminho: "/especialidades/dermatologia", icone: "bug", resumo: "Pele, pelo e ouvido" },
  { especialidade: "Nefrologia", caminho: "/especialidades/nefrologia", icone: "drop", resumo: "Rins e trato urinário" },
  { especialidade: "Pneumologia", caminho: "/especialidades/pneumologia", icone: "wind", resumo: "Tosse e respiração" },
  { especialidade: "Nutrição e gastro", caminho: "/especialidades/nutricao-e-gastroenterologia", icone: "bowl", resumo: "Dieta, estômago e intestino" },
];

/**
 * Grupos do rodapé: o que liga a home às páginas internas. Os serviços de
 * mais busca entram aqui; o resto se alcança pelas páginas-mãe (exames,
 * planos, como chegar) e pelos relacionados.
 */
export const rodapeServicos = [
  { rotulo: "Consulta veterinária", caminho: "/consulta-veterinaria" },
  { rotulo: "Vacinação", caminho: "/vacinacao-de-caes-e-gatos" },
  { rotulo: "Especialidades", caminho: "/especialidades" },
  { rotulo: "Cirurgia", caminho: "/cirurgia-veterinaria" },
  { rotulo: "Castração", caminho: "/castracao-de-caes-e-gatos" },
  { rotulo: "Exames", caminho: "/exames-de-imagem" },
  { rotulo: "Check-up", caminho: "/check-up-veterinario" },
  { rotulo: "Urgência até 18h", caminho: "/urgencia-veterinaria" },
  { rotulo: "Planos de saúde pet", caminho: "/planos-de-saude-pet" },
  { rotulo: "Banho e tosa", caminho: "/banho-e-tosa" },
  { rotulo: "Dra. Carol e equipe", caminho: "/equipe" },
] as const;

/**
 * Painel "O que fazer agora", ao lado dos sinais de emergência. A opção que
 * vale para o horário atual acende sozinha (useDentroDaJanela).
 *
 * Confirmado pela clínica (29/09/2026): emergência é atendida ATÉ AS 18H — é o
 * tempo de estabilizar o pet e encaminhar para um internamento 24h. Depois
 * disso, mesmo com a clínica aberta, a orientação é o plantão.
 * No sábado a clínica fecha às 16h (horário confirmado em 01/10/2026), e o
 * limite usado é o horário de fechar.
 */
export const painelAgora = {
  titulo: "O que fazer agora",
  limiteEmergencia: "18:00",
  /* 06/10/2026 (JM: "menos poluído, horários mais intuitivos"): no lugar dos
     dois cartões "Até as 18h / Após as 18h", uma faixa com a instrução que vale
     AGORA e, embaixo, a janela de emergência de cada dia, calculada do
     expediente. O cartão antigo dizia "até as 18h" também no sábado, quando a
     clínica fecha às 16h. */
  status: {
    aberta: { rotulo: "Agora: aberto para emergência", texto: "Venha direto. A equipe estabiliza o seu pet na hora." },
    fechada: { rotulo: "Agora: fechado para emergência", texto: "Procure um plantão veterinário 24h. Não espere a clínica abrir." },
    /* Antes da hidratação não se sabe a hora: a regra geral, sem acender nada. */
    neutro: { rotulo: "Em uma emergência", texto: "No horário abaixo, venha direto. Fora dele, procure um plantão 24h." },
  },
  rotuloHorarios: "Emergência na clínica",
  rotuloHoje: "hoje",
  nota: "Se precisar de internação à noite, a equipe encaminha para um hospital 24h.",
  botao: "Avisar que estou indo",
  mensagem: "Olá! É uma emergência, estou indo para a clínica agora.",
  /* Fora da janela, "estou indo" contradiz a faixa: o botão vira recado. */
  botaoFechada: "Falar com a equipe",
  mensagemFechada: "Olá! Meu pet teve uma emergência fora do horário e queria orientação da equipe.",
  ligar: "ou ligue",
} as const;
