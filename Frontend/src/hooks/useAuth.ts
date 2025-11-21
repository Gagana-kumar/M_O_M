"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getToken, saveToken, clearToken } from "@/lib/auth";

export default function useAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get("/api/auth/me").then(res => {
        setUser(res.data.user);
      }).catch(() => {
        clearToken();
        setUser(null);
      }).finally(()=> setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(token: string, userObj: any) {
    saveToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userObj);
  }

  function logout() {
    clearToken();
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  }

  return { user, loading, login, logout };
}
