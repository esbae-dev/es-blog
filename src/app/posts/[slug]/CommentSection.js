"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentSection({ slug, initialComments }) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postSlug: slug, authorName, content }),
    });

    const body = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(body.error || "댓글 등록에 실패했습니다.");
      return;
    }

    setComments([...comments, body.comment]);
    setContent("");
    router.refresh();
  }

  return (
    <section className="mt-16">
      <h2 className="text-lg font-semibold text-black dark:text-zinc-50 mb-4">
        댓글 {comments.length}개
      </h2>

      <ul className="flex flex-col gap-4 mb-8">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="border-b border-zinc-200 dark:border-zinc-800 pb-4"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-sm text-black dark:text-zinc-50">
                {comment.author_name}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {comment.created_at.slice(0, 10)}
              </span>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1 whitespace-pre-wrap">
              {comment.content}
            </p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="이름"
          maxLength={30}
          className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-black dark:text-zinc-50"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 남겨보세요"
          rows={3}
          maxLength={1000}
          className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-black dark:text-zinc-50"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="self-start rounded bg-black dark:bg-zinc-50 text-white dark:text-black px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {loading ? "등록 중..." : "댓글 남기기"}
        </button>
      </form>
    </section>
  );
}
