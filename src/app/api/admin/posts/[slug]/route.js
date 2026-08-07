import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isAuthed } from "@/lib/adminAuth";

export async function PUT(request, { params }) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { slug } = await params;
  const { title, summary, content } = await request.json();

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "제목과 본문은 필수입니다." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("posts")
    .update({ title: title.trim(), summary: summary?.trim() || "", content: content.trim() })
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data });
}

export async function DELETE(request, { params }) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { slug } = await params;
  const { error } = await supabaseAdmin.from("posts").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
