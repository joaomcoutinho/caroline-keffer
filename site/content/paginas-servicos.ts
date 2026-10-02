/**
 * PÁGINAS DE SERVIÇO (01/10/2026, 2ª leva de SEO local).
 *
 * Mesmas regras de content/paginas.ts: uma intenção de busca por página, a
 * resposta na primeira frase do lead, e só afirmação que a clínica confirmou.
 * O que ainda depende dela está marcado com `VALIDAR` e entra na lista de
 * docs/solicitar-clinica.md.
 *
 * Fatos usados aqui (confirmados): castração (29/09), urgência até as 18h com
 * estabilização e encaminhamento a hospital 24h (29/09), internação só de dia
 * (29/09), cirurgia odontológica e ortopédica (catálogo de 11/09), exames de
 * imagem feitos na clínica com hora marcada (29/09), coleta de exames na
 * clínica, e as vacinas da lista enviada em 01/10/2026.
 */

import type { Pagina } from "@/content/paginas";

const PENDENTE = { por: null, data: "2026-10-01" } as const;

/* ------------------------------------------------------------------ */

export const vacinacao: Pagina = {
  caminho: "/vacinacao-de-caes-e-gatos",
  rotulo: "Vacinação",
  seo: {
    titulo: "Vacinação de cães e gatos na Torre, Recife | Caroline Keffer",
    descricao:
      "Vacina polivalente e antirrábica para cães e gatos, gripe canina, giárdia e ProHeart na Torre, Recife, com o calendário montado na consulta. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Vacinação",
    h1: "Vacinação de cães e gatos na Torre, em Recife.",
    lead:
      "A clínica aplica a vacina polivalente e a antirrábica em cães e gatos e, para cães, a vacina da gripe (tosse dos canis), a de giárdia e o ProHeart, contra o verme do coração. O calendário do seu pet é montado na consulta, conforme a idade, o histórico e a rotina dele.",
    foto: {
      src: "/images/galeria/atendimento-05.webp",
      alt: "Colaboradora da clínica segurando um filhote de yorkshire junto ao rosto",
      posicao: "50% 35%",
      posicaoCelular: "50% 45%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de vacinação do site e queria vacinar o meu pet.",
  },
  servico: { nome: "Vacinação de cães e gatos", tipo: "Vacinação veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "As vacinas aplicadas aqui.",
      intro: "Lista confirmada pela clínica. Quais o seu pet precisa, e quando, sai da consulta.",
      colunas: 3,
      itens: [
        {
          titulo: "Polivalente",
          texto:
            "Cães e gatos. Protege contra várias doenças graves numa aplicação só; é a base do calendário do filhote e do reforço do adulto.",
          icone: "syringe",
        },
        {
          titulo: "Antirrábica",
          texto: "Cães e gatos. Protege contra a raiva, doença fatal que também passa para pessoas.",
          icone: "shield",
        },
        {
          titulo: "Gripe canina",
          texto:
            "Cães. Contra a tosse dos canis, indicada para quem convive com outros cães em creche, hotel, banho e tosa ou parque.",
          icone: "wind",
        },
        {
          titulo: "Giárdia",
          texto: "Cães. Ajuda a prevenir a giardíase, causa comum de diarreia que vai e volta.",
          icone: "drop",
        },
        {
          titulo: "ProHeart",
          texto:
            "Cães. Não é vacina: é uma injeção que previne a dirofilariose, o verme do coração, transmitido pela picada do mosquito.",
          icone: "heartbeat",
        },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como é a vacinação.",
      itens: [
        {
          titulo: "Consulta antes da vacina",
          texto: "Exame físico para confirmar que ele está bem para vacinar. Pet doente ou com febre espera melhorar.",
        },
        {
          titulo: "Calendário do seu pet",
          texto: "Quais vacinas, quantas doses e o intervalo entre elas, conforme a idade e a rotina dele.",
        },
        {
          titulo: "Aplicação e registro",
          texto: "Cada dose anotada na carteira de vacinação, com a data do próximo reforço.",
        },
        {
          titulo: "Lembrete do reforço",
          texto: "A proteção depende do reforço em dia. Guarde a carteira e marque o retorno pelo WhatsApp.",
        },
      ],
    },
    {
      tipo: "texto",
      titulo: "Filhote e adulto: o que muda no calendário.",
      paragrafos: [
        "O filhote toma a série inicial: várias doses da polivalente, com algumas semanas de intervalo, até por volta dos 4 meses de idade, e a antirrábica a partir dos 3 meses. Enquanto a série não termina, ele ainda não está protegido, e o passeio na rua espera.",
        "Depois, o adulto mantém a proteção com o reforço, em geral anual. O pet idoso continua vacinando, e a consulta antes da dose ganha ainda mais peso.",
      ],
      lista: [
        "Filhote: série inicial, até uns 4 meses",
        "Adulto: reforço, em geral anual",
        "Resgatado sem histórico: calendário montado do zero",
        "Carteira atrasada: traga para a veterinária ver",
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre vacinação.",
    itens: [
      {
        pergunta: "Com quantos meses o filhote pode tomar a primeira vacina?",
        resposta:
          "A série da polivalente costuma começar entre 6 e 8 semanas de vida. A data certa, e quantas doses ele vai tomar, sai da primeira consulta.",
      },
      {
        pergunta: "A vacina antirrábica é todo ano?",
        resposta:
          "Para cães e gatos, o reforço da antirrábica é, em geral, anual. A carteira de vacinação marca a data do próximo.",
      },
      {
        pergunta: "ProHeart é vacina?",
        resposta:
          "Não. O ProHeart é uma injeção que previne a dirofilariose, o verme do coração, que o mosquito transmite. Ele entra no calendário do cão junto com as vacinas, mas é outra coisa.",
      },
      {
        pergunta: "Meu cachorro atrasou o reforço. Precisa recomeçar?",
        resposta:
          "Nem sempre. Depende de qual vacina e de quanto tempo passou. Traga a carteira que a veterinária diz o que fazer.",
      },
      {
        pergunta: "Gato que não sai de casa precisa de vacina?",
        resposta:
          "Precisa. Ele pode ter contato com vírus pela roupa e pelo sapato de quem chega da rua, e a antirrábica é obrigatória para cães e gatos.",
      },
      {
        pergunta: "Pode vacinar no mesmo dia da consulta?",
        resposta:
          "Pode, se ele estiver bem no exame físico. Mande no WhatsApp qual vacina ele precisa que a gente já agenda as duas coisas juntas.",
      },
    ],
  },
  relacionados: ["consulta", "check-up", "gatos"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const castracao: Pagina = {
  caminho: "/castracao-de-caes-e-gatos",
  rotulo: "Castração",
  seo: {
    titulo: "Castração de cães e gatos na Torre, Recife | Caroline Keffer",
    descricao:
      "Castração de cachorro e gato, macho e fêmea, na Torre, Recife: exames antes, anestesia monitorada e recuperação na internação de dia. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Cirurgia · Castração",
    h1: "Castração de cães e gatos na Torre, em Recife.",
    lead:
      "A clínica faz castração de cachorro e gato, macho e fêmea, com avaliação e exames antes da cirurgia e recuperação na internação durante o dia. A idade certa é decidida na consulta, conforme a espécie, o porte e o sexo.",
    foto: {
      src: "/images/galeria/atendimento-20.webp",
      alt: "Veterinário de máscara segurando um pug no colo, na área de internação",
      posicao: "50% 35%",
      posicaoCelular: "50% 40%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de castração do site e queria agendar uma avaliação.",
  },
  servico: { nome: "Castração de cães e gatos", tipo: "Cirurgia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Por que castrar.",
      colunas: 2,
      itens: [
        {
          titulo: "Saúde da fêmea",
          texto:
            "Acaba com o risco de piometra, a infecção grave do útero, e reduz o de tumor de mama, sobretudo quando feita cedo.",
          icone: "shield",
        },
        {
          titulo: "Saúde do macho",
          texto: "Elimina o risco de câncer de testículo e diminui os problemas de próstata ao longo da vida.",
          icone: "heartbeat",
        },
        {
          titulo: "Comportamento",
          texto: "Menos fuga, marcação de território e briga, principalmente quando feita antes do hábito se firmar.",
          icone: "paw",
        },
        {
          titulo: "Sem ninhada indesejada",
          texto: "Sem cio, sem gestação inesperada e sem filhote sem lar.",
          icone: "dog",
        },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como é a castração aqui.",
      // VALIDAR: jejum por escrito, tipo de anestesia e monitoramento (mesma pendência da página de cirurgia).
      itens: [
        {
          titulo: "Avaliação antes da cirurgia",
          texto: "Consulta, hemograma e bioquímico e, quando indicado, eletrocardiograma, feitos aqui na clínica.",
        },
        {
          titulo: "Jejum e horário combinados",
          texto: "A equipe passa o tempo de jejum e o horário de chegada com antecedência.",
        },
        {
          titulo: "Cirurgia com anestesia monitorada",
          texto: "Anestesia e acompanhamento dos sinais vitais durante todo o procedimento.",
        },
        {
          titulo: "Recuperação de dia, em casa à noite",
          texto: "Ele acorda e se recupera na internação da clínica e, no fim do dia, vai para casa com as orientações.",
        },
        { titulo: "Revisão e pontos", texto: "Retorno para ver a cicatrização e retirar os pontos." },
      ],
    },
    {
      tipo: "texto",
      titulo: "Os cuidados depois da castração.",
      paragrafos: [
        "Os primeiros dias pedem repouso e um corte limpo e protegido. Lamber ou coçar os pontos é o que mais complica a recuperação, por isso ele volta para casa com roupa cirúrgica ou colar.",
        "Remédio no horário certo, sem pulo, sem escada e sem banho até a retirada dos pontos. Se o corte inchar, sangrar ou abrir, mande uma foto no WhatsApp.",
      ],
      lista: [
        "Roupa cirúrgica ou colar até a retirada dos pontos",
        "Repouso, sem pulos nem escada",
        "Medicação no horário combinado",
        "Olhar o corte todo dia",
      ],
      foto: {
        src: "/images/internamento.webp",
        alt: "Internação da clínica, onde o pet se recupera durante o dia depois da cirurgia",
      },
    },
  ],
  faq: {
    titulo: "Dúvidas sobre castração.",
    itens: [
      {
        pergunta: "Qual a idade certa para castrar cachorro e gato?",
        resposta:
          "É decidida caso a caso, conforme a espécie, o porte e o sexo. A conversa começa nas consultas de filhote, e a veterinária indica o melhor momento para o seu.",
      },
      {
        pergunta: "O pet fica internado à noite depois da castração?",
        resposta:
          "Não. Ele se recupera na internação da clínica durante o dia e vai para casa à noite, com as orientações. Se o caso pedir internação à noite, a gente encaminha para um hospital 24h.",
      },
      {
        pergunta: "Castração engorda?",
        resposta:
          "O gasto de energia muda depois da castração. Com a porção e a ração ajustadas, o peso fica sob controle, e a consulta de retorno já cuida disso.",
      },
      {
        pergunta: "Precisa de exame antes de castrar?",
        resposta:
          "Sim. Hemograma e bioquímico, no mínimo, e eletrocardiograma quando indicado. A coleta é feita aqui na clínica.",
      },
      {
        pergunta: "Quanto custa a castração?",
        resposta:
          "Depende da espécie, do sexo e do peso. Mande essas informações no WhatsApp que a gente passa o valor antes de marcar.",
      },
      {
        pergunta: "O plano de saúde pet cobre castração?",
        resposta:
          "Depende do plano e da modalidade; alguns cobrem com carência ou coparticipação. Mande o nome do plano no WhatsApp que a gente confirma.",
      },
    ],
  },
  relacionados: ["cirurgia", "laboratorio", "planos"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const odontologia: Pagina = {
  caminho: "/odontologia-veterinaria",
  rotulo: "Limpeza de tártaro",
  seo: {
    titulo: "Limpeza de tártaro em cães e gatos | Torre, Recife",
    descricao:
      "Limpeza de tártaro com anestesia, extração de dente e tratamento de gengiva para cães e gatos na Torre, Recife. Mau hálito tem causa. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Cirurgia · Odontologia",
    h1: "Limpeza de tártaro e odontologia veterinária na Torre.",
    lead:
      "Mau hálito, tártaro e gengiva vermelha são sinais de doença periodontal, e o tratamento é a limpeza com anestesia: raspagem acima e abaixo da gengiva, polimento e, se preciso, a extração do dente que não tem mais como ser salvo. Tudo aqui na clínica, com exames antes e volta para casa no mesmo dia.",
    foto: {
      src: "/images/cao.webp",
      alt: "Maltês de gravatinha azul, de boca aberta e língua de fora",
      posicao: "50% 40%",
      posicaoCelular: "50% 45%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de limpeza de tártaro do site e queria uma avaliação da boca do meu pet.",
  },
  servico: { nome: "Limpeza de tártaro e odontologia veterinária", tipo: "Odontologia veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Sinais de que a boca precisa de cuidado.",
      colunas: 3,
      itens: [
        { titulo: "Mau hálito", texto: "Cheiro forte e constante não é normal: é bactéria acumulada.", icone: "wind" },
        { titulo: "Tártaro", texto: "Placa amarelada ou marrom, começando perto da gengiva.", icone: "tooth" },
        { titulo: "Gengiva vermelha", texto: "Inflamada, inchada ou sangrando ao mastigar.", icone: "drop" },
        { titulo: "Mastiga de um lado só", texto: "Ou deixa a ração dura e procura comida mole.", icone: "bowl" },
        { titulo: "Baba e mão na boca", texto: "Esfrega o focinho ou passa a pata na boca.", icone: "paw" },
        { titulo: "Dente mole", texto: "Ou quebrado, escurecido ou faltando.", icone: "warning" },
      ],
    },
    {
      tipo: "limites",
      titulo: "A limpeza que trata, e a que só disfarça.",
      intro: "A doença está embaixo da gengiva, e não no branco do dente.",
      e: {
        titulo: "É",
        itens: [
          "Com anestesia e monitoramento, sem dor e sem estresse",
          "Raspagem acima e abaixo da gengiva, e polimento",
          "Avaliação de cada dente, com extração quando necessário",
        ],
      },
      naoE: {
        titulo: "Não é",
        itens: [
          "Limpeza sem anestesia, que só raspa o que aparece",
          "Estética: a infecção fica onde estava",
          "Seguro para o pet, que pode engolir o tártaro solto",
        ],
      },
      rodape: "Por isso a boca é avaliada em toda consulta, antes de o tártaro virar dor.",
    },
    {
      tipo: "passos",
      titulo: "Como é o tratamento aqui.",
      // VALIDAR: equipamento usado na limpeza e se faz raio-x odontológico.
      itens: [
        { titulo: "Avaliação da boca", texto: "Na consulta, a veterinária vê o grau de tártaro e de inflamação." },
        {
          titulo: "Exames antes da anestesia",
          texto: "Hemograma e bioquímico e, quando indicado, eletrocardiograma, feitos aqui na clínica.",
        },
        {
          titulo: "Limpeza com anestesia",
          texto: "Raspagem, polimento e extração do que não tem mais como ser salvo.",
        },
        {
          titulo: "Em casa no mesmo dia",
          texto: "Ele se recupera na internação durante o dia e volta com a orientação de comida e escovação.",
        },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre limpeza de tártaro.",
    itens: [
      {
        pergunta: "Limpeza de tártaro em cachorro precisa de anestesia?",
        resposta:
          "Precisa. A parte que adoece fica embaixo da gengiva e só dá para limpar com o animal anestesiado, sem dor e sem risco de engolir o tártaro solto.",
      },
      {
        pergunta: "Meu pet é idoso. É seguro anestesiar?",
        resposta:
          "Idade não é doença. Com os exames em dia e o coração avaliado, muitos idosos fazem a limpeza com segurança, e deixar a infecção na boca também tem risco.",
      },
      {
        pergunta: "De quanto em quanto tempo fazer a limpeza?",
        resposta:
          "Depende da boca de cada um: raça, idade e escovação em casa mudam tudo. A veterinária acompanha nas consultas e indica a hora certa.",
      },
      {
        pergunta: "Posso escovar o dente do meu cachorro com pasta de gente?",
        resposta:
          "Não. Pasta humana tem ingredientes que fazem mal ao pet se engolidos. Use escova e pasta veterinárias, começando aos poucos.",
      },
      {
        pergunta: "O plano de saúde pet cobre limpeza de tártaro?",
        resposta: "Depende do plano e da modalidade. Mande o nome do plano no WhatsApp que a gente confirma.",
      },
    ],
  },
  relacionados: ["cirurgia", "check-up", "consulta"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const consulta: Pagina = {
  caminho: "/consulta-veterinaria",
  rotulo: "Consulta veterinária",
  seo: {
    titulo: "Consulta veterinária e clínica geral | Torre, Recife",
    descricao:
      "Consulta de clínica geral para cães e gatos com a Dra. Caroline Keffer e a Dra. Isa Lopes, na Torre, Recife. Segunda a sábado. Agende pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Clínica geral",
    h1: "Consulta veterinária de clínica geral, para cães e gatos.",
    lead:
      "A consulta de clínica geral é o primeiro atendimento para qualquer problema e o acompanhamento de rotina do seu pet, com a Dra. Caroline Keffer e a Dra. Isa Lopes. Agende pelo WhatsApp, de segunda a sábado.",
    foto: {
      src: "/images/dra/dra-carol-golden.webp",
      alt: "Dra. Caroline Keffer sentada, sorrindo para um golden retriever ao lado dela",
      posicao: "50% 40%",
      posicaoCelular: "45% 35%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de consulta do site e queria marcar uma consulta para o meu pet.",
  },
  servico: { nome: "Consulta veterinária de clínica geral", tipo: "Clínica geral veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Quando marcar uma consulta.",
      colunas: 3,
      itens: [
        {
          titulo: "Alguma coisa mudou",
          texto: "Come, bebe ou faz xixi diferente, está quieto ou perdeu peso.",
          icone: "warning",
        },
        { titulo: "Filhote novo em casa", texto: "Primeira consulta, vacinas e vermífugo.", icone: "paw" },
        { titulo: "Check-up do ano", texto: "Exame físico e exames de rotina, mesmo sem sintoma.", icone: "stethoscope" },
        { titulo: "Coceira que não passa", texto: "Pele, pelo e ouvido.", icone: "bug" },
        { titulo: "Vômito ou diarreia", texto: "Principalmente se volta ou vem com sangue.", icone: "drop" },
        { titulo: "Pet idoso", texto: "A partir dos 7 anos, consulta a cada seis meses.", icone: "heartbeat" },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como é a consulta.",
      itens: [
        { titulo: "A conversa", texto: "Histórico, alimentação, rotina e o que mudou nos últimos dias." },
        {
          titulo: "Exame físico completo",
          texto: "Peso, temperatura, coração, pulmão, pele, ouvidos, olhos, boca e abdome.",
        },
        {
          titulo: "O plano",
          texto: "Tratamento, exames ou o especialista certo, com o porquê de cada um explicado.",
        },
        { titulo: "O retorno", texto: "Com a mesma equipe, que já conhece o histórico do seu pet." },
      ],
    },
    { tipo: "equipe" },
    {
      tipo: "chamada",
      titulo: "Primeira vez aqui?",
      texto:
        "Traga a carteira de vacinação e os exames que ele já fez. Ajuda a veterinária a ver o histórico inteiro na primeira consulta.",
      icone: "clipboard",
      rotuloBotao: "Agendar a consulta",
      mensagem: "Olá! Vim pelo site. É a primeira vez do meu pet aí e queria marcar uma consulta.",
    },
  ],
  faq: {
    titulo: "Dúvidas sobre a consulta.",
    itens: [
      {
        pergunta: "Precisa marcar horário?",
        // VALIDAR: se atende sem hora marcada.
        resposta: "Sim, pelo WhatsApp. Assim o seu pet é atendido na hora marcada, sem espera.",
      },
      {
        pergunta: "Qual o horário de atendimento?",
        resposta: "De segunda a sexta, das 9h às 19h, e no sábado, das 8h às 16h. Domingo a clínica fecha.",
      },
      {
        pergunta: "Quanto custa a consulta?",
        resposta: "Mande uma mensagem no WhatsApp que a gente passa o valor antes de você vir.",
      },
      {
        pergunta: "Vocês atendem gato?",
        resposta: "Sim, cães e gatos, com manejo calmo e no tempo dele.",
      },
      {
        pergunta: "Atendem plano de saúde pet?",
        resposta:
          "Sim: PetHealth, CARE, Petlove Saúde, Pet Top e Plamev Pet. A cobertura depende da modalidade, e a gente confirma antes.",
      },
    ],
  },
  relacionados: ["check-up", "especialidades", "vacinacao"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const laboratorio: Pagina = {
  caminho: "/exames-laboratoriais",
  rotulo: "Exames laboratoriais",
  seo: {
    titulo: "Exame de sangue para cães e gatos | Torre, Recife",
    descricao:
      "Hemograma, bioquímico, exame de urina e de fezes para cães e gatos, com coleta na clínica, na Torre, Recife, e o resultado explicado por quem acompanha o seu pet.",
  },
  topo: {
    sobretitulo: "Exames laboratoriais",
    h1: "Exames laboratoriais para cães e gatos, com coleta na Torre.",
    lead:
      "A clínica realiza exames laboratoriais para cães e gatos, com a coleta feita aqui mesmo: hemograma, bioquímico, exame de urina e de fezes são os mais pedidos. O resultado volta para a veterinária que acompanha o seu pet, que explica o que cada número quer dizer.",
    foto: {
      src: "/images/servico_laboratorio.webp",
      alt: "Sala de procedimentos da clínica, com bancada e armários",
      posicao: "50% 50%",
      posicaoCelular: "50% 50%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de exames laboratoriais do site e queria agendar uma coleta.",
  },
  servico: { nome: "Exames laboratoriais veterinários", tipo: "Patologia clínica veterinária" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "Os exames mais pedidos.",
      colunas: 2,
      /* Genérico de propósito (01/10/2026, JM): a página diz que a clínica
         realiza os exames, sem detalhar onde cada amostra é processada. */
      itens: [
        {
          titulo: "Hemograma",
          texto: "Anemia, infecção, inflamação e plaquetas. É o retrato do sangue.",
          icone: "drop",
        },
        {
          titulo: "Bioquímico",
          texto: "Rins, fígado e glicose, os órgãos que adoecem sem dar sinal no começo.",
          icone: "flask",
        },
        {
          titulo: "Urinálise",
          texto: "Como o rim está concentrando a urina, e sinais de infecção ou cálculo.",
          icone: "testTube",
        },
        {
          titulo: "Exame de fezes",
          texto: "Verminose, giárdia e outras alterações do intestino.",
          icone: "microscope",
        },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como é a coleta.",
      // VALIDAR: horas de jejum e prazo de resultado.
      itens: [
        { titulo: "Agendamento", texto: "Pelo WhatsApp, com o preparo explicado: jejum, urina ou fezes." },
        { titulo: "A coleta, aqui", texto: "Rápida e com calma, no lugar que ele já conhece." },
        { titulo: "O prazo", texto: "O tempo de cada exame é informado na hora da coleta." },
        {
          titulo: "O resultado explicado",
          texto: "Quem acompanha o seu pet lê o resultado e diz o próximo passo.",
        },
      ],
    },
    {
      tipo: "texto",
      titulo: "Quando o exame de sangue é pedido.",
      paragrafos: [
        "No check-up do ano, mesmo sem sintoma: é ele que acha a doença de rim, fígado ou a diabetes antes de aparecer. E sempre antes de anestesia, para a cirurgia ser segura.",
        "Também no pet idoso, em quem toma remédio todo dia e no acompanhamento de doença crônica. Repetir no mesmo lugar permite comparar com o resultado anterior, e é a mudança que acende o alerta.",
      ],
      lista: ["Check-up anual", "Antes de anestesia", "Pet idoso", "Remédio de uso contínuo", "Doença crônica"],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre exames de laboratório.",
    itens: [
      {
        pergunta: "Precisa de jejum para exame de sangue em cachorro?",
        // VALIDAR: tempo de jejum.
        resposta: "Em geral, sim, algumas horas. A equipe confirma o tempo certo quando você agendar.",
      },
      {
        pergunta: "Como é coletada a urina?",
        resposta: "Depende do exame pedido. A equipe explica ao agendar se a coleta é feita em casa ou aqui.",
      },
      {
        pergunta: "Em quanto tempo sai o resultado?",
        resposta: "Depende do exame. O prazo é informado na coleta, e a veterinária explica o resultado.",
      },
      {
        pergunta: "Posso fazer o exame com pedido de outro veterinário?",
        // VALIDAR: se aceita pedido externo para exame de laboratório.
        resposta: "Mande uma foto do pedido no WhatsApp que a gente confirma e agenda a coleta.",
      },
      {
        pergunta: "O plano de saúde pet cobre exame de sangue?",
        resposta:
          "Muitos planos cobrem os exames de rotina. Mande o nome do plano no WhatsApp que a gente confirma o que o seu cobre.",
      },
    ],
  },
  relacionados: ["check-up", "nefrologia", "consulta"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const gatos: Pagina = {
  caminho: "/veterinario-para-gatos",
  rotulo: "Veterinário para gatos",
  seo: {
    titulo: "Veterinário para gatos na Torre, Recife | Caroline Keffer",
    descricao:
      "Consulta, vacina, exames, castração e cirurgia para gatos na Torre, Recife, com manejo calmo e dicas para a ida ao veterinário sem estresse.",
  },
  topo: {
    sobretitulo: "Gatos",
    h1: "Veterinário para gatos na Torre, em Recife.",
    lead:
      "A clínica atende gatos em consulta, vacina, exames, castração, cirurgia e nas cinco especialidades, com manejo calmo e sem pressa. Gato esconde muito bem quando está doente, e por isso a consulta de rotina pesa ainda mais para ele.",
    foto: {
      src: "/images/galeria/atendimento-07.webp",
      alt: "Colaboradora da clínica sorrindo com dois gatos no colo",
      posicao: "50% 35%",
      posicaoCelular: "50% 45%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de gatos do site e queria marcar uma consulta para o meu gato.",
  },
  servico: { nome: "Atendimento veterinário para gatos", tipo: "Medicina felina" },
  blocos: [
    {
      tipo: "cartoes",
      titulo: "O que mais traz gato ao veterinário.",
      colunas: 3,
      itens: [
        {
          titulo: "Xixi fora da caixa",
          texto: "Ou esforço para urinar. Em macho que não consegue fazer xixi, é emergência.",
          icone: "drop",
        },
        {
          titulo: "Doença renal",
          texto: "Comum no gato idoso: bebe muita água, faz muito xixi e emagrece.",
          icone: "flask",
          href: "/especialidades/nefrologia",
          rotuloLink: "Ver nefrologia",
        },
        { titulo: "Vômito frequente", texto: "Bola de pelo toda semana não é normal.", icone: "bowl" },
        { titulo: "Perda de peso", texto: "Mesmo comendo, ou comendo menos aos poucos.", icone: "scales" },
        { titulo: "Boca e dentes", texto: "Gengivite e dor ao mastigar, muitas vezes caladas.", icone: "tooth" },
        { titulo: "Pele e pelo", texto: "Lambedura demais, falhas no pelo e coceira.", icone: "bug" },
      ],
    },
    {
      tipo: "passos",
      titulo: "Como trazer o gato sem estresse.",
      itens: [
        {
          titulo: "Caixa de transporte à vista",
          texto: "Deixe a caixa aberta em casa uns dias antes, com um petisco dentro. Ela deixa de ser sinal de passeio ruim.",
        },
        { titulo: "O cheiro dele", texto: "Uma toalha ou manta que ele usa vai dentro da caixa." },
        {
          titulo: "Caixa coberta no caminho",
          texto: "Firme no banco do carro e coberta com um pano: ver menos coisa acalma.",
        },
        {
          titulo: "No tempo dele",
          // VALIDAR: manejo do gato na consulta (exame dentro da caixa, se preferir).
          texto: "Na consulta, ele sai da caixa no tempo dele, sem puxão e sem pressa.",
        },
      ],
    },
    {
      tipo: "texto",
      titulo: "Gato que não sai de casa também vai ao veterinário.",
      paragrafos: [
        "Gato disfarça dor e doença por instinto. Quando o tutor percebe, o problema de rim, dente ou tireoide muitas vezes já avançou.",
        "Por isso a orientação é a mesma do cão: consulta pelo menos uma vez por ano e, a partir dos 7 anos, a cada seis meses, com vacina em dia mesmo para quem nunca pisa na rua.",
      ],
      foto: {
        src: "/images/galeria/atendimento-19.webp",
        alt: "Colaboradora da clínica com dois gatos persas no colo",
        posicao: "50% 35%",
      },
    },
  ],
  faq: {
    titulo: "Dúvidas sobre gatos.",
    itens: [
      {
        pergunta: "Vocês atendem gato?",
        resposta: "Sim. Consulta, vacina, exames, castração, cirurgia, especialidades e banho e tosa.",
      },
      {
        pergunta: "Gato precisa ir ao veterinário todo ano?",
        resposta: "Precisa: uma vez por ano no adulto e, a partir dos 7 anos, a cada seis meses.",
      },
      {
        pergunta: "Meu gato macho não consegue fazer xixi. O que faço?",
        resposta:
          "É emergência. Até as 18h, venha direto e avise pelo WhatsApp. Depois disso ou com a clínica fechada, procure um plantão veterinário 24h.",
      },
      {
        pergunta: "Vocês castram gato?",
        resposta: "Sim, macho e fêmea, com exames antes e recuperação durante o dia.",
      },
      {
        pergunta: "Gato que não sai de casa precisa de vacina?",
        resposta: "Precisa. O vírus pode chegar pela roupa e pelo sapato de quem vem da rua.",
      },
    ],
  },
  relacionados: ["castracao", "nefrologia", "vacinacao"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const urgencia: Pagina = {
  caminho: "/urgencia-veterinaria",
  rotulo: "Urgência até 18h",
  seo: {
    titulo: "Urgência veterinária na Torre, Recife | até as 18h",
    descricao:
      "Emergência com cão ou gato na Torre, Recife: a clínica atende urgência até as 18h, estabiliza e, se preciso, encaminha a um hospital 24h. Avise pelo WhatsApp.",
  },
  topo: {
    sobretitulo: "Urgência",
    h1: "Urgência veterinária na Torre: atendimento até as 18h.",
    lead:
      "A clínica atende urgência de cães e gatos até as 18h, nos dias de funcionamento: a equipe estabiliza o seu pet na hora e, se ele precisar ficar internado à noite, encaminha para um hospital 24h. Depois das 18h ou com a clínica fechada, procure um plantão veterinário 24h.",
    foto: {
      src: "/images/galeria/atendimento-01.webp",
      alt: "Veterinária abraçando um buldogue francês na área de atendimento",
      posicao: "50% 35%",
      posicaoCelular: "50% 40%",
    },
    mensagemWhatsapp: "Olá! É uma urgência, vim pela página do site e estou indo para a clínica.",
  },
  servico: { nome: "Urgência veterinária", tipo: "Atendimento veterinário de urgência" },
  blocos: [
    {
      tipo: "aviso",
      titulo: "Sinais que não podem esperar.",
      intro: "Com qualquer um destes, não espere para ver se melhora.",
      sinais: [
        { titulo: "Respiração difícil", detalhe: "Boca aberta, gengiva roxa ou esforço para puxar o ar.", icone: "wind" },
        { titulo: "Convulsão", detalhe: "Ou desmaio, mesmo que passe em poucos minutos.", icone: "warning" },
        { titulo: "Atropelamento ou queda", detalhe: "Mesmo que pareça bem: a lesão pode ser interna.", icone: "firstAid" },
        { titulo: "Envenenamento", detalhe: "Veneno, remédio de gente, chocolate ou planta.", icone: "flask" },
        { titulo: "Barriga inchada", detalhe: "Com ânsia de vômito sem conseguir vomitar.", icone: "bowl" },
        { titulo: "Gato sem fazer xixi", detalhe: "Esforço na caixa e nada sai, principalmente no macho.", icone: "drop" },
      ],
    },
    {
      tipo: "passos",
      titulo: "No caminho para cá.",
      itens: [
        {
          titulo: "Avise antes de sair",
          texto: "Pelo WhatsApp ou pelo telefone fixo. A equipe já se prepara para receber o seu pet.",
        },
        {
          titulo: "Leve o que ele comeu",
          texto: "Em caso de envenenamento, a embalagem do produto ou do remédio ajuda muito.",
        },
        {
          titulo: "Transporte com cuidado",
          texto: "Em queda ou atropelamento, mova o mínimo: uma toalha firme vira maca.",
        },
        { titulo: "Nada de remédio de gente", texto: "E não provoque vômito em casa sem orientação." },
      ],
    },
    {
      tipo: "limites",
      titulo: "O que a urgência aqui é, e o que não é.",
      intro: "Dito com clareza antes, porque numa urgência cada minuto conta.",
      /* Horário confirmado (01/10/2026): sáb 8h–16h, então no sábado a
         urgência vai até o fechamento. */
      e: {
        titulo: "É",
        itens: [
          "Atendimento até as 18h, nos dias de funcionamento",
          "Primeiro atendimento e estabilização na hora",
          "Encaminhamento a um hospital 24h, quando ele precisa ficar",
        ],
      },
      naoE: {
        titulo: "Não é",
        itens: ["Plantão 24 horas", "Internação à noite", "UTI ou terapia intensiva"],
      },
      rodape: "Depois das 18h ou com a clínica fechada, procure um plantão veterinário 24h. Não espere a clínica abrir.",
    },
  ],
  faq: {
    titulo: "Dúvidas sobre urgência.",
    itens: [
      {
        pergunta: "A clínica atende emergência 24 horas?",
        resposta:
          "Não. A urgência é atendida até as 18h, nos dias de funcionamento. Depois disso ou com a clínica fechada, procure um plantão veterinário 24h.",
      },
      {
        pergunta: "Até que horas vocês atendem urgência?",
        resposta:
          "De segunda a sexta, até as 18h. No sábado, enquanto a clínica estiver aberta, até as 16h. Domingo a clínica fecha.",
      },
      {
        pergunta: "Meu cachorro comeu chocolate. O que eu faço?",
        resposta:
          "Não provoque vômito em casa. Anote o tipo e a quantidade, avise pelo WhatsApp e venha, ou procure um plantão 24h se a clínica estiver fechada.",
      },
      {
        pergunta: "Preciso avisar antes de ir?",
        resposta:
          "Não é obrigatório, mas ajuda: com o aviso, a equipe já espera o seu pet. Pelo WhatsApp ou pelo telefone fixo.",
      },
      {
        pergunta: "E se o meu pet precisar ficar internado?",
        resposta:
          "A internação da clínica é de dia. Se o caso pedir internação à noite ou UTI, a equipe estabiliza e encaminha para um hospital 24h.",
      },
    ],
  },
  relacionados: ["consulta", "gatos", "cirurgia"],
  revisao: PENDENTE,
};

/* ------------------------------------------------------------------ */

export const ortopedia: Pagina = {
  caminho: "/ortopedia-veterinaria",
  rotulo: "Ortopedia",
  seo: {
    titulo: "Ortopedia veterinária na Torre, Recife | Caroline Keffer",
    descricao:
      "Fratura, luxação de patela, ligamento e dor para andar em cães e gatos: avaliação, raio-x na clínica e cirurgia ortopédica na Torre, Recife.",
  },
  topo: {
    sobretitulo: "Cirurgia · Ortopedia",
    h1: "Ortopedia veterinária na Torre, em Recife.",
    lead:
      "Mancar, evitar a escada, sentir dor para levantar ou ter levado uma pancada são casos de ortopedia. A avaliação começa na consulta, o raio-x é feito aqui na clínica e, quando indicada, a cirurgia ortopédica também.",
    foto: {
      src: "/images/galeria/atendimento-02.webp",
      alt: "Veterinária sentada no chão do consultório com dois cães de porte grande deitados ao lado",
      posicao: "50% 50%",
      posicaoCelular: "60% 50%",
    },
    mensagemWhatsapp: "Olá! Vim pela página de ortopedia do site. Meu pet está mancando e queria uma avaliação.",
  },
  servico: { nome: "Ortopedia veterinária", tipo: "Ortopedia veterinária" },
  blocos: [
    {
      tipo: "texto",
      titulo: "O que a ortopedia trata.",
      paragrafos: [
        "Osso, articulação, ligamento e tendão. Do cão pequeno com o joelho que sai do lugar ao grande que manca depois de uma corrida, e do filhote que caiu do sofá ao idoso com dor de artrose.",
      ],
      // VALIDAR: lista de procedimentos ortopédicos que a clínica opera (mesma pendência da página de cirurgia).
      causas: [
        { titulo: "Luxação de patela", detalhe: "O joelho sai do lugar. Comum em cães pequenos.", icone: "bone", selo: "Mais comum" },
        { titulo: "Fraturas", detalhe: "Queda, atropelamento ou briga.", icone: "firstAid" },
        { titulo: "Ligamento cruzado", detalhe: "Manca de repente, sem apoiar a pata de trás.", icone: "paw" },
        { titulo: "Displasia e artrose", detalhe: "Dor ao levantar, mais comum em raças grandes e idosos.", icone: "dog" },
        { titulo: "Trauma", detalhe: "Pancada, torção ou mordida em pata e articulação.", icone: "warning" },
      ],
      foto: {
        src: "/images/galeria/atendimento-10.webp",
        alt: "Colaboradora sentada no chão abraçando dois cães pequenos",
        posicao: "50% 35%",
      },
    },
    {
      tipo: "passos",
      titulo: "Da dor ao tratamento.",
      itens: [
        {
          titulo: "Consulta e exame ortopédico",
          texto: "A veterinária observa como ele anda e examina cada articulação.",
        },
        { titulo: "Raio-x aqui na clínica", texto: "Com hora marcada, para ver o osso e a articulação por dentro." },
        {
          titulo: "O tratamento",
          texto: "Repouso, remédio para dor e controle de peso, ou cirurgia, quando o caso pede.",
        },
        {
          titulo: "Recuperação e retorno",
          texto: "Depois da cirurgia, ele se recupera de dia na internação e volta para revisão.",
        },
      ],
    },
  ],
  faq: {
    titulo: "Dúvidas sobre ortopedia.",
    itens: [
      {
        pergunta: "Meu cachorro está mancando. É urgente?",
        resposta:
          "Se ele não apoia a pata, chora de dor ou houve queda ou atropelamento, sim: venha logo. Mancar leve, que vai e volta, pede consulta nos próximos dias.",
      },
      {
        pergunta: "O que é luxação de patela?",
        resposta:
          "É quando a patela, o ossinho da frente do joelho, sai do lugar. O cão dá pulinhos com uma pata de trás levantada. Comum em raças pequenas, tem graus, e nem todo caso é operado.",
      },
      {
        pergunta: "Toda fratura precisa de cirurgia?",
        resposta:
          "Não. Depende do osso, do tipo de fratura e do tamanho do pet. O raio-x mostra o caminho, e a veterinária explica as opções.",
      },
      {
        pergunta: "Cachorro idoso com artrose tem tratamento?",
        resposta:
          "Tem. Controle de peso, remédio para dor e atividade na medida certa devolvem muito da qualidade de vida.",
      },
      {
        pergunta: "O plano de saúde pet cobre cirurgia ortopédica?",
        resposta: "Depende do plano e da modalidade. Mande o nome do plano no WhatsApp que a gente confirma.",
      },
    ],
  },
  relacionados: ["cirurgia", "raio-x", "urgencia"],
  revisao: PENDENTE,
};
