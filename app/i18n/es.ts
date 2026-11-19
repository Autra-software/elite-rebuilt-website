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
    intro: "Tenga esto listo para que su inspección no se retrase.",
    items: [
      { text: "El título de salvamento (salvage) del vehículo", pending: true },
      {
        text: "Recibos o facturas de compra de todas las piezas principales usadas en la reparación",
        pending: true,
      },
      { text: "Fotos del vehículo antes de la reparación", pending: true },
      { text: "Su licencia de conducir o identificación estatal", pending: true },
      {
        text: "Los formularios estatales que le indiquemos al confirmar su cita",
        pending: true,
      },
    ],
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
