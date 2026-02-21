"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white/70 backdrop-blur-md border border-black/10 rounded-2xl p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-black text-center">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border border-black/20 px-3 py-2 outline-none focus:border-black"
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="rounded-full bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">Login</button>
      </form>
    </main>
  );
}
