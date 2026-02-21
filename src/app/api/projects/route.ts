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
    const items = await prisma.projectCategory.findMany({
      orderBy: { id: "asc" },
      include: { subCategories: true },
    });
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isAuthed(req)) return NextResponse.json({ ok: false }, { status: 401 });
    const body = await req.json();
    const { id, title, description, src, color, relatedServiceIds } = body ?? {};
    if (!id || !title || !description || !src) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const created = await prisma.projectCategory.create({
      data: { id, title, description, src, color, relatedServiceIds: relatedServiceIds ?? [] },
    });
    return NextResponse.json({ ok: true, item: created });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
