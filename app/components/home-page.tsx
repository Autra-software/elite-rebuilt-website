import Image from "next/image";
import type { Dict } from "../i18n/en";
import { site } from "../site";
import { BookingForm } from "./booking-form";
import { PendingTag, SHOW_PENDING, visible } from "./pending";
import { Photo, slotHasImage, type PhotoKey } from "./photo";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const mapsQuery = encodeURIComponent(
  `${site.address.street} ${site.address.city} ${site.address.region} ${site.address.postalCode}`,
);
const googleMaps = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const appleMaps = `https://maps.apple.com/?q=${mapsQuery}`;

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Desktop: one full-width lead photo, then a staggered grid (wide, tall / tall, wide).
type OfficePhoto = { key: PhotoKey; size: "full" | "wide" | "tall"; position?: string };
const officePhotos: OfficePhoto[] = [
  { key: "sign", size: "full", position: "center 52%" },
  { key: "checking", size: "wide", position: "center 55%" },
  { key: "clipboard", size: "tall" },
  { key: "engine", size: "tall", position: "center 65%" },
  { key: "truck", size: "wide", position: "center 60%" },
];

const photoLayout = {
  full: {
    sizes: "(min-width: 1152px) 1112px, 100vw",
    className: "aspect-[4/3] sm:col-span-2 sm:aspect-[16/9] lg:col-span-3 lg:aspect-auto",
  },
  wide: {
    sizes: "(min-width: 1152px) 740px, (min-width: 1024px) 66vw, 100vw",
    className: "aspect-[4/3] sm:col-span-2 lg:aspect-auto",
  },
  tall: {
    sizes: "(min-width: 1152px) 360px, (min-width: 640px) 50vw, 100vw",
    className: "aspect-[3/4] lg:aspect-auto",
  },
};

export function HomePage({ t }: { t: Dict }) {
  const bringItems = visible(t.bring.items);
  const showBring = bringItems.length > 0;
  const faqItems = visible(t.faq.items);
  const showOffice = SHOW_PENDING || officePhotos.some(({ key }) => slotHasImage(key));
  const a = site.address;

  return (
    <div lang={t.locale} className="flex min-h-full flex-1 flex-col pb-[4.5rem] md:pb-0">
      <SiteHeader t={t} showBring={showBring} />

      <main id="main" className="flex-1">
        {/* Hero: who we are, the one main action, and how to find us */}
        <section className="on-ink bg-ink text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:items-center md:py-20 lg:gap-16">
            <div className="rise">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex rounded-md bg-white px-3 py-2">
                  <Image
                    src="/images/flhsmv-logo.png"
                    alt="FLHSMV"
                    width={88}
                    height={36}
                    className="h-9 w-[88px] object-contain"
                    priority
                  />
                </span>
                <p className="flex items-center gap-2 text-base font-semibold text-lime">
                  <CheckIcon className="h-5 w-5" />
                  <span title={t.hero.credentialLong}>{t.hero.credential}</span>
                </p>
              </div>

              <h1 className="mt-7 max-w-[19ch] font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-[58ch] text-lg leading-8 text-white/85">{t.hero.lead}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#request"
                  className="inline-flex items-center justify-center rounded-md bg-lime px-6 py-4 text-base font-bold text-ink transition-colors hover:bg-lime-soft"
                >
                  {t.hero.primary}
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center justify-center rounded-md border-2 border-white/60 px-6 py-[0.875rem] text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </div>

            <aside className="rise rise-delay rounded-lg bg-white p-6 text-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)] md:p-8">
              <h2 className="font-display text-xl font-bold">{t.visit.title}</h2>
              <address className="mt-3 text-base not-italic leading-7">
                {a.street}
                <br />
                {a.city}, {a.region} {a.postalCode}
              </address>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                <a href={googleMaps} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  {t.visit.google}
                </a>
                <a href={appleMaps} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  {t.visit.apple}
                </a>
              </p>

              <h3 className="mt-6 font-display text-base font-semibold">{t.visit.hoursTitle}</h3>
              <dl className="mt-2 divide-y divide-line text-sm">
                {t.visit.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 py-2">
                    <dt className="font-semibold">{h.day}</dt>
                    <dd className="text-right text-steel">{h.time}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 border-t border-line pt-4 text-sm">
                <span className="text-steel">{t.visit.email}: </span>
                <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
                  {site.email}
                </a>
              </p>
            </aside>
          </div>
        </section>

        {/* What we do and don't do */}
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:py-16 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">{t.scope.title}</h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-8 text-steel">{t.scope.body}</p>
            </div>
            <div className="self-end rounded-lg bg-mist p-6">
              <h3 className="font-display text-base font-semibold">{t.scope.notTitle}</h3>
              <p className="mt-2 text-base leading-7 text-steel">{t.scope.not}</p>
            </div>
          </div>
        </section>

        {/* What to bring: styled like an official checklist form */}
        {showBring && (
          <section id="what-to-bring" className="bg-mist">
            <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
              <div className="mx-auto max-w-3xl rounded-sm border border-ink bg-white shadow-[6px_6px_0_0_var(--color-ink)]">
                <div className="border-b-4 border-double border-ink px-6 py-5 md:px-10">
                  <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {t.bring.title}
                  </h2>
                  <p className="mt-1 text-base text-steel">{t.bring.intro}</p>
                </div>
                <ul className="px-6 py-4 md:px-10">
                  {bringItems.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-4 border-b border-dashed border-field py-4 last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 h-6 w-6 shrink-0 rounded-[3px] border-2 border-ink"
                      />
                      <span className="text-base leading-7">
                        {item.text}
                        {item.pending && <PendingTag label={t.pending} />}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-ink bg-mist px-6 py-4 text-sm font-semibold md:px-10">
                  {t.bring.note}{" "}
                  <a href={`tel:${site.phone}`} className="underline underline-offset-4">
                    {site.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* How it works: a real sequence, so it is numbered */}
        <section id="how-it-works">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight">{t.steps.title}</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
              {t.steps.items.map((step, i) => (
                <li key={step.title} className="relative md:pr-6">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-md bg-ink font-display text-lg font-bold text-lime"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-7 text-steel">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Inspection bay photos */}
        {showOffice && (
          <section className="border-t border-line">
            <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold tracking-tight">{t.office.title}</h2>
                <p className="mt-3 text-lg leading-8 text-steel">{t.office.body}</p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:auto-rows-[30rem] lg:grid-cols-3">
                {officePhotos.map(({ key, size, position }) => (
                  <Photo
                    key={key}
                    photo={key}
                    alt={t.office.photos[key].alt}
                    label={t.office.photos[key].label}
                    illustrationText={t.illustration}
                    placeholderText={t.photoPlaceholder}
                    position={position}
                    sizes={photoLayout[size].sizes}
                    className={photoLayout[size].className}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Request form */}
        <section id="request" className="bg-mist">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t.request.title}
              </h2>
              <p className="mt-3 max-w-[60ch] text-lg leading-8 text-steel">{t.request.lead}</p>
              <div className="mt-8 rounded-lg border border-line bg-white p-6 md:p-8">
                <BookingForm t={t.request} dateLocale={t.dateLocale} />
              </div>
            </div>

            <aside className="on-ink h-fit rounded-lg bg-ink p-6 text-white md:p-8 lg:mt-[4.5rem]">
              <h3 className="font-display text-xl font-bold">{t.request.asideTitle}</h3>
              <p className="mt-2 text-base leading-7 text-white/85">{t.request.asideBody}</p>
              <a
                href={`tel:${site.phone}`}
                className="mt-5 block font-display text-3xl font-extrabold tracking-tight text-lime hover:underline"
              >
                {site.phoneDisplay}
              </a>
              <dl className="mt-6 space-y-2 border-t border-white/15 pt-5 text-sm">
                {t.visit.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="font-semibold">{h.day}</dt>
                    <dd className="text-right text-white/80">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-6 text-white/85">
                {a.street}, {a.city}, {a.region} {a.postalCode}
                <br />
                <a href={googleMaps} target="_blank" rel="noreferrer" className="font-semibold text-white underline underline-offset-4">
                  {t.visit.google}
                </a>
              </p>
            </aside>
          </div>
        </section>

        {/* Questions */}
        <section id="questions">
          <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight">{t.faq.title}</h2>
            <div className="mt-8 border-t border-line">
              {faqItems.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-lg font-semibold">
                    <span>
                      {item.q}
                      {item.pending && <PendingTag label={t.pending} />}
                    </span>
                    <span
                      aria-hidden="true"
                      className="faq-icon text-2xl leading-none text-steel transition-transform"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 pr-10 text-base leading-7 text-steel">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter t={t} />

      {/* Mobile: call or request is always one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white p-2.5 md:hidden">
        <a
          href={`tel:${site.phone}`}
          className="flex items-center justify-center rounded-md border-2 border-ink py-3 text-base font-bold"
        >
          {t.mobile.call}
        </a>
        <a
          href="#request"
          className="flex items-center justify-center rounded-md bg-ink py-3 text-base font-bold text-white"
        >
          {t.mobile.request}
        </a>
      </div>
    </div>
  );
}
