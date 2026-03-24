import Link from "next/link";
import { HeaderSnow } from "@/components/HeaderSnow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  WaveBandBackground,
  waveFooterBandColor,
} from "@/components/WaveBandBackground";
import { kadrajinOtesiPostsSorted } from "@/lib/kadrajinOtesi";

export const metadata = {
  title: "Kadrajın Ötesi",
  description: "Kadrajın ötesi — düşünce ve izlenimler — Mavi Kadraj",
};

export default function KadrajinOtesiIndexPage() {
  const posts = kadrajinOtesiPostsSorted();

  return (
    <>
      <HeaderSnow>
        <SiteHeader />
      </HeaderSnow>
      <section
        className="relative flex w-full min-h-0 flex-1 flex-col md:min-h-[72vh]"
        aria-label="Kadrajın Ötesi"
      >
        <WaveBandBackground />

        <div
          className="relative z-[2] flex w-full flex-col"
          style={{ textShadow: "0 1px 24px rgba(8,12,18,0.35)" }}
        >
          <div className="w-full px-6 pt-12 md:px-10 md:pt-16">
            <Link
              href="/"
              className="mb-8 inline-block text-sm tracking-wide text-[var(--mk-muted)] hover:text-[var(--mk-accent)]"
            >
              ← Ana sayfa
            </Link>
          </div>

          <main className="mx-auto w-full max-w-[min(760px,90vw)] px-6 pb-16 pt-2 text-center md:px-10 md:pb-24 md:pt-4">
            <h1
              className="font-medium tracking-[0.05em] text-[#d4dce8]"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(26px, 3.5vw, 42px)",
              }}
            >
              Kadrajın <span className="mk-reading-highlight">Ötesi</span>
            </h1>
            <p
              className="mt-3 text-center text-sm text-[#c8d4e4] opacity-[0.85]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Sessiz kalanların hikâyesi
            </p>
            <p
              className="mt-4 text-center text-xs leading-relaxed text-[#b0bcc8]"
              style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
              Görünenin ötesinde…
              <br />
              hissedilen başlar.
            </p>

            <div className="mt-14 text-left md:mt-16">
              <h2 className="mb-6 text-center font-serif text-sm font-normal tracking-[0.14em] text-[var(--mk-muted)]">
                Yazılar
              </h2>
              <ul className="mx-auto flex max-w-md flex-col gap-4">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/kadrajin-otesi/${post.slug}`}
                      className="block rounded-lg border border-white/[0.06] bg-[#0c1218]/25 px-4 py-3 transition-colors hover:border-white/[0.1] hover:bg-[#0c1218]/40"
                    >
                      <span className="block text-[11px] uppercase tracking-[0.1em] text-[var(--mk-muted)]">
                        {post.dateLabel} · {post.seriesLabel} · Seri{" "}
                        {post.seriesNumber}
                      </span>
                      <span className="mt-1 block font-serif text-base tracking-wide text-[#d4dce8]">
                        {post.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
