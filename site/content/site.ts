/**
 * TODA a copy e os dados do site vivem aqui.
 * Os componentes de seção só montam layout — nunca texto hardcoded.
 * Copy produzida via skill `copywriting`, ancorada no brief.md.
 *
 * ⚠️ Itens marcados com VALIDAR vieram de fonte pública e precisam de
 * confirmação com a clínica antes de publicar.
 */

/**
 * Trilha SPEC: o site é uma PROPOSTA de um negócio real que ainda não contratou.
 * Enquanto isto for `true`, a página sai com `noindex` e o robots.txt bloqueia tudo.
 * Vire para `false` (ou defina NEXT_PUBLIC_SITE_APROVADO=1) só depois da clínica aprovar.
 */
export const ehProposta = process.env.NEXT_PUBLIC_SITE_APROVADO !== "1";

const WHATSAPP_NUMERO = "5581993037584";
const WHATSAPP_MENSAGEM =
  "Oi! Vim pelo site e queria marcar uma consulta para o meu pet.";

/**
 * Link de WhatsApp com uma mensagem específica já escrita.
 *
 * Existe para os cartões de plano: em vez de cair no "oi, quero marcar", o
 * tutor chega perguntando pelo plano DELE, e a recepção já responde a pergunta
 * certa. Menos ida e volta é menos desistência.
 */
export function linkWhatsapp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const contato = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    WHATSAPP_MENSAGEM,
  )}`,
  whatsappExibicao: "(81) 99303-7584",
  telefoneFixo: "(81) 3268-5979",
  telefoneFixoLink: "tel:+558132685979",
  instagram: "https://www.instagram.com/clinicapet_carolinekeffer/",
  endereco: "Rua Araguatins, 63",
  bairro: "Torre, Recife - PE",
  cep: "50710-060",
  mapa: "https://maps.google.com/?q=Rua+Araguatins,+63+-+Torre,+Recife+-+PE,+50710-060",
} as const;

/** Um único rótulo por intenção, usado no site inteiro. */
export const CTA_PRIMARIO = "Agendar pelo WhatsApp";

export const meta = {
  titulo: "Clínica Pet Caroline Keffer | Veterinária na Torre, Recife",
  descricao:
    "Clínica veterinária na Torre, Recife, há mais de 20 anos. Clínica geral, cirurgia (inclusive odontológica e ortopédica), cinco especialidades, exames e banho e tosa para cães e gatos, com a Dra. Carol. Agende pelo WhatsApp.",
  /*
   * Endereço real de onde o site está publicado. O card de compartilhamento
   * exige URL ABSOLUTA de imagem: sem isto o WhatsApp monta o link com o
   * domínio final (que ainda não existe) somado ao caminho do Pages, e a
   * prévia sai quebrada. Quando o domínio próprio entrar, é só remover a env.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinicapetcarolinekeffer.com.br",
} as const;

export const navegacao = [
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Planos", href: "#planos" },
  { rotulo: "A clínica", href: "#a-clinica" },
  { rotulo: "Equipe", href: "#equipe" },
  { rotulo: "Dúvidas", href: "#duvidas" },
  { rotulo: "Onde ficamos", href: "#onde-ficamos" },
] as const;

export const hero = {
  /*
   * Enxugada em 11/09/2026 (JM: "deixa mais enxuta, porém com mesmo impacto e
   * clareza"). A headline caiu de 63 para 45 caracteres e a subhead de 143 para
   * 78 — o gancho emocional e a lista de serviços continuam inteiros, saiu a
   * repetição ("seu cachorro ou seu gato" já está dito em "seu pet") e a
   * redundância de "a mesma equipe", que a dobra de Equipe argumenta melhor.
   */
  headline: "Tudo para seu pet, onde ele se sente em casa.",
  /** Fim da headline pintado na cor de destaque. Precisa ser o final exato dela. */
  headlineDestaque: "em casa.",
  subhead:
    "Clínica geral, cirurgia, especialidades, exames e banho e tosa na Torre, com a Dra. Carol.",
  /** No celular a copy fica sobre a foto: só o essencial. A Dra. Carol já aparece na fileira de rostos. */
  subheadCurta: "Clínica, cirurgia, exames, banho e tosa, na Torre.",
  /**
   * Os quatro DEDOS da pata do hero no desktop (a almofada é a fachada).
   * Fotos reais: atendimentos da galeria, o especialista e o consultório.
   */
  pata: [
    { src: "/images/servico_especialista.webp", alt: "Veterinário sorrindo ao lado de um golden retriever sobre a mesa de exame", posicao: "60% 12%", rotulo: "Especialidades", zoom: 1, origem: "50% 50%", destaque: false },
    { src: "/images/hero_dra_lulu.webp", alt: "Dra. Caroline Keffer sorrindo com um lulu da pomerânia no colo", posicao: "50% 30%", rotulo: "Dra. Carol", zoom: 1, origem: "50% 50%", destaque: true },
    { src: "/images/galeria/atendimento-03.webp", alt: "Colaboradora sorrindo com um cocker spaniel de laço vermelho no colo", posicao: "50% 32%", rotulo: "Atendimento", zoom: 1, origem: "50% 50%", destaque: false },
    { src: "/images/galeria/atendimento-05.webp", alt: "Colaboradora segurando um filhote de yorkshire junto ao rosto", posicao: "50% 35%", rotulo: "Equipe", zoom: 1, origem: "50% 50%", destaque: false },
  ],
  cta: CTA_PRIMARIO,
  /** CTA secundário do hero: leva à dobra de serviços. */
  ctaServicos: { rotulo: "Ver serviços", href: "#servicos" },
  ctaMicrocopy: "Resposta no mesmo dia, em horário de funcionamento.",
  foto: {
    /*
     * FACHADA da clínica (JM, 09/09/2026), no lugar do retrato da Dra. Carol —
     * que foi para a dobra `draCarol`, onde conta história.
     *
     * Quem chega pelo Google ainda não sabe se a clínica existe de verdade nem
     * onde ela fica. A fachada responde as duas coisas antes da primeira linha
     * de texto: é prova, não decoração.
     *
     * É a foto de CÉU ABERTO, e não a frontal, porque o painel do hero é uma
     * coluna ALTA. Esta é retrato (1001x1251, 0,80) e entra praticamente sem
     * recorte; a frontal é 4:3 e, espremida na coluna, virava uma tira do meio
     * da calçada. O céu ainda entrega azul de verdade para a dobra.
     *
     * A frontal foi para `ondeFicamos`, onde a caixa é deitada.
     */
    src: "/images/fachada_ceu.webp",
    alt: "Fachada da Clínica Veterinária Caroline Keffer vista da calçada, com o céu aberto",
    /** O letreiro fica no terço de cima do quadro. */
    posicao: "center 42%",
  },
  /*
   * CELULAR (17/09/2026, JM: "quero ver boa parte da fachada"): a foto FRONTAL
   * (4:3). Na faixa alta do celular a foto de céu só cabia com o letreiro
   * gigante e a entrada fora do quadro; esta mostra letreiro, porta, as
   * plantas e a calçada de uma vez.
   */
  fotoMobile: {
    src: "/images/fachada_hero.webp",
    alt: "Fachada da Clínica Veterinária Caroline Keffer vista de frente, com a entrada e as plantas na calçada",
    posicao: "6% 50%",
  },
} as const;

/**
 * Lema da clínica, escrito na parede do consultório (foto enviada pelo JM em
 * 17/09/2026). Frase real, reproduzida como está na parede.
 */
export const lema = {
  rotulo: "Nosso jeito de cuidar",
  frase: "Cuidamos com o coração, tratamos com afeto",
  /**
   * Missão, montada só com fatos que o site já afirma (20+ anos na Torre,
   * equipe fixa, acompanhamento do filhote ao idoso). VALIDAR com a Dra. Carol.
   */
  missao:
    "É o que guia a clínica há mais de 20 anos na Torre: a mesma equipe acompanhando seu pet em cada fase da vida, de filhote a idoso.",
} as const;

/**
 * Três números reais, todos verificáveis. `alvo` é o valor final da contagem,
 * `casas` são as decimais e `sufixo` o que vem depois (ex.: o "+" de "20+").
 */
export const prova = {
  itens: [
    {
      alvo: 4.8,
      casas: 1,
      sufixo: "",
      rotulo: "de nota nas avaliações do Google",
      nota: "média de 130 tutores",
      foto: "/images/galeria/atendimento-03.webp",
      fotoPosicao: "50% 30%",
      fotoAlt: "Colaboradora da clínica sorrindo com um cocker spaniel no colo",
      /** Só a nota é proporção, então só ela ganha as cinco estrelas embaixo. */
      estrelas: 4.8,
    },
    {
      alvo: 20,
      casas: 0,
      sufixo: "+",
      rotulo: "anos cuidando dos pets da Torre",
      nota: "sempre na Rua Araguatins, na Torre",
      foto: "/images/fachada_hero.webp",
      fotoPosicao: "42% 54%",
      fotoAlt: "Fachada da clínica vista de frente, com a entrada e as plantas",
    },
    {
      /*
       * Era "9 serviços no mesmo lugar". Com o catálogo real da clínica
       * (11/09/2026) sobraram 5 frentes, e 5 é um número fraco de se anunciar.
       * A ESPECIALIDADE é o número forte e verdadeiro: cinco especialistas
       * atendendo dentro de casa é o que nenhum concorrente de bairro tem.
       */
      alvo: 5,
      casas: 0,
      sufixo: "",
      rotulo: "especialidades atendendo aqui",
      nota: "da clínica geral à cirurgia ortopédica",
      foto: "/images/servico_especialista.webp",
      fotoPosicao: "58% 22%",
      fotoAlt: "Veterinário especialista ao lado de um golden retriever na mesa de exame",
    },
  ],
} as const;

export const servicos = {
  headline: "Consulta, cirurgia e exames no mesmo lugar.",
  subhead:
    "Consulta, exame e cirurgia acontecem na mesma casa, com quem já conhece a história do seu pet.",
  /*
   * FORMATO ÚNICO DAS FOTOS (15/09/2026, JM: "uns com borda lateral, outros
   * não, tá desconexo"). Todas as seis são retrato 4:5, sangradas, recortadas
   * direto da original (`servico_*.webp`, 880×1100). As fotos da clínica são em
   * pé; no painel 16:9 só cabiam cortando cabeça ou com faixa desfocada nas
   * laterais. Em 4:5 as de gente aparecem praticamente inteiras.
   * Foto nova para cá: 4:5, assunto no centro.
   */
  itens: [
    {
      // A clínica chama assim (lista enviada pelo JM em 11/09/2026).
      nome: "Clínica médica geral",
      texto:
        "O atendimento do dia a dia: o que está errado, o que fazer e quanto tempo leva.",
      icone: "stethoscope",
      /* Dra. Carol no consultório com um paciente, letreiro da clínica atrás
         (14/09/2026). É a imagem literal de uma consulta de rotina. */
      src: "/images/servico_clinica_geral.webp",
      alt: "Dra. Caroline Keffer sorrindo no consultório com um lulu da pomerânia no colo",
      briefing: "Dra. Carol examinando um cão na mesa de atendimento",
      posicao: "center center",
    },
    {
      nome: "Cirurgia",
      /*
       * Odontológica e ortopédica vieram na lista de 11/09/2026 e NÃO estavam
       * no site. Ortopedia em clínica de bairro é incomum — era capacidade real
       * sendo escondida atrás de um "cirurgia geral" genérico.
       */
      texto:
        "Cirurgia geral, odontológica e ortopédica, com pré-operatório e acompanhamento na recuperação.",
      itens: ["Cirurgia geral", "Cirurgia odontológica", "Cirurgia ortopédica"],
      icone: "firstAid",
      /* A sala cirúrgica de verdade (12/09/2026). Antes estava a área de
         internação aqui, que é outro cômodo. */
      /* Procedimento em andamento (escolha do JM). Em 4:5 a foto aparece
         quase inteira, com o corpo todo do cirurgião e do paciente. */
      src: "/images/servico_cirurgia.webp",
      alt: "Veterinária paramentada realizando procedimento em um cão anestesiado na mesa cirúrgica",
      briefing: "Sala de cirurgia da clínica, equipamento em foco",
      posicao: "center center",
    },
    {
      nome: "Consulta com especialista",
      /*
       * ⚠️ CORREÇÃO DE FATO (11/09/2026). Aqui dizia "Encaminhamento clínico
       * quando o caso pede um olhar específico" — ou seja, o site afirmava que
       * a clínica MANDAVA PARA FORA. A lista da clínica mostra o contrário:
       * são cinco especialidades atendendo dentro de casa.
       *
       * Não era só imprecisão, era o site vendendo a clínica por menos do que
       * ela é, e bem no argumento que o resto da página sustenta ("resolve tudo
       * no mesmo lugar").
       */
      texto:
        "Cinco especialidades atendem aqui dentro. Quando o caso pede um olhar específico, seu pet não precisa ir para outro endereço.",
      itens: [
        "Cardiologia",
        "Dermatologia",
        "Nefrologia",
        "Pneumologia",
        "Nutrição e gastroenterologia",
      ],
      icone: "heartbeat",
      /* Outro ângulo do consultório (12/09/2026): a bancada de inox e a pia,
         que é onde o exame acontece. Mostra cômodo diferente do card de
         clínica geral, que traz a mesa de conversa. */
      /*
       * 14/09/2026. O JM sugeriu `caroline_com_cachorro` aqui e pediu uma
       * avaliação imparcial. Ela foi para Clínica médica geral, onde encaixa
       * melhor: é a Dra. Carol no consultório com o paciente, a cena literal de
       * uma consulta de rotina. Para especialista ficou o veterinário com o
       * paciente na mesa de exame.
       *
       * O alt NÃO nomeia a especialidade do profissional: o bordado do jaleco
       * diz anestesista, e anestesia não está entre as cinco especialidades de
       * consulta. Afirmar isso aqui seria impreciso.
       */
      src: "/images/servico_especialista.webp",
      alt: "Veterinário sorrindo ao lado de um golden retriever sobre a mesa de exame",
      briefing: "Atendimento de gato, ambiente calmo",
      posicao: "center center",
    },
    {
      /* Modalidades confirmadas pela clínica em 11/09/2026 — o VALIDAR que
         estava aqui ("a fachada só diz de imagem") está resolvido. */
      nome: "Exames de imagem",
      texto:
        "Para ver o que o exame de sangue não mostra, sem precisar de outro endereço.",
      itens: ["Radiografia", "Ultrassonografia", "Eletrocardiograma"],
      icone: "scan",
      /*
       * ⚠️ A foto anterior (`veterinary_ultrasound_room.webp`) era STOCK, não
       * era a clínica — justamente o que o brief proíbe. Saiu.
       *
       * Nenhuma das oito fotos enviadas em 12/09/2026 mostra o raio-x, o
       * ultrassom ou o eletrocardiograma, então aqui está o internamento: é
       * estrutura real da casa, mas NÃO é a sala de imagem. O alt descreve o
       * que a foto realmente mostra, sem afirmar o que ela não é.
       * Pedir à clínica uma foto dos aparelhos.
       */
      /*
       * ⚠️ Nenhuma foto recebida mostra raio-x, ultrassom ou eletrocardiograma.
       * 15/09/2026, a pedido do JM ("melhor colocar do consultório, com algum
       * equipamento"): o consultório com a bancada de exame em inox, pia e
       * armários. NÃO é a sala de imagem, e o alt não afirma que é.
       * Pedir à clínica uma foto dos aparelhos.
       */
      src: "/images/servico_imagem.webp",
      alt: "Consultório da clínica com bancada de exame em inox, pia e armários",
      briefing: "Aparelho de raio-x, ultrassom ou eletrocardiograma da clínica",
      posicao: "center center",
    },
    {
      nome: "Exames laboratoriais",
      texto:
        "A coleta é feita aqui mesmo, e o resultado a Dra. Carol explica pra você.",
      icone: "flask",
      /* O laboratório de verdade (12/09/2026). */
      src: "/images/servico_laboratorio.webp",
      alt: "Laboratório da clínica, com bancada de granito, tabela de referência na parede e material de coleta",
      briefing: "Coleta de sangue ou microscópio, detalhe de mãos",
      posicao: "center center",
    },
    {
      /*
       * Saiu em 11/09/2026 junto com vacinas, atendimento em casa e obstetrícia,
       * quando a lista de serviços chegou sem ele. Voltou no mesmo dia, a pedido
       * do JM: a clínica tem banho e tosa, e o Lucas Leal está na equipe como
       * pet groomer justamente por isso.
       */
      nome: "Banho e tosa",
      texto: "Feito por quem conhece a pele e a saúde do seu cachorro.",
      icone: "scissors",
      /* A sala de banho e tosa, com secador e banheira. 15/09/2026: mostra bem
         mais da altura da sala. */
      src: "/images/servico_banho_tosa.webp",
      alt: "Sala de banho e tosa da clínica, com banheira, secador profissional e mural de cão no banho",
      briefing: "Cão no banho e tosa, secagem ou escovação",
      posicao: "center 50%",
    },
  ],
} as const;

export const semEstresse = {
  headline: "Consulta sem estresse, porque ele já conhece a casa.",
  /* Enxugado em 15/09/2026 (JM: "evitar tanta poluição visual de texto
     corrido"): eram dois parágrafos, 257 caracteres; agora uma frase só. */
  corpo: [
    "Mesmo lugar, mesmo cheiro, mesmas pessoas. É isso que os tutores mais contam nas avaliações.",
  ],
  /**
   * Avaliações reais do Google, transcritas literalmente, com nome e foto de
   * perfil das pessoas que avaliaram.
   *
   * ⚠️ Pendência antes de publicar: pegar o ok de cada uma. A avaliação é
   * pública, mas reaproveitar nome e rosto numa peça comercial é outro uso.
   * Sem autorização, basta apagar `foto` e `nome` — o card volta para o avatar
   * neutro com o crédito "Avaliação no Google" sozinho.
   */
  depoimentosDestaque: [
    {
      texto: "Da recepção a médica, tratamento humanizado e profissional.",
      nome: "Wedja",
      foto: "/images/wedja.webp",
      estrelas: 5,
    },
    {
      texto: "Ambiente agradável, equipe atenciosa e produtos bacanas.",
      nome: "Nathalia Magalhães",
      foto: "/images/nathalia_magalhaes.webp",
      estrelas: 5,
    },
    {
      texto: "Ótimos profissionais e preço justo.",
      nome: "Jamylle",
      foto: "/images/jamylle.webp",
      estrelas: 5,
    },
  ],
  /*
   * O painel de credibilidade (4,8 / 20+ / nota de origem) foi REMOVIDO daqui:
   * repetia número por número a faixa de prova logo abaixo do hero. Prova
   * social repetida não soma, dilui.
   */
  /** A frase mais forte do acervo, sobreposta à foto. */
  citacaoDestaque: {
    texto: "Meu pet não se estressou com a consulta.",
    fonte: "Avaliação no Google",
  },
  foto: {
    /*
     * Visão AMPLA do consultório (15/09/2026, JM: "tira essa imagem, coloca
     * uma de qualidade, que tenha uma visão ampla do consultório"). A anterior
     * era um ângulo fechado na frase da parede. Esta é a tomada de frente: a
     * parede com o selo iluminado, a frase, a mesa e as duas cadeiras, que é
     * exatamente a sala onde o tutor vai sentar.
     *
     * 15/09/2026: versão melhorada por IA que o JM enviou (guardada em
     * `_fontes/originais/clinica-2026-09/consultorio_melhorado_ia.jpeg`). A ferramenta de IA
     * trocou letras da frase na parede ("ceração", "afeio"), então o trecho
     * da frase foi recolocado a partir da foto original, alinhado e com o tom
     * casado. Toda foto melhorada por IA: conferir os textos antes de subir.
     */
    src: "/images/consultorio_card.webp",
    alt: 'Consultório da clínica visto de frente, com a mesa de atendimento, duas cadeiras, o selo da Dra. Caroline Keffer iluminado na parede e a frase "Cuidamos com o coração, tratamos com afeto"',
    briefing: "Consultório da clínica, vista ampla",
    proporcao: "16 / 9",
    /** O quadro estica até a altura dos depoimentos: segura a mesa e o selo no centro. */
    posicao: "center 46%",
  },
} as const;

export const draCarol = {
  headline: "Quem atende é a Dra. Carol.",
  corpo: [
    "Em mais de 20 anos na Torre, ela viu filhote virar idoso e tutor virar cliente de casa. Não é rodízio de plantonista: é a mesma veterinária acompanhando a história do seu pet.",
    "É pouco comum, e é exatamente o que faz diferença quando o diagnóstico depende de saber como ele era antes de adoecer.",
  ],
  // VALIDAR: número do CRMV antes de publicar.
  credencial: "CRMV-PE (validar)",
  /** Aparece na placa sobre o retrato. Autoridade sem depender do CRMV. */
  papel: "Médica Veterinária",
  foto: {
    /*
     * O retrato que estava no hero (JM, 09/09/2026). Aqui ele rende mais: a
     * dobra é sobre a pessoa, e retrato vertical em coluna própria lê melhor
     * do que espremido ao lado da copy.
     *
     * A foto anterior (`dra_caroline_alargado.webp`) segue em /public/images.
     */
    src: "/images/hero_dra_keffer.webp",
    alt: "Dra. Caroline Keffer sorrindo, retrato em fundo claro",
    briefing: "Retrato da Dra. Carol, vertical, olhando para a câmera",
    proporcao: "4 / 5",
    /** Rosto levemente à direita e na parte de cima do quadro. */
    posicao: "55% 18%",
  },
} as const;

/**
 * A equipe.
 *
 * O argumento não é "conheça nosso time" (rótulo vazio que todo site tem): é
 * a CONTINUIDADE. Num setor onde o concorrente é hospital 24h com plantonista
 * rodando, ser sempre atendido pelas mesmas pessoas é vantagem — e é a mesma
 * tese do resto do site.
 *
 * ⚠️ Nunca enquadrar isso como "equipe pequena" (JM, 09/09/2026): "pequena"
 * é a primeira palavra que o visitante lê e soa a limitação, não a acolhimento.
 * O enquadramento é o rosto conhecido, nunca o tamanho do time.
 *
 * ⚠️ FOTOS: as duas veterinárias têm retrato de estúdio; Camila e Lucas
 * mandaram selfie. Todas foram normalizadas no mesmo recorte 4:5 para o grid
 * não ficar quebrado, mas a diferença de origem continua visível. Vale pedir
 * à clínica duas fotos no mesmo padrão das outras duas.
 */
export const equipe = {
  headline: "Sempre os mesmos rostos cuidando do seu pet.",
  subhead:
    "Da recepção à cirurgia, é sempre a mesma equipe. Na segunda visita seu pet já reconhece quem cuidou dele.",
  membros: [
    {
      nome: "Dra. Caroline Keffer",
      papel: "Médica Veterinária",
      /* Só a Dra. Carol tem detalhe: é o único fato que o site já afirma.
         Para as outras três, PEDIR À CLÍNICA uma linha cada (VALIDAR). */
      detalhe: "Responsável técnica, há mais de 20 anos na Torre",
      foto: "/images/equipe-caroline-keffer.webp",
      alt: "Dra. Caroline Keffer, de jaleco branco, sorrindo",
    },
    {
      nome: "Dra. Isa Lopes",
      /* VALIDAR com a clínica: uma linha curta sobre o que a pessoa faz. */
      detalhe: "",
      papel: "Médica Veterinária",
      foto: "/images/equipe-isa-lopes.webp",
      alt: "Dra. Isa Lopes, de uniforme verde, com os braços cruzados",
    },
    {
      nome: "Camila Amaral",
      /* VALIDAR com a clínica: uma linha curta sobre o que a pessoa faz. */
      detalhe: "",
      papel: "Gerente",
      foto: "/images/equipe-camila-amaral.webp",
      alt: "Camila Amaral, de uniforme da clínica, sorrindo",
    },
    {
      nome: "Lucas Leal",
      /* VALIDAR com a clínica: uma linha curta sobre o que a pessoa faz. */
      detalhe: "",
      papel: "Pet Groomer",
      foto: "/images/equipe-lucas-leal.webp",
      alt: "Lucas Leal, pet groomer da clínica",
    },
  ],
} as const;

/**
 * Planos de saúde pet credenciados.
 *
 * Lista confirmada pela clínica em 11/09/2026 (arte "Aqui aceitamos seu plano"),
 * resolvendo o VALIDAR que estava aqui desde o início.
 *
 * Cada plano é um LINK de WhatsApp com a pergunta já escrita — o cartão não é
 * enfeite, é o CTA. Quem tem plano quer saber uma coisa só ("o meu cobre
 * aqui?"), e clicar no próprio plano já manda essa pergunta.
 *
 * LOGOS: os cinco vieram da clínica em 11/09/2026 (arquivos originais em
 * _fontes/planos/). Estão padronizados: fundo transparente, margem aparada,
 * mesmo respiro em volta. PetHealth e Pet Top chegaram com fundo branco chapado
 * e o branco foi removido, senão virava retângulo sobre o card azul.
 *
 * `cor` é a cor dominante EXTRAÍDA do próprio arquivo do logo, não escolhida à
 * mão. É o traço acima da marca: amarra o card à identidade do plano sem
 * competir com o desenho.
 */
export const planos = {
  headline: "Seu plano de saúde pet é aceito aqui.",
  subhead:
    "Cinco planos credenciados. Escolha o seu e já pergunte pela cobertura no WhatsApp: leva um minuto e evita surpresa no caixa.",
  escolha: "Qual é o plano do seu pet?",
  /* Ordem = a da arte "Aqui aceitamos seu plano" da própria clínica. */
  itens: [
    { nome: "PetHealth", detalhe: "", logo: "/images/planos/pethealth.webp", cor: "#f89800" },
    { nome: "CARE", detalhe: "", logo: "/images/planos/care.webp", cor: "#30b8c0" },
    { nome: "Petlove Saúde", detalhe: "", logo: "/images/planos/petlove.webp", cor: "#581898" },
    { nome: "Pet Top", detalhe: "", logo: "/images/planos/pettop.webp", cor: "#00c0d0" },
    { nome: "Plamev Pet", detalhe: "", logo: "/images/planos/plamev.webp", cor: "#18a0c0" },
  ],
  rodape:
    "Não achou o seu? Manda o nome no WhatsApp que a gente confirma na hora.",
} as const;

export const depoimentos = {
  headline: "O que os tutores escrevem no Google.",
  itens: [
    {
      texto: "Dra. Carol muito competente e atenciosa.",
      fonte: "Avaliação no Google",
    },
    {
      texto:
        "Tem excelentes profissionais e Dra. Carol é atenciosa e supercapacitada.",
      fonte: "Avaliação no Google",
    },
    {
      texto: "Excelente atendimento, com seriedade e respeito.",
      fonte: "Avaliação no Google",
    },
  ],
} as const;

/**
 * Galeria de atendimentos.
 *
 * 14/09/2026 (JM): as fotos antigas eram só cães isolados. Agora são 20
 * momentos reais da equipe com os pacientes, e a dobra mudou de papel: deixou
 * de ser "acervo de pets" e virou PROVA DE VÍNCULO. Quem olha não vê um cão
 * bonito, vê como o cão dele vai ser tratado.
 *
 * Fotos originais em _fontes/originais/pets-atendimento-2026-09/. As versões
 * do site tiveram as tarjas pretas de vídeo removidas, proporção limitada entre
 * 0,64 e 0,80, e passaram pelo mesmo tratamento de ruído, nitidez e tom das
 * fotos do consultório.
 *
 * Os ALTs não nomeiam colaboradores que não dá para identificar com certeza.
 * Só a Dra. Caroline é nomeada, e só onde ela é reconhecível pelo retrato.
 */
export const pets = {
  headline: "Cada consulta termina em colo.",
  subhead:
    "Alguns dos cães e gatos que a nossa equipe atendeu.",
  itens: [
    { src: "/images/galeria/atendimento-01.webp", alt: "Colaboradora sorrindo e abraçando um buldogue francês preto e branco", largura: 720, altura: 1125 },
    { src: "/images/galeria/atendimento-02.webp", alt: "Veterinária sentada no chão do consultório com dois cães dinamarqueses", largura: 720, altura: 960 },
    { src: "/images/galeria/atendimento-03.webp", alt: "Colaboradora sorrindo com um cocker spaniel de laço vermelho no colo", largura: 720, altura: 1125 },
    { src: "/images/galeria/atendimento-04.webp", alt: "Veterinário examinando um border collie deitado na mesa de atendimento", largura: 720, altura: 1124 },
    { src: "/images/galeria/atendimento-05.webp", alt: "Colaboradora segurando um filhote de yorkshire junto ao rosto", largura: 720, altura: 1124 },
    { src: "/images/galeria/atendimento-06.webp", alt: "Colaboradora abraçando um dachshund de peitoral verde", largura: 720, altura: 1124 },
    { src: "/images/galeria/atendimento-07.webp", alt: "Colaboradora sorrindo com dois gatos no colo", largura: 720, altura: 1124 },
    { src: "/images/galeria/atendimento-08.webp", alt: "Colaboradora agachada ao lado de um beagle", largura: 720, altura: 1125 },
    { src: "/images/galeria/atendimento-09.webp", alt: "Dra. Caroline Keffer agachada no chão cercada por quatro cães pequenos", largura: 720, altura: 960 },
    { src: "/images/galeria/atendimento-10.webp", alt: "Dra. Caroline Keffer sentada no chão com um buldogue inglês e um yorkshire", largura: 720, altura: 960 },
    { src: "/images/galeria/atendimento-11.webp", alt: "Duas colaboradoras sorrindo, cada uma com um gato persa no colo", largura: 720, altura: 1036 },
    { src: "/images/galeria/atendimento-12.webp", alt: "Colaboradora abraçando um gato maine coon cinza e branco", largura: 720, altura: 1125 },
    { src: "/images/galeria/atendimento-13.webp", alt: "Colaboradora no consultório com dois shih-tzus de gravata", largura: 720, altura: 1125 },
    { src: "/images/galeria/atendimento-14.webp", alt: "Colaboradora agachada com dois buldogues franceses", largura: 720, altura: 960 },
    { src: "/images/galeria/atendimento-15.webp", alt: "Colaboradora na mesa do consultório com um lulu da pomerânia", largura: 720, altura: 1125 },
    { src: "/images/galeria/atendimento-16.webp", alt: "Colaboradora sorrindo com um pug no colo", largura: 720, altura: 1125 },
    { src: "/images/galeria/atendimento-17.webp", alt: "Colaboradora abraçando um shih-tzu de laço rosa", largura: 720, altura: 1124 },
    { src: "/images/galeria/atendimento-18.webp", alt: "Colaboradora abraçando um yorkshire", largura: 720, altura: 1124 },
    { src: "/images/galeria/atendimento-19.webp", alt: "Colaboradora com dois gatos persas no colo", largura: 720, altura: 1124 },
    { src: "/images/galeria/atendimento-20.webp", alt: "Veterinário de máscara segurando um pug de roupinha laranja", largura: 720, altura: 1125 },
  ],
} as const;

/**
 * Calendário de vacinas — a ferramenta que nenhum concorrente de Recife tem.
 *
 * ⚠️ CONTEÚDO DE SAÚDE. O que está abaixo é o protocolo padrão praticado no
 * Brasil, mas protocolo é decisão clínica e varia com o caso, a região e o
 * histórico do animal. **A Dra. Carol precisa revisar e assinar esta lista
 * antes de o site ir ao ar.** A interface deixa explícito que é orientação
 * geral e que o calendário real sai na consulta.
 */
export const vacinas = {
  headline: "Está na hora de vacinar?",
  subhead:
    "Escolha a espécie e a fase de vida para ver o que costuma entrar no calendário.",
  aviso:
    "Orientação geral, não prescrição. O calendário do seu pet é definido na consulta, conforme idade, histórico e estilo de vida.",
  especies: [
    {
      id: "cao",
      rotulo: "Cão",
      fases: [
        {
          id: "filhote",
          rotulo: "Filhote",
          detalhe: "até 4 meses",
          itens: [
            {
              nome: "Múltipla (V8 ou V10)",
              quando: "3 doses, a partir das 6 semanas, com 21 a 30 dias entre elas",
            },
            { nome: "Antirrábica", quando: "dose única a partir dos 3 meses" },
            {
              nome: "Tosse dos canis",
              quando: "opcional, indicada para quem frequenta hotel, creche ou parque",
            },
          ],
        },
        {
          id: "adulto",
          rotulo: "Adulto",
          detalhe: "a partir de 1 ano",
          itens: [
            { nome: "Múltipla (V8 ou V10)", quando: "reforço anual" },
            { nome: "Antirrábica", quando: "reforço anual" },
            { nome: "Tosse dos canis", quando: "reforço anual, quando indicada" },
          ],
        },
        {
          id: "idoso",
          rotulo: "Idoso",
          detalhe: "a partir de 7 anos",
          itens: [
            { nome: "Múltipla e antirrábica", quando: "reforço anual, como no adulto" },
            {
              nome: "Check-up antes da vacina",
              quando: "exames para confirmar que está tudo bem para vacinar",
            },
          ],
        },
      ],
    },
    {
      id: "gato",
      rotulo: "Gato",
      fases: [
        {
          id: "filhote",
          rotulo: "Filhote",
          detalhe: "até 4 meses",
          itens: [
            {
              nome: "Múltipla felina (V3, V4 ou V5)",
              quando: "2 a 3 doses, a partir das 8 semanas, com 21 a 30 dias entre elas",
            },
            { nome: "Antirrábica", quando: "dose única a partir dos 3 meses" },
          ],
        },
        {
          id: "adulto",
          rotulo: "Adulto",
          detalhe: "a partir de 1 ano",
          itens: [
            { nome: "Múltipla felina", quando: "reforço anual" },
            { nome: "Antirrábica", quando: "reforço anual" },
          ],
        },
        {
          id: "idoso",
          rotulo: "Idoso",
          detalhe: "a partir de 7 anos",
          itens: [
            { nome: "Múltipla e antirrábica", quando: "reforço anual, como no adulto" },
            {
              nome: "Check-up antes da vacina",
              quando: "avaliação de rim e tireoide costuma entrar nessa idade",
            },
          ],
        },
      ],
    },
  ],
} as const;

/**
 * Dobra de dúvidas. Cada pergunta é uma objeção do brief, não enfeite.
 *
 * As respostas são deliberadamente honestas e sem número inventado: onde o dado
 * real não existe (preço, planos, estacionamento), a resposta encaminha para o
 * WhatsApp em vez de chutar. Marcadas com VALIDAR as que mudam quando a clínica
 * confirmar os dados.
 */
export const faq = {
  headline: "Antes de trazer seu pet.",
  subhead:
    "As perguntas que mais chegam no WhatsApp, respondidas aqui para você não precisar perguntar.",
  itens: [
    {
      pergunta: "Quanto custa a consulta?",
      // VALIDAR: se a clínica topar publicar tabela, o valor entra aqui.
      resposta:
        "O valor depende do que o seu pet precisa. Manda uma mensagem contando o caso que a gente passa o valor antes de você vir, sem compromisso.",
    },
    {
      pergunta: "Vocês atendem gato?",
      resposta:
        "Sim. Cão e gato, de filhote a idoso, na consulta, na cirurgia, nos exames e no banho e tosa.",
    },
    {
      pergunta: "Meu pet fica muito estressado no veterinário. Como funciona aqui?",
      resposta:
        "É uma clínica de bairro, não um hospital movimentado: o atendimento é com a mesma veterinária, no mesmo lugar de sempre. Na prática, ele vai reconhecendo a casa a cada visita, e é disso que os tutores mais falam nas avaliações.",
    },
    {
      pergunta: "Vocês atendem emergência 24 horas?",
      resposta:
        "Não. A clínica atende de segunda a sexta, das 9h às 19h, e no sábado das 8h às 16h. Fora desse horário, procure um plantão veterinário 24h.",
    },
    {
      pergunta: "Preciso agendar ou posso chegar direto?",
      // VALIDAR: confirmar se aceita atendimento sem hora marcada.
      resposta:
        "O melhor caminho é mandar mensagem antes. Assim a gente confirma o horário e você chega e já é atendido, sem espera com ele no colo.",
    },
    {
      pergunta: "Tem estacionamento?",
      resposta:
        "Tem, na frente da clínica, reservado para clientes. Dá para encostar e descer com ele sem procurar vaga na rua.",
    },
    {
      pergunta: "Quais planos de saúde pet vocês aceitam?",
      /* Lista confirmada pela clínica em 11/09/2026 — o VALIDAR saiu daqui.
         Nomear os cinco vale mais que "somos credenciados": o tutor procura o
         NOME do plano dele, e essa resposta também alimenta o schema FAQPage. */
      resposta:
        "PetHealth, CARE, Petlove Saúde, Pet Top e Plamev Pet. Se o seu não estiver na lista, manda o nome no WhatsApp que a gente confirma na hora.",
    },
  ],
} as const;

/**
 * Expediente em forma de dado, para calcular "aberto agora" de verdade.
 *
 * Índice = dia da semana (0 = domingo). `null` é dia fechado.
 * O fuso é fixo em Recife: quem acessa de outro estado precisa ver o horário
 * DA CLÍNICA, não o do próprio relógio.
 *
 * ⚠️ Mesmo VALIDAR do resto: as fontes públicas divergem no horário.
 */
export const expediente = {
  fuso: "America/Recife",
  semana: [
    null,
    { abre: "09:00", fecha: "19:00" },
    { abre: "09:00", fecha: "19:00" },
    { abre: "09:00", fecha: "19:00" },
    { abre: "09:00", fecha: "19:00" },
    { abre: "09:00", fecha: "19:00" },
    { abre: "08:00", fecha: "16:00" },
  ],
  nomes: [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ],
} as const;

/**
 * Comparativo honesto com o hospital 24h.
 *
 * A regra aqui é não montar espantalho: onde o hospital ganha, o site DIZ que
 * ele ganha. Prova social só funciona quando a comparação é crível, e o tutor
 * já sabe que uma clínica de bairro não tem plantão de madrugada.
 */
export const comparativo = {
  headline: "Clínica de bairro ou hospital 24h?",
  subhead:
    "Depende do que o seu pet precisa. Abaixo está o que cada um resolve melhor, com honestidade.",
  colunas: {
    aqui: "Aqui, na Caroline Keffer",
    hospital: "Hospital 24h",
  },
  linhas: [
    {
      criterio: "Quem atende",
      aqui: { texto: "Sempre a Dra. Carol, há mais de 20 anos", vence: true },
      hospital: { texto: "O plantonista que estiver na escala", vence: false },
    },
    {
      criterio: "Emergência de madrugada",
      aqui: { texto: "Não atendemos. Procure um plantão 24h", vence: false },
      hospital: { texto: "Aberto a qualquer hora", vence: true },
    },
    {
      criterio: "Histórico do seu pet",
      aqui: { texto: "Quem examina é quem acompanha desde filhote", vence: true },
      hospital: { texto: "Prontuário lido na hora, por quem não conhece", vence: false },
    },
    {
      criterio: "Estrutura de internação",
      aqui: { texto: "Internação para recuperação, sem UTI", vence: false },
      hospital: { texto: "UTI e equipe completa no local", vence: true },
    },
    {
      criterio: "Estresse do seu pet",
      aqui: { texto: "Mesma casa, mesmo cheiro, mesma pessoa", vence: true },
      hospital: { texto: "Ambiente movimentado e desconhecido", vence: false },
    },
  ],
  fecho:
    "Para emergência de madrugada, vá ao plantão. Para tudo o mais, quem já conhece seu pet resolve melhor.",
} as const;

/**
 * Cuidado preventivo por fase de vida.
 *
 * Substitui o "Guia do filhote" (11/09/2026, JM). O guia antigo tinha o ciclo de
 * VACINAÇÃO como espinha, e vacinação saiu do catálogo da clínica. Em vez de
 * apagar a dobra, ela foi reapontada: cada item agora corresponde a um serviço
 * que a clínica presta de fato (consulta, exames laboratoriais, exames de
 * imagem, cirurgia odontológica, as cinco especialidades).
 *
 * FONTES das periodicidades:
 *   - AAHA/AVMA Preventive Healthcare Guidelines: exame de saúde ANUAL no
 *     mínimo para adultos, e SEMESTRAL para idosos.
 *   - AAHA: entre 70% e 80% dos cães e gatos já apresentam sinal de doença
 *     periodontal aos 3 anos de idade.
 *   - Prática clínica brasileira corrente para o painel geriátrico: hemograma,
 *     bioquímico e urinálise duas vezes ao ano a partir dos 7 anos, e T4 em
 *     gatos a partir dos 8.
 *
 * REVISÃO DE 15/09/2026, item por item contra as fontes:
 *   - "parasita é o achado MAIS comum" virou "verminose é muito comum": o
 *     superlativo não tinha fonte.
 *   - hemograma anual para adulto ganhou "geralmente": é a recomendação
 *     corrente, não uma regra das diretrizes.
 *   - T4 do gato passou de "idoso" (7) para "a partir dos 8", que é o que a
 *     fonte diz.
 *   Todo o resto conferiu, e cada item continua amarrado a um serviço que a
 *   clínica presta (exames laboratoriais e de imagem, cirurgia odontológica,
 *   consulta).
 *
 * ⚠️ CONTEÚDO DE SAÚDE. É orientação geral e está marcado como tal na interface,
 * com a fonte citada. Mesmo assim precisa da revisão e do aval da Dra. Carol
 * antes de publicar: periodicidade é decisão clínica e muda com porte, raça e
 * histórico.
 */
export const preventivo = {
  headline: "Seu pet precisa de quê, e de quanto em quanto tempo?",
  subhead:
    "O calendário de cuidado que acompanha cada fase da vida do seu pet e ajuda a perceber cedo o que ele ainda não sabe mostrar.",
  aviso:
    "Orientação geral, com base nas diretrizes de cuidado preventivo da AAHA e da AVMA. O intervalo certo para o seu pet é definido na consulta, conforme idade, porte, raça e histórico.",
  etapas: [
    {
      id: "filhote",
      rotulo: "Filhote",
      detalhe: "até 1 ano",
      itens: [
        "Primeira consulta assim que ele chegar em casa, mesmo parecendo saudável.",
        "Exame de fezes logo no começo: verminose é muito comum nessa idade.",
        "Peso e crescimento acompanhados a cada retorno, com orientação de alimentação.",
        "É nessa fase que se avalia, caso a caso, o momento da castração.",
      ],
    },
    {
      id: "adulto",
      rotulo: "Adulto",
      detalhe: "1 a 6 anos",
      itens: [
        "Consulta de rotina uma vez por ano, no mínimo.",
        "Boca avaliada em toda consulta: entre 70% e 80% dos cães e gatos já têm sinal de doença dentária aos 3 anos.",
        "Hemograma e bioquímico, geralmente uma vez por ano, formam a linha de base que mostra mudança antes do sintoma.",
        "Escovação dos dentes em casa, começada cedo. Filhote aceita, adulto resiste.",
      ],
    },
    {
      id: "setemais",
      rotulo: "A partir de 7 anos",
      detalhe: "a cada 6 meses",
      itens: [
        "A consulta passa a ser semestral. Nessa fase a doença avança rápido entre uma visita e outra.",
        "Hemograma, bioquímico e urinálise duas vezes por ano: é o trio que pega rim e fígado cedo.",
        "Gato a partir dos 8 anos ganha também a dosagem de T4, porque alteração de tireoide é comum nessa fase.",
        "Ultrassom de abdome e eletrocardiograma entram quando o exame físico ou o sangue pedem.",
      ],
    },
    {
      id: "alerta",
      rotulo: "Sinais de alerta",
      detalhe: "não espere o check-up",
      itens: [
        "Beber água ou urinar muito mais que o normal.",
        "Perder peso comendo a mesma coisa de sempre.",
        "Cansar rápido no passeio, tossir à noite ou respirar com esforço.",
        "Mau hálito forte, baba ou dificuldade para mastigar.",
      ],
    },
  ],
} as const;

export const ondeFicamos = {
  headline: "Estamos na Araguatins, na Torre.",
  // VALIDAR: fontes públicas divergem no horário. Confirmar antes de publicar.
  horarios: [
    { dia: "Segunda a sexta", hora: "9h às 19h" },
    { dia: "Sábado", hora: "8h às 16h" },
    { dia: "Domingo", hora: "Fechado" },
  ],
  avisoEmergencia:
    "A clínica não é 24 horas. Fora do horário acima, procure um plantão veterinário.",
  foto: {
    /*
     * A fachada FRONTAL (JM, 09/09/2026). Vem para cá porque é 4:3 e a caixa
     * aqui é deitada: entra quase inteira, com o letreiro legível e a entrada
     * à vista. Em 1280px numa caixa de ~570px, a densidade é de sobra.
     * A do hero é a de céu aberto, que é retrato.
     */
    src: "/images/fachada_hero.webp",
    alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins",
    briefing: "Fachada da clínica, horizontal, luz do dia",
    proporcao: "16 / 10",
    posicao: "center 40%",
  },
} as const;

export const ctaFinal = {
  headline: "Traga ele para conhecer a gente.",
  subhead:
    "Mande uma mensagem contando o que está acontecendo. A gente responde e marca o melhor horário.",
  cta: CTA_PRIMARIO,
  /** Tira o último atrito antes do clique: dizer que não custa nada tentar. */
  microcopy: "Sem compromisso. Você conta o caso e a gente diz como ajudar.",
} as const;

export const rodape = {
  legal: `© ${new Date().getFullYear()} Clínica Pet Caroline Keffer. Todos os direitos reservados.`,
  credito: "Site por ",
  agencia: "MXC Digital",
  agenciaUrl: "https://www.instagram.com/mxcdigital/",
} as const;
