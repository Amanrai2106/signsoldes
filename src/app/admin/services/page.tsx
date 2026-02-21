"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  description: string;
};

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/services", { cache: "no-store" });
    const data = await res.json();
    if (res.ok && data?.ok) setItems(data.items);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) {
        setError("Create failed");
      } else {
        setTitle("");
        setDescription("");
        await load();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-[100dvh] px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Services</h1>
            <p className="text-gray-600 text-sm">Create and manage services</p>
          </div>
          <a href="/admin" className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">Back</a>
        </div>

        <form onSubmit={onCreate} className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-black/10 p-4 rounded-2xl">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border rounded-lg px-3 py-2 md:col-span-2"
            required
          />
          <button
            disabled={saving}
            className="md:col-span-3 rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
          >
            {saving ? "Saving..." : "Add Service"}
          </button>
          {error && <p className="text-red-600 md:col-span-3">{error}</p>}
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((s) => (
            <Link
              href={`/admin/services/${s.id}`}
              key={s.id}
              className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
