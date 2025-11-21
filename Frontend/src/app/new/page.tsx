"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function NewMeeting() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();

  async function create(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/api/meetings", { title, date, description: desc });
      router.push("/");
    } catch (err) {
      alert("Failed to create meeting");
    }
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create Meeting</h2>
      <form onSubmit={create} className="space-y-4">
        <div>
          <label className="block text-sm">Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm">Date & Time</label>
          <input value={date} onChange={(e)=>setDate(e.target.value)} type="datetime-local" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <button className="px-4 py-2 bg-teal-500 text-white rounded">Create</button>
      </form>
    </div>
  );
}
