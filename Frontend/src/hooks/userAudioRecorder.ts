import { useRef, useState } from "react";

export default function useAudioRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    audioChunksRef.current = [];
    mr.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
    };
    mediaRecorderRef.current = mr;
    mr.start();
    setRecording(true);
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  function getAudioBlob(): Blob | null {
    if (audioChunksRef.current.length === 0) return null;
    return new Blob(audioChunksRef.current, { type: "audio/webm" });
  }

  return { start, stop, recording, audioUrl, getAudioBlob };
}
