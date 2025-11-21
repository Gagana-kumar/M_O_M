import React, { useState } from "react";

export default function AddPointModal({ onAdd }: { onAdd: (text:string, assignee?:string) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [assignee, setAssignee] = useState("");

  function submit() {
    if (!text) return;
    onAdd(text, assignee || undefined);
    setText(""); setAssignee(""); setOpen(false);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-3 py-1 bg-indigo-500 text-white rounded">Add Point</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96">
            <h3 className="font-semibold mb-3">Add Discussion Point</h3>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full p-2 border rounded mb-2" />
            <input value={assignee} onChange={(e)=>setAssignee(e.target.value)} placeholder="Assign to (optional)" className="w-full p-2 border rounded mb-3" />
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
