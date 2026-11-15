/*
  Content the business has not confirmed yet (fees, documents, times).
  Shown with a yellow tag in development so it can be reviewed, and left out
  of production builds so nothing unconfirmed goes live.
  To preview production with pending content: SHOW_PENDING=1 npm run build
*/
export const SHOW_PENDING =
  process.env.NODE_ENV !== "production" || process.env.SHOW_PENDING === "1";

export function visible<T extends { pending?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.pending || SHOW_PENDING);
}

export function PendingTag({ label }: { label: string }) {
  return (
    <span className="ml-2 inline-block rounded bg-flag px-2 py-0.5 align-middle font-sans text-xs font-semibold text-ink">
      {label}
    </span>
  );
}
