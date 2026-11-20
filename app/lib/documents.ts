/*
  Which documents a customer brings to the rebuilt inspection.
  Source: the office's handwritten notes, confirmed by the business on 2026-11-19
  (see the "Vehicle Inspection Document Requirements" doc).

  One set of rules for every channel: the "What to bring" section on the site,
  the booking form, and (later) the chat and phone assistant.
  Document wording lives in app/i18n/{en,es}.ts under bring.docs.
  No imports, so `node --test` can load this file directly.
*/

export type CustomerType = "dealer" | "company" | "private";
export type YesNo = "yes" | "no";

export type Answers = {
  who?: CustomerType;
  /** Dealer or company: first inspection with us (one-time registration) */
  first?: YesNo;
  /** Company: vehicle bought at an auction (needs the resale tax number) */
  auction?: YesNo;
  /** Private owner: the vehicle was in an accident */
  accident?: YesNo;
  /** Private owner: who did the repair */
  repair?: "self" | "shop";
};

export type QuestionId = keyof Answers;

export type DocId =
  | "dealerLicense"
  | "resaleTax"
  | "resaleTaxAuction"
  | "resaleTaxOnFile"
  | "ownerLicense"
  | "ein"
  | "title"
  | "billOfSale"
  | "partsReceipts"
  | "titleOwnerOrInsurer"
  | "accidentPhotos"
  | "salvageTitle"
  | "driverLicense"
  | "workOrder";

export type DocGroup = { kind: "registration" | "vehicle"; docs: DocId[] };

export const QUESTION_OPTIONS = {
  who: ["dealer", "company", "private"],
  first: ["yes", "no"],
  auction: ["yes", "no"],
  accident: ["yes", "no"],
  repair: ["self", "shop"],
} as const satisfies Record<QuestionId, readonly string[]>;

const PATHS: Record<CustomerType, QuestionId[]> = {
  dealer: ["who", "first"],
  company: ["who", "first", "auction"],
  private: ["who", "accident", "repair"],
};

/** The questions to show, in order, for the answers given so far. */
export function questionsFor(a: Answers): QuestionId[] {
  if (a.who === "dealer") return ["who", "first"];
  if (a.who === "company") return a.first ? ["who", "first", "auction"] : ["who", "first"];
  if (a.who === "private") return a.accident ? ["who", "accident", "repair"] : ["who", "accident"];
  return ["who"];
}

const VEHICLE: DocId[] = ["title", "billOfSale", "partsReceipts"];

/** The documents to bring, or null while questions are still unanswered. */
export function requiredDocs(a: Answers): DocGroup[] | null {
  switch (a.who) {
    case "dealer": {
      if (!a.first) return null;
      const vehicle: DocGroup = { kind: "vehicle", docs: VEHICLE };
      return a.first === "yes"
        ? [
            { kind: "registration", docs: ["dealerLicense", "resaleTax", "ownerLicense", "ein"] },
            vehicle,
          ]
        : [vehicle];
    }
    case "company": {
      // A company registers like a dealer but is not one: no dealer license number.
      if (!a.first || !a.auction) return null;
      const auction = a.auction === "yes";
      if (a.first === "yes") {
        const registration: DocId[] = ["ownerLicense", "ein"];
        if (auction) registration.push("resaleTaxAuction");
        return [
          { kind: "registration", docs: registration },
          { kind: "vehicle", docs: VEHICLE },
        ];
      }
      return [{ kind: "vehicle", docs: auction ? [...VEHICLE, "resaleTaxOnFile"] : VEHICLE }];
    }
    case "private": {
      if (!a.accident || !a.repair) return null;
      const docs: DocId[] =
        a.accident === "yes"
          ? ["titleOwnerOrInsurer", "partsReceipts", "accidentPhotos", "driverLicense"]
          : ["salvageTitle", "billOfSale", "partsReceipts", "driverLicense"];
      if (a.repair === "shop") docs.push("workOrder");
      return [{ kind: "vehicle", docs }];
    }
    default:
      return null;
  }
}

/** Every complete combination of answers, for the "see every case" table and tests. */
export const ALL_CASES: Answers[] = [
  { who: "dealer", first: "yes" },
  { who: "dealer", first: "no" },
  { who: "company", first: "yes", auction: "yes" },
  { who: "company", first: "yes", auction: "no" },
  { who: "company", first: "no", auction: "yes" },
  { who: "company", first: "no", auction: "no" },
  { who: "private", accident: "yes", repair: "self" },
  { who: "private", accident: "yes", repair: "shop" },
  { who: "private", accident: "no", repair: "self" },
  { who: "private", accident: "no", repair: "shop" },
];

/** Reads answers from a query string, ignoring unknown or invalid values. */
export function parseAnswers(search: string): Answers {
  const params = new URLSearchParams(search);
  const answers: Answers = {};
  for (const q of Object.keys(QUESTION_OPTIONS) as QuestionId[]) {
    const value = params.get(q);
    if (value && (QUESTION_OPTIONS[q] as readonly string[]).includes(value)) {
      (answers as Record<string, string>)[q] = value;
    }
  }
  // Keep only answers that belong to this customer type's questions.
  const path = answers.who ? PATHS[answers.who] : ["who"];
  for (const q of Object.keys(answers) as QuestionId[]) {
    if (!path.includes(q)) delete answers[q];
  }
  return answers;
}

/** Writes answers into a query string, keeping any other parameters. */
export function answersToSearch(answers: Answers, current: string): string {
  const params = new URLSearchParams(current);
  for (const q of Object.keys(QUESTION_OPTIONS)) params.delete(q);
  for (const [q, v] of Object.entries(answers)) if (v) params.set(q, v);
  const s = params.toString();
  return s ? `?${s}` : "";
}

/** Sets one answer. Changing the customer type starts over. */
export function answer(a: Answers, q: QuestionId, value: string): Answers {
  if (q === "who") return parseAnswers(`who=${encodeURIComponent(value)}`);
  return parseAnswers(answersToSearch({ ...a, [q]: value }, ""));
}
