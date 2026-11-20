"use client";

import { useState } from "react";
import type { Dict } from "../i18n/en";
import {
  ALL_CASES,
  questionsFor,
  requiredDocs,
  type Answers,
  type DocGroup,
  type DocId,
  type QuestionId,
} from "../lib/documents";
import { useBringAnswers } from "../lib/use-bring-answers";

type BringText = Dict["bring"];
type Option = { label: string; hint: string };

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function optionsOf(t: BringText, q: QuestionId): [string, Option][] {
  return Object.entries(t.questions[q].options as Record<string, Option>);
}

function caseLabel(t: BringText, a: Answers) {
  return (Object.entries(a) as [QuestionId, string][])
    .map(([q, v]) => (t.questions[q].options as Record<string, Option>)[v].label)
    .join(" · ");
}

function printChecklist() {
  const root = document.documentElement;
  root.classList.add("print-bring");
  window.addEventListener("afterprint", () => root.classList.remove("print-bring"), { once: true });
  window.print();
}

export function WhatToBring({ t, phone, phoneDisplay }: { t: BringText; phone: string; phoneDisplay: string }) {
  const { answers, set, reset } = useBringAnswers();
  const [ready, setReady] = useState<Set<string>>(() => new Set());
  const docs: Record<DocId, { text: string; hint: string }> = t.docs;
  const groups = requiredDocs(answers);
  const count = groups?.reduce((n, g) => n + g.docs.length, 0) ?? 0;

  const toggle = (key: string) =>
    setReady((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const groupTitle = (g: DocGroup) =>
    g.kind === "registration" ? (
      <>
        {t.groups.registration}
        <span className="rounded-[3px] bg-ink px-1.5 py-0.5 text-[11px] tracking-wide text-lime">
          {t.groups.registrationBadge}
        </span>
      </>
    ) : (
      t.groups.vehicle
    );

  return (
    <div
      id="bring-checklist"
      className="mx-auto max-w-3xl rounded-sm border border-ink bg-white shadow-[6px_6px_0_0_var(--color-ink)]"
    >
      <div className="border-b-4 border-double border-ink px-6 py-5 md:px-10">
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{t.title}</h2>
        <p className="mt-1 text-base text-steel print:hidden">{t.intro}</p>
        {groups && <p className="mt-1 hidden text-base font-semibold print:block">{caseLabel(t, answers)}</p>}
      </div>

      <div className="px-6 md:px-10 print:hidden">
        {questionsFor(answers).map((q, i) => (
          <fieldset key={q} className="border-b border-dashed border-field py-5">
            <legend className="float-left mb-3 flex w-full items-center gap-3 font-semibold">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-lime"
              >
                {i + 1}
              </span>
              {t.questions[q].label}
            </legend>
            <div className={`clear-left grid gap-2.5 ${q === "who" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {optionsOf(t, q).map(([value, option]) => {
                const id = `bring-${q}-${value}`;
                return (
                  <div key={value}>
                    <input
                      type="radio"
                      id={id}
                      name={`bring-${q}`}
                      value={value}
                      checked={answers[q] === value}
                      onChange={() => set(q, value)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className="block h-full min-h-12 cursor-pointer rounded border-2 border-field bg-white px-4 py-3 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-checked:[&>span]:text-lime-soft"
                    >
                      <b className="block">{option.label}</b>
                      {option.hint && <span className="mt-0.5 block text-sm text-steel">{option.hint}</span>}
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div aria-live="polite" className="px-6 pb-5 md:px-10">
        {!groups ? (
          <p className="py-4 text-steel">{t.empty}</p>
        ) : (
          <>
            {groups.map((g) => (
              <div key={g.kind}>
                <h3 className="mt-5 mb-1 flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-steel uppercase">
                  {groupTitle(g)}
                </h3>
                <ul>
                  {g.docs.map((id) => {
                    const key = `${g.kind}-${id}`;
                    const doc = docs[id];
                    return (
                      <li key={key} className="border-b border-dashed border-field py-3 last:border-b-0">
                        <label className="flex cursor-pointer items-start gap-4">
                          <span className="relative mt-0.5 h-6 w-6 shrink-0">
                            <input
                              type="checkbox"
                              checked={ready.has(key)}
                              onChange={() => toggle(key)}
                              className="peer h-6 w-6 cursor-pointer appearance-none rounded-[3px] border-2 border-ink checked:bg-ink"
                            />
                            <CheckIcon className="pointer-events-none absolute inset-0.5 hidden text-lime peer-checked:block" />
                          </span>
                          <span className={ready.has(key) ? "text-steel line-through" : ""}>
                            <span className="block text-base leading-7">{doc.text}</span>
                            {doc.hint && <span className="block text-sm text-steel no-underline">{doc.hint}</span>}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <p className="mt-4 border-l-4 border-ink bg-mist px-4 py-3 text-[15px]">
              {count === 1 ? t.summaryOne : t.summaryMany.replace("{count}", String(count))}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5 print:hidden">
              <a href="#request" className="rounded border-2 border-ink bg-ink px-4 py-2.5 font-semibold text-lime">
                {t.book}
              </a>
              <button
                type="button"
                onClick={printChecklist}
                className="cursor-pointer rounded border-2 border-ink bg-white px-4 py-2.5 font-semibold"
              >
                {t.print}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setReady(new Set());
                  document.getElementById("bring-who-dealer")?.focus();
                }}
                className="cursor-pointer px-2 py-2.5 font-semibold underline underline-offset-4"
              >
                {t.reset}
              </button>
            </div>
          </>
        )}

        {/* Every case at once: works without JavaScript and is readable by search engines */}
        <details className="group mt-5 border-t border-line pt-3 print:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90 motion-reduce:transition-none">
              ▸
            </span>
            {t.allCases}
          </summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-mist text-left">
                  <th scope="col" className="border border-line p-2">{t.colCase}</th>
                  <th scope="col" className="border border-line p-2">{t.colDocs}</th>
                </tr>
              </thead>
              <tbody>
                {ALL_CASES.map((c) => (
                  <tr key={caseLabel(t, c)} className="align-top">
                    <th scope="row" className="border border-line p-2 text-left font-normal">{caseLabel(t, c)}</th>
                    <td className="border border-line p-2">
                      <ul className="list-disc pl-4">
                        {requiredDocs(c)!.flatMap((g) => g.docs).map((id) => (
                          <li key={id}>{docs[id].text}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <p className="border-t border-ink bg-mist px-6 py-4 text-sm font-semibold md:px-10 print:hidden">
        {t.note}{" "}
        <a href={`tel:${phone}`} className="underline underline-offset-4">
          {phoneDisplay}
        </a>
      </p>
    </div>
  );
}
