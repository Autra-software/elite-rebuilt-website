import type { MetadataRoute } from "next";
import { site } from "./site";

const languages = {
  "en-US": site.url,
  "es-US": `${site.url}/es`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${site.url}/es`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
