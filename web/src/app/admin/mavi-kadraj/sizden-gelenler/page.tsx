import type { Metadata } from "next";
import { MaviKadrajAdmin } from "@/components/MaviKadrajAdmin";

export const metadata: Metadata = { title: "Sizden Gelenler Yönetimi", robots: { index: false, follow: false } };

export default function AdminMessagesPage() { return <MaviKadrajAdmin />; }
