"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentsAdmin({ initialComments }) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);

  async function handleDelete(id) {
    if (!confirm("이 댓글을 삭제할까요?")) return;
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    setComments(comments.filter((c) => c.id !== id));
    router.refresh();
  }

  if (comments.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        아직 댓글이 없습니다.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3"
        >
          <div>
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
          </div>
          <button
            onClick={() => handleDelete(comment.id)}
            className="shrink-0 text-sm text-red-600 hover:underline"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
