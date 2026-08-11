import { KADRAJIN_OTESI_HIGHLIGHT_PHRASES } from "@/lib/kadrajinOtesi";

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
}: {
  paragraphs: readonly string[];
}) {
  return (
    <div className="beyond-reading">
      {paragraphs.map((block, i) => (
        <p
          key={i}
          className="reveal-up"
        >
          {block.split("\n").map((line, j) => (
            <span key={j}>
              {highlightPhrases(line, `p-${i}-${j}`)}
              {j < block.split("\n").length - 1 ? (
                <>
                  <br />
                  <br />
                </>
              ) : null}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
