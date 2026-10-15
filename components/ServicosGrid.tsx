import { SERVICOS } from "@/data/services";
import { Reveal } from "./Reveal";
import { ServicoCard } from "./ServicoCard";

export function ServicosGrid() {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {SERVICOS.map((servico, indice) => (
        <Reveal key={servico.id} delay={(indice % 3) * 100}>
          <ServicoCard servico={servico} />
        </Reveal>
      ))}
    </div>
  );
}
