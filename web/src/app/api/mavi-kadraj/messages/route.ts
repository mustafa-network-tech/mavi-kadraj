import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { cleanText, REACTIONS, type Reaction } from "@/lib/messages";
import { getVisitor, hashVisitor, setVisitorCookie } from "@/lib/visitor";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const visitor = getVisitor(request);
    const visitorHash = hashVisitor(visitor);
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("mavi_kadraj_messages")
      .select("id,name,message,created_at,approved_at,is_featured,is_editorial,editorial_icon,mavi_kadraj_message_reactions(reaction,visitor_id)")
      .eq("status", "approved")
      .order("is_editorial", { ascending: true })
      .order("is_featured", { ascending: false })
      .order("approved_at", { ascending: false });
    if (error) throw error;

    const messages = (data ?? []).map((row) => {
      const reactions = Object.fromEntries(REACTIONS.map((key) => [key, 0])) as Record<Reaction, number>;
      let selectedReaction: Reaction | null = null;
      for (const item of row.mavi_kadraj_message_reactions ?? []) {
        const reaction = item.reaction as Reaction;
        if (REACTIONS.includes(reaction)) reactions[reaction] += 1;
        if (item.visitor_id === visitorHash) selectedReaction = reaction;
      }
      return { id: row.id, name: row.name, message: row.message, created_at: row.created_at, approved_at: row.approved_at, is_featured: row.is_featured, is_editorial: row.is_editorial, editorial_icon: row.editorial_icon, reactions, selectedReaction };
    });
    const response = NextResponse.json({ messages });
    setVisitorCookie(response, visitor);
    return response;
  } catch {
    return NextResponse.json({ error: "Mesajlar şu anda yüklenemiyor." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });
    const name = cleanText(body.name, 60);
    const message = cleanText(body.message, 800);
    if (name.length < 2 || message.length < 3) return NextResponse.json({ error: "Lütfen iki alanı da doldurun." }, { status: 400 });

    const visitor = getVisitor(request);
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateHash = hashVisitor(`${visitor}:${ip}`);
    const supabase = createServerSupabaseClient();
    const { data: limit } = await supabase.from("mavi_kadraj_submission_limits").select("last_submitted_at").eq("visitor_id", rateHash).maybeSingle();
    if (limit && Date.now() - new Date(limit.last_submitted_at).getTime() < 60_000) {
      return NextResponse.json({ error: "Bir sonraki cümle için biraz bekleyin." }, { status: 429 });
    }
    const { error } = await supabase.from("mavi_kadraj_messages").insert({ name, message, status: "pending", is_featured: false, is_editorial: false, editorial_icon: null });
    if (error) throw error;
    await supabase.from("mavi_kadraj_submission_limits").upsert({ visitor_id: rateHash, last_submitted_at: new Date().toISOString() });
    const response = NextResponse.json({ ok: true }, { status: 201 });
    setVisitorCookie(response, visitor);
    return response;
  } catch {
    return NextResponse.json({ error: "Cümlen şu anda gönderilemedi. Lütfen yeniden dene." }, { status: 503 });
  }
}
