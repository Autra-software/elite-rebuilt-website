import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { SHOW_PENDING } from "./pending";

/*
  Office image slots. Each slot shows, in order of preference:
  1. a real photo, if public/images/photos/<file>.jpg exists
  2. the matching illustration in public/images/illustrations/
  3. a labelled placeholder (development only)
  Drop a real photo in with the same name and it wins automatically.
*/
export const photoSlots = {
  front: { photo: "images/photos/office-front.jpg", illustration: "images/illustrations/office-front.svg" },
  bay: { photo: "images/photos/inspection-area.jpg", illustration: "images/illustrations/inspection-area.svg" },
  vin: { photo: "images/photos/vin-check.jpg", illustration: "images/illustrations/vin-check.svg" },
  paperwork: { photo: "images/photos/paperwork.jpg", illustration: "images/illustrations/paperwork.svg" },
} as const;

export type PhotoKey = keyof typeof photoSlots;

const exists = (file: string) => fs.existsSync(path.join(process.cwd(), "public", file));

export function slotHasImage(key: PhotoKey) {
  const slot = photoSlots[key];
  return exists(slot.photo) || exists(slot.illustration);
}

type PhotoProps = {
  photo: PhotoKey;
  alt: string;
  label: string;
  illustrationText: string;
  placeholderText: string;
  sizes: string;
  className?: string;
};

export function Photo({
  photo,
  alt,
  label,
  illustrationText,
  placeholderText,
  sizes,
  className = "",
}: PhotoProps) {
  const slot = photoSlots[photo];

  if (exists(slot.photo)) {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-mist ${className}`}>
        <Image src={`/${slot.photo}`} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  if (exists(slot.illustration)) {
    return (
      <div className={`relative overflow-hidden rounded-lg border border-line bg-mist ${className}`}>
        <Image
          src={`/${slot.illustration}`}
          alt={`${illustrationText}: ${alt}`}
          fill
          sizes={sizes}
          unoptimized
          className="object-contain"
        />
      </div>
    );
  }

  // Nothing to show: a labelled placeholder while reviewing, nothing in production.
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
      <code className="break-all text-xs text-steel">public/{slot.photo}</code>
    </div>
  );
}
