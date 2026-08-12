import type { Metadata } from "next";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";
import { VisitorMessages } from "@/components/VisitorMessages";

export const metadata: Metadata = { title: "Sizden Gelenler", description: "Mavi Kadraj'a bırakılan küçük cümleler ve düşünceler." };

export default function SizdenGelenlerPage() {
  return <main className="exhibition-page visitors-page"><ExhibitionHeader />
    <header className="visitors-intro"><p>BAŞKA BİR KADRAJ</p><h1>Sizden<br /><em>Gelenler</em></h1><blockquote>“Bazen bir fotoğraf bir cümle bırakır.<br />Bazen bir cümle, başka bir kadraj açar.”</blockquote></header>
    <div className="visitors-content"><VisitorMessages /></div>
    <ExhibitionFooter />
  </main>;
}
