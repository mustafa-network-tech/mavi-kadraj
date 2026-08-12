import Link from "next/link";
import { HeaderMobileCameraMenu } from "@/components/HeaderMobileCameraMenu";

export function ExhibitionHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`exhibition-header ${overlay ? "exhibition-header--overlay" : ""}`}>
      <Link href="/" className="exhibition-brand">MAVİ KADRAJ</Link>
      <nav className="exhibition-nav" aria-label="Ana menü">
        <Link href="/kadraj-yansimalari">Kadraj Yansımaları</Link>
        <Link href="/kadrajin-otesi">Kadrajın Ötesinde</Link>
        <Link href="/sizden-gelenler">Sizden Gelenler</Link>
        <Link href="/mavi-kadraj-kimdir">Mavi Kadraj Kimdir</Link>
      </nav>
      <HeaderMobileCameraMenu />
    </header>
  );
}
