import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";
import { KadrajinOtesiReading } from "@/components/KadrajinOtesiReading";
import { EssaySignature } from "@/components/EssaySignature";
import { getKadrajinOtesiBody, getKadrajinOtesiPost, kadrajinOtesiPosts } from "@/lib/kadrajinOtesi";
import { site } from "@/lib/site";

export function generateStaticParams() { return kadrajinOtesiPosts.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{ const {slug}=await params; const post=getKadrajinOtesiPost(slug); if(!post)return{}; return {title:post.title,description:post.description,openGraph:{title:`${post.title} — ${site.name}`,description:post.description,type:"article",publishedTime:post.publishedAt,images:[post.ogImage]}}; }

export default async function BeyondArticle({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const post=getKadrajinOtesiPost(slug); const body=getKadrajinOtesiBody(slug); if(!post||!body)notFound();
  return <main className="exhibition-page beyond-article"><ExhibitionHeader /><article><Link href="/kadrajin-otesi" className="beyond-back">← Kadrajın Ötesinde</Link><header><span>{post.dateLabel}</span><h1>{post.title}</h1><p>{post.description}</p></header><KadrajinOtesiReading paragraphs={body} images={post.readingImages} image={post.readingImage} imageAfterParagraph={post.readingImageAfterParagraph} imageClass={post.readingImageClass} imageWidth={post.readingImageWidth} imageHeight={post.readingImageHeight} /><EssaySignature /></article><aside className="beyond-article__end"><span aria-hidden>✨</span><p>Bazı cümleler,<br /><em>fotoğraftan sonra başlar.</em></p></aside><ExhibitionFooter /></main>;
}
