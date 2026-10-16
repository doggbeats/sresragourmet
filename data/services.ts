import type { FuncaoEquipe, PacoteInfo, ServicoInfo } from "@/types/quote";

export const SERVICOS: ServicoInfo[] = [
  {
    id: "crepe-salgado",
    nome: "Crepe salgado",
    descricao: "Crepes salgados preparados na hora, montados com os ingredientes que você escolher.",
    imagem: "/salgados.jpg",
    imagens: ["/salgados.jpg", "/2.jpeg"],
    precoPorPessoa: null,
    precoPacote: null,
  },
  {
    id: "crepe-doce",
    nome: "Crepe doce",
    descricao: "Crepes doces preparados na hora, com recheios à sua escolha.",
    imagem: "/crepe_doce.jpg",
    imagens: ["/crepe_doce.jpg", "/7.jpeg"],
    precoPorPessoa: null,
    precoPacote: null,
  },
  {
    id: "rodizio-massas",
    nome: "Rodízio de massas",
    descricao: "Massas servidas em rodízio, com os itens e molhos definidos pelo buffet.",
    imagem: "/pene.jpg",
    imagens: ["/pene.jpg", "/3.jpeg"],
    precoPorPessoa: null,
    precoPacote: null,
  },
  {
    id: "churrasco",
    nome: "Churrasco completo",
    descricao: "Carnes selecionadas, acompanhamentos deliciosos e aquele churrasco preparado na hora para reunir seus convidados.",
    imagem: "/churrasco-2.jpg",
    precoPorPessoa: null,
    precoPacote: null,
  },
  {
    id: "almoco-jantar",
    nome: "Almoço e jantar",
    descricao: "Reúna seus convidados em torno de pratos saborosos, preparados com carinho para tornar cada refeição uma experiência especial. Sabor, qualidade e momentos inesquecíveis para o seu evento!",
    imagem: "/jantares.webp",
    precoPorPessoa: null,
    precoPacote: null,
  },
  {
    id: "drinks",
    nome: "Drinks",
    descricao: "Coquetéis e drinks preparados na hora para animar o seu evento. Opções com e sem álcool para todos os convidados.",
    imagem: "/drinks.webp",
    imagens: ["/drinks.webp", "/5.jpeg", "/8.jpeg"],
    precoPorPessoa: null,
    precoPacote: null,
  },
];

export const PACOTES: PacoteInfo[] = [];

export const FUNCOES_EQUIPE: FuncaoEquipe[] = [
  {
    id: "garcons",
    nome: "Garçons",
    descricao: "Atendimento e serviço aos convidados.",
  },
  {
    id: "cozinheiros",
    nome: "Cozinheiros / preparo",
    descricao: "Profissionais de preparo dos alimentos.",
  },
  {
    id: "churrasqueiro",
    nome: "Churrasqueiro",
    descricao: "Responsável pela preparação do churrasco.",
  },
  {
    id: "apoio",
    nome: "Equipe de apoio",
    descricao: "Apoio geral: montagem, reposição e limpeza.",
  },
];

export const TIPOS_EVENTO = [
  "Aniversário",
  "Casamento",
  "Festa familiar",
  "Confraternização",
  "Evento corporativo",
  "Outro",
] as const;
