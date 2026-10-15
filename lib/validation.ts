import type { DadosEvento, OrcamentoState } from "@/types/quote";
import { ehInteiroPositivo } from "./quote";

export type ErrosOrcamento = Record<string, string>;

export function validarDadosEvento(evento: DadosEvento): ErrosOrcamento {
  const erros: ErrosOrcamento = {};

  if (!evento.nome.trim()) {
    erros.nome = "Informe o nome do cliente.";
  }

  if (!evento.telefone.trim()) {
    erros.telefone = "Informe um telefone de contato.";
  }

  if (!evento.dataEvento) {
    erros.dataEvento = "Informe a data do evento.";
  }

  if (!evento.convidados.trim()) {
    erros.convidados = "Informe a quantidade de convidados.";
  } else if (!ehInteiroPositivo(evento.convidados)) {
    erros.convidados = "Informe um número inteiro de convidados maior que zero.";
  }

  return erros;
}

export function validarServicos(estado: OrcamentoState): ErrosOrcamento {
  const erros: ErrosOrcamento = {};

  if (estado.servicos.length === 0) {
    erros.servicos = "Selecione ao menos um serviço para o evento.";
  }

  return erros;
}

export function validarOrcamento(estado: OrcamentoState): {
  valido: boolean;
  erros: ErrosOrcamento;
} {
  const erros = {
    ...validarDadosEvento(estado.evento),
    ...validarServicos(estado),
  };

  return { valido: Object.keys(erros).length === 0, erros };
}
