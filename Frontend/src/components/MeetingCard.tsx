import React from "react";
import Link from "next/link";

type Props = {
  id: number | string;
  title: string;
  date: string;
  description?: string;
};

export default function MeetingCard({ id, title, date, description }: Props) {
  return (
    <Link href={`/meetings/${id}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="text-sm text-slate-400">{date}</div>
      </div>
    </Link>
  );
}
