import { BEBIDAS } from "@/data/beverage-rules";
import type { BebidaResumo, OrcamentoState, ServicoId } from "@/types/quote";
import { calcularBebidas } from "./beverage-calculator";

export function criarEstadoInicial(): OrcamentoState {
  return {
    evento: {
      nome: "",
      telefone: "",
      tipoEvento: "",
      dataEvento: "",
      horario: "",
      localEvento: "",
      convidados: "",
      observacoes: "",
    },
    servicos: [],
    crepesSalgados: [],
    crepesDoces: [],
    massas: [],
    churrasco: [],
    pratoPrincipal: [],
    acompanhamentos: [],
    cardapioPersonalizado: "",
    incluirBebidas: false,
    bebidas: [],
    equipe: "",
    funcoesEquipe: [],
  };
}

export function alternarLista(lista: string[], item: string): string[] {
  return lista.includes(item)
    ? lista.filter((valor) => valor !== item)
    : [...lista, item];
}

export function alternarServico(
  servicos: ServicoId[],
  id: ServicoId,
): ServicoId[] {
  return servicos.includes(id)
    ? servicos.filter((valor) => valor !== id)
    : [...servicos, id];
}

export function parseConvidados(valor: string): number {
  const digitos = valor.replace(/[^\d]/g, "");
  if (!digitos) {
    return 0;
  }
  const numero = Number.parseInt(digitos, 10);
  return Number.isFinite(numero) && numero > 0 ? numero : 0;
}

export function temServicoSelecionado(estado: OrcamentoState): boolean {
  return estado.servicos.length > 0;
}

export function ehInteiroPositivo(valor: string): boolean {
  if (!/^\d+$/.test(valor.trim())) {
    return false;
  }
  return parseConvidados(valor) > 0;
}

export function resumirBebidas(estado: OrcamentoState): BebidaResumo[] {
  const configs = BEBIDAS.filter((bebida) =>
    estado.bebidas.includes(bebida.id),
  );
  return calcularBebidas(configs, parseConvidados(estado.evento.convidados));
}
