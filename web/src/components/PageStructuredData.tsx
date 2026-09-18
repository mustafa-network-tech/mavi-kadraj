import { site } from "@/lib/site";

type Breadcrumb = { name: string; path: string };

export function PageStructuredData({ path, name, description, collection = false, parents = [] }: { path: string; name: string; description: string; collection?: boolean; parents?: Breadcrumb[] }) {
  const url = new URL(path, site.url).href;
  const graph: Record<string, unknown>[] = [{
    "@type": collection ? "CollectionPage" : "WebPage",
    "@id": `${url}#webpage`, url, name, description, inLanguage: "tr-TR",
    isPartOf: { "@id": `${site.url}/#website` },
  }];
  if (path === "/") {
    graph.push({ "@type": "WebSite", "@id": `${site.url}/#website`, url, name: site.name, inLanguage: "tr-TR" });
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [{ name: site.name, path: "/" }, ...parents, { name, path }].map((item, index) => ({
        "@type": "ListItem", position: index + 1, name: item.name, item: new URL(item.path, site.url).href,
      })),
    });
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
