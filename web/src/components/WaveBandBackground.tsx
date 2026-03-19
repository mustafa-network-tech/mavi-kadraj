/**
 * Ana sayfa manifesto ile aynı: 5 kademeli açık→koyu bant + dalga geçişleri.
 */
export const WAVE_BAND_COLORS = [
  "#2e3844",
  "#283139",
  "#222a32",
  "#1c232b",
  "#181e26",
] as const;

function WaveTo({
  fill,
  variant,
  deeper,
}: {
  fill: string;
  variant: 1 | 2 | 3 | 4;
  deeper?: boolean;
}) {
  // Pronounced wavy top edge so color transitions are clearly wavy (not a straight line)
  const paths: Record<1 | 2 | 3 | 4, string> = {
    1: "M0,36 Q360,4 720,40 Q1080,8 1440,32 L1440,80 L0,80 Z",
    2: "M0,24 Q360,56 720,20 Q1080,52 1440,28 L1440,80 L0,80 Z",
    3: "M0,44 Q360,12 720,48 Q1080,16 1440,40 L1440,80 L0,80 Z",
    4: "M0,28 Q360,56 720,24 Q1080,48 1440,36 L1440,80 L0,80 Z",
  };
  // Higher/deeper wave for footer (larger amplitude)
  const deeperPath =
    "M0,50 Q240,0 480,55 Q720,5 960,50 Q1200,8 1440,48 L1440,100 L0,100 Z";

  return (
    <div
      className={`pointer-events-none relative -mt-px w-full overflow-visible ${
        deeper ? "h-16 md:h-20" : "h-12 md:h-14"
      }`}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-1/2 min-w-[1000px] -translate-x-1/2"
        style={{ width: "max(100%, 1200px)", height: "100%" }}
        viewBox={deeper ? "0 0 1440 100" : "0 0 1440 80"}
        preserveAspectRatio="none"
      >
        <path fill={fill} d={deeper ? deeperPath : paths[variant]} />
      </svg>
    </div>
  );
}

export function WaveBandBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex min-h-full w-full flex-col"
      aria-hidden
    >
      {WAVE_BAND_COLORS.map((color, i) => {
        const next = WAVE_BAND_COLORS[i + 1];
        const isLast = i === WAVE_BAND_COLORS.length - 1;
        const v = ((i % 4) + 1) as 1 | 2 | 3 | 4;
        return (
          <div
            key={i}
            className="relative flex min-h-[14vh] w-full flex-[1] flex-col"
            style={{ backgroundColor: color }}
          >
            {next != null && (
              <div className="mt-auto w-full shrink-0">
                <WaveTo fill={next} variant={v} />
              </div>
            )}
            {/* Higher/deeper wave above footer */}
            {isLast && (
              <div className="mt-auto w-full shrink-0">
                <WaveTo fill={waveFooterBandColor} variant={v} deeper />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const waveFooterBandColor = WAVE_BAND_COLORS[WAVE_BAND_COLORS.length - 1];
