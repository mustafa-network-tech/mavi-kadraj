import type { Metadata } from "next";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";

export const metadata: Metadata = { title: "Mavi Kadraj Kimdir" };

export default function MaviKadrajKimdirPage() {
  return <main className="exhibition-page min-h-[100dvh]"><ExhibitionHeader /></main>;
}
