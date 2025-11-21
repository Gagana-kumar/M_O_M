// helpers for token storage
export function saveToken(token: string) {
  localStorage.setItem("quickmom_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("quickmom_token");
}

export function clearToken() {
  localStorage.removeItem("quickmom_token");
}
