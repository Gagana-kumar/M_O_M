"use client";
import React from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth() as any;

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Use uploaded image path as logo URL */}
          <img src="/mnt/data/c831a93b-e091-4c7f-b8be-92a95ec3e227.jpg" alt="logo" className="w-10 h-10 rounded-md object-cover"/>
          <Link href="/" className="text-xl font-semibold">QuickMOM</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/new" className="px-3 py-1 bg-teal-500 text-white rounded">New Meeting</Link>
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name || user.email}</span>
              <button onClick={() => logout()} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <Link href="/login" className="px-3 py-1 border rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
