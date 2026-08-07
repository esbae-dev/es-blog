"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug, initialCount }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${slug}`) === "1");
  }, [slug]);

  async function handleClick() {
    if (loading) return;
    setLoading(true);

    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));

    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, liked: nextLiked }),
    });

    if (res.ok) {
      const body = await res.json();
      setCount(body.likeCount);
      if (nextLiked) {
        localStorage.setItem(`liked:${slug}`, "1");
      } else {
        localStorage.removeItem(`liked:${slug}`);
      }
    } else {
      setLiked(!nextLiked);
      setCount((c) => c - (nextLiked ? 1 : -1));
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-pressed={liked}
      className="flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "#ef4444" : "none"}
        stroke={liked ? "#ef4444" : "currentColor"}
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span className="text-zinc-700 dark:text-zinc-300">{count}</span>
    </button>
  );
}
