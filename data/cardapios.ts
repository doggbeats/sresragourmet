import {
  ACOMPANHAMENTOS,
  CARDAPIOS_ALMOCO_JANTAR,
  CHURRASCO_ITENS,
  CREPES_DOCES,
  CREPES_SALGADOS,
  MASSAS_ITENS,
  MASSAS_MOLHOS,
  PRATOS_PRINCIPAIS,
  SALADAS,
} from "@/data/menu";
import type { ServicoId } from "@/types/quote";

export type SecaoCardapio = { titulo: string; itens: string[] };

export const CARDAPIOS: Partial<Record<ServicoId, SecaoCardapio[]>> = {
  "crepe-salgado": [{ titulo: "Ingredientes", itens: CREPES_SALGADOS }],
  "crepe-doce": [{ titulo: "Recheios", itens: CREPES_DOCES }],
  "rodizio-massas": [
    { titulo: "Tipos de massa:", itens: [...MASSAS_ITENS, ...MASSAS_MOLHOS] },
    { titulo: "Ingredientes", itens: CREPES_SALGADOS },
  ],
  churrasco: [
    { titulo: "Carnes e acompanhamentos", itens: CHURRASCO_ITENS },
  ],
  "almoco-jantar": [
    ...CARDAPIOS_ALMOCO_JANTAR.map((cardapio) => ({
      titulo: cardapio.nome,
      itens: cardapio.itens,
    })),
    { titulo: "Prato principal", itens: PRATOS_PRINCIPAIS },
    { titulo: "Acompanhamentos", itens: ACOMPANHAMENTOS },
    { titulo: "Saladas", itens: SALADAS },
  ],
};
