export interface BuffetInfo {
  telefone: string;
  whatsapp: string;
  endereco: string;
  instagram: string;
  email: string;
}

export const NOME_BUFFET = "Sr. e Srta. Gourmet";
export const IDENTIFICADOR_BUFFET = "Buffet para eventos";
export const ESPECIALIDADES =
  "CREPES | CHURRASCO | BAR | ALMOÇO E JANTAR";

export const IMAGEM_FUNDO_HOME = "/salgados.jpg";

export const BUFFET: BuffetInfo = {
  telefone: "61 995999771",
  whatsapp: "61 995999771",
  endereco: "",
  instagram: "@sresrtagourmet.buffet",
  email: "",
};

export interface ContatoBuffet {
  rotulo: string;
  valor: string;
  href?: string;
}

export function obterContatos(buffet: BuffetInfo): ContatoBuffet[] {
  const contatos: ContatoBuffet[] = [];

  if (buffet.telefone.trim()) {
    const digitos = buffet.telefone.replace(/\D/g, "");
    contatos.push({
      rotulo: "Telefone",
      valor: buffet.telefone.trim(),
      href: digitos ? `tel:+${digitos}` : undefined,
    });
  }

  if (buffet.whatsapp.trim()) {
    const digitos = buffet.whatsapp.replace(/\D/g, "");
    contatos.push({
      rotulo: "WhatsApp",
      valor: buffet.whatsapp.trim(),
      href: digitos ? `https://wa.me/${digitos}` : undefined,
    });
  }

  if (buffet.endereco.trim()) {
    contatos.push({
      rotulo: "Endereço",
      valor: buffet.endereco.trim(),
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        buffet.endereco.trim(),
      )}`,
    });
  }

  if (buffet.instagram.trim()) {
    const handle = buffet.instagram.replace(/^@/, "").trim();
    contatos.push({
      rotulo: "Instagram",
      valor: `@${handle}`,
      href: `https://instagram.com/${handle}`,
    });
  }

  if (buffet.email.trim()) {
    contatos.push({
      rotulo: "E-mail",
      valor: buffet.email.trim(),
      href: `mailto:${buffet.email.trim()}`,
    });
  }

  return contatos;
}
