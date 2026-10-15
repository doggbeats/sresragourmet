import { describe, expect, it } from "vitest";
import type { BebidaConfig } from "@/types/quote";
import {
  calcularBebida,
  calcularEmbalagens,
  calcularQuantidade,
  converterParaBase,
  formatarQuantidade,
} from "@/lib/beverage-calculator";

const agua: BebidaConfig = {
  id: "agua",
  nome: "Água mineral",
  grupo: "agua",
  unidade: "ml",
  consumoPorPessoa: null,
  embalagem: null,
  preco: null,
};

describe("converterParaBase", () => {
  it("converte litros para mililitros", () => {
    expect(converterParaBase(2, "L")).toBe(2000);
  });

  it("mantém mililitros", () => {
    expect(converterParaBase(500, "ml")).toBe(500);
  });
});

describe("calcularQuantidade", () => {
  it("multiplica o consumo pelo número de convidados", () => {
    expect(calcularQuantidade(500, 10)).toBe(5000);
  });
});

describe("calcularEmbalagens", () => {
  it("arredonda para cima as embalagens inteiras", () => {
    expect(
      calcularEmbalagens(5000, { tamanho: 2000, unidade: "ml", descricao: "garrafa 2 L" }),
    ).toBe(3);
  });

  it("retorna null quando não há embalagem configurada", () => {
    expect(calcularEmbalagens(5000, null)).toBeNull();
  });
});

describe("calcularBebida", () => {
  it("marca como pendente quando o consumo não está configurado", () => {
    const resumo = calcularBebida(agua, 30);
    expect(resumo.pendente).toBe(true);
    expect(resumo.quantidade).toBeNull();
    expect(resumo.embalagens).toBeNull();
  });

  it("não calcula quantidade quando não há convidados", () => {
    const resumo = calcularBebida({ ...agua, consumoPorPessoa: 500 }, 0);
    expect(resumo.pendente).toBe(true);
    expect(resumo.quantidade).toBeNull();
  });

  it("calcula quantidade e embalagens quando configurado", () => {
    const resumo = calcularBebida(
      {
        ...agua,
        consumoPorPessoa: 500,
        embalagem: { tamanho: 2000, unidade: "ml", descricao: "garrafa 2 L" },
      },
      10,
    );
    expect(resumo.pendente).toBe(false);
    expect(resumo.quantidade).toBe(5000);
    expect(resumo.embalagens).toBe(3);
  });
});

describe("formatarQuantidade", () => {
  it("converte para litros a partir de 1000 ml", () => {
    expect(formatarQuantidade(5000, "ml")).toBe("5 L");
  });

  it("mantém mililitros abaixo de 1000", () => {
    expect(formatarQuantidade(500, "ml")).toBe("500 ml");
  });
});
