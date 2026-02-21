"use client";
import React, { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  category: string;
  subCategory: string;
  subject?: string | null;
  message: string;
  createdAt: string;
};

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/contact?take=50", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data?.ok) {
          setItems(data.latest || []);
        } else {
          setError("Failed to load");
        }
      } catch {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-[100dvh] px-6 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Contact Submissions</h1>
            <p className="text-gray-600 text-sm">Latest 50</p>
          </div>
          <a href="/admin" className="rounded-full bg-black text-white px-5 py-2 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">Back</a>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No submissions found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-black/10 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Subject</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.id} className="border-b last:border-b-0 border-black/5">
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.countryCode} {c.phone}</td>
                    <td className="px-4 py-3">{c.category} / {c.subCategory}</td>
                    <td className="px-4 py-3">{c.subject || "-"}</td>
                    <td className="px-4 py-3 max-w-[360px]">
                      <span className="line-clamp-2 text-gray-700">{c.message}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
