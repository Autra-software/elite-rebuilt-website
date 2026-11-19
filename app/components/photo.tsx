import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import sharp from "sharp";
import { SHOW_PENDING } from "./pending";

/*
  Image slots for the inspection bay section. Each slot shows, in order:
  1. its real photo in public/images/photos/
  2. its illustration in public/images/illustrations/, if one is set
  3. a labelled placeholder (development only)
*/
type Slot = { photo: string; illustration?: string };

export const photoSlots = {
  sign: { photo: "images/photos/shop-sign.jpg" },
  checking: { photo: "images/photos/inspector-checking.jpg" },
  clipboard: { photo: "images/photos/inspector-clipboard.jpg" },
  engine: { photo: "images/photos/engine-check.jpg" },
  truck: { photo: "images/photos/classic-truck.jpg" },
} satisfies Record<string, Slot>;

export type PhotoKey = keyof typeof photoSlots;
const slotOf = (key: PhotoKey): Slot => photoSlots[key];

const exists = (file: string) => fs.existsSync(path.join(process.cwd(), "public", file));

// A ~300-byte blurred preview, built into the page at build time, shown while
// the real photo loads.
const blurCache = new Map<string, Promise<string | undefined>>();
function blurFor(file: string) {
  if (!blurCache.has(file)) {
    blurCache.set(
      file,
      sharp(path.join(process.cwd(), "public", file))
        .resize(16)
        .webp({ quality: 40 })
        .toBuffer()
        .then((buf) => `data:image/webp;base64,${buf.toString("base64")}`)
        .catch(() => undefined),
    );
  }
  return blurCache.get(file)!;
}

export function slotHasImage(key: PhotoKey) {
  const slot = slotOf(key);
  return exists(slot.photo) || (!!slot.illustration && exists(slot.illustration));
}

type PhotoProps = {
  photo: PhotoKey;
  alt: string;
  label: string;
  illustrationText: string;
  placeholderText: string;
  sizes: string;
  className?: string;
  position?: string;
};

export async function Photo({
  photo,
  alt,
  label,
  illustrationText,
  placeholderText,
  sizes,
  className = "",
  position,
}: PhotoProps) {
  const slot = slotOf(photo);

  if (exists(slot.photo)) {
    const blurDataURL = await blurFor(slot.photo);
    return (
      <div className={`relative overflow-hidden rounded-lg bg-mist ${className}`}>
        <Image
          src={`/${slot.photo}`}
          alt={alt}
          fill
          sizes={sizes}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }

  if (slot.illustration && exists(slot.illustration)) {
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
