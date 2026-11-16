"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { Dict } from "../i18n/en";
import { checkVin, decodeVin, describeVehicle, normalizeVin, type VinCheck, type VinVehicle } from "../lib/vin";

type DayOption = { value: string; label: string; dayOfWeek: number };
type TimeOption = { value: string; label: string };

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildAvailableDays(dateLocale: string, totalDays = 45): DayOption[] {
  const options: DayOption[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < totalDays; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) continue; // closed Sunday

    const label = date.toLocaleDateString(dateLocale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    options.push({
      value: formatDateValue(date),
      label: label.charAt(0).toUpperCase() + label.slice(1),
      dayOfWeek,
    });
  }
  return options;
}

function buildTimeOptions(dayOfWeek: number | null, dateLocale: string): TimeOption[] {
  if (dayOfWeek === null) return [];
  const startHour = dayOfWeek === 6 ? 10 : 9;
  const endHour = dayOfWeek === 6 ? 15 : 17;
  const options: TimeOption[] = [];

  for (let hour = startHour; hour <= endHour; hour += 1) {
    options.push({
      value: `${String(hour).padStart(2, "0")}:00`,
      label: new Date(2000, 0, 1, hour).toLocaleTimeString(dateLocale, {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  }
  return options;
}

// True only in the browser. The date list depends on "today", so it must not
// be baked into the static HTML at build time.
const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const fieldClass =
  "w-full rounded-md border border-field bg-white px-4 py-3 text-base text-ink placeholder:text-steel/80 focus:border-ink disabled:cursor-not-allowed disabled:bg-mist disabled:text-steel";
const labelClass = "mb-1.5 block text-sm font-semibold text-ink";

function Required() {
  return (
    <span aria-hidden="true" className="text-red-700">
      {" "}*
    </span>
  );
}

export function BookingForm({ t, dateLocale }: { t: Dict["request"]; dateLocale: string }) {
  const isClient = useIsClient();
  const availableDays = useMemo(
    () => (isClient ? buildAvailableDays(dateLocale) : []),
    [isClient, dateLocale],
  );
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  // VIN: checked when the field loses focus. Warnings never block submission.
  const [vin, setVin] = useState("");
  const [vinCheck, setVinCheck] = useState<VinCheck>("empty");
  const [vinLookup, setVinLookup] = useState<"idle" | "loading" | "done">("idle");
  const [vehicle, setVehicle] = useState<VinVehicle | null>(null);
  const lookupRef = useRef<AbortController | null>(null);
  const checkedVinRef = useRef("");

  async function validateVin() {
    const value = normalizeVin(vin);
    setVin(value);
    if (value === checkedVinRef.current) return;
    checkedVinRef.current = value;

    lookupRef.current?.abort();
    setVehicle(null);
    const result = checkVin(value);
    setVinCheck(result);
    if (result === "empty" || result === "format") {
      setVinLookup("idle");
      return;
    }

    const controller = new AbortController();
    lookupRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 6000);
    setVinLookup("loading");
    const found = await decodeVin(value, controller.signal);
    clearTimeout(timeout);
    if (lookupRef.current !== controller) return; // a newer VIN was entered
    setVehicle(found);
    setVinLookup("done");
  }

  const vinMessage =
    vinCheck === "format"
      ? { tone: "warn", text: t.vinFormatWarning }
      : vinCheck === "checkDigit"
        ? { tone: "warn", text: t.vinCheckDigitWarning }
        : vinCheck === "ok" && vinLookup === "loading"
          ? { tone: "info", text: t.vinChecking }
          : vinCheck === "ok" && vehicle
            ? { tone: "ok", text: `${t.vinFound} ${describeVehicle(vehicle)}` }
            : vinCheck === "ok" && vinLookup === "done"
              ? { tone: "ok", text: t.vinOk }
              : null;

  const selectedDay = availableDays.find((day) => day.value === preferredDate);
  const timeOptions = useMemo(
    () => buildTimeOptions(selectedDay?.dayOfWeek ?? null, dateLocale),
    [selectedDay, dateLocale],
  );

  return (
    <form action="https://formspree.io/f/xojyyqjb" method="POST" className="space-y-5">
      <p className="text-sm text-steel">{t.requiredNote}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className={labelClass}>
            {t.fullName}
            <Required />
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder={t.fullNamePlaceholder}
            className={fieldClass}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            {t.phone}
            <Required />
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={t.phonePlaceholder}
            className={fieldClass}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t.email}
            <Required />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={fieldClass}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="vin" className={labelClass}>
            {t.vin}
            <Required />
          </label>
          <input
            id="vin"
            name="vin"
            type="text"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder={t.vinPlaceholder}
            maxLength={20}
            value={vin}
            onChange={(e) => {
              setVin(e.target.value.toUpperCase());
              // Clear the previous result while the customer edits.
              lookupRef.current?.abort();
              lookupRef.current = null;
              checkedVinRef.current = "";
              setVinCheck("empty");
              setVinLookup("idle");
              setVehicle(null);
            }}
            onBlur={validateVin}
            aria-describedby="vin-help vin-status"
            aria-invalid={vinCheck === "format" || vinCheck === "checkDigit" ? true : undefined}
            className={`${fieldClass} font-mono uppercase tracking-wider placeholder:font-sans placeholder:normal-case placeholder:tracking-normal ${
              vinMessage?.tone === "warn" ? "border-amber-600!" : ""
            } ${vinMessage?.tone === "ok" ? "border-emerald-700!" : ""}`}
            required
          />
          <p id="vin-help" className="mt-1.5 text-sm text-steel">
            {t.vinHelp}
          </p>
          <p
            id="vin-status"
            aria-live="polite"
            className={`mt-1.5 flex items-start gap-2 text-sm font-semibold ${
              vinMessage?.tone === "warn"
                ? "text-amber-800"
                : vinMessage?.tone === "ok"
                  ? "text-emerald-800"
                  : "text-steel"
            }`}
          >
            {vinMessage && (
              <>
                <span aria-hidden="true">
                  {vinMessage.tone === "warn" ? "⚠" : vinMessage.tone === "ok" ? "✓" : "…"}
                </span>
                <span>{vinMessage.text}</span>
              </>
            )}
          </p>
        </div>

        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            {t.day}
            <Required />
          </label>
          <select
            id="preferredDate"
            name="preferredDate"
            value={preferredDate}
            onChange={(e) => {
              setPreferredDate(e.target.value);
              setPreferredTime("");
            }}
            className={fieldClass}
            disabled={!isClient}
            required
          >
            <option value="">{isClient ? t.selectDay : t.loadingDates}</option>
            {availableDays.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="preferredTime" className={labelClass}>
            {t.time}
            <Required />
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className={fieldClass}
            disabled={!preferredDate}
            required
          >
            <option value="">{preferredDate ? t.selectTime : t.selectDayFirst}</option>
            {timeOptions.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-steel">{t.hoursNote}</p>

      <input type="hidden" name="_subject" value={t.subject} />
      <input type="hidden" name="language" value={dateLocale} />
      <input type="hidden" name="vinCheck" value={vinCheck} />
      <input type="hidden" name="vehicleYear" value={vehicle?.year ?? ""} />
      <input type="hidden" name="vehicleMake" value={vehicle?.make ?? ""} />
      <input type="hidden" name="vehicleModel" value={vehicle?.model ?? ""} />

      <div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-ink px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-ink-soft"
        >
          {t.submit}
        </button>
        <p className="mt-3 text-sm leading-6 text-steel">{t.consent}</p>
      </div>
    </form>
  );
}
