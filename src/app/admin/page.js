import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data: posts } = await supabaseAdmin
    .from("posts")
    .select("slug, title, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col py-10 px-4 sm:py-16 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-zinc-50">
            글 관리
          </h1>
          <LogoutButton />
        </div>

        <Link
          href="/admin/new"
          className="inline-block mb-8 rounded bg-black dark:bg-zinc-50 text-white dark:text-black px-4 py-2 font-medium w-fit"
        >
          + 새 글 작성
        </Link>

        <ul className="flex flex-col gap-3">
          {(posts || []).map((post) => (
            <li
              key={post.slug}
              className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3"
            >
              <div>
                <p className="font-medium text-black dark:text-zinc-50">
                  {post.title}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {post.created_at.slice(0, 10)}
                </p>
              </div>
              <Link
                href={`/admin/edit/${post.slug}`}
                className="text-sm text-zinc-600 dark:text-zinc-300 hover:underline"
              >
                수정
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
