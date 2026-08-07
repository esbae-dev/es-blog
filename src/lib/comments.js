import { supabasePublic } from "@/lib/supabasePublic";

export async function getCommentsForPost(slug) {
  const { data, error } = await supabasePublic
    .from("comments")
    .select("id, author_name, content, created_at")
    .eq("post_slug", slug)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}
