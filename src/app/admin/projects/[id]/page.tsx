"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Sub = { id: number; key: string; title: string; image: string };
type Project = { id: string; title: string; description: string; src: string; color?: string; subCategories: Sub[] };

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [item, setItem] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [src, setSrc] = useState("");
  const [color, setColor] = useState("");
  const [sub, setSub] = useState({ key: "", title: "", image: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch(`/api/projects/${id}`, { cache: "no-store" });
    const data = await res.json();
    if (res.ok && data?.ok) {
      setItem(data.item);
      setTitle(data.item.title);
      setDescription(data.item.description);
      setSrc(data.item.src);
      setColor(data.item.color || "");
    }
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, src, color }),
    });
    setSaving(false);
    await load();
  };

  const onAddSub = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/projects/${id}/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });
    setSub({ key: "", title: "", image: "" });
    setSaving(false);
    await load();
  };

  const onDeleteSub = async (subId: number) => {
    setSaving(true);
    await fetch(`/api/projects/${id}/subcategories/${subId}`, { method: "DELETE" });
    setSaving(false);
    await load();
  };

  return (
    <main className="min-h-[100dvh] px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Edit Project</h1>
            <p className="text-gray-600 text-sm">ID {id}</p>
          </div>
          <button onClick={() => router.push("/admin/projects")} className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">
            Back
          </button>
        </div>

        <form onSubmit={onSave} className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white border border-black/10 p-4 rounded-2xl">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border rounded-lg px-3 py-2" />
          <input value={src} onChange={(e) => setSrc(e.target.value)} placeholder="Image URL" className="border rounded-lg px-3 py-2" />
          <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" className="border rounded-lg px-3 py-2" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border rounded-lg px-3 py-2 md:col-span-2" />
          <button disabled={saving} className="md:col-span-4 rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">
            {saving ? "Saving..." : "Save"}
          </button>
        </form>

        <div className="bg-white border border-black/10 p-4 rounded-2xl mb-6">
          <h2 className="font-semibold mb-4">Subcategories</h2>
          <form onSubmit={onAddSub} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input value={sub.key} onChange={(e) => setSub({ ...sub, key: e.target.value })} placeholder="Key (e.g., apartments)" className="border rounded-lg px-3 py-2" required />
            <input value={sub.title} onChange={(e) => setSub({ ...sub, title: e.target.value })} placeholder="Title" className="border rounded-lg px-3 py-2" required />
            <input value={sub.image} onChange={(e) => setSub({ ...sub, image: e.target.value })} placeholder="Image URL" className="border rounded-lg px-3 py-2" required />
            <button disabled={saving} className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">
              Add
            </button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {item?.subCategories?.map((sc) => (
              <div key={sc.id} className="flex items-center justify-between border rounded-xl p-3">
                <div>
                  <p className="font-medium">{sc.title}</p>
                  <p className="text-xs text-gray-600">{sc.key}</p>
                </div>
                <button onClick={() => onDeleteSub(sc.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
