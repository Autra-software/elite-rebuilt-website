"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { answer, answersToSearch, parseAnswers, type Answers, type QuestionId } from "./documents";

/*
  The "What to bring" answers live in the page URL (?who=private&accident=no&repair=shop),
  so staff can text a customer a link to their exact list, and the booking form
  can read the customer type. The server render has no answers, so the first
  paint always matches and the URL is applied right after hydration.
*/
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

function write(next: Answers) {
  const { pathname, search, hash } = window.location;
  window.history.replaceState(window.history.state, "", `${pathname}${answersToSearch(next, search)}${hash}`);
  listeners.forEach((listener) => listener());
}

export function useBringAnswers() {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const answers = useMemo(() => parseAnswers(search), [search]);
  const set = useCallback(
    (q: QuestionId, value: string) => write(answer(parseAnswers(window.location.search), q, value)),
    [],
  );
  const reset = useCallback(() => write({}), []);
  return { answers, set, reset };
}
