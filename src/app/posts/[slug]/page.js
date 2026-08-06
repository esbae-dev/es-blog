import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function Post({ params }) {
  const { slug } = await params;

  if (!getAllPostSlugs().includes(slug)) {
    notFound();
  }

  const post = await getPostData(slug);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col py-10 px-4 sm:py-16 sm:px-6">
        <Link
          href="/"
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:underline mb-6 sm:mb-8"
        >
          ← 목록으로
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-zinc-50 mb-2">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 sm:mb-10">
          {post.date}
        </p>
        <article
          className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>
    </div>
  );
}
