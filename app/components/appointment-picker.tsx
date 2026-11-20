"use client";

import { useMemo } from "react";
import { DayPicker, type Matcher } from "react-day-picker";
import { enUS, es } from "react-day-picker/locale";
import "react-day-picker/style.css";
import type { Dict } from "../i18n/en";

/*
  Calendar + time buttons for the inspection request form.
  Open: Monday–Friday 9 AM–5 PM, Saturday 10 AM–3 PM (by appointment), closed Sunday.
  Bookable range: today through BOOKING_DAYS ahead.
  `unavailableDates` is for the future booking backend: fully booked days grey out.
*/
export const BOOKING_DAYS = 45;

export function toDateValue(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromDateValue(value: string): Date | undefined {
  if (!value) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function timeSlots(day: Date | undefined, dateLocale: string) {
  if (!day) return [];
  const saturday = day.getDay() === 6;
  const start = saturday ? 10 : 9;
  const end = saturday ? 15 : 17;
  const slots: { value: string; label: string }[] = [];
  for (let hour = start; hour <= end; hour += 1) {
    slots.push({
      value: `${String(hour).padStart(2, "0")}:00`,
      label: new Date(2000, 0, 1, hour).toLocaleTimeString(dateLocale, {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  }
  return slots;
}

type Props = {
  t: Dict["request"];
  dateLocale: string;
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  dayError: boolean;
  timeError: boolean;
  unavailableDates?: Date[];
};

export function AppointmentPicker({
  t,
  dateLocale,
  date,
  time,
  onDateChange,
  onTimeChange,
  dayError,
  timeError,
  unavailableDates = [],
}: Props) {
  const isSpanish = dateLocale.startsWith("es");
  const selected = fromDateValue(date);

  const { today, lastDay } = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + BOOKING_DAYS - 1);
    return { today: start, lastDay: end };
  }, []);

  const disabled: Matcher[] = [
    { before: today },
    { after: lastDay },
    { dayOfWeek: [0] },
    ...unavailableDates,
  ];

  const slots = timeSlots(selected, dateLocale);
  const selectedLabel = selected
    ? selected.toLocaleDateString(dateLocale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="grid gap-6 sm:col-span-2 md:grid-cols-[auto_1fr] md:gap-8">
      <fieldset id="appointment-day" aria-describedby="day-status">
        <legend className="mb-2 text-sm font-semibold text-ink">
          {t.day}
          <span aria-hidden="true" className="text-red-700">
            {" "}*
          </span>
        </legend>
        <div
          className={`appointment-calendar w-fit rounded-md border bg-white p-2 ${
            dayError ? "border-red-700" : "border-field"
          }`}
        >
          <DayPicker
            mode="single"
            required
            locale={isSpanish ? es : enUS}
            weekStartsOn={isSpanish ? 1 : 0}
            selected={selected}
            onSelect={(day) => {
              if (!day) return;
              onDateChange(toDateValue(day));
              onTimeChange("");
            }}
            disabled={disabled}
            startMonth={today}
            endMonth={lastDay}
            defaultMonth={selected ?? today}
            modifiers={{ saturday: { dayOfWeek: [6] } }}
            modifiersClassNames={{ saturday: "day-saturday" }}
          />
          <p className="flex items-center gap-2 px-2 pb-1 pt-2 text-xs text-steel">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-flag" />
            {t.saturdayHint}
          </p>
        </div>
        <p id="day-status" aria-live="polite" className="mt-2 text-sm">
          {selected ? (
            <span className="font-semibold text-ink">
              {t.selectedDay} {selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1)}
            </span>
          ) : dayError ? (
            <span className="font-semibold text-red-700">{t.chooseDay}</span>
          ) : null}
        </p>
      </fieldset>

      <fieldset aria-describedby="time-status">
        <legend className="mb-2 text-sm font-semibold text-ink">
          {t.time}
          <span aria-hidden="true" className="text-red-700">
            {" "}*
          </span>
        </legend>
        {slots.length === 0 ? (
          <p className="rounded-md border border-dashed border-field bg-mist p-4 text-sm text-steel">
            {t.timeEmpty}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-2">
            {slots.map((slot) => {
              const checked = time === slot.value;
              return (
                <label
                  key={slot.value}
                  className={`relative flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border-2 px-2 py-2.5 text-sm font-semibold transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink ${
                    checked
                      ? "border-ink bg-ink text-white"
                      : "border-field bg-white text-ink hover:border-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name="preferredTime"
                    value={slot.value}
                    checked={checked}
                    onChange={() => onTimeChange(slot.value)}
                    className="sr-only"
                  />
                  {slot.label}
                </label>
              );
            })}
          </div>
        )}
        <p id="time-status" aria-live="polite" className="mt-2 text-sm">
          {timeError && !time && slots.length > 0 ? (
            <span className="font-semibold text-red-700">{t.chooseTime}</span>
          ) : null}
        </p>
      </fieldset>

      <input type="hidden" name="preferredDate" value={date} />
    </div>
  );
}
