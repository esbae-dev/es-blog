import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import PostForm from "../../PostForm";
import CommentsAdmin from "../../CommentsAdmin";

export default async function EditPostPage({ params }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const { data: post } = await supabaseAdmin
    .from("posts")
    .select("slug, title, summary, content")
    .eq("slug", slug)
    .maybeSingle();

  if (!post) {
    notFound();
  }

  const { data: comments } = await supabaseAdmin
    .from("comments")
    .select("id, author_name, content, created_at")
    .eq("post_slug", slug)
    .order("created_at", { ascending: true });

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col py-10 px-4 sm:py-16 sm:px-6">
        <Link
          href="/admin"
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:underline mb-6"
        >
          ← 관리자 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">
          글 수정
        </h1>
        <PostForm mode="edit" slug={post.slug} initialData={post} />

        <h2 className="text-xl font-bold text-black dark:text-zinc-50 mt-12 mb-4">
          댓글 관리
        </h2>
        <CommentsAdmin initialComments={comments || []} />
      </main>
    </div>
  );
}
