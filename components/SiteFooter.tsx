import { InstagramIcon, WhatsAppIcon } from "./icons";
import { BUFFET, IDENTIFICADOR_BUFFET, NOME_BUFFET } from "@/lib/buffet";

function linkWhatsapp(numero: string): string | null {
  const digitos = numero.replace(/\D/g, "");
  if (!digitos) return null;
  const comPais = digitos.startsWith("55") ? digitos : `55${digitos}`;
  return `https://wa.me/${comPais}`;
}

export function SiteFooter() {
  const whatsapp = linkWhatsapp(BUFFET.whatsapp);
  const instagram = BUFFET.instagram.replace(/^@/, "");

  return (
    <footer className="nao-imprimir border-t border-line/70 bg-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 text-center sm:px-6">
        <div>
          <p className="font-display text-lg text-accent-soft">{NOME_BUFFET}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
            {IDENTIFICADOR_BUFFET}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent/40 hover:text-accent-soft"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          ) : null}
          {instagram ? (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent/40 hover:text-accent-soft"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          ) : null}
        </div>

        <p className="text-xs text-muted/60">
          © {NOME_BUFFET}. Todos os direitos reservados.
        </p>

        <div className="mt-2 border-t border-line/60 pt-5 text-center">
          <p className="text-xs text-muted/60">
            Site desenvolvido pela @code_ph_sd
          </p>
        </div>
      </div>
    </footer>
  );
}
