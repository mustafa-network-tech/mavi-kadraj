import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeaderSnow } from "@/components/HeaderSnow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { KadrajinOtesiReading } from "@/components/KadrajinOtesiReading";
import {
  WaveBandBackground,
  waveFooterBandColor,
} from "@/components/WaveBandBackground";
import {
  getKadrajinOtesiBody,
  getKadrajinOtesiPost,
  kadrajinOtesiPosts,
} from "@/lib/kadrajinOtesi";
import { site } from "@/lib/site";

const OG_SIZE = { width: 1200, height: 630 } as const;

export function generateStaticParams() {
  return kadrajinOtesiPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getKadrajinOtesiPost(slug);
  if (!post) return {};

  const title = `${post.title} — ${site.name}`;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title,
      description: post.description,
      type: "article",
      locale: "tr_TR",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.ogImage,
          ...OG_SIZE,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [post.ogImage],
    },
  };
}

export default async function KadrajinOtesiArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getKadrajinOtesiPost(slug);
  const body = getKadrajinOtesiBody(slug);
  if (!post || !body) notFound();

  return (
    <>
      <HeaderSnow>
        <SiteHeader />
      </HeaderSnow>
      <section
        className="relative flex w-full min-h-0 flex-1 flex-col md:min-h-[72vh]"
        aria-label={post.title}
      >
        <WaveBandBackground />

        <div
          className="relative z-[2] flex w-full flex-col"
          style={{ textShadow: "0 1px 24px rgba(8,12,18,0.35)" }}
        >
          <div className="w-full px-6 pt-12 md:px-10 md:pt-16">
            <Link
              href="/kadrajin-otesi"
              className="mb-8 inline-block text-sm tracking-wide text-[var(--mk-muted)] hover:text-[var(--mk-accent)]"
            >
              ← Kadrajın Ötesi
            </Link>
          </div>

          <main className="mx-auto w-full max-w-[min(760px,90vw)] px-6 pb-16 pt-2 text-center md:px-10 md:pb-24 md:pt-4">
            <p className="text-left text-[11px] uppercase tracking-[0.12em] text-[var(--mk-muted)]">
              {post.dateLabel} · {post.seriesLabel} · Seri {post.seriesNumber}
            </p>

            <h1
              className="mk-reading-fade mt-4 text-left font-serif font-medium leading-tight tracking-[0.03em]"
              style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
            >
              <span className="inline-block bg-gradient-to-br from-[#ffffff] via-[#c8dff2] to-[#4a8bc4] bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            <KadrajinOtesiReading paragraphs={body} />
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
