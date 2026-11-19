import type { Metadata } from "next";
import { HomePage } from "../components/home-page";
import { es } from "../i18n/es";
import { site } from "../site";

export const metadata: Metadata = {
  title: es.meta.title,
  description: es.meta.description,
  alternates: {
    canonical: "/es",
    languages: { "en-US": "/", "es-US": "/es", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: "/es",
    siteName: site.name,
    title: es.meta.title,
    description: es.meta.description,
    locale: "es_US",
    alternateLocale: ["en_US"],
    images: [{ url: "/images/og-image-es.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: es.meta.title,
    description: es.meta.description,
    images: ["/images/og-image-es.jpg"],
  },
};

export default function Page() {
  return <HomePage t={es} />;
}
