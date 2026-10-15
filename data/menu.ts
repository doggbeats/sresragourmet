export const CREPES_SALGADOS = [
  "Queijo 🧀",
  "Presunto 🍖",
  "Frango 🍗",
  "Calabresa 🥓",
  "Carne de sol 🥩",
  "Tomate 🍅",
  "Cebola 🧅",
  "Milho 🌽",
  "Azeitona 🫒",
  "Cheddar 🧀",
  "Catupiry 🧀",
  "Batata palha 🥔",
  "Orégano 🌿",
  "Alho frito 🧄",
  "Pimenta calabresa 🌶️",
  "Rúcula 🥬",
  "Manjericão 🍃",
];

export const CREPES_DOCES = [
  "Chocolate",
  "Banana",
  "Doce de leite",
  "Morango",
  "Goiabada",
  "Canela",
  "Leite condensado",
  "Coco ralado",
];

export interface CardapioAlmocoJantar {
  nome: string;
  itens: string[];
}

export const CARDAPIOS_ALMOCO_JANTAR: CardapioAlmocoJantar[] = [
  {
    nome: "Cardápio econômico",
    itens: [
      "Frango ao molho de ervas",
      "Carne assada ao molho madeira",
      "Arroz branco",
      "Macarrão alho e óleo",
      "Salada tropical",
      "Farofa temperada",
    ],
  },
  {
    nome: "Cardápio intermediário",
    itens: [
      "Maminha ao molho roti",
      "Frango recheado com queijo e presunto",
      "Arroz à grega",
      "Batatas gratinadas",
      "Salada tropical",
      "Legumes na manteiga",
    ],
  },
  {
    nome: "Cardápio sofisticado",
    itens: [
      "Filé-mignon ao molho madeira",
      "Salmão ao molho de maracujá",
      "Arroz com amêndoas",
      "Risoto de parmesão",
      "Salada especial",
      "Batatas rústicas",
    ],
  },
];

export const MASSAS_ITENS = ["Espaguete", "Penne", "Talharim"];

export const MASSAS_MOLHOS: string[] = [];

export const CHURRASCO_ITENS = [
  "Arroz",
  "Vinagrete",
  "Mandioca",
  "Farofa",
  "Picanha",
  "Alcatra",
  "Maminha",
  "Fraldinha",
  "Contra filé",
  "Cupim",
  "Costela",
  "Linguiça de frango",
  "Linguiça suína",
  "Linguiça apimentada",
  "Chuleta",
  "Panceta",
  "Asinha de frango",
  "Coxinha da asa",
];
