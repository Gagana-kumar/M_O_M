import React from "react";

export default function ActionItemsTable({ items } : { items: any[] }) {
  return (
    <div className="bg-white rounded shadow p-4 overflow-auto">
      <h4 className="font-semibold mb-3">Action Items</h4>
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-slate-500">
            <th>Task</th>
            <th>Assignee</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{it.task}</td>
              <td className="py-2">{it.assignee || "-"}</td>
              <td className="py-2">{it.due || "-"}</td>
              <td className="py-2">{it.status || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
