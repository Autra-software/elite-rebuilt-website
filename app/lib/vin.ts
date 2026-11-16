/*
  VIN helpers, shared by the booking form (and later the chatbot).
  - normalizeVin: uppercase, strip spaces and dashes
  - checkVin: format and check-digit test (North American VINs, 1981 and later)
  - decodeVin: year, make and model from NHTSA's free vPIC service
*/

const VIN_FORMAT = /^[A-HJ-NPR-Z0-9]{17}$/;

// Letter values and position weights from the US VIN standard (49 CFR 565).
const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};
const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

export type VinCheck = "empty" | "format" | "checkDigit" | "ok";

export function normalizeVin(value: string): string {
  return value.toUpperCase().replace(/[\s-]/g, "");
}

export function expectedCheckDigit(vin: string): string | null {
  if (!VIN_FORMAT.test(vin)) return null;
  let sum = 0;
  for (let i = 0; i < 17; i += 1) {
    const ch = vin[i];
    const value = ch >= "0" && ch <= "9" ? Number(ch) : LETTER_VALUES[ch];
    sum += value * WEIGHTS[i];
  }
  const remainder = sum % 11;
  return remainder === 10 ? "X" : String(remainder);
}

export function checkVin(raw: string): VinCheck {
  const vin = normalizeVin(raw);
  if (!vin) return "empty";
  if (!VIN_FORMAT.test(vin)) return "format";
  return vin[8] === expectedCheckDigit(vin) ? "ok" : "checkDigit";
}

export type VinVehicle = { year: string; make: string; model: string };

function titleCase(word: string) {
  // Keep short brand names as written (BMW, GMC, KIA); title-case the rest.
  if (word.length <= 3) return word;
  return word
    .toLowerCase()
    .replace(/(^|[\s-])([a-z])/g, (_m, sep: string, ch: string) => sep + ch.toUpperCase());
}

export function describeVehicle(v: VinVehicle): string {
  return [v.year, titleCase(v.make), v.model].filter(Boolean).join(" ");
}

/** Looks up a 17-character VIN. Returns null if not found, offline or slow. */
export async function decodeVin(vin: string, signal?: AbortSignal): Promise<VinVehicle | null> {
  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${encodeURIComponent(vin)}?format=json`,
      { signal },
    );
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const row = (data as { Results?: Record<string, unknown>[] }).Results?.[0];
    if (!row) return null;
    const pick = (key: string) => (typeof row[key] === "string" ? (row[key] as string).trim() : "");
    const vehicle = { year: pick("ModelYear"), make: pick("Make"), model: pick("Model") };
    return vehicle.make ? vehicle : null;
  } catch {
    return null;
  }
}
