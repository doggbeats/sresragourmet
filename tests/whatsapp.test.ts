import { describe, expect, it } from "vitest";
import { criarEstadoInicial } from "@/lib/quote";
import {
  gerarLinkWhatsApp,
  montarMensagemWhatsApp,
  whatsappConfigurado,
} from "@/lib/whatsapp";
import type { OrcamentoState } from "@/types/quote";

function estadoCompleto(): OrcamentoState {
  const base = criarEstadoInicial();
  return {
    ...base,
    evento: {
      nome: "Ramon Brum",
      telefone: "61999990000",
      tipoEvento: "Aniversário",
      dataEvento: "2026-11-14",
      horario: "19:00",
      localEvento: "Salão Central",
      convidados: "30",
      observacoes: "Festa ao ar livre.",
    },
    servicos: ["crepe-salgado", "crepe-doce"],
    crepesSalgados: ["Queijo", "Frango"],
    crepesDoces: ["Chocolate", "Morango"],
    incluirBebidas: true,
    bebidas: ["agua-mineral", "refri-coca-cola"],
    equipe: "sim",
    funcoesEquipe: ["garcons"],
  };
}

describe("montarMensagemWhatsApp", () => {
  it("inclui as seções exigidas", () => {
    const mensagem = montarMensagemWhatsApp(estadoCompleto());

    expect(mensagem).toContain("*DADOS DO EVENTO*");
    expect(mensagem).toContain("*SERVIÇOS SELECIONADOS*");
    expect(mensagem).toContain("*CARDÁPIO*");
    expect(mensagem).toContain("*BEBIDAS*");
    expect(mensagem).toContain("*EQUIPE DE ATENDIMENTO*");
    expect(mensagem).toContain("*OBSERVAÇÕES*");
    expect(mensagem).toContain("Ramon Brum");
    expect(mensagem).toContain("Crepe salgado");
    expect(mensagem).toContain("Garçons");
  });

  it("não exibe valores monetários", () => {
    const mensagem = montarMensagemWhatsApp(estadoCompleto());
    expect(mensagem).not.toContain("R$");
  });

  it("informa que a quantidade de bebida precisa ser confirmada", () => {
    const mensagem = montarMensagemWhatsApp(estadoCompleto());
    expect(mensagem).toContain("quantidade a confirmar pelo buffet");
  });

  it("avisa quando não há serviços selecionados", () => {
    const mensagem = montarMensagemWhatsApp(criarEstadoInicial());
    expect(mensagem).toContain("Nenhum serviço selecionado.");
  });
});

describe("whatsappConfigurado", () => {
  it("reconhece um número válido", () => {
    expect(whatsappConfigurado("61 995999771")).toBe(true);
  });

  it("rejeita número vazio", () => {
    expect(whatsappConfigurado("")).toBe(false);
  });
});

describe("gerarLinkWhatsApp", () => {
  it("retorna null quando o número não está configurado", () => {
    expect(gerarLinkWhatsApp("Olá", "")).toBeNull();
  });

  it("gera um link wa.me com a mensagem codificada", () => {
    const link = gerarLinkWhatsApp("Olá\nmundo", "6199999771");
    expect(link).toContain("https://wa.me/556199999771?text=");
    expect(link).toContain(encodeURIComponent("Olá\nmundo"));
  });

  it("não duplica o código do país quando já está presente", () => {
    const link = gerarLinkWhatsApp("Olá", "5561999997771");
    expect(link).toContain("https://wa.me/5561999997771?text=");
  });
});
