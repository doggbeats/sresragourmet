import { FUNCOES_EQUIPE, SERVICOS } from "@/data/services";
import type { OrcamentoState, ServicoId } from "@/types/quote";
import { BUFFET, IDENTIFICADOR_BUFFET, NOME_BUFFET } from "./buffet";
import { formatarQuantidade } from "./beverage-calculator";
import { formatarData } from "./format";
import { parseConvidados, resumirBebidas } from "./quote";

const NAO_INFORMADO = "não informado";

function nomeServico(id: ServicoId): string {
  return SERVICOS.find((servico) => servico.id === id)?.nome ?? id;
}

function nomeFuncao(id: string): string {
  return FUNCOES_EQUIPE.find((funcao) => funcao.id === id)?.nome ?? id;
}

function lista(valores: string[], vazio = "não informado"): string {
  return valores.length > 0 ? valores.join(", ") : vazio;
}

function textoEquipe(estado: OrcamentoState): string {
  if (estado.equipe === "sim") {
    return `Sim. Funções de interesse: ${lista(
      estado.funcoesEquipe.map(nomeFuncao),
      "a definir com o buffet",
    )}.`;
  }
  if (estado.equipe === "nao") {
    return "Não.";
  }
  if (estado.equipe === "orientacao") {
    return "Precisa de orientação do buffet.";
  }
  return "A confirmar.";
}

export function montarMensagemWhatsApp(estado: OrcamentoState): string {
  const { evento } = estado;
  const linhas: string[] = [];

  linhas.push(`*${NOME_BUFFET}*`);
  linhas.push(IDENTIFICADOR_BUFFET);
  const contatos: string[] = [];
  if (BUFFET.instagram.trim()) {
    contatos.push(`📱 ${BUFFET.instagram.trim()}`);
  }
  if (contatos.length > 0) {
    linhas.push(contatos.join(" | "));
  }
  linhas.push("");

  linhas.push("Olá! Gostaria de solicitar um orçamento para meu evento.");
  linhas.push("");

  linhas.push("*DADOS DO EVENTO*");
  linhas.push(`Nome: ${evento.nome.trim() || NAO_INFORMADO}`);
  linhas.push(`Telefone: ${evento.telefone.trim() || NAO_INFORMADO}`);
  linhas.push(`Tipo de evento: ${evento.tipoEvento.trim() || NAO_INFORMADO}`);
  linhas.push(
    `Data: ${evento.dataEvento ? formatarData(evento.dataEvento) : NAO_INFORMADO}`,
  );
  linhas.push(`Horário: ${evento.horario.trim() || NAO_INFORMADO}`);
  linhas.push(`Local: ${evento.localEvento.trim() || NAO_INFORMADO}`);
  linhas.push(
    `Quantidade de convidados: ${
      parseConvidados(evento.convidados) > 0
        ? parseConvidados(evento.convidados)
        : NAO_INFORMADO
    }`,
  );
  linhas.push("");

  linhas.push("*SERVIÇOS SELECIONADOS*");
  if (estado.servicos.length === 0) {
    linhas.push("Nenhum serviço selecionado.");
  } else {
    for (const servico of estado.servicos) {
      linhas.push(`- ${nomeServico(servico)}`);
    }
  }
  linhas.push("");

  linhas.push("*CARDÁPIO*");
  const cardapio: string[] = [];
  if (estado.servicos.includes("crepe-salgado")) {
    cardapio.push(
      `Crepe salgado: ${lista(estado.crepesSalgados, "a definir pelo buffet")}`,
    );
  }
  if (estado.servicos.includes("crepe-doce")) {
    cardapio.push(
      `Crepe doce: ${lista(estado.crepesDoces, "a definir pelo buffet")}`,
    );
  }
  if (estado.servicos.includes("rodizio-massas")) {
    cardapio.push(
      `Rodízio de massas: ${lista(estado.massas, "itens a confirmar pelo buffet")}`,
    );
  }
  if (estado.servicos.includes("churrasco")) {
    cardapio.push(
      `Churrasco: ${lista(estado.churrasco, "carnes e acompanhamentos a confirmar pelo buffet")}`,
    );
  }
  if (estado.servicos.includes("almoco-jantar")) {
    cardapio.push(
      `Almoço e jantar: ${lista(estado.almocoJantar, "cardápio a confirmar pelo buffet")}`,
    );
    cardapio.push(
      `Prato principal: ${lista(estado.pratoPrincipal, "a confirmar pelo buffet")}`,
    );
    cardapio.push(
      `Acompanhamentos: ${lista(estado.acompanhamentos, "a confirmar pelo buffet")}`,
    );
  }
  if (estado.cardapioPersonalizado.trim()) {
    cardapio.push(`Sugestões do cliente: ${estado.cardapioPersonalizado.trim()}`);
  }
  if (cardapio.length === 0) {
    linhas.push("Não informado.");
  } else {
    for (const linha of cardapio) {
      linhas.push(linha);
    }
  }
  linhas.push("");

  linhas.push("*BEBIDAS*");
  if (!estado.incluirBebidas) {
    linhas.push("Não solicitar bebidas.");
  } else if (estado.bebidas.length === 0) {
    linhas.push(
      "Deseja incluir bebidas, mas ainda não escolheu os itens.",
    );
  } else {
    const resumos = resumirBebidas(estado);
    for (const resumo of resumos) {
      if (resumo.pendente || resumo.quantidade == null) {
        linhas.push(
          `${resumo.nome}: quantidade a confirmar pelo buffet`,
        );
      } else {
        const partes = [formatarQuantidade(resumo.quantidade, resumo.unidade)];
        if (resumo.embalagens != null && resumo.embalagemDescricao) {
          partes.push(
            `${resumo.embalagens} x ${resumo.embalagemDescricao}`,
          );
        }
        linhas.push(`${resumo.nome}: ${partes.join(" — ")}`);
      }
    }
  }
  linhas.push("");

  linhas.push("*EQUIPE DE ATENDIMENTO*");
  linhas.push(textoEquipe(estado));
  linhas.push("");

  linhas.push("*OBSERVAÇÕES*");
  linhas.push(evento.observacoes.trim() || "Nenhuma.");
  linhas.push("");

  linhas.push(
    "Gostaria de receber uma avaliação e uma proposta comercial para este evento.",
  );

  return linhas.join("\n");
}

export function whatsappConfigurado(numero = BUFFET.whatsapp): boolean {
  return numero.replace(/\D/g, "").length >= 10;
}

export function gerarLinkWhatsApp(
  mensagem: string,
  numero = BUFFET.whatsapp,
): string | null {
  const digitos = numero.replace(/\D/g, "");
  if (digitos.length < 10) {
    return null;
  }

  const comPais = digitos.startsWith("55") ? digitos : `55${digitos}`;
  return `https://wa.me/${comPais}?text=${encodeURIComponent(mensagem)}`;
}
