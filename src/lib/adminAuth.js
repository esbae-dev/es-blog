import "server-only";

export function isAuthed(request) {
  if (!process.env.ADMIN_PASSWORD) return false;
  return request.cookies.get("admin_auth")?.value === process.env.ADMIN_PASSWORD;
}

export function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}
