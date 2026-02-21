"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  src: string;
  color?: string;
};

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>({ id: "", title: "", description: "", src: "", color: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = await res.json();
    if (res.ok && data?.ok) setItems(data.items);
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) setError("Create failed");
    setSaving(false);
    setForm({ id: "", title: "", description: "", src: "", color: "" });
    await load();
  };

  return (
    <main className="min-h-[100dvh] px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Projects</h1>
            <p className="text-gray-600 text-sm">Manage project categories</p>
          </div>
          <a href="/admin" className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">Back</a>
        </div>

        <form onSubmit={onCreate} className="mb-10 grid grid-cols-1 md:grid-cols-5 gap-4 bg-white border border-black/10 p-4 rounded-2xl">
          <input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="ID (e.g., residential)" className="border rounded-lg px-3 py-2" required />
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border rounded-lg px-3 py-2" required />
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="border rounded-lg px-3 py-2 md:col-span-2" required />
          <input value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} placeholder="Image URL" className="border rounded-lg px-3 py-2" required />
          <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="Color (optional)" className="border rounded-lg px-3 py-2" />
          <button disabled={saving} className="md:col-span-5 rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">
            {saving ? "Saving..." : "Add Project"}
          </button>
          {error && <p className="text-red-600 md:col-span-5">{error}</p>}
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((p) => (
            <Link href={`/admin/projects/${p.id}`} key={p.id} className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-lg transition-all">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.id}</p>
              <p className="text-gray-600 text-sm">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
