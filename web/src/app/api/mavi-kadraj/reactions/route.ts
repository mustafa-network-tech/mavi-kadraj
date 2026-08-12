import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { REACTIONS, type Reaction } from "@/lib/messages";
import { getVisitor, hashVisitor, setVisitorCookie } from "@/lib/visitor";

export async function POST(request: NextRequest) {
  try {
    const { messageId, reaction } = await request.json() as { messageId?: string; reaction?: Reaction | null };
    if (!messageId || (reaction !== null && !REACTIONS.includes(reaction as Reaction))) return NextResponse.json({ error: "Geçersiz tepki." }, { status: 400 });
    const visitor = getVisitor(request);
    const visitorHash = hashVisitor(visitor);
    const supabase = createServerSupabaseClient();
    const { data: message } = await supabase.from("mavi_kadraj_messages").select("id").eq("id", messageId).eq("status", "approved").maybeSingle();
    if (!message) return NextResponse.json({ error: "Mesaj bulunamadı." }, { status: 404 });

    const { data: current } = await supabase.from("mavi_kadraj_message_reactions").select("reaction").eq("message_id", messageId).eq("visitor_id", visitorHash).maybeSingle();
    if (!reaction || current?.reaction === reaction) {
      await supabase.from("mavi_kadraj_message_reactions").delete().eq("message_id", messageId).eq("visitor_id", visitorHash);
    } else {
      await supabase.from("mavi_kadraj_message_reactions").upsert({ message_id: messageId, visitor_id: visitorHash, reaction }, { onConflict: "visitor_id,message_id" });
    }
    const response = NextResponse.json({ ok: true });
    setVisitorCookie(response, visitor);
    return response;
  } catch {
    return NextResponse.json({ error: "Tepki kaydedilemedi." }, { status: 503 });
  }
}
