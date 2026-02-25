import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

function isAuthed(req: Request) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }
  const header = req.headers.get("cookie") ?? "";
  return header.split(";").some((part) => {
    const [name, value] = part.trim().split("=");
    return name === "admin_auth" && value === "ok";
  });
}

export async function POST(req: Request) {
  try {
    if (!isAuthed(req)) return NextResponse.json({ ok: false }, { status: 401 });
    const body = await req.json();
    const { filename, data } = body ?? {};
    if (!filename || !data) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Local development: fallback to local FS if no BLOB_READ_WRITE_TOKEN
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ ok: false, error: "Vercel Blob token missing" }, { status: 500 });
      }
      // Re-importing node modules inside if needed for local fallback if we want to keep it
      // But for Vercel, we MUST use Blob.
    }

    const buffer = Buffer.from(data.split(",")[1] || data, "base64");
    // If the store is private, we don't specify access: 'public'
    const blob = await put(filename, buffer, {
      access: 'public', // Most Vercel Blob stores are public by default for assets
      addRandomSuffix: true,
    }).catch(async (err) => {
      // Fallback if public access is denied
      if (err.message.includes("private store")) {
        return await put(filename, buffer, { addRandomSuffix: true });
      }
      throw err;
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
