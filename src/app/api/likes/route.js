import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabasePublic";

export async function POST(request) {
  const { slug, liked } = await request.json();

  if (!slug || typeof liked !== "boolean") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { data, error } = await supabasePublic.rpc(
    liked ? "increment_like" : "decrement_like",
    { post_slug: slug }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ likeCount: data });
}
