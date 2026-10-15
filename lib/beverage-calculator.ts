import type {
  BebidaConfig,
  BebidaResumo,
  EmbalagemConfig,
} from "@/types/quote";

const FATORES_PARA_BASE: Record<string, number> = {
  ml: 1,
  l: 1000,
  un: 1,
};

export function converterParaBase(valor: number, unidade: string): number {
  const fator = FATORES_PARA_BASE[unidade.trim().toLowerCase()];
  return fator ? valor * fator : valor;
}

export function calcularQuantidade(
  consumoPorPessoa: number,
  convidados: number,
): number {
  return consumoPorPessoa * convidados;
}

export function calcularEmbalagens(
  quantidadeBase: number,
  embalagem: EmbalagemConfig | null,
): number | null {
  if (!embalagem || embalagem.tamanho <= 0) {
    return null;
  }

  const tamanhoBase = converterParaBase(embalagem.tamanho, embalagem.unidade);
  if (tamanhoBase <= 0) {
    return null;
  }

  return Math.ceil(quantidadeBase / tamanhoBase);
}

export function calcularBebida(
  config: BebidaConfig,
  convidados: number,
): BebidaResumo {
  const base: BebidaResumo = {
    id: config.id,
    nome: config.nome,
    grupo: config.grupo,
    unidade: config.unidade,
    quantidade: null,
    embalagens: null,
    embalagemDescricao: config.embalagem?.descricao ?? null,
    pendente: true,
  };

  const consumoConfigurado =
    config.consumoPorPessoa != null && config.consumoPorPessoa > 0;

  if (!consumoConfigurado || convidados <= 0) {
    return base;
  }

  const quantidade = calcularQuantidade(config.consumoPorPessoa as number, convidados);

  return {
    ...base,
    quantidade,
    embalagens: calcularEmbalagens(quantidade, config.embalagem),
    pendente: false,
  };
}

export function calcularBebidas(
  configs: BebidaConfig[],
  convidados: number,
): BebidaResumo[] {
  return configs.map((config) => calcularBebida(config, convidados));
}

function formatarNumero(valor: number): string {
  return valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

export function formatarQuantidade(
  quantidade: number,
  unidade: string,
): string {
  const unidadeBaixa = unidade.trim().toLowerCase();

  if (unidadeBaixa === "ml" && quantidade >= 1000) {
    return `${formatarNumero(quantidade / 1000)} L`;
  }

  return `${formatarNumero(quantidade)} ${unidade}`;
}
