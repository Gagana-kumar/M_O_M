"use client";
import React, { useState } from "react";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import { api } from "@/lib/api";

export default function AudioRecorder({ meetingId }: { meetingId?: string | number }) {
  const { start, stop, recording, audioUrl, getAudioBlob } = useAudioRecorder();
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<string>("");

  async function upload() {
    const blob = getAudioBlob();
    if (!blob) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("file", blob, "meeting_audio.webm");
    if (meetingId) fd.append("meeting_id", String(meetingId));

    try {
      const res = await api.post("/api/ai/transcribe", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setTranscript(res.data.transcript || res.data.text || "");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex items-center gap-2">
        <button onClick={start} disabled={recording} className="px-3 py-1 bg-green-500 text-white rounded">Record</button>
        <button onClick={stop} disabled={!recording} className="px-3 py-1 bg-yellow-400 rounded">Stop</button>
        <button onClick={upload} disabled={loading} className="px-3 py-1 bg-teal-500 text-white rounded">Upload</button>
      </div>
      {audioUrl && <audio src={audioUrl} controls className="mt-2" />}
      {transcript && (
        <div className="mt-3 p-2 bg-slate-50 rounded">
          <h5 className="font-semibold">Transcript</h5>
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  );
}
