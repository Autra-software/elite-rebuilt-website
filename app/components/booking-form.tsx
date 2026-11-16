"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import type { Dict } from "../i18n/en";
import { AppointmentPicker } from "./appointment-picker";
import { checkVin, decodeVin, describeVehicle, normalizeVin, type VinCheck, type VinVehicle } from "../lib/vin";

// True only in the browser. The calendar depends on "today", so it must not
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
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [dayError, setDayError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  // Runs after the browser's own checks pass. Day and time are custom controls,
  // so they are checked here.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (preferredDate && preferredTime) return;
    e.preventDefault();
    setDayError(!preferredDate);
    setTimeError(!preferredTime);
    const target = !preferredDate
      ? document.querySelector<HTMLElement>("#appointment-day .rdp-day_button:not([disabled])")
      : document.querySelector<HTMLElement>('input[name="preferredTime"]');
    target?.focus();
  }

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

  return (
    <form
      action="https://formspree.io/f/xojyyqjb"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
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

        {isClient ? (
          <AppointmentPicker
            t={t}
            dateLocale={dateLocale}
            date={preferredDate}
            time={preferredTime}
            onDateChange={(value) => {
              setPreferredDate(value);
              setDayError(false);
            }}
            onTimeChange={(value) => {
              setPreferredTime(value);
              if (value) setTimeError(false);
            }}
            dayError={dayError}
            timeError={timeError}
          />
        ) : (
          <p className="rounded-md border border-dashed border-field bg-mist p-4 text-sm text-steel sm:col-span-2">
            {t.loadingDates}
          </p>
        )}
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
