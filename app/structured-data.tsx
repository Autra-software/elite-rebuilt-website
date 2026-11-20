import { site } from "./site";

const data = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/elite-logo-round.png`,
  image: `${site.url}/images/elite-logo-round.png`,
  telephone: site.phone,
  email: site.email,
  description:
    "Official rebuilt title vehicle inspections for the Florida rebuilt title process. FLHSMV Certified PRVIP.",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "City", name: "Miami" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
      description: "By appointment",
    },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "FLHSMV Certified Private Rebuilt Vehicle Inspection Program (PRVIP)",
    recognizedBy: {
      "@type": "GovernmentOrganization",
      name: "Florida Department of Highway Safety and Motor Vehicles",
    },
  },
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
