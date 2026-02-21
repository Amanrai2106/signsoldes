"use client";
import React, { useEffect, useState } from "react";

type Post = { id: string; title: string; description: string; image: string; categoryId: string; subCategoryId: string; type: "project" | "service" };

export default function AdminPosts() {
  const [items, setItems] = useState<Post[]>([]);
  const [form, setForm] = useState<Post>({ id: "", title: "", description: "", image: "", categoryId: "", subCategoryId: "", type: "project" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/posts", { cache: "no-store" });
    const data = await res.json();
    if (res.ok && data?.ok) setItems(data.items);
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) setError("Create failed");
    setSaving(false);
    setForm({ id: "", title: "", description: "", image: "", categoryId: "", subCategoryId: "", type: "project" });
    await load();
  };

  return (
    <main className="min-h-[100dvh] px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Posts</h1>
            <p className="text-gray-600 text-sm">Manage project/service posts</p>
          </div>
          <a href="/admin" className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">Back</a>
        </div>

        <form onSubmit={onCreate} className="mb-10 grid grid-cols-1 md:grid-cols-6 gap-3 bg-white border border-black/10 p-4 rounded-2xl">
          <input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="ID (unique)" className="border rounded-lg px-3 py-2" required />
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="border rounded-lg px-3 py-2" required />
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="border rounded-lg px-3 py-2 md:col-span-2" required />
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="border rounded-lg px-3 py-2" required />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "project" | "service" })} className="border rounded-lg px-3 py-2">
            <option value="project">Project</option>
            <option value="service">Service</option>
          </select>
          <input value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} placeholder="Category ID" className="border rounded-lg px-3 py-2" required />
          <input value={form.subCategoryId} onChange={(e) => setForm({ ...form, subCategoryId: e.target.value })} placeholder="Subcategory ID" className="border rounded-lg px-3 py-2" required />
          <button disabled={saving} className="md:col-span-6 rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">
            {saving ? "Saving..." : "Add Post"}
          </button>
          {error && <p className="text-red-600 md:col-span-6">{error}</p>}
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((p) => (
            <div key={p.id} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <span className="text-xs uppercase px-2 py-1 border rounded-full">{p.type}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{p.id}</p>
              <p className="text-gray-600 text-sm">{p.description}</p>
              <p className="text-xs text-gray-600 mt-2">Category: {p.categoryId} • Sub: {p.subCategoryId}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
