import Image from "next/image";
import Link from "next/link";
import type { Dict } from "../i18n/en";
import { site } from "../site";

export function SiteFooter({ t }: { t: Dict }) {
  const year = new Date().getFullYear();
  const a = site.address;

  return (
    <footer className="on-ink bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="flex items-start gap-4">
          <Image
            src="/images/elite-logo-round.png"
            alt=""
            width={56}
            height={56}
            className="h-14 w-auto"
          />
          <div>
            <p className="font-display text-lg font-bold">{site.name}</p>
            <p className="mt-1 text-sm text-white/75">{t.hero.credential}</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold text-lime">
            {t.footer.contactTitle}
          </h2>
          <address className="mt-3 space-y-1 text-sm not-italic text-white/85">
            <p>{a.street}</p>
            <p>
              {a.city}, {a.region} {a.postalCode}
            </p>
            <p className="pt-2">
              <a href={`tel:${site.phone}`} className="font-semibold text-white hover:underline">
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold text-lime">
            {t.footer.hoursTitle}
          </h2>
          <dl className="mt-3 space-y-1 text-sm text-white/85">
            {t.visit.hours.map((h) => (
              <div key={h.day} className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-white">{h.day}:</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-white/70">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <Link
            href={t.nav.switchHref}
            hrefLang={t.nav.switchLang}
            lang={t.nav.switchLang}
            className="font-semibold text-white hover:underline"
          >
            {t.nav.switchLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
