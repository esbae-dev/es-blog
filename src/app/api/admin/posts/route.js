import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isAuthed, slugify } from "@/lib/adminAuth";

export async function POST(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { title, summary, content } = await request.json();

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "제목과 본문은 필수입니다." }, { status: 400 });
  }

  let slug = slugify(title) || "post";
  let attempt = 0;
  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt}`;
    const { data: existing } = await supabaseAdmin
      .from("posts")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();
    if (!existing) {
      slug = candidate;
      break;
    }
    attempt += 1;
  }

  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert({ slug, title: title.trim(), summary: summary?.trim() || "", content: content.trim() })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data });
}
