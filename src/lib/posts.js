import { remark } from "remark";
import html from "remark-html";
import { supabasePublic } from "@/lib/supabasePublic";

export async function getSortedPostsData() {
  const { data, error } = await supabasePublic
    .from("posts")
    .select("slug, title, summary, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((post) => ({
    ...post,
    date: post.created_at.slice(0, 10),
  }));
}

export async function getPostData(slug) {
  const { data: post, error } = await supabasePublic
    .from("posts")
    .select("slug, title, summary, content, created_at, like_count")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!post) return null;

  const processedContent = await remark().use(html).process(post.content);

  return {
    ...post,
    date: post.created_at.slice(0, 10),
    contentHtml: processedContent.toString(),
  };
}
