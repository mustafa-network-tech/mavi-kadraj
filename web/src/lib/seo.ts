import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMetadata(path: string, title: string, description: string, image = "/images/mavi-kadraj-og.jpg", publishedAt?: string): Metadata {
  const url = new URL(path, site.url).href;
  const fullTitle = path === "/" ? title : `${title} — ${site.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle, description, url, siteName: site.name, locale: "tr_TR",
      type: publishedAt ? "article" : "website",
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
