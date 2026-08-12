import { KADRAJIN_OTESI_HIGHLIGHT_PHRASES } from "@/lib/kadrajinOtesi";
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
}: {
  paragraphs: readonly string[];
  image?: string;
  imageAfterParagraph?: number;
  imageClass?: "wide" | "portrait" | "editorial";
  imageWidth?: number;
  imageHeight?: number;
}) {
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
          {image && imageAfterParagraph === i ? (
            <figure className={`beyond-reading__image beyond-reading__image--${imageClass} reveal-up`}>
              <Image src={image} alt="" width={imageWidth} height={imageHeight} sizes={imageClass === "portrait" ? "(max-width: 767px) 100vw, 42vw" : "(max-width: 767px) 100vw, 72vw"} />
            </figure>
          ) : null}
        </div>
      ))}
    </div>
  );
}
