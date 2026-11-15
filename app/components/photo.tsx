import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { SHOW_PENDING } from "./pending";

/*
  Photo slots. Drop a real photo into public/images/photos/ with the file name
  below and it replaces the placeholder automatically. No code change needed.
*/
export const photoFiles = {
  front: "images/photos/office-front.jpg",
  bay: "images/photos/inspection-area.jpg",
  inspector: "images/photos/inspector.jpg",
  waiting: "images/photos/waiting-area.jpg",
} as const;

export type PhotoKey = keyof typeof photoFiles;

export function photoExists(key: PhotoKey) {
  return fs.existsSync(path.join(process.cwd(), "public", photoFiles[key]));
}

type PhotoProps = {
  photo: PhotoKey;
  alt: string;
  label: string;
  placeholderText: string;
  sizes: string;
  className?: string;
};

export function Photo({ photo, alt, label, placeholderText, sizes, className = "" }: PhotoProps) {
  const file = photoFiles[photo];

  if (photoExists(photo)) {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-mist ${className}`}>
        <Image src={`/${file}`} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  // Missing photo: a labelled placeholder while reviewing, nothing in production.
  if (!SHOW_PENDING) return null;

  return (
    <div
      role="img"
      aria-label={`${placeholderText}: ${label}`}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-field bg-mist p-4 text-center ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-steel"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 7h3l2-2.5h6L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
        <circle cx="12" cy="13" r="3.6" />
      </svg>
      <span className="font-display text-base font-semibold text-ink">{label}</span>
      <code className="break-all text-xs text-steel">public/{file}</code>
    </div>
  );
}
