"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import TopicSection from "@/components/TopicSection";
import AddTopicModal from "@/components/AddTopicModal";
import AddPointModal from "@/components/AddPointModal";
import AudioRecorder from "@/components/AudioRecorder";
import ActionItemsTable from "@/components/ActionItemsTable";

export default function MeetingDetail({ params }: any) {
  const [meeting, setMeeting] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [actionItems, setActionItems] = useState<any[]>([]);
  const id = params?.id;

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/api/meetings/${id}`);
        setMeeting(res.data.meeting);
        setTopics(res.data.topics || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  async function addTopic(title: string) {
    try {
      const res = await api.post("/api/topics", { meeting_id: id, title });
      setTopics(prev => [...prev, res.data.topic]);
    } catch (err) { console.error(err) }
  }

  async function addPoint(text: string, assignee?: string) {
    try {
      const res = await api.post("/api/points", { topic_id: topics[0]?.id, text, assignee }); // for simplicity use first topic
      // re-fetch topics/points or push to local
      const t = await api.get(`/api/meetings/${id}`);
      setTopics(t.data.topics || []);
    } catch (err) { console.error(err) }
  }

  async function generateSummary() {
    try {
      const body = { text: (meeting?.description || "") + "\n" + topics.map(t=>t.title + ":" + (t.points||[]).map((p:any)=>p.text).join(";")).join("\n") };
      const res = await api.post("/api/ai/summarize", body);
      alert("Summary:\n\n" + res.data.summary);
      if (res.data.action_items) setActionItems(res.data.action_items);
    } catch (err) { console.error(err); alert("Summary failed") }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{meeting?.title}</h2>
          <p className="text-sm text-slate-500">{meeting?.date}</p>
          <p className="mt-2">{meeting?.description}</p>
        </div>

        <div className="flex gap-2">
          <AddTopicModal onAdd={addTopic} />
          <AddPointModal onAdd={addPoint} />
          <button onClick={generateSummary} className="px-3 py-1 bg-orange-500 text-white rounded">Generate Summary</button>
        </div>

        <div className="space-y-4">
          {topics.map((t: any) => (
            <TopicSection key={t.id} title={t.title} points={t.points || []} />
          ))}
        </div>
      </div>

      <aside className="space-y-4">
        <AudioRecorder meetingId={id} />
        <ActionItemsTable items={actionItems} />
      </aside>
    </div>
  );
}
