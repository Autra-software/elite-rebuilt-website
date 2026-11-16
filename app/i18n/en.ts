import { site } from "../site";

/*
  All English text for the site. Spanish lives in es.ts with the same shape.
  Items marked `pending: true` are not confirmed by the business yet: they show
  with a "Needs confirmation" tag in development and are hidden in production.
*/
export const en = {
  locale: "en",
  dateLocale: "en-US",
  path: "/",

  meta: {
    title: site.title as string,
    description: site.description as string,
  },

  nav: {
    skip: "Skip to content",
    bring: "What to bring",
    how: "How it works",
    faq: "Questions",
    request: "Request an inspection",
    call: "Call",
    menuLabel: "Main",
    switchLabel: "Español",
    switchLang: "es",
    switchHref: "/es",
    switchAria: "Ver esta página en español",
  },

  hero: {
    credential: "FLHSMV Certified PRVIP",
    credentialLong:
      "Certified by the Florida Department of Highway Safety and Motor Vehicles",
    title: "Official rebuilt title inspections in Miami",
    lead: "We inspect rebuilt vehicles for the Florida rebuilt title process. It's the only inspection we do, so you get clear answers about what the state needs from you.",
    primary: "Request an inspection",
    secondary: `Call ${site.phoneDisplay}`,
  },

  visit: {
    title: "Visit our office",
    hoursTitle: "Hours",
    hours: [
      { day: "Monday – Friday", time: "9:00 AM – 5:00 PM" },
      { day: "Saturday", time: "10:00 AM – 3:00 PM, by appointment" },
      { day: "Sunday", time: "Closed" },
    ],
    google: "Open in Google Maps",
    apple: "Open in Apple Maps",
    email: "Email",
    phone: "Phone",
  },

  scope: {
    title: "Rebuilt title inspections only",
    body: "If your vehicle had a salvage title and has been repaired, Florida requires an official rebuilt inspection before it can be titled as rebuilt. That is the inspection we perform.",
    notTitle: "What we don't do",
    not: "Pre-purchase inspections, mechanical inspections and general vehicle inspections.",
  },

  bring: {
    title: "What to bring to your inspection",
    intro: "Have these ready so your inspection isn't delayed.",
    items: [
      { text: "The vehicle's salvage title", pending: true },
      {
        text: "Receipts or bills of sale for all major parts used in the repair",
        pending: true,
      },
      { text: "Photos of the vehicle before it was repaired", pending: true },
      { text: "Your driver license or state ID", pending: true },
      {
        text: "The state forms we tell you to complete when we confirm your appointment",
        pending: true,
      },
    ],
    note: "Not sure about a document? Call us before your visit.",
  },

  steps: {
    title: "How it works",
    items: [
      {
        title: "Request a time",
        body: "Call us or send the form below with your VIN and the day and time you prefer.",
      },
      {
        title: "We confirm and tell you what to bring",
        body: "We call or text to confirm your appointment and answer your questions about the paperwork.",
      },
      {
        title: "Bring the vehicle to our office",
        body: "Come to 19100 SW 106 Ave in Miami at your appointment time for the inspection.",
      },
    ],
  },

  office: {
    title: "Our Miami office",
    body: "Unit 22 at 19100 SW 106 Ave, Miami, FL 33157.",
    photos: {
      front: { alt: "Front of the Elite Rebuilt Inspections office", label: "Office front" },
      bay: { alt: "Vehicle inspection area", label: "Inspection area" },
      vin: { alt: "Checking a vehicle identification number", label: "VIN check" },
      paperwork: { alt: "Vehicle title and parts receipts", label: "Title and paperwork" },
    },
  },

  request: {
    title: "Request an inspection",
    lead: "Send your details and the time you prefer. We'll call or text you to confirm the appointment.",
    requiredNote: "Fields marked * are required.",
    fullName: "Full name",
    fullNamePlaceholder: "First and last name",
    phone: "Phone number",
    phonePlaceholder: "786-555-0123",
    email: "Email",
    emailPlaceholder: "you@example.com",
    vin: "VIN",
    vinPlaceholder: "17 characters",
    vinChecking: "Checking VIN…",
    vinFound: "Vehicle found:",
    vinOk: "VIN format looks correct.",
    vinFormatWarning:
      "This doesn't look like a standard 17-character VIN. Please double-check it. If your vehicle is from before 1981, you can still send the request.",
    vinCheckDigitWarning:
      "This VIN doesn't pass the standard check. Please look for typos, like 0 and D or 8 and B. You can still send the request.",
    vinHelp: "Find it on the driver's side of the dashboard, the door frame or the title.",
    day: "Preferred day",
    time: "Preferred time",
    loadingDates: "Loading dates…",
    selectDay: "Select a day",
    selectTime: "Select a time",
    selectDayFirst: "Select a day first",
    hoursNote:
      "Monday to Friday, 9:00 AM to 5:00 PM. Saturday by appointment, 10:00 AM to 3:00 PM. Closed Sunday.",
    submit: "Send request",
    consent:
      "By submitting, you agree to be contacted by phone, text or email about your inspection.",
    subject: "New Elite Rebuilt Inspection Request",
    asideTitle: "Prefer to call?",
    asideBody: "We can answer your questions and book your time over the phone.",
  },

  faq: {
    title: "Questions",
    items: [
      {
        q: "How much does the inspection cost?",
        a: "The inspection fee is [fee to be confirmed]. Call us for the current fee.",
        pending: true,
      },
      {
        q: "How long does the inspection take?",
        a: "Most inspections take about [time to be confirmed].",
        pending: true,
      },
      {
        q: "What happens if my vehicle doesn't pass?",
        a: "[To be confirmed by the office.]",
        pending: true,
      },
      {
        q: "Do I need an appointment?",
        a: "Request a time online or call us. Saturdays are by appointment only.",
        pending: false,
      },
      {
        q: "Do you do pre-purchase or mechanical inspections?",
        a: "No. We only perform official rebuilt title inspections.",
        pending: false,
      },
      {
        q: "Do you speak Spanish?",
        a: "Yes. Call us and ask for service in Spanish.",
        pending: true,
      },
    ],
  },

  footer: {
    rights: "All rights reserved.",
    hoursTitle: "Hours",
    contactTitle: "Contact",
  },

  mobile: {
    call: "Call",
    request: "Request",
  },

  pending: "Needs confirmation",
  photoPlaceholder: "Photo placeholder",
  illustration: "Illustration",
};

export type Dict = typeof en;
