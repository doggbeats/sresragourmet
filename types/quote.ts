export type ServicoId =
  | "crepe-salgado"
  | "crepe-doce"
  | "rodizio-massas"
  | "churrasco"
  | "almoco-jantar"
  | "drinks";

export interface ServicoInfo {
  id: ServicoId;
  nome: string;
  descricao: string;
  imagem?: string | null;
  imagens?: string[];
  precoPorPessoa?: number | null;
  precoPacote?: number | null;
}

export interface PacoteInfo {
  id: string;
  nome: string;
  descricao: string;
  servicos: ServicoId[];
  preco: number | null;
}

export type FuncaoEquipeId =
  | "garcons"
  | "cozinheiros"
  | "churrasqueiro"
  | "apoio";

export interface FuncaoEquipe {
  id: FuncaoEquipeId;
  nome: string;
  descricao: string;
}

export type EquipeResposta = "" | "sim" | "nao" | "orientacao";

export interface DadosEvento {
  nome: string;
  telefone: string;
  tipoEvento: string;
  dataEvento: string;
  horario: string;
  localEvento: string;
  convidados: string;
  observacoes: string;
}

export type GrupoBebida = "agua" | "sucos" | "refrigerantes";

export interface EmbalagemConfig {
  tamanho: number;
  unidade: string;
  descricao: string;
}

export interface BebidaConfig {
  id: string;
  nome: string;
  grupo: GrupoBebida;
  unidade: string;
  consumoPorPessoa: number | null;
  embalagem: EmbalagemConfig | null;
  preco?: number | null;
}

export interface BebidaResumo {
  id: string;
  nome: string;
  grupo: GrupoBebida;
  unidade: string;
  quantidade: number | null;
  embalagens: number | null;
  embalagemDescricao: string | null;
  pendente: boolean;
}

export interface OrcamentoState {
  evento: DadosEvento;
  servicos: ServicoId[];
  crepesSalgados: string[];
  crepesDoces: string[];
  massas: string[];
  churrasco: string[];
  pratoPrincipal: string[];
  acompanhamentos: string[];
  cardapioPersonalizado: string;
  incluirBebidas: boolean;
  bebidas: string[];
  equipe: EquipeResposta;
  funcoesEquipe: FuncaoEquipeId[];
}
