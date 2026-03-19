import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderSnow } from "@/components/HeaderSnow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { YasamdanVideoSwitcher } from "@/components/YasamdanVideoSwitcher";
import {
  WaveBandBackground,
  waveFooterBandColor,
} from "@/components/WaveBandBackground";
import {
  categoryGalleries,
  reflections,
  videoReflection,
  yasamdanYansimalarVideos,
  type YasamdanVideoItem,
  type ReflectionSlug,
} from "@/lib/site";

const reflectionSlugs = reflections.map((r) => r.slug);
const slugs = [...reflectionSlugs, videoReflection.slug] as const;

type Slug = (typeof slugs)[number];

function isSlug(s: string): s is Slug {
  return (slugs as readonly string[]).includes(s);
}

function isReflectionSlug(s: string): s is ReflectionSlug {
  return (reflectionSlugs as readonly string[]).includes(s);
}

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const ref = reflections.find((r) => r.slug === slug);
  const pageTitle = ref?.label ?? videoReflection.label;
  // Use page title (e.g. "Sessizlik") so Google and shares show the card name, not the URL slug
  const fullTitle = `${pageTitle} — Mavi Kadraj`;
  return {
    title: pageTitle,
    openGraph: {
      title: fullTitle,
    },
    twitter: {
      title: fullTitle,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const ref = reflections.find((r) => r.slug === slug);
  const isVideo = slug === videoReflection.slug;
  const gallery = isReflectionSlug(slug) ? categoryGalleries[slug] : [];

  const tiktokVideos = yasamdanYansimalarVideos.filter(
    (v): v is Extract<YasamdanVideoItem, { type: "tiktok" }> => v.type === "tiktok",
  );

  return (
    <>
      <HeaderSnow>
        <SiteHeader />
      </HeaderSnow>
      <section
        className="relative flex min-h-[72vh] w-full flex-1 flex-col"
        aria-label={ref?.label ?? videoReflection.label}
      >
        <WaveBandBackground />

        <div
          className="relative z-[2] flex w-full flex-col"
          style={{ textShadow: "0 1px 24px rgba(8,12,18,0.35)" }}
        >
          <div className="w-full px-6 pt-12 md:px-10 md:pt-16">
            <Link
              href={isVideo ? "/" : "/kadraj-yansimalari"}
              className="mb-8 inline-block text-sm tracking-wide text-[var(--mk-muted)] hover:text-[var(--mk-accent)]"
            >
              {isVideo ? "← Ana sayfa" : "← Kadraj yansımaları"}
            </Link>
          </div>
          <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-12 md:px-10 md:pb-16">
            <div className={isVideo ? "text-center" : ""}>
              {isVideo ? (
                <>
                  <h1
                    className="font-medium tracking-[0.05em] text-[#d4dce8] text-center"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 3.5vw, 42px)" }}
                  >
                    Yaşamdan <span className="mk-reading-highlight">Yansımalar</span>
                  </h1>
                  <p className="mt-3 text-center text-sm text-[#c8d4e4] opacity-[0.85]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    Sessiz kalanların hikâyesi
                  </p>
                  <p className="mt-4 text-center text-xs leading-relaxed text-[#b0bcc8]" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                    Bazı anlar yaşanır…
                    <br />
                    bazıları insanın içinde kalır.
                  </p>
                </>
              ) : (
                <h1 className={`font-serif text-3xl tracking-wide md:text-4xl ${isVideo ? "text-center" : ""}`}>
                  <span className="inline-block bg-gradient-to-br from-[#ffffff] via-[#c8dff2] to-[#4a8bc4] bg-clip-text text-transparent">
                    {ref?.label ?? videoReflection.label}
                  </span>
                </h1>
              )}
            </div>

            {isVideo ? (
              <>
                <section
                  className="relative mt-8 w-full min-h-[50vh]"
                  aria-label="Video"
                >
                  {/* Atmospheric side words — horizontal, minimal, hidden on mobile */}
                  <span
                    className="mk-side-word pointer-events-none absolute left-[60px] top-1/2 z-0 hidden -translate-y-1/2 select-none font-serif font-normal lowercase tracking-[0.08em] text-[#e8ecf0]/[0.11] md:block"
                    style={{ fontSize: "clamp(22px, 2.1vw, 32px)" }}
                    aria-hidden
                  >
                    sessiz
                  </span>
                  <span
                    className="mk-side-word pointer-events-none absolute right-[60px] top-1/2 z-0 hidden -translate-y-1/2 select-none font-serif font-normal lowercase tracking-[0.08em] text-[#e8ecf0]/[0.16] md:block"
                    style={{ fontSize: "clamp(22px, 2.1vw, 32px)" }}
                    aria-hidden
                  >
                    iz
                  </span>
                  <div className="relative z-[1]">
                    <YasamdanVideoSwitcher videos={tiktokVideos} />
                  </div>

                  {/* Poetic text block — under video controls, calm and cinematic */}
                  <div className="relative z-[1] mt-[50px] mb-[70px] flex justify-center px-5 sm:px-6">
                    <p
                      className="mk-poetic-fade-in max-w-[600px] text-center font-serif font-normal leading-[1.8] tracking-[0.04em] text-white/80 transition-[color] duration-[400ms] ease-out hover:text-white/90"
                      style={{ fontSize: "clamp(14px, 1.2vw, 18px)" }}
                    >
                      Yaşanmayan gerçekler insanın içinde kalır…
                      <br />
                      üşüyen hayaller ise yavaşça susar.
                      <br />
                      Yine de insan bilir, elbet bir gün her şey tamamlanır.
                    </p>
                  </div>
                </section>
              </>
            ) : ref ? (
              <>
                {ref.intro ? (
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#b8c6d6] md:text-base">
                    {ref.intro}
                  </p>
                ) : null}
                <GalleryLightbox gallery={gallery.map(({ src, alt, caption }) => ({ src, alt, caption }))} />
              </>
            ) : null}
          </main>
        </div>

        <div
          className="relative z-[2] mt-auto w-full pb-4 pt-1"
          style={{ backgroundColor: waveFooterBandColor }}
        >
          <SiteFooter />
        </div>
      </section>
    </>
  );
}
