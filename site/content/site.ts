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
    "Clínica veterinária na Torre, Recife, há mais de 20 anos. Consulta, cirurgia, exames, vacinas e banho e tosa para cães e gatos, com a Dra. Carol. Agende pelo WhatsApp.",
  url: "https://clinicapetcarolinekeffer.com.br",
} as const;

export const navegacao = [
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "A clínica", href: "#a-clinica" },
  { rotulo: "Vacinas", href: "#vacinas" },
  { rotulo: "Dúvidas", href: "#duvidas" },
  { rotulo: "Onde ficamos", href: "#onde-ficamos" },
] as const;

export const hero = {
  headline: "A mesma veterinária, há mais de 20 anos.",
  subhead:
    "Consulta, cirurgia e exames na Torre, com a Dra. Carol atendendo seu cão ou gato pessoalmente.",
  cta: CTA_PRIMARIO,
  ctaMicrocopy: "Resposta no mesmo dia, em horário de funcionamento.",
  foto: {
    /*
     * Voltou para esta foto de propósito. Na `nova_foto_hero.png` a cabeça da
     * Dra. fica a ~7% do topo do quadro: com o painel em altura cheia ela cai
     * atrás da pílula do header, e não há imagem acima dela para revelar. A
     * única saída seria encurtar o painel, o que abria um vão no topo.
     */
    src: "/images/foto_background_hero.webp",
    alt: "Dra. Caroline Keffer sorrindo, segurando um cão shih-tzu no consultório",
    briefing: "Dra. Carol atendendo, retrato vertical, luz natural",
    proporcao: "4 / 5",
    /** A Dra. está à direita do quadro; o recorte precisa segui-la no mobile. */
    posicao: "62% center",
  },
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
      rotulo: "de nota no Google",
      nota: "média de 130 avaliações",
      icone: "estrela",
      /** Só a nota é proporção, então só ela ganha as cinco estrelas embaixo. */
      estrelas: 4.8,
    },
    {
      alvo: 20,
      casas: 0,
      sufixo: "+",
      rotulo: "anos de história e excelência",
      nota: "sempre na Rua Araguatins, na Torre",
      icone: "relogio",
    },
    {
      alvo: 9,
      casas: 0,
      sufixo: "",
      rotulo: "serviços no mesmo lugar",
      nota: "da consulta ao atendimento em casa",
      icone: "estetoscopio",
    },
  ],
} as const;

export const servicos = {
  headline: "Consulta, cirurgia e exames no mesmo lugar.",
  subhead:
    "Você não precisa levar seu pet a três endereços diferentes para resolver uma coisa só.",
  itens: [
    {
      nome: "Consulta clínica",
      texto:
        "O atendimento do dia a dia: o que está errado, o que fazer e quanto tempo leva.",
      icone: "stethoscope",
      src: "/images/consultorio_expandido_16x11_2400px.webp",
      alt: "Consultório da clínica, com mesa de inox, pia e armário",
      briefing: "Dra. Carol examinando um cão na mesa de atendimento",
      // Já entregue em 16:11: o enquadramento é o da própria foto.
      posicao: "center center",
    },
    {
      nome: "Cirurgia",
      texto:
        "Castração e cirurgia geral, com pré-operatório e acompanhamento na recuperação.",
      icone: "firstAid",
      src: "/images/mini_canil_alargado.webp",
      alt: "Área de internação da clínica, com baias de vidro para recuperação",
      briefing: "Sala de cirurgia da clínica, equipamento em foco",
      posicao: "center center",
    },
    {
      nome: "Exames laboratoriais",
      texto: "Coleta feita aqui, sem mandar você para outro endereço.",
      icone: "flask",
      src: "/images/area_medica_alargado.webp",
      alt: "Área técnica da clínica, com bancada de granito e material de coleta",
      briefing: "Coleta de sangue ou microscópio, detalhe de mãos",
      posicao: "center center",
    },
    {
      // VALIDAR: quais modalidades (raio-x, ultrassom). A fachada só diz "de imagem".
      nome: "Exames de imagem",
      texto:
        "Para ver o que o exame de sangue não mostra, sem precisar de outro endereço.",
      icone: "scan",
      src: "/images/veterinary_ultrasound_room.webp",
      alt: "Aparelho de ultrassom veterinário ao lado da mesa de atendimento",
      briefing: "Exame de imagem em andamento, animal contido com cuidado",
      posicao: "center center",
    },
    {
      nome: "Atendimento em casa",
      texto:
        "A consulta vai até você. Resolve para animal idoso, gato que entra em pânico na caixa e pós-operatório em recuperação.",
      icone: "casa",
      src: "/images/atendimento_domicilio.webp",
      alt: "Cão sendo auscultado no sofá da casa do tutor, com a maleta veterinária ao lado",
      briefing: "Veterinária atendendo um animal na sala de casa do tutor",
      posicao: "center center",
    },
    {
      nome: "Obstetrícia e pediatria",
      texto: "Acompanhamento da gestação ao parto, e as primeiras consultas do filhote.",
      icone: "bebe",
      /*
       * Recorte 16:11 do terço direito de `vet_puppy_final.png`, que continua
       * na pasta como origem. No enquadramento cheio o filhote ocupava ~8% do
       * quadro e o card lia como "consultório vazio"; aqui ele ocupa ~26%.
       */
      src: "/images/vet_puppy_recorte.webp",
      alt: "Filhote sentado na mesa de atendimento, ao lado de estetoscópio e balança",
      briefing: "Filhotes recém-nascidos sendo avaliados na clínica",
      posicao: "center center",
    },
    {
      nome: "Vacinas",
      texto: "Calendário completo para filhote e adulto, cão e gato.",
      icone: "syringe",
      src: "/images/filhote_vacinacao_documental.webp",
      alt: "Filhote sendo vacinado sobre a mesa de inox, seguro por mãos enluvadas",
      briefing: "Filhote recebendo vacina, close no colo do tutor",
      posicao: "center 55%",
    },
    {
      nome: "Especialidades",
      texto: "Encaminhamento clínico quando o caso pede um olhar específico.",
      icone: "heartbeat",
      src: "/images/gato_consultorio_documental.webp",
      alt: "Gato adulto sentado tranquilo sobre a mesa de atendimento",
      briefing: "Atendimento de gato, ambiente calmo",
      posicao: "center 45%",
    },
    {
      nome: "Banho e tosa",
      texto: "Feito na mesma casa que conhece a saúde e a pele do seu animal.",
      icone: "scissors",
      src: "/images/caes_escovacao_documental.webp",
      alt: "Cão de pelo longo sendo escovado sobre a bancada do banho e tosa",
      briefing: "Cão no banho e tosa, secagem ou escovação",
      posicao: "center 50%",
    },
  ],
} as const;

export const semEstresse = {
  headline: "Consulta sem estresse, porque ele já conhece a casa.",
  corpo: [
    "Clínica de bairro tem uma vantagem que hospital grande não consegue ter: seu animal volta sempre para o mesmo lugar, com o mesmo cheiro e a mesma pessoa.",
    "É por isso que a frase mais repetida nas avaliações não é sobre equipamento. É sobre o pet não ter se estressado.",
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
    src: "/images/sala_espera_alargado.webp",
    alt: "Sala de espera da clínica, com cadeiras, bebedouro e planta",
    briefing: "Sala de espera real, tutor com o animal no colo, horizontal",
    /* Em largura total, 3/2 daria 800px de altura e dominaria a dobra. */
    proporcao: "16 / 9",
    posicao: "center center",
  },
} as const;

export const draCarol = {
  headline: "Quem atende é a Dra. Carol.",
  corpo: [
    "Em mais de 20 anos na Torre, ela viu filhote virar idoso e tutor virar cliente de casa. Não é rodízio de plantonista: é a mesma veterinária acompanhando a história do seu animal.",
    "É pouco comum, e é exatamente o que faz diferença quando o diagnóstico depende de saber como o bicho era antes de adoecer.",
  ],
  // VALIDAR: número do CRMV antes de publicar.
  credencial: "CRMV-PE (validar)",
  foto: {
    src: "/images/dra_caroline_alargado.webp",
    alt: "Dra. Caroline Keffer segurando um gato na área de pet shop da clínica",
    briefing: "Retrato da Dra. Carol, vertical, olhando para a câmera",
    // A foto foi alargada para 3/2; forçá-la num retrato 4/5 recortaria a cena.
    proporcao: "3 / 2",
    posicao: "center center",
  },
} as const;

export const planos = {
  headline: "Seu plano de saúde pet é aceito aqui.",
  subhead:
    "A clínica é credenciada. Antes de vir, confirme o seu no WhatsApp — leva um minuto e evita surpresa no caixa.",
  // VALIDAR: lista real de planos credenciados. Placeholder até confirmar.
  nota: "Lista de planos credenciados a confirmar com a clínica.",
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
 * Galeria dos pets atendidos.
 *
 * O conteúdo JÁ EXISTE: é o destaque "Nossos Pets" do Instagram da clínica.
 * Só precisa ser exportado em alta. Cada slot vira uma foto ao receber `src`.
 */
/**
 * Galeria dos pets atendidos.
 *
 * ⚠️ Esta é a dobra onde foto REAL importa mais: ela afirma que aqueles animais
 * são pacientes da clínica. As quatro primeiras são reais, do acervo da Caroline.
 * Os dois slots restantes seguem como espaço reservado — preencher com foto real,
 * nunca com imagem gerada, sob pena de o site afirmar um paciente que não existe.
 */
export const pets = {
  headline: "Quem já passou por aqui.",
  subhead:
    "Uma parte dos cães e gatos que a Dra. Carol acompanha. Muitos chegaram filhotes e hoje já são idosos.",
  itens: [
    {
      src: "/images/cachorro4.webp",
      alt: "Cão maltês branco sobre a mesa de atendimento da clínica",
      briefing: "Cão de porte pequeno na mesa de atendimento",
      proporcao: "3 / 4",
      posicao: "center 40%",
    },
    {
      src: "/images/cachorro2.webp",
      alt: "Filhote de lulu da pomerânia com gravata, na recepção da clínica",
      briefing: "Filhote na recepção",
      proporcao: "1 / 1",
      posicao: "center center",
    },
    {
      src: "/images/cachorro3.webp",
      alt: "Shih-tzu tosado, com bandana listrada, no banho e tosa",
      briefing: "Cão tosado com bandana",
      proporcao: "4 / 5",
      posicao: "center 35%",
    },
    {
      src: "/images/cao.webp",
      alt: "Cão maltês branco com gravata azul, recém-tosado",
      briefing: "Cão recém-tosado com gravata",
      proporcao: "1 / 1",
      posicao: "center 30%",
    },
    { src: "", alt: "", briefing: "Gato atendido na clínica", proporcao: "3 / 4", posicao: "" },
    {
      src: "",
      alt: "",
      briefing: "Tutor e pet juntos na recepção",
      proporcao: "4 / 5",
      posicao: "",
    },
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
    "Orientação geral, não prescrição. O calendário do seu animal é definido na consulta, conforme idade, histórico e estilo de vida.",
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
        "O valor depende do que o seu animal precisa. Mande uma mensagem contando o caso que a gente passa o valor antes de você vir, sem compromisso.",
    },
    {
      pergunta: "Vocês atendem gato?",
      resposta:
        "Sim. Cão e gato, de filhote a idoso, na consulta, na cirurgia e no banho e tosa.",
    },
    {
      pergunta: "Meu pet fica muito estressado no veterinário. Como funciona aqui?",
      resposta:
        "É uma clínica de bairro, não um hospital movimentado: o atendimento é com a mesma veterinária, no mesmo lugar de sempre. Na prática, o animal vai reconhecendo a casa a cada visita, e é disso que os tutores mais falam nas avaliações.",
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
        "O melhor caminho é mandar mensagem antes. Assim a gente confirma o horário e você não pega espera com o animal no colo.",
    },
    {
      pergunta: "Tem estacionamento?",
      resposta:
        "Tem, na frente da clínica, reservado para clientes. Dá para encostar e descer com o animal sem procurar vaga na rua.",
    },
    {
      pergunta: "Quais planos de saúde pet vocês aceitam?",
      // VALIDAR: lista real de credenciados.
      resposta:
        "A clínica é credenciada a planos de saúde pet. Confirme o seu pelo WhatsApp antes de vir, leva um minuto e evita surpresa no caixa.",
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
    "Depende do que o seu animal precisa. Abaixo está o que cada um resolve melhor, sem enrolação.",
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
      criterio: "Histórico do seu animal",
      aqui: { texto: "Quem examina é quem acompanha desde filhote", vence: true },
      hospital: { texto: "Prontuário lido na hora, por quem não conhece", vence: false },
    },
    {
      criterio: "Estrutura de internação",
      aqui: { texto: "Internação para recuperação, sem UTI", vence: false },
      hospital: { texto: "UTI e equipe completa no local", vence: true },
    },
    {
      criterio: "Estresse do animal",
      aqui: { texto: "Mesma casa, mesmo cheiro, mesma pessoa", vence: true },
      hospital: { texto: "Ambiente movimentado e desconhecido", vence: false },
    },
  ],
  fecho:
    "Para emergência de madrugada, vá ao plantão. Para tudo o mais, quem já conhece seu animal resolve melhor.",
} as const;

/**
 * Guia do filhote.
 *
 * ⚠️ CONTEÚDO DE SAÚDE, mesmo status do calendário de vacinas: é orientação
 * geral e precisa da revisão da Dra. Carol antes de publicar.
 */
export const guiaFilhote = {
  headline: "Adotou um filhote? Comece por aqui.",
  subhead:
    "O que fazer em cada fase dos primeiros meses, na ordem em que importa.",
  aviso:
    "Orientação geral. O que o seu filhote precisa é definido na primeira consulta.",
  etapas: [
    {
      id: "chegada",
      rotulo: "Chegou em casa",
      detalhe: "primeiras 48h",
      itens: [
        "Deixe o filhote explorar sozinho antes de pegar no colo. O cheiro do lugar novo cansa.",
        "Mantenha a mesma ração que ele já comia. Troca brusca causa diarreia.",
        "Água limpa sempre disponível, num pote baixo que ele alcance.",
        "Anote de onde ele veio e se já tomou alguma vacina ou vermífugo.",
      ],
    },
    {
      id: "primeira-semana",
      rotulo: "Primeira semana",
      detalhe: "consulta inicial",
      itens: [
        "Marque a primeira consulta mesmo que ele pareça saudável.",
        "Leve a carteirinha, se houver, e uma amostra de fezes fresca.",
        "Na consulta sai o calendário de vacinas e vermifugação dele.",
        "Ainda não passeie na rua: sem a vacinação completa, o risco é alto.",
      ],
    },
    {
      id: "dois-quatro",
      rotulo: "2 a 4 meses",
      detalhe: "vacinação",
      itens: [
        "Ciclo da múltipla: três doses, com 21 a 30 dias entre elas.",
        "Antirrábica a partir dos 3 meses.",
        "Passeio liberado só depois da última dose, conforme orientação.",
        "É a melhor fase para socializar com pessoas e outros animais.",
      ],
    },
    {
      id: "seis",
      rotulo: "A partir de 6 meses",
      detalhe: "castração",
      itens: [
        "Idade em que a castração costuma ser avaliada, caso a caso.",
        "Antes da cirurgia, exames pré-operatórios.",
        "Reforço anual de vacina entra no calendário a partir daqui.",
        "Comece a escovar os dentes agora: filhote aceita, adulto resiste.",
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
    src: "/images/fachada_keffer.webp",
    alt: "Fachada da Clínica Veterinária Caroline Keffer, na Rua Araguatins",
    briefing: "Fachada da clínica, horizontal, luz do dia",
    proporcao: "16 / 10",
    posicao: "center 42%",
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
  credito: "Site por MXC Digital",
} as const;
