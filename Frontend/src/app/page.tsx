"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { api } from "@/lib/api";
import MeetingCard from "@/components/MeetingCard";
import Link from "next/link";

export default function Dashboard() {
  const { user, loading } = useAuth() as any;
  const [meetings, setMeetings] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) {
      api.get("/api/meetings").then(res => setMeetings(res.data)).catch(()=>setMeetings([]));
    }
  }, [loading]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Meetings</h1>
        <Link href="/new" className="px-3 py-1 bg-teal-500 text-white rounded">Create Meeting</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meetings.map(m => (
          <MeetingCard key={m.id} id={m.id} title={m.title} date={m.date} description={m.description} />
        ))}
      </div>
    </div>
  );
}
