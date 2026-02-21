import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isAuthed(req: Request) {
  const header = req.headers.get("cookie") ?? "";
  return header.split(";").some((part) => {
    const [name, value] = part.trim().split("=");
    return name === "admin_auth" && value === "ok";
  });
}

export async function GET() {
  try {
    const items = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isAuthed(req)) return NextResponse.json({ ok: false }, { status: 401 });
    const body = await req.json();
    const { id, title, description, image, categoryId, subCategoryId, type } = body ?? {};
    if (!id || !title || !description || !image || !categoryId || !subCategoryId || !type) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const created = await prisma.post.create({
      data: { id, title, description, image, categoryId, subCategoryId, type },
    });
    return NextResponse.json({ ok: true, item: created });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
