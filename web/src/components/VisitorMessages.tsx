"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { REACTIONS, REACTION_EMOJI, type PublicMessage, type Reaction } from "@/lib/messages";

export function VisitorMessages() {
  const [messages, setMessages] = useState<PublicMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const openedAt = useRef(Date.now());

  const load = async () => {
    try {
      const response = await fetch("/api/mavi-kadraj/messages", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessages(result.messages);
    } catch { setError("Bırakılan cümleler şu anda yüklenemiyor."); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); setNotice("");
    if (Date.now() - openedAt.current < 2500) { setError("Biraz daha bekleyip yeniden deneyin."); return; }
    setSending(true);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/mavi-kadraj/messages", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      form.reset();
      openedAt.current = Date.now();
      setNotice("Cümlen bize ulaştı.\nYayınlanmadan önce küçük bir sessizlikten geçecek. 🕊️");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Cümlen gönderilemedi."); }
    finally { setSending(false); }
  };

  const react = async (messageId: string, next: Reaction) => {
    const previous = messages;
    setMessages((items) => items.map((item) => {
      if (item.id !== messageId) return item;
      const reactions = { ...item.reactions };
      if (item.selectedReaction) reactions[item.selectedReaction] -= 1;
      const selectedReaction = item.selectedReaction === next ? null : next;
      if (selectedReaction) reactions[selectedReaction] += 1;
      return { ...item, reactions, selectedReaction };
    }));
    try {
      const response = await fetch("/api/mavi-kadraj/reactions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messageId, reaction: next }) });
      if (!response.ok) throw new Error();
    } catch { setMessages(previous); setError("Tepki kaydedilemedi."); }
  };

  return <>
    <form className="visitor-form" onSubmit={submit}>
      <div className="visitor-form__honeypot" aria-hidden><label htmlFor="website">Web sitesi</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <label>İsminiz<input name="name" required minLength={2} maxLength={60} autoComplete="name" /></label>
      <label>Bırakmak istediğiniz cümle / düşünce<textarea name="message" required minLength={3} maxLength={800} rows={6} /></label>
      <button disabled={sending}>{sending ? "Cümlen yolda…" : "Kadrajda Bırak →"}</button>
      {notice && <p className="visitor-form__success" role="status">{notice}</p>}
      {error && <p className="visitor-form__error" role="alert">{error}</p>}
    </form>

    <section className="visitor-notes" aria-label="Yayınlanan cümleler">
      {loading && <p className="visitor-notes__empty">Cümleler geliyor…</p>}
      {!loading && messages.length === 0 && !error && <p className="visitor-notes__empty">İlk cümle için burada sessiz bir yer var.</p>}
      {messages.map((item) => <article className={item.is_featured ? "visitor-note visitor-note--featured" : "visitor-note"} key={item.id}>
        <blockquote>“{item.message}”</blockquote>
        <footer><div><strong>{item.editorial_icon && <span className="visitor-note__icon" aria-hidden>{item.editorial_icon}</span>}{item.name}</strong>{item.is_editorial ? <span className="visitor-note__label">{item.name === "MK Digital Systems" ? "BAŞLANGIÇ NOTU" : "EDİTORYAL NOT"}</span> : <time dateTime={item.approved_at ?? item.created_at}>{new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(item.approved_at ?? item.created_at))}</time>}</div>
          <div className="visitor-reactions" aria-label="Tepkiler">{REACTIONS.map((reaction) => <button type="button" key={reaction} className={item.selectedReaction === reaction ? "is-selected" : ""} aria-pressed={item.selectedReaction === reaction} onClick={() => void react(item.id, reaction)}><span aria-hidden>{REACTION_EMOJI[reaction]}</span><small>{item.reactions[reaction]}</small></button>)}</div>
        </footer>
      </article>)}
    </section>
  </>;
}
