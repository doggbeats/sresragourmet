import { describe, expect, it } from "vitest";
import type { DadosEvento, OrcamentoState } from "@/types/quote";
import {
  validarDadosEvento,
  validarOrcamento,
  validarServicos,
} from "@/lib/validation";
import { criarEstadoInicial } from "@/lib/quote";

function eventoValido(overrides: Partial<DadosEvento> = {}): DadosEvento {
  return {
    nome: "Maria Oliveira",
    telefone: "61999990000",
    tipoEvento: "Aniversário",
    dataEvento: "2026-11-14",
    horario: "19:00",
    localEvento: "Salão Central",
    convidados: "40",
    observacoes: "",
    ...overrides,
  };
}

describe("validarDadosEvento", () => {
  it("acusa os campos obrigatórios vazios", () => {
    const erros = validarDadosEvento({
      nome: "",
      telefone: "",
      tipoEvento: "",
      dataEvento: "",
      horario: "",
      localEvento: "",
      convidados: "",
      observacoes: "",
    });

    expect(erros.nome).toBeDefined();
    expect(erros.telefone).toBeDefined();
    expect(erros.dataEvento).toBeDefined();
    expect(erros.convidados).toBeDefined();
  });

  it("aceita convidados como inteiro positivo", () => {
    expect(validarDadosEvento(eventoValido({ convidados: "40" }))).toEqual({});
  });

  it("rejeita quantidade de convidados igual a zero", () => {
    expect(validarDadosEvento(eventoValido({ convidados: "0" })).convidados).toBeDefined();
  });

  it("rejeita quantidade de convidados não numérica", () => {
    expect(validarDadosEvento(eventoValido({ convidados: "dez" })).convidados).toBeDefined();
  });

  it("rejeita quantidade de convidados decimal", () => {
    expect(validarDadosEvento(eventoValido({ convidados: "10,5" })).convidados).toBeDefined();
  });
});

describe("validarServicos", () => {
  it("exige ao menos um serviço", () => {
    expect(validarServicos(criarEstadoInicial()).servicos).toBeDefined();
  });

  it("aceita quando há serviço selecionado", () => {
    const estado: OrcamentoState = {
      ...criarEstadoInicial(),
      servicos: ["crepe-salgado"],
    };
    expect(validarServicos(estado)).toEqual({});
  });
});

describe("validarOrcamento", () => {
  it("combina erros de evento e serviços", () => {
    const { valido, erros } = validarOrcamento(criarEstadoInicial());
    expect(valido).toBe(false);
    expect(erros.servicos).toBeDefined();
    expect(erros.nome).toBeDefined();
  });

  it("é válido com dados completos e serviço selecionado", () => {
    const estado: OrcamentoState = {
      ...criarEstadoInicial(),
      evento: eventoValido(),
      servicos: ["crepe-doce"],
    };
    expect(validarOrcamento(estado).valido).toBe(true);
  });
});
