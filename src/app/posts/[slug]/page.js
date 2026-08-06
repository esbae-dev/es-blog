import Link from "next/link";
import { getAllPostSlugs, getPostData } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col py-16 px-6">
        <Link
          href="/"
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:underline mb-8"
        >
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-2">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10">
          {post.date}
        </p>
        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>
    </div>
  );
}
