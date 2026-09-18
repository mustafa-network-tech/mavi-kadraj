import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/PageStructuredData";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";
import { kadrajinOtesiPostsSorted } from "@/lib/kadrajinOtesi";

const description = "Mavi Kadraj’ın fotoğrafın ardından kalan düşünceler, yollar ve sessiz anlar üzerine yazılarını Kadrajın Ötesinde okuyun.";
export const metadata = pageMetadata("/kadrajin-otesi", "Kadrajın Ötesinde", description);

export default function KadrajinOtesiIndexPage() {
  const posts = kadrajinOtesiPostsSorted();
  return <main className="exhibition-page beyond-page"><ExhibitionHeader />
    <PageStructuredData path="/kadrajin-otesi" name="Kadrajın Ötesinde" description={description} collection />
    <header className="beyond-intro"><p>Fotoğrafın ardından</p><h1>Kadrajın<br /><em>Ötesinde</em></h1><blockquote>Görünen biter.<br />Hissedilen biraz daha kalır.</blockquote></header>
    <section className="beyond-posts" aria-label="Yazılar">{posts.map((post) => <article key={post.slug} className="reveal-up"><span>{post.dateLabel}</span><Link href={`/kadrajin-otesi/${post.slug}`}><h2>{post.title}</h2><p>{post.description}</p><b>Okumaya geç →</b></Link></article>)}</section>
    <ExhibitionFooter />
  </main>;
}
