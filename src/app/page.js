import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col py-10 px-4 sm:py-16 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-zinc-50 mb-2">
          나의 블로그
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-8 sm:mb-10">
          생각과 기록을 남기는 공간입니다.
        </p>

        <ul className="flex flex-col gap-5 sm:gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="block group">
                <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-zinc-50 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {post.date}
                </p>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 mt-2">
                  {post.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
