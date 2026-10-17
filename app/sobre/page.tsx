import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ESPECIALIDADES, NOME_BUFFET } from "@/lib/buffet";

export const metadata: Metadata = {
  title: "Sobre nós — Sr. e Srta. Gourmet",
  description:
    "Conheça a história, os valores e as especialidades do buffet Sr. e Srta. Gourmet.",
};

const DIFERENCIAIS = [
  {
    titulo: "Atendimento próximo",
    texto:
      "Cada evento é único. Por isso, ouvimos as suas ideias e cuidamos de cada detalhe com atenção personalizada.",
  },
  {
    titulo: "Cardápio sob medida",
    texto:
      "Adaptamos crepes, massas, churrasco, bebidas e mais ao seu evento, ao seu gosto e ao seu público.",
  },
  {
    titulo: "Do pedido à proposta",
    texto:
      "Monte seu orçamento pelo site e envie direto pelo WhatsApp. Nós retornamos com uma proposta clara.",
  },
];

const HISTORIA = [
  "Toda grande história começa com um sonho. A nossa nasceu da união de duas pessoas, duas histórias de vida e uma paixão em comum: a arte de cozinhar e transformar momentos especiais em lembranças inesquecíveis.",
  "Ancelmo Rairon Silva Sousa, natural de Bacabal, no Maranhão, tem 40 anos e chegou a Brasília aos 10 anos de idade, trazendo consigo sonhos, esperança e a vontade de construir um futuro melhor. Ao longo de sua trajetória, passou por diferentes áreas profissionais, até descobrir no ramo de buffet sua verdadeira vocação. Há mais de 15 anos, dedica-se à gastronomia e ao universo dos eventos, acumulando experiências e aprendizados que fortaleceram seu amor pela profissão.",
  "Maria das Dores da Silva, carinhosamente conhecida como Elizete, também tem 40 anos e veio de Itaporanga, na Paraíba. Traz consigo suas raízes, os valores familiares e uma história marcada pela dedicação, simplicidade e vontade de vencer.",
  "Os caminhos de Ancelmo e Elizete se cruzaram em uma festa. Desse encontro nasceu uma história de amor que, com o tempo, se transformou também em uma parceria de vida, sonhos e realizações.",
  "Antes de construírem o próprio negócio, os dois trabalharam em outros buffets, desempenhando funções como ajudantes de cozinha, garçons e bartenders. Cada experiência foi importante para o crescimento profissional do casal, ensinando-lhes o valor do trabalho em equipe, da responsabilidade e da dedicação em cada detalhe.",
  "Com experiência, coragem e o desejo de conquistar seu próprio espaço, decidiram unir seus talentos e colocar em prática aquilo que tinham de mais especial: o dom de cozinhar e o prazer de servir bem.",
  "Assim nasceu a Sr e Sra Gourmet, uma empresa construída com muito trabalho, amor e dedicação, que representa a realização de um sonho compartilhado e o compromisso de oferecer experiências gastronômicas especiais.",
  "Hoje, atuamos com buffet em geral, atendendo aniversários, festas de 15 anos, churrascos, almoços, jantares, rodízios de massas, festivais de crepes e diversas outras celebrações. Cada evento recebe nossa atenção e nosso carinho, pois acreditamos que cada cliente tem uma história única e merece um serviço preparado com cuidado, qualidade e profissionalismo.",
  "Para nós, trabalhar com buffet vai muito além de preparar e servir alimentos. É participar de momentos importantes, reunir famílias e amigos, celebrar conquistas e contribuir para que cada ocasião se transforme em uma lembrança feliz.",
  "A Sr e Sra Gourmet é fruto de mais de 15 anos de experiência no ramo, de uma parceria construída com amor e da determinação de duas pessoas que acreditam no poder do trabalho bem-feito.",
  "Somos Ancelmo e Elizete. Somos uma história de amor, superação e paixão pela gastronomia. E é com esse sentimento que recebemos cada cliente, cuidamos de cada detalhe e fazemos parte de cada celebração.",
  "Sr e Sra Gourmet — muito mais que buffet: sabor, carinho e dedicação para tornar seus momentos inesquecíveis!",
  "Será uma honra fazer parte da sua história e contribuir para que seu evento seja tão especial quanto você sonhou.",
];

export default function SobrePage() {
  const especialidades = ESPECIALIDADES.split("|").map((item) => item.trim());

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Sobre nós
          </p>
          <h1 className="mt-3 font-display text-3xl text-accent-soft sm:text-4xl">
            {NOME_BUFFET}
          </h1>
        </Reveal>
      </header>

      <Reveal delay={80}>
        <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line">
          <Image
            src="/buffet.jpg"
            alt={NOME_BUFFET}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 24rem"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={100}>
        <section className="mt-10 space-y-4 text-sm leading-relaxed text-muted">
          <h2 className="font-display text-xl text-accent-soft sm:text-2xl">
            Nossa história: uma trajetória de amor, dedicação e paixão pela
            gastronomia
          </h2>
          {HISTORIA.map((paragrafo) => (
            <p className="text-justify" key={paragrafo}>
              {paragrafo}
            </p>
          ))}
        </section>
      </Reveal>

      <Reveal delay={150}>
        <section className="mt-10">
          <h2 className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Nossas especialidades
          </h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {especialidades.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface-2 px-4 py-1.5 text-xs uppercase tracking-wide text-accent-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {DIFERENCIAIS.map((diferencial, indice) => (
          <Reveal key={diferencial.titulo} delay={indice * 100}>
            <article className="h-full rounded-2xl border border-line bg-surface/70 p-5">
              <h3 className="font-display text-lg text-accent-soft">
                {diferencial.titulo}
              </h3>
              <p className="mt-2 text-sm text-muted">{diferencial.texto}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <Reveal delay={100}>
        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition hover:border-accent/40 hover:text-accent-soft"
          >
            Conheça os serviços
          </Link>
          <Link
            href="/orcamento"
            className="btn-orcamento inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold"
          >
            Solicite seu orçamento
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
