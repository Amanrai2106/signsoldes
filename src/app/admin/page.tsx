"use client";
import React from "react";
import Link from "next/link";

export default function AdminHome() {
  return (
    <main className="min-h-[100dvh] px-6 py-12">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Admin Dashboard</h1>
          <form
            action={async () => {
              "use server";
            }}
          >
            <div className="flex gap-3">
              <button
                type="button"
                onClick={async () => {
                  await fetch("/api/admin/seed", { method: "POST" });
                  alert("Seed completed (if not already seeded)");
                }}
                className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
              >
                Seed Data
              </button>
              <button
                type="button"
                onClick={async () => {
                  await fetch("/api/admin/logout", { method: "POST" });
                  window.location.href = "/admin/login";
                }}
                className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/contacts" className="group rounded-2xl border border-black/10 bg-white p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-2">Contact Submissions</h2>
            <p className="text-gray-600 text-sm">View latest messages</p>
          </Link>
          <Link href="/admin/services" className="group rounded-2xl border border-black/10 bg-white p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-2">Services</h2>
            <p className="text-gray-600 text-sm">Manage services and subcategories</p>
          </Link>
          <Link href="/admin/projects" className="group rounded-2xl border border-black/10 bg-white p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <p className="text-gray-600 text-sm">Manage project categories</p>
          </Link>
          <Link href="/admin/posts" className="group rounded-2xl border border-black/10 bg-white p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-2">Posts</h2>
            <p className="text-gray-600 text-sm">Manage project/service posts</p>
          </Link>
          <a href="/services" className="group rounded-2xl border border-black/10 bg-white p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-2">Public Site</h2>
            <p className="text-gray-600 text-sm">Open website</p>
          </a>
        </div>
      </div>
    </main>
  );
}
