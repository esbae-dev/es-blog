"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm({ mode, slug, initialData }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${slug}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, summary, content }),
    });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "저장에 실패했습니다.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("정말 이 글을 삭제할까요?")) return;
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-black dark:text-zinc-50 text-lg font-semibold"
      />
      <input
        type="text"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="한 줄 요약"
        className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-black dark:text-zinc-50"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="본문 (Markdown 문법 사용 가능)"
        rows={16}
        className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-black dark:text-zinc-50 font-mono text-sm"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black dark:bg-zinc-50 text-white dark:text-black px-4 py-2 font-medium disabled:opacity-50"
        >
          {loading ? "저장 중..." : "저장"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded border border-red-300 text-red-600 px-4 py-2 font-medium"
          >
            삭제
          </button>
        )}
      </div>
    </form>
  );
}
