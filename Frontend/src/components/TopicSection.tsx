import React from "react";

export default function TopicSection({ title, points } : { title: string, points: any[] }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-2">{title}</h4>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className="p-2 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="text-sm">{p.text}</div>
                <div className="text-xs text-slate-400">Assigned: {p.assignee || "Unassigned"}</div>
              </div>
              <div className="text-xs px-2 py-1 rounded bg-slate-100">{p.status}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
