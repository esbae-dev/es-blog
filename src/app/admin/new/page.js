import Link from "next/link";
import PostForm from "../PostForm";

export default function NewPostPage() {
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
          새 글 작성
        </h1>
        <PostForm mode="create" />
      </main>
    </div>
  );
}
