import Image from "next/image";
import Link from "next/link";
import type { Dict } from "../i18n/en";
import { site } from "../site";

export function SiteHeader({ t, showBring }: { t: Dict; showBring: boolean }) {
  const nav = [
    ...(showBring ? [{ href: "#what-to-bring", label: t.nav.bring }] : []),
    { href: "#how-it-works", label: t.nav.how },
    { href: "#questions", label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 md:h-[4.5rem]">
        <Link href={t.path} className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/elite-logo-round.png"
            alt=""
            width={44}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="font-display text-base font-bold leading-tight tracking-tight md:text-lg">
            Elite Rebuilt
            <span className="block text-xs font-medium tracking-normal text-steel md:text-sm">
              Inspections
            </span>
          </span>
        </Link>

        <nav aria-label={t.nav.menuLabel} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="underline-offset-4 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <a
            href={`tel:${site.phone}`}
            className="hidden font-display text-lg font-bold tracking-tight md:inline"
          >
            {site.phoneDisplay}
          </a>
          <Link
            href={t.nav.switchHref}
            hrefLang={t.nav.switchLang}
            lang={t.nav.switchLang}
            aria-label={t.nav.switchAria}
            className="rounded-md border border-field px-3 py-1.5 text-sm font-semibold hover:border-ink"
          >
            {t.nav.switchLabel}
          </Link>
          <a
            href="#request"
            className="hidden rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft sm:inline-block"
          >
            {t.nav.request}
          </a>
        </div>
      </div>
    </header>
  );
}
