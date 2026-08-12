"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { createPublicSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { REACTIONS, REACTION_EMOJI, type Reaction } from "@/lib/messages";

type Status = "pending" | "approved" | "rejected";
type AdminMessage = { id: string; name: string; message: string; status: Status; created_at: string; approved_at: string | null; is_featured: boolean; is_editorial: boolean; editorial_icon: string | null; mavi_kadraj_message_reactions: { reaction: Reaction }[] };
const TABS: { status: Status; label: string }[] = [{ status: "pending", label: "Bekleyenler" }, { status: "approved", label: "Yayınlananlar" }, { status: "rejected", label: "Reddedilenler" }];

export function MaviKadrajAdmin() {
  const supabase = useMemo<SupabaseClient>(() => createPublicSupabaseClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [tab, setTab] = useState<Status>("pending");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const { data, error: queryError } = await supabase.from("mavi_kadraj_messages").select("id,name,message,status,created_at,approved_at,is_featured,is_editorial,editorial_icon,mavi_kadraj_message_reactions(reaction)").order("created_at", { ascending: false });
    if (queryError) setError(queryError.message); else setMessages((data ?? []) as AdminMessage[]);
  }, [supabase]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) void load();
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (next) void load();
    });
    return () => data.subscription.unsubscribe();
  }, [supabase, load]);

  if (!isSupabaseConfigured) return <main className="mk-admin-login"><p>Supabase ortam değişkenleri yapılandırılmadı.</p></main>;

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    const values = new FormData(event.currentTarget);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: String(values.get("email")), password: String(values.get("password")) });
    if (authError) setError("Oturum açılamadı.");
  };
  const update = async (id: string, changes: Partial<Pick<AdminMessage, "status" | "is_featured">>) => {
    const { error: updateError } = await supabase.from("mavi_kadraj_messages").update(changes).eq("id", id);
    if (updateError) setError(updateError.message); else await load();
  };
  const remove = async (id: string) => {
    if (!window.confirm("Bu cümle kalıcı olarak silinsin mi?")) return;
    const { error: deleteError } = await supabase.from("mavi_kadraj_messages").delete().eq("id", id);
    if (deleteError) setError(deleteError.message); else await load();
  };

  if (!session) return <main className="mk-admin-login"><form onSubmit={login}><p>MAVİ KADRAJ</p><h1>Sizden Gelenler</h1><label>E-posta<input name="email" type="email" required /></label><label>Şifre<input name="password" type="password" required /></label><button>Giriş yap</button>{error && <span role="alert">{error}</span>}</form></main>;

  const visible = messages.filter((item) => item.status === tab);
  return <main className="mk-admin"><header><div><p>MK DIGITAL SYSTEMS / MAVİ KADRAJ</p><h1>Sizden Gelenler</h1></div><button onClick={() => void supabase.auth.signOut()}>Çıkış</button></header>
    <nav>{TABS.map((item) => <button className={tab === item.status ? "is-active" : ""} key={item.status} onClick={() => setTab(item.status)}>{item.label}<span>{messages.filter((message) => message.status === item.status).length}</span></button>)}</nav>
    {error && <p className="mk-admin__error">{error}</p>}
    <section>{visible.map((item) => {
      const counts = Object.fromEntries(REACTIONS.map((key) => [key, item.mavi_kadraj_message_reactions.filter((entry) => entry.reaction === key).length])) as Record<Reaction, number>;
      const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
      return <article key={item.id}><div className="mk-admin__meta"><strong>{item.editorial_icon && `${item.editorial_icon} `}{item.name}</strong>{item.is_editorial && <span className="mk-admin__editorial">Editorial</span>}<time>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.created_at))}</time><span>{item.status}</span></div><blockquote>{item.message}</blockquote>
        <div className="mk-admin__reactions"><b>Toplam tepki: {total}</b>{REACTIONS.map((reaction) => <span key={reaction}>{REACTION_EMOJI[reaction]} {counts[reaction]}</span>)}</div>
        <div className="mk-admin__actions">{item.status !== "approved" && <button onClick={() => void update(item.id, { status: "approved" })}>✓ Yayınla</button>}{item.status !== "rejected" && <button onClick={() => void update(item.id, { status: "rejected" })}>✕ Reddet</button>}{item.status === "approved" && <button onClick={() => void update(item.id, { status: "pending" })}>Yayından kaldır</button>}{item.status === "approved" && <button onClick={() => void update(item.id, { is_featured: !item.is_featured })}>{item.is_featured ? "Öne çıkarmayı kaldır" : "Öne çıkar"}</button>}<button onClick={() => void remove(item.id)}>Sil</button></div>
      </article>;
    })}{visible.length === 0 && <p className="mk-admin__empty">Bu bölümde cümle yok.</p>}</section>
  </main>;
}
