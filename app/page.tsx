"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type DayOption = {
  value: string;
  label: string;
  dayOfWeek: number;
};

type TimeOption = {
  value: string;
  label: string;
};

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildAvailableDays(totalDays = 45): DayOption[] {
  const options: DayOption[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < totalDays; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) continue;

    const label = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    options.push({
      value: formatDateValue(date),
      label,
      dayOfWeek,
    });
  }

  return options;
}

function buildTimeOptions(dayOfWeek: number | null): TimeOption[] {
  if (dayOfWeek === null) return [];

  const options: TimeOption[] = [];
  const startHour = dayOfWeek === 6 ? 10 : 9;
  const endHour = dayOfWeek === 6 ? 15 : 17;

  for (let hour = startHour; hour <= endHour; hour += 1) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = hour < 12 ? "AM" : "PM";

    options.push({
      value: `${String(hour).padStart(2, "0")}:00`,
      label: `${hour12}:00 ${suffix}`,
    });
  }

  return options;
}

export default function Home() {
  const availableDays = useMemo(() => buildAvailableDays(), []);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const selectedDay = availableDays.find((day) => day.value === preferredDate);
  const timeOptions = useMemo(
    () => buildTimeOptions(selectedDay?.dayOfWeek ?? null),
    [selectedDay],
  );

  return (
    <main className="min-h-screen bg-[#f6f6f2] text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-8 md:py-10">
        <div className="flex justify-center">
          <div className="relative h-56 w-56 md:h-72 md:w-72">
            <Image
              src="/images/elite-logo-round.png"
              alt="Elite Rebuilt Inspections"
              fill
              sizes="(max-width: 768px) 224px, 288px"
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-16 w-40 md:h-20 md:w-52">
              <Image
                src="/images/flhsmv-logo.png"
                alt="FLHSMV"
                fill
                sizes="(max-width: 768px) 160px, 208px"
                className="object-contain"
              />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime-600 md:text-sm">
              FLHSMV Certified PRVIP
            </p>
          </div>

          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
            Official rebuilt title inspections in Miami.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Elite Rebuilt Inspections provides official rebuilt vehicle
            inspections for customers completing the rebuilt title process in
            Florida, with clear guidance and professional support from the very
            beginning.
          </p>
        </div>

        <div className="mt-9 text-center">
          <a
            href="tel:7867905555"
            className="inline-block text-3xl font-semibold tracking-tight text-slate-950 transition hover:text-lime-600 md:text-5xl"
          >
            786-790-5555
          </a>

          <p className="mt-4 text-base font-medium text-slate-700 md:text-lg">
            19100 SW 106 Ave Unit 22, Miami, FL 33157
          </p>

          <div className="mt-3 flex flex-col items-center gap-2 text-sm">
            <a
              href="https://www.google.com/maps/search/?api=1&query=19100+SW+106+Ave+Unit+22+Miami+FL+33157"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 underline hover:text-lime-600"
            >
              Open in Google Maps
            </a>

            <a
              href="https://maps.apple.com/?q=19100+SW+106+Ave+Unit+22+Miami+FL+33157"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 underline hover:text-lime-600"
            >
              Open in Apple Maps
            </a>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Monday – Friday: 9:00 AM – 5:00 PM
          </p>
          <p className="text-sm text-slate-500">
            Saturday: By appointment (10:00 AM – 3:00 PM)
          </p>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            info@eliterebuilt.com
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:7867905555"
            className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Call Now
          </a>

          <a
            href="#request-inspection"
            className="inline-flex min-w-[220px] items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Request Inspection
          </a>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-slate-500 md:text-base">
          Choose the option that works best for you. Our team is here to help
          guide you through the process from the start.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-8 md:py-10">
        <div className="space-y-5 text-center">
          <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            Specialized guidance for the rebuilt title process.
          </h2>

          <p className="text-base leading-8 text-slate-600 md:text-lg">
            We focus exclusively on rebuilt title vehicle inspections and help
            customers understand what to expect, how the process works, and how
            to move forward with confidence.
          </p>

          <p className="text-base leading-8 text-slate-600 md:text-lg">
            Whether you call us directly or submit a request online, our goal is
            to make the process feel clear, professional, and easy to follow.
          </p>

          <p className="text-sm leading-7 text-slate-500 md:text-base">
            We do not provide pre-purchase inspections, mechanic inspections, or
            general vehicle inspections.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime-600 md:text-sm">
            How It Works
          </p>
        </div>

        <div className="mt-8 space-y-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step 1
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Contact our team
            </h3>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Call us directly or submit an inspection request online, depending
              on what is most convenient for you.
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step 2
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Get guidance on the process
            </h3>
            <p className="mt-3 text-base leading-8 text-slate-600">
              We help explain the process, answer questions, and guide you on
              the next step for your rebuilt title inspection.
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step 3
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              Visit our Miami office
            </h3>
            <p className="mt-3 text-base leading-8 text-slate-600">
              We welcome customers to our office so the inspection process can
              move forward clearly, smoothly, and professionally.
            </p>
          </div>
        </div>
      </section>

      <section
        id="request-inspection"
        className="mx-auto max-w-3xl px-6 py-12 md:py-16"
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime-600 md:text-sm">
            Request Inspection
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
            Send us your information and our team will contact you.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            If you prefer, you can submit a simple inspection request here and
            we will follow up with you to help guide you through the process.
          </p>
        </div>

        <form
          action="https://formspree.io/f/xojyyqjb"
          method="POST"
          className="mt-10 space-y-5"
        >
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="vin"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              VIN Number
            </label>
            <input
              id="vin"
              name="vin"
              type="text"
              placeholder="Enter the VIN number"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="preferredDate"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Preferred Day
            </label>
            <select
              id="preferredDate"
              name="preferredDate"
              value={preferredDate}
              onChange={(e) => {
                setPreferredDate(e.target.value);
                setPreferredTime("");
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              required
            >
              <option value="">Select an available day</option>
              {availableDays.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="preferredTime"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              Preferred Time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 disabled:bg-slate-100 disabled:text-slate-400"
              disabled={!preferredDate}
              required
            >
              <option value="">
                {preferredDate
                  ? "Select an available time"
                  : "Select a day first"}
              </option>
              {timeOptions.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>

          <input
            type="hidden"
            name="_subject"
            value="New Elite Rebuilt Inspection Request"
          />

          <p className="text-sm leading-6 text-slate-500">
            Sunday is not available. Monday – Friday requests are available from
            9:00 AM to 5:00 PM. Saturday requests are by appointment from 10:00
            AM to 3:00 PM.
          </p>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Submit Inspection Request
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
