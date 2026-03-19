import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import { HeroHomeSnow } from "@/components/HeroHomeSnow";
import { HeroStoryFlow } from "@/components/HeroStoryFlow";
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
        {/* Hikâye akışı: 5 sahne × 7 sn; başlık + tek slogan (yan sloganlar kaldırıldı) */}
        <div className="relative min-h-[min(44vh,420px)] w-full overflow-hidden sm:min-h-[min(48vh,480px)] md:min-h-[min(64vh,720px)] lg:min-h-[min(72vh,820px)]">
          <HeroStoryFlow />
          {/* Hafif karartma — metin fotoğrafa “yapışmış” değil, içinden geliyormuş hissi */}
          <div
            className="pointer-events-none absolute inset-0 z-[10] bg-gradient-to-b from-[#0c1218]/65 via-[#0c1218]/38 to-[#0c1218]/78"
            aria-hidden
          />
          <div className="absolute inset-0 z-[18] flex flex-col">
            {/* Orta: yalnızca site adı */}
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
