import { KADRAJIN_OTESI_HIGHLIGHT_PHRASES } from "@/lib/kadrajinOtesi";
import type { KadrajinOtesiReadingImage } from "@/lib/kadrajinOtesi";
import Image from "next/image";

function highlightPhrases(
  text: string,
  keyPrefix: string
): (string | React.ReactElement)[] {
  const phrases = KADRAJIN_OTESI_HIGHLIGHT_PHRASES;
  const parts: (string | React.ReactElement)[] = [];
  let remaining = text;
  let key = 0;
  for (;;) {
    const found = phrases
      .map((phrase) => ({
        phrase,
        index: remaining.indexOf(phrase),
      }))
      .filter((x) => x.index >= 0);
    if (found.length === 0) {
      if (remaining) parts.push(remaining);
      break;
    }
    found.sort((a, b) => a.index - b.index);
    const { phrase, index } = found[0];
    if (index > 0) parts.push(remaining.slice(0, index));
    parts.push(
      <span key={`${keyPrefix}-${key++}`} className="mk-reading-highlight">
        {phrase}
      </span>
    );
    remaining = remaining.slice(index + phrase.length);
  }
  return parts;
}

export function KadrajinOtesiReading({
  paragraphs,
  image,
  imageAfterParagraph,
  imageClass = "wide",
  imageWidth = 1800,
  imageHeight = 1200,
  images,
}: {
  paragraphs: readonly string[];
  image?: string;
  imageAfterParagraph?: number;
  imageClass?: "wide" | "portrait" | "editorial";
  imageWidth?: number;
  imageHeight?: number;
  images?: readonly KadrajinOtesiReadingImage[];
}) {
  const readingImages: readonly KadrajinOtesiReadingImage[] = images ?? (
    image && imageAfterParagraph !== undefined
      ? [{ src: image, afterParagraph: imageAfterParagraph, className: imageClass, width: imageWidth, height: imageHeight }]
      : []
  );

  return (
    <div className="beyond-reading">
      {paragraphs.map((block, i) => (
        <div className="beyond-reading__block" key={i}>
          <p className="reveal-up">
            {block.split("\n").map((line, j) => (
              <span key={j}>
                {highlightPhrases(line, `p-${i}-${j}`)}
                {j < block.split("\n").length - 1 ? <><br /><br /></> : null}
              </span>
            ))}
          </p>
          {readingImages.filter(({ afterParagraph }) => afterParagraph === i).map((readingImage) => (
            <figure key={readingImage.src} className={`beyond-reading__image beyond-reading__image--${readingImage.className} reveal-up`}>
              <Image src={readingImage.src} alt="" width={readingImage.width} height={readingImage.height} sizes={readingImage.className === "portrait" ? "(max-width: 767px) 92vw, 42vw" : "(max-width: 767px) 100vw, 72vw"} />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
