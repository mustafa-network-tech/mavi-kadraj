import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import { HeroBackgroundSlideshow } from "@/components/HeroBackgroundSlideshow";
import { HeroHomeSnow } from "@/components/HeroHomeSnow";
import { HeroRotatingTaglines } from "@/components/HeroRotatingTaglines";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeBelowHeroLayers } from "@/components/HomeBelowHeroLayers";
import { site } from "@/lib/site";

/** Ana sayfa paylaşım görseli — public/og/ana-sayfa.jpg */
const HOME_OG = {
  url: "/og/ana-sayfa.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} — ana sayfa`,
} as const;

export const metadata: Metadata = {
  openGraph: {
    title: `${site.name} — sessiz kareler`,
    description: site.description,
    images: [HOME_OG],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — sessiz kareler`,
    description: site.description,
    images: [HOME_OG.url],
  },
};

/** Mavi Kadraj — el yazısı, kalın hat */
const maviKadrajHand = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  display: "swap",
});

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="w-full shrink-0">
        <HeroHomeSnow>
        <SiteHeader />

        {/* Hero: uçtan uca şerit — kar burada biter, aşağı sızmasın */}
        <section
        className="relative w-full"
        aria-label="Giriş"
      >
        {/* Üst çizgi: soldan sağa uçtan uca */}
        <div className="h-px w-full bg-white/45" aria-hidden />
        {/* Arka plan: hero.jpg → hero1–4, 3,5 sn’de döner */}
        <div className="relative min-h-[min(44vh,420px)] w-full overflow-hidden sm:min-h-[min(48vh,480px)] md:min-h-[min(64vh,720px)] lg:min-h-[min(72vh,820px)]">
          <HeroBackgroundSlideshow />
          {/* Karartma — yazılar okunaklı kalsın */}
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0c1218]/80 via-[#0c1218]/60 to-[#0c1218]/85"
            aria-hidden
          />
          <div className="absolute inset-0 z-[18] flex flex-col">
            {/* Orta: yalnızca başlık */}
            <div className="flex flex-1 items-center justify-center px-6 pt-16 pb-8 sm:pt-20 md:pt-24">
              <h1
                className={`${maviKadrajHand.className} text-center font-semibold leading-[1.06] tracking-[0.035em] sm:tracking-[0.045em]`}
                style={{
                  fontSize: "clamp(56px, 7vw, 110px)",
                  filter:
                    "drop-shadow(0 1px 0 rgba(255,255,255,0.45)) drop-shadow(0 2px 12px rgba(200,228,255,0.35)) drop-shadow(0 6px 28px rgba(100,165,215,0.4)) drop-shadow(0 12px 48px rgba(70,130,195,0.22))",
                }}
              >
                <span className="inline-block bg-gradient-to-br from-[#ffffff] via-[#c8dff2] to-[#4a8bc4] bg-clip-text text-transparent">
                  {site.name.split(" ").map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className={
                        i > 0
                          ? "ml-[0.42em] sm:ml-[0.5em] md:ml-[0.58em]"
                          : undefined
                      }
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </h1>
            </div>
            <HeroRotatingTaglines />
          </div>
        </div>
        </section>
        </HeroHomeSnow>
      </div>

      {/* Foto alanı ile manifesto arası: düz çizgi yok; üstteki koyu tonla aşağıdaki ilk banta yumuşak geçiş */}
      <div
        className="h-14 w-full shrink-0 bg-gradient-to-b from-[#0c1218] via-[#1a232c] to-[#2e3844] sm:h-16 md:h-[4.5rem]"
        aria-hidden
      />

      <HomeBelowHeroLayers />
    </div>
  );
}
