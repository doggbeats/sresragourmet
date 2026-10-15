export function formatarData(iso: string): string {
  if (!iso) {
    return "";
  }

  const [ano, mes, dia] = iso.split("-");
  if (!ano || !mes || !dia) {
    return iso;
  }

  const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
