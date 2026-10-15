import Link from "next/link";
import {
  Users,
  Award,
  ShieldCheck,
  Handshake,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";

const PASSOS = [
  {
    titulo: "Monte sua solicitação",
    texto: "Escolha os serviços, o cardápio, as bebidas e a equipe desejada.",
  },
  {
    titulo: "Envie pelo WhatsApp",
    texto: "A mensagem é preparada automaticamente para você enviar ao buffet.",
  },
  {
    titulo: "Receba a proposta",
    texto: "Avaliamos os detalhes do seu evento e retornamos com a proposta.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full">
      <Hero />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <section id="servicos" className="scroll-mt-20">
          <Reveal>
            <h2 className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">
              Nossos Valores
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
              Acreditamos que cada evento merece cuidado, dedicação e sabores
              especiais. Por isso, trabalhamos para oferecer qualidade, confiança
              e momentos inesquecíveis em cada celebração.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titulo: "Pessoas",
                texto: "Valorizamos cada cliente e acreditamos que os melhores momentos são aqueles compartilhados com pessoas especiais.",
                icone: Users,
              },
              {
                titulo: "Qualidade",
                texto: "Priorizamos ingredientes de qualidade, preparo cuidadoso e sabores que tornam cada evento único.",
                icone: Award,
              },
              {
                titulo: "Respeito",
                texto: "Respeitamos os gostos, as escolhas e as necessidades de cada cliente, oferecendo um atendimento atencioso e transparente.",
                icone: ShieldCheck,
              },
              {
                titulo: "Compromisso",
                texto: "Assumimos cada evento com responsabilidade, dedicação e atenção aos detalhes, buscando atender às expectativas dos nossos clientes.",
                icone: Handshake,
              },
              {
                titulo: "Paixão pela Gastronomia",
                texto: "Colocamos carinho e dedicação em tudo o que fazemos, transformando crepes, massas e churrascos em experiências saborosas.",
                icone: UtensilsCrossed,
              },
              {
                titulo: "Agilidade",
                texto: "Oferecemos um atendimento prático e eficiente, desde a solicitação do orçamento até o planejamento do seu evento.",
                icone: Zap,
              },
            ].map((valor, indice) => (
              <Reveal key={valor.titulo} delay={(indice % 3) * 100}>
                <article className="h-full rounded-2xl border border-line bg-surface/70 p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-line bg-surface-2 flex items-center justify-center">
                      <valor.icone className="h-6 w-6 text-accent-soft" />
                    </div>
                    <h3 className="font-display text-lg text-accent-soft">
                      {valor.titulo}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-muted">{valor.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-6 text-center">
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition hover:border-accent/40 hover:text-accent-soft"
              >
                Ver todos os serviços
              </Link>
            </div>
          </Reveal>
        </section>

        <section className="mt-16">
          <Reveal>
            <h2 className="text-center font-display text-2xl text-accent-soft sm:text-3xl">
              Como funciona
            </h2>
          </Reveal>
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {PASSOS.map((passo, indice) => (
              <Reveal
                as="li"
                key={passo.titulo}
                delay={indice * 100}
                className="rounded-2xl border border-line bg-surface/70 p-5"
              >
                <span className="font-display text-3xl text-accent">
                  {indice + 1}
                </span>
                <p className="mt-2 font-medium text-ink">{passo.titulo}</p>
                <p className="mt-1 text-sm text-muted">{passo.texto}</p>
              </Reveal>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
