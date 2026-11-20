import { site } from "../site";
import type { Dict } from "./en";

/*
  Texto en español. Misma estructura que en.ts.
  Revisar con un hablante nativo antes de publicar.
*/
export const es: Dict = {
  locale: "es",
  dateLocale: "es-US",
  path: "/es",

  meta: {
    title: "Inspecciones de título reconstruido en Miami | Elite Rebuilt Inspections",
    description:
      "Inspecciones oficiales de vehículos reconstruidos en Miami, certificadas por FLHSMV. Lunes a viernes de 9 AM a 5 PM, sábados con cita. Llame al 786-790-5555 o solicite su inspección en línea.",
  },

  nav: {
    skip: "Ir al contenido",
    bring: "Qué traer",
    how: "Cómo funciona",
    faq: "Preguntas",
    request: "Solicitar inspección",
    call: "Llamar",
    menuLabel: "Principal",
    switchLabel: "English",
    switchLang: "en",
    switchHref: "/",
    switchAria: "View this page in English",
  },

  hero: {
    credential: "Certificados por FLHSMV (PRVIP)",
    credentialLong:
      "Certificados por el Departamento de Seguridad en Carreteras y Vehículos Motorizados de Florida",
    title: "Inspecciones oficiales de título reconstruido en Miami",
    lead: "Inspeccionamos vehículos reconstruidos para el proceso de título reconstruido de Florida. Es la única inspección que hacemos, así que le damos respuestas claras sobre lo que el estado necesita de usted.",
    primary: "Solicitar inspección",
    secondary: `Llamar al ${site.phoneDisplay}`,
  },

  visit: {
    title: "Visite nuestra oficina",
    hoursTitle: "Horario",
    hours: [
      { day: "Lunes a viernes", time: "9:00 AM – 5:00 PM" },
      { day: "Sábado", time: "10:00 AM – 3:00 PM, con cita" },
      { day: "Domingo", time: "Cerrado" },
    ],
    google: "Abrir en Google Maps",
    apple: "Abrir en Apple Maps",
    email: "Correo",
    phone: "Teléfono",
  },

  scope: {
    title: "Solo inspecciones de título reconstruido",
    body: "Si su vehículo tuvo un título de salvamento (salvage) y ya fue reparado, Florida exige una inspección oficial antes de titularlo como reconstruido. Esa es la inspección que realizamos.",
    notTitle: "Lo que no hacemos",
    not: "Inspecciones antes de comprar, inspecciones mecánicas ni inspecciones generales de vehículos.",
  },

  bring: {
    title: "Qué traer a su inspección",
    intro: "Responda hasta 3 preguntas rápidas para ver los documentos exactos para su vehículo.",
    questions: {
      who: {
        label: "¿Quién trae el vehículo?",
        options: {
          dealer: { label: "Dealer", hint: "Concesionario con licencia" },
          company: { label: "Compañía", hint: "Una empresa dueña del vehículo" },
          private: { label: "Dueño privado", hint: "El vehículo está a su nombre" },
        },
      },
      first: {
        label: "¿Es su primera inspección con nosotros?",
        options: {
          yes: { label: "Sí, primera vez", hint: "Registramos su negocio una sola vez" },
          no: { label: "No, ya estamos registrados", hint: "Solo los documentos de este vehículo" },
        },
      },
      auction: {
        label: "¿La compañía compró este vehículo en una subasta?",
        options: {
          yes: { label: "Sí, en una subasta", hint: "" },
          no: { label: "No", hint: "" },
        },
      },
      accident: {
        label: "¿El vehículo tuvo un accidente?",
        options: {
          yes: { label: "Sí, tuvo un accidente", hint: "" },
          no: { label: "Sin accidente", hint: "Por ejemplo, lo compró con título salvage" },
        },
      },
      repair: {
        label: "¿Quién reparó el vehículo?",
        options: {
          self: { label: "Lo reparé yo mismo", hint: "" },
          shop: { label: "Un body shop o taller", hint: "" },
        },
      },
    },
    docs: {
      dealerLicense: { text: "Número de licencia de dealer (VI)", hint: "" },
      resaleTax: { text: "Número de Resale tax (certificado de reventa)", hint: "" },
      resaleTaxAuction: {
        text: "Número de Resale tax (certificado de reventa)",
        hint: "Necesario porque el vehículo se compró en una subasta.",
      },
      resaleTaxOnFile: {
        text: "Número de Resale tax (certificado de reventa)",
        hint: "Necesario para vehículos de subasta. No hace falta si ya lo tenemos registrado.",
      },
      ownerLicense: { text: "Licencia de conducir del dueño del negocio", hint: "" },
      ein: { text: "Número EIN", hint: "Como aparece en Sunbiz." },
      title: { text: "Título del vehículo", hint: "" },
      billOfSale: { text: "Recibo de compra (Bill of Sale)", hint: "" },
      partsReceipts: { text: "Recibos de las partes mayores reemplazadas", hint: "" },
      titleOwnerOrInsurer: {
        text: "Título a su nombre o el título enviado por el seguro",
        hint: "",
      },
      accidentPhotos: {
        text: "Fotos del accidente",
        hint: "Impresas, o en su teléfono y se las imprimimos en la oficina.",
      },
      salvageTitle: { text: "Título salvage", hint: "" },
      driverLicense: { text: "Su licencia de conducir", hint: "" },
      workOrder: {
        text: "Orden de trabajo (work order) del body shop o taller que hizo la reparación",
        hint: "",
      },
    },
    empty: "Elija una opción arriba para ver su lista.",
    groups: {
      registration: "Registro inicial",
      registrationBadge: "Solo la primera vez",
      vehicle: "Para este vehículo",
    },
    summaryOne: "Necesita 1 documento. Traiga el original.",
    summaryMany: "Necesita {count} documentos. Traiga los originales.",
    book: "Solicitar una inspección",
    print: "Imprimir o guardar como PDF",
    reset: "Empezar de nuevo",
    allCases: "Ver todos los casos",
    colCase: "Si usted es",
    colDocs: "Traiga",
    note: "¿Tiene dudas sobre algún documento? Llámenos antes de su visita.",
  },

  steps: {
    title: "Cómo funciona",
    items: [
      {
        title: "Solicite una cita",
        body: "Llámenos o envíe el formulario con su VIN y el día y la hora que prefiera.",
      },
      {
        title: "Confirmamos y le decimos qué traer",
        body: "Le llamamos o le enviamos un mensaje para confirmar su cita y responder sus preguntas sobre los documentos.",
      },
      {
        title: "Traiga el vehículo a nuestra oficina",
        body: "Venga a 19100 SW 106 Ave en Miami a la hora de su cita para la inspección.",
      },
    ],
  },

  office: {
    title: "Dentro de nuestra área de inspección",
    body: "Unidad 22 en 19100 SW 106 Ave, Miami, FL 33157.",
    photos: {
      sign: {
        alt: "Sedán blanco junto al letrero de Elite Rebuilt Inspections, certificados por el estado",
        label: "Nuestro taller",
      },
      checking: {
        alt: "Inspector revisando el marco de la puerta de un convertible azul",
        label: "Inspección en curso",
      },
      clipboard: {
        alt: "Inspector con una tablilla junto a un convertible en el área de inspección",
        label: "Inspector",
      },
      engine: {
        alt: "Honda Civic Type R blanco con el capó abierto para la inspección",
        label: "Revisión del motor",
      },
      truck: {
        alt: "Camioneta Chevrolet clásica morada en el área de inspección",
        label: "Camioneta clásica",
      },
    },
  },

  request: {
    title: "Solicitar inspección",
    lead: "Envíe sus datos y la hora que prefiera. Le llamaremos o le enviaremos un mensaje para confirmar la cita.",
    requiredNote: "Los campos marcados con * son obligatorios.",
    fullName: "Nombre completo",
    fullNamePlaceholder: "Nombre y apellido",
    phone: "Teléfono",
    phonePlaceholder: "786-555-0123",
    email: "Correo electrónico",
    emailPlaceholder: "usted@ejemplo.com",
    vin: "VIN",
    vinPlaceholder: "17 caracteres",
    vinChecking: "Verificando el VIN…",
    vinFound: "Vehículo encontrado:",
    vinOk: "El formato del VIN es correcto.",
    vinFormatWarning:
      "Esto no parece un VIN estándar de 17 caracteres. Revíselo, por favor. Si su vehículo es anterior a 1981, puede enviar la solicitud de todos modos.",
    vinCheckDigitWarning:
      "Este VIN no pasa la verificación estándar. Revise si hay errores, como 0 y D u 8 y B. Puede enviar la solicitud de todos modos.",
    vinHelp: "Lo encuentra en el tablero del lado del conductor, en el marco de la puerta o en el título.",
    day: "Día preferido",
    time: "Hora preferida",
    loadingDates: "Cargando calendario…",
    selectedDay: "Seleccionado:",
    saturdayHint: "Los sábados son con cita",
    timeEmpty: "Elija un día en el calendario para ver las horas disponibles.",
    chooseDay: "Elija un día en el calendario.",
    chooseTime: "Elija una hora.",
    hoursNote:
      "Lunes a viernes, de 9:00 AM a 5:00 PM. Sábado con cita, de 10:00 AM a 3:00 PM. Domingo cerrado.",
    submit: "Enviar solicitud",
    consent:
      "Al enviar, acepta que le contactemos por teléfono, mensaje de texto o correo sobre su inspección.",
    subject: "Nueva solicitud de inspección (ES)",
    asideTitle: "¿Prefiere llamar?",
    asideBody: "Podemos responder sus preguntas y reservar su cita por teléfono.",
  },

  faq: {
    title: "Preguntas",
    items: [
      {
        q: "¿Cuánto cuesta la inspección?",
        a: "La inspección cuesta [precio por confirmar]. Llámenos para conocer el precio actual.",
        pending: true,
      },
      {
        q: "¿Cuánto tiempo toma la inspección?",
        a: "La mayoría de las inspecciones toman aproximadamente [tiempo por confirmar].",
        pending: true,
      },
      {
        q: "¿Qué pasa si mi vehículo no pasa la inspección?",
        a: "[Por confirmar con la oficina.]",
        pending: true,
      },
      {
        q: "¿Necesito cita?",
        a: "Solicite una hora en línea o llámenos. Los sábados son solo con cita.",
        pending: false,
      },
      {
        q: "¿Hacen inspecciones antes de comprar o inspecciones mecánicas?",
        a: "No. Solo realizamos inspecciones oficiales de título reconstruido.",
        pending: false,
      },
      {
        q: "¿Atienden en español?",
        a: "Sí. Llámenos y pida atención en español.",
        pending: true,
      },
    ],
  },

  footer: {
    rights: "Todos los derechos reservados.",
    hoursTitle: "Horario",
    contactTitle: "Contacto",
  },

  mobile: {
    call: "Llamar",
    request: "Solicitar",
  },

  pending: "Por confirmar",
  photoPlaceholder: "Espacio para foto",
  illustration: "Ilustración",
};
