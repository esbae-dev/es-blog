import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabasePublic";

export async function POST(request) {
  const { postSlug, authorName, content } = await request.json();

  const name = authorName?.trim();
  const body = content?.trim();

  if (!postSlug || !name || !body) {
    return NextResponse.json({ error: "이름과 내용을 입력해주세요." }, { status: 400 });
  }
  if (name.length > 30) {
    return NextResponse.json({ error: "이름은 30자 이하로 입력해주세요." }, { status: 400 });
  }
  if (body.length > 1000) {
    return NextResponse.json({ error: "댓글은 1000자 이하로 입력해주세요." }, { status: 400 });
  }

  const { data, error } = await supabasePublic
    .from("comments")
    .insert({ post_slug: postSlug, author_name: name, content: body })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: data });
}
