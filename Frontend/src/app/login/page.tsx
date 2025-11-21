"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, user } = res.data;
      if (!token) throw new Error("No token received");
      saveToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      router.push("/");
    } catch (error: any) {
      setErr(error?.response?.data?.error || error.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in to QuickMOM</h2>
        {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required className="mt-1 block w-full rounded-md border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required className="mt-1 block w-full rounded-md border p-2" />
          </div>
          <button className="w-full py-2 bg-teal-500 text-white rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
