export function formatDate(dt?: string) {
  if (!dt) return "";
  try {
    const d = new Date(dt);
    return d.toLocaleString();
  } catch {
    return dt;
  }
}
