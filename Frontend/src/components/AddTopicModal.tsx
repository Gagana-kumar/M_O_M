import React, { useState } from "react";

export default function AddTopicModal({ onAdd }: { onAdd: (title: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  function submit() {
    if (!title) return;
    onAdd(title);
    setTitle("");
    setOpen(false);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-3 py-1 bg-blue-500 text-white rounded">Add Topic</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <h3 className="font-semibold mb-3">Add Topic</h3>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
              <button onClick={submit} className="px-3 py-1 bg-teal-500 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
