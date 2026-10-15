import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import {
  BUFFET,
  IDENTIFICADOR_BUFFET,
  NOME_BUFFET,
  obterContatos,
} from "@/lib/buffet";

export const metadata: Metadata = {
  title: "Contato — Sr. e Srta. Gourmet",
  description:
    "Fale com o buffet Sr. e Srta. Gourmet pelo WhatsApp ou Instagram.",
};

function IconeContato({ rotulo }: { rotulo: string }) {
  const classe = "h-5 w-5";
  switch (rotulo) {
    case "Telefone":
      return <Phone className={classe} />;
    case "WhatsApp":
      return <WhatsAppIcon className={classe} />;
    case "Instagram":
      return <InstagramIcon className={classe} />;
    case "Endereço":
      return <MapPin className={classe} />;
    case "E-mail":
      return <Mail className={classe} />;
    default:
      return null;
  }
}

export default function ContatoPage() {
  const contatos = obterContatos(BUFFET);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <h1 className="font-display text-3xl text-accent-soft sm:text-4xl">
          Contato
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          {NOME_BUFFET} — {IDENTIFICADOR_BUFFET}. Fale com a gente para tirar
          dúvidas ou solicitar um orçamento.
        </p>
      </header>

      <ul className="mt-8 space-y-3">
        {contatos.map((contato) => {
          const conteudo = (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-accent-soft">
                <IconeContato rotulo={contato.rotulo} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-muted">
                  {contato.rotulo}
                </span>
                <span className="block truncate text-sm text-ink">
                  {contato.valor}
                </span>
              </span>
            </>
          );

          return (
            <li key={contato.rotulo}>
              {contato.href ? (
                <a
                  href={contato.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface/70 px-4 py-3 transition hover:border-accent/40"
                >
                  {conteudo}
                </a>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/70 px-4 py-3">
                  {conteudo}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-8 text-center">
        <Link
          href="/orcamento"
          className="btn-orcamento inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold"
        >
          Solicite seu orçamento
        </Link>
      </div>
    </main>
  );
}
