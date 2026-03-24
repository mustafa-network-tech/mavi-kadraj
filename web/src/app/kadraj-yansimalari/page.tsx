import Image from "next/image";
import Link from "next/link";
import { HeaderSnow } from "@/components/HeaderSnow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  WaveBandBackground,
  waveFooterBandColor,
} from "@/components/WaveBandBackground";
import { reflections } from "@/lib/site";

export const metadata = {
  title: "kadraj yansımaları",
  description: "Sessizlik, Zaman, İnsan İzleri, Sessiz Yoldaşlar — Mavi Kadraj",
};

export default function KadrajYansimalariPage() {
  return (
    <>
      <HeaderSnow>
        <SiteHeader />
      </HeaderSnow>
      <section
        className="relative flex w-full min-h-0 flex-1 flex-col md:min-h-[72vh]"
        aria-label="Kadraj yansımaları"
      >
        <WaveBandBackground />

        <div
          className="relative z-[2] flex w-full flex-col"
          style={{ textShadow: "0 1px 24px rgba(8,12,18,0.35)" }}
        >
          <div className="px-6 pt-12 md:px-10 md:pt-16">
            <Link
              href="/"
              className="mb-8 inline-block text-sm tracking-wide text-[var(--mk-muted)] hover:text-[var(--mk-accent)]"
            >
              ← Ana sayfa
            </Link>
          </div>
          <div className="px-8 pb-3 pt-6 text-center md:pb-4 md:pt-8">
            <h1
              className="font-medium tracking-[0.05em] text-[#d4dce8]"
              style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 3.5vw, 42px)" }}
            >
              Kadraj <span className="mk-reading-highlight">Yansımaları</span>
            </h1>
            <p className="mt-3 text-center text-sm text-[#c8d4e4] opacity-[0.85]" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Sessiz kalanların hikâyesi
            </p>
            <p className="mt-4 text-center text-xs leading-relaxed text-[#b0bcc8]" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              Her kare susar…
              <br />
              ama hissettirdikleri kalır.
            </p>
          </div>

          <section className="px-6 pb-10 pt-4 sm:px-10 md:px-14 md:pt-5 lg:px-20 xl:px-24">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-5 gap-y-14 sm:max-w-6xl sm:gap-x-8 sm:gap-y-16 md:max-w-6xl md:gap-x-12 md:gap-y-20 lg:max-w-7xl lg:gap-x-16">
              {reflections.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-[88%] max-w-[min(92vw,320px)] sm:w-[85%] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[520px]">
                    <div
                      className={`relative z-[1] w-full aspect-[5/3.45] overflow-hidden rounded-[clamp(1.35rem,4.2vw,2.75rem)] shadow-[0_16px_56px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.14] transition duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_20px_64px_rgba(91,143,199,0.22)] group-hover:ring-[var(--mk-accent)]/35 ${
                        "cardFit" in item && item.cardFit === "contain"
                          ? "bg-[#141a22]"
                          : ""
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className={`transition duration-500 group-hover:brightness-100 ${
                          "cardFit" in item && item.cardFit === "contain"
                            ? "object-contain object-center brightness-[1] contrast-[1.02]"
                            : "object-cover brightness-[0.98]"
                        }`}
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 38vw, (max-width: 1536px) 480px, 520px"
                      />
                    </div>
                  </div>
                  <span className="mt-5 text-center font-serif text-base tracking-[0.12em] text-[#dce4ee] md:mt-6 md:text-lg">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </section>
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
