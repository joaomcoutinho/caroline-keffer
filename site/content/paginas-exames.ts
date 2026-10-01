/**
 * UM EXAME POR PÁGINA (01/10/2026). Filhas de /exames-de-imagem, que segue
 * como a página-mãe (o que cada exame mostra, lado a lado).
 *
 * ⚠️ Confirmado pela clínica (29/09/2026): os aparelhos NÃO ficam na clínica;
 * vêm com médicos volantes, em dia agendado. Por isso o texto diz "feito aqui
 * na clínica, com hora marcada" e nunca "nosso aparelho". Nenhuma foto é do
 * aparelho: a clínica vai fotografar nos próximos exames.
 * VALIDAR: horas de jejum, sedação, prazo do laudo e quem fica na sala.
 */

import type { Pagina } from "@/content/paginas";

const PENDENTE = { por: null, data: "2026-10-01" } as const;
const paiExames = [{ rotulo: "Exames de imagem", caminho: "/exames-de-imagem" }] as const;

export const ultrassom: Pagina = {
  caminho: "/exames-de-imagem/ultrassom-veterinario",
  rotulo: "Ultrassom",
  pais: paiExames,
  seo: {
    titulo: "Ultrassom veterinário para cães e gatos | Torre, Recife",
    descricao:
      "Ultrassonografia de abdome para cães e gatos na Torre, Recife: fígado, rins, bexiga, intestino, útero e gestação. Veja o preparo e agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Exames de imagem · Ultrassom",
    h1: "Ultrassom veterinário na Torre, em Recife.",
    lead:
      "A ultrassonografia mostra por dentro os órgãos do abdome (fígado, rins, bexiga, baço, intestino e útero), sem dor e sem radiação, e é feita aqui na clínica, com hora marcada. O preparo é simples: algumas horas de jejum e a bexiga cheia.",
    foto: {
      src: "/images/consultorio_lema.webp",
      alt: "Consultório da clínica com a mesa de atendimento e a frase da parede",
      posicao: "50% 50%",
      posicaoCelular: "55% 50%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de ultrassom do site e queria agendar o exame.",
  },
  servico: { nome: "Ultrassonografia veterinária", tipo: "Diagnóstico por imagem veterinário" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "O que o ultrassom mostra.",
      colunas: 3,
      itens: [
        { titulo: "Cálculo", texto: "Pedra na bexiga ou no rim, causa comum de xixi com sangue.", icone: "drop" },
        { titulo: "Nódulos e massas", texto: "No fígado, no baço e nos outros órgãos do abdome.", icone: "scan" },
        { titulo: "Intestino e estômago", texto: "Inflamação, parede espessada e o que não está passando.", icone: "bowl" },
        { titulo: "Rins", texto: "Tamanho, forma e estrutura, no acompanhamento da doença renal.", icone: "flask" },
        { titulo: "Útero", texto: "Piometra, a infecção do útero da fêmea não castrada.", icone: "warning" },
        { titulo: "Gestação", texto: "Confirma a gestação e acompanha os filhotes.", icone: "paw" },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como se preparar.",
      itens: [
        {
          titulo: "Jejum de algumas horas",
          texto: "Estômago vazio deixa a imagem mais limpa. A equipe confirma o tempo ao agendar.",
        },
        {
          titulo: "Bexiga cheia",
          texto: "Evite que ele faça xixi logo antes do exame: bexiga cheia aparece melhor.",
        },
        {
          titulo: "Um pouco de pelo",
          texto: "Pode ser preciso tosar uma faixa da barriga, para o aparelho encostar na pele.",
        },
        {
          titulo: "Durante o exame",
          texto: "Deitado de barriga para cima, com gel, por alguns minutos. Não dói.",
        },
      ],
    },
    {
      tipo: "texto",
      titulo: "Ultrassom ou raio-x?",
      paragrafos: [
        "Os dois se completam. O ultrassom enxerga os órgãos moles por dentro: a parede do intestino, a estrutura do rim, um nódulo no baço. O raio-x enxerga osso, o tórax e o contorno dos órgãos.",
        "Por isso, na tosse o primeiro é o raio-x, e no vômito que não passa, muitas vezes o ultrassom. A veterinária pede o que responde à pergunta do seu caso.",
      ],
      lista: ["Abdome: ultrassom", "Osso e fratura: raio-x", "Tórax e tosse: raio-x", "Gestação: os dois"],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre ultrassom.",
    itens: [
      {
        pergunta: "Precisa de jejum para ultrassom em cachorro?",
        resposta:
          "Para ultrassom de abdome, sim: algumas horas de jejum melhoram a imagem. A equipe confirma o tempo certo ao agendar.",
      },
      {
        pergunta: "O pet precisa ser sedado?",
        resposta: "Em geral, não. O exame não dói, e a maioria fica deitada com calma, com alguém por perto.",
      },
      {
        pergunta: "Com quantos dias o ultrassom mostra a gestação?",
        resposta:
          "Em cadelas e gatas, a gestação costuma aparecer no ultrassom a partir de cerca de 25 dias depois do cruzamento.",
      },
      {
        pergunta: "O exame é feito na clínica mesmo?",
        resposta: "Sim, aqui na clínica, com hora marcada. Seu pet não precisa ir a outro endereço.",
      },
      {
        pergunta: "O plano de saúde pet cobre ultrassom?",
        resposta: "Depende do plano e da modalidade. Mande o nome do plano no WhatsApp que a gente confirma.",
      },
    ],
  },
  relacionados: ["exames-de-imagem", "raio-x", "nutricao-e-gastroenterologia"],
  revisao: PENDENTE,
};

export const raioX: Pagina = {
  caminho: "/exames-de-imagem/raio-x-veterinario",
  rotulo: "Raio-x",
  pais: paiExames,
  seo: {
    titulo: "Raio-x veterinário para cães e gatos | Torre, Recife",
    descricao:
      "Radiografia para cães e gatos na Torre, Recife: fratura, tosse, coração, objeto engolido e articulações. Normalmente sem preparo. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Exames de imagem · Raio-x",
    h1: "Raio-x veterinário na Torre, em Recife.",
    lead:
      "O raio-x mostra ossos, articulações, o tórax e objetos engolidos, e é o exame da fratura, da tosse que não passa e do tamanho do coração. É feito aqui na clínica, com hora marcada, e normalmente não pede preparo.",
    foto: {
      src: "/images/clinica/sala-procedimentos.webp",
      alt: "Sala de procedimentos da clínica, com a mesa de inox e os armários",
      posicao: "50% 55%",
      posicaoCelular: "50% 60%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de raio-x do site e queria agendar o exame.",
  },
  servico: { nome: "Radiografia veterinária", tipo: "Diagnóstico por imagem veterinário" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Quando o raio-x é pedido.",
      colunas: 3,
      itens: [
        { titulo: "Fratura e trauma", texto: "Depois de queda, atropelamento ou pancada.", icone: "firstAid" },
        { titulo: "Mancar e dor", texto: "Displasia, artrose e luxação, nas articulações.", icone: "bone", href: "/ortopedia-veterinaria", rotuloLink: "Ver ortopedia" },
        { titulo: "Tosse e respiração", texto: "Pulmão, traqueia e o que mais está no tórax.", icone: "wind", href: "/especialidades/pneumologia", rotuloLink: "Ver pneumologia" },
        { titulo: "Tamanho do coração", texto: "No acompanhamento do sopro e da doença cardíaca.", icone: "heartbeat" },
        { titulo: "Objeto engolido", texto: "Osso, brinquedo, pedra ou meia: muitos aparecem no raio-x.", icone: "warning" },
        { titulo: "Fim da gestação", texto: "Para contar os filhotes antes do parto.", icone: "paw" },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como é o exame.",
      itens: [
        { titulo: "Normalmente sem preparo", texto: "Sem jejum na maioria dos casos. A equipe avisa se o seu precisar." },
        {
          titulo: "Posicionamento",
          texto: "Ele é deitado em duas posições ou mais, para ver a mesma área de ângulos diferentes.",
        },
        {
          titulo: "Sedação, só se precisar",
          texto: "Em pet com dor ou agitado demais para ficar parado, pode ser indicada sedação leve.",
        },
        { titulo: "O resultado explicado", texto: "Quem acompanha o seu pet explica o que a imagem mostrou." },
      ],
    },
    {
      tipo: "texto",
      titulo: "Raio-x mostra tudo?",
      paragrafos: [
        "Não, e é bom saber disso antes. O raio-x é ótimo para osso, tórax e objetos densos, mas vê pouco dos detalhes dos órgãos moles do abdome. Pano, plástico e alguns brinquedos também não aparecem bem.",
        "Quando ele não responde tudo, o próximo passo costuma ser o ultrassom, feito aqui também.",
      ],
      lista: ["Osso e articulação", "Tórax e coração", "Objeto denso engolido"],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre raio-x.",
    itens: [
      {
        pergunta: "Precisa de jejum para raio-x em cachorro?",
        resposta: "Na maioria das vezes, não. Em alguns exames de abdome pode ser pedido; a equipe avisa ao agendar.",
      },
      {
        pergunta: "O pet precisa ser sedado para o raio-x?",
        resposta:
          "Na maioria das vezes, não. A sedação leve só é indicada quando ele está com dor ou agitado demais para ficar na posição certa.",
      },
      {
        pergunta: "O raio-x mostra objeto engolido?",
        resposta:
          "Osso, metal e pedra aparecem bem. Pano, plástico e borracha podem não aparecer, e aí o ultrassom ajuda.",
      },
      {
        pergunta: "O exame é feito na clínica mesmo?",
        resposta: "Sim, aqui na clínica, com hora marcada. Seu pet não precisa ir a outro endereço.",
      },
      {
        pergunta: "O plano de saúde pet cobre raio-x?",
        resposta: "Depende do plano e da modalidade. Mande o nome do plano no WhatsApp que a gente confirma.",
      },
    ],
  },
  relacionados: ["exames-de-imagem", "ortopedia", "ultrassom"],
  revisao: PENDENTE,
};

export const eletrocardiograma: Pagina = {
  caminho: "/exames-de-imagem/eletrocardiograma-veterinario",
  rotulo: "Eletrocardiograma",
  pais: paiExames,
  seo: {
    titulo: "Eletrocardiograma para cães e gatos | Torre, Recife",
    descricao:
      "Eletrocardiograma veterinário na Torre, Recife: arritmia, sopro, desmaio e avaliação antes da cirurgia. Sem jejum e sem dor. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Exames de imagem · Eletrocardiograma",
    h1: "Eletrocardiograma veterinário na Torre, em Recife.",
    lead:
      "O eletrocardiograma registra o ritmo e a atividade elétrica do coração em poucos minutos, sem dor e sem preparo. É pedido em arritmia, sopro, desmaio e antes de cirurgia, e é feito aqui na clínica, com hora marcada.",
    foto: {
      src: "/images/cachorro4.webp",
      alt: "Cachorro maltês branco em pé sobre a mesa de exame",
      posicao: "50% 45%",
      posicaoCelular: "50% 50%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de eletrocardiograma do site e queria agendar o exame.",
  },
  servico: { nome: "Eletrocardiograma veterinário", tipo: "Cardiologia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Quando o eletro é pedido.",
      colunas: 3,
      itens: [
        { titulo: "Arritmia", texto: "Coração acelerado, lento demais ou falhando.", icone: "waveform" },
        { titulo: "Desmaio", texto: "Ou fraqueza súbita, mesmo que passe rápido.", icone: "warning" },
        { titulo: "Sopro", texto: "Ouvido na consulta, para entender o que ele está fazendo.", icone: "heartbeat", href: "/especialidades/cardiologia", rotuloLink: "Ver cardiologia" },
        { titulo: "Antes da cirurgia", texto: "Principalmente no pet idoso, antes da anestesia.", icone: "firstAid" },
        { titulo: "Cardiopata", texto: "No acompanhamento de quem já trata o coração.", icone: "stethoscope" },
        { titulo: "Cansaço", texto: "Cansa fácil no passeio ou tosse à noite.", icone: "wind" },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como é o exame.",
      itens: [
        { titulo: "Sem preparo", texto: "Sem jejum e sem tosa." },
        { titulo: "Deitado de lado", texto: "Calmo, com alguém por perto." },
        { titulo: "Eletrodos na pele", texto: "Pequenos prendedores nas patas, sem agulha e sem dor." },
        { titulo: "Alguns minutos", texto: "O registro é rápido, e o resultado é explicado por quem acompanha o caso." },
      ],
    },
    {
      tipo: "texto",
      titulo: "Eletrocardiograma ou ecocardiograma?",
      // VALIDAR: se a clínica faz ecocardiograma (pendência da cardiologia).
      paragrafos: [
        "São exames diferentes. O eletrocardiograma mostra o RITMO do coração, a parte elétrica: se ele bate na cadência certa. O ecocardiograma é um ultrassom do coração e mostra a ESTRUTURA: válvulas, paredes e o tamanho das câmaras.",
        "No sopro, os dois costumam andar juntos. A veterinária explica qual responde à pergunta do seu caso.",
      ],
      lista: ["Ritmo: eletrocardiograma", "Estrutura: ecocardiograma"],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre eletrocardiograma.",
    itens: [
      {
        pergunta: "O eletrocardiograma dói?",
        resposta: "Não. São pequenos prendedores na pele das patas, sem agulha. Ele só precisa ficar deitado e calmo.",
      },
      {
        pergunta: "Precisa de jejum?",
        resposta: "Não. O eletrocardiograma não tem preparo.",
      },
      {
        pergunta: "Quanto tempo demora?",
        resposta: "O registro leva poucos minutos. O tempo na clínica depende de o pet ficar calmo.",
      },
      {
        pergunta: "Meu pet vai operar. Precisa de eletro?",
        resposta:
          "No pet idoso, com sopro ou de raça com tendência a doença do coração, costuma ser pedido antes da anestesia. A veterinária indica na avaliação pré-operatória.",
      },
      {
        pergunta: "O plano de saúde pet cobre eletrocardiograma?",
        resposta: "Depende do plano e da modalidade. Mande o nome do plano no WhatsApp que a gente confirma.",
      },
    ],
  },
  relacionados: ["cardiologia", "exames-de-imagem", "cirurgia"],
  revisao: PENDENTE,
};
