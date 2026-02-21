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
    const items = await prisma.service.findMany({
      orderBy: { id: "asc" },
      include: { subCategories: true },
    });
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isAuthed(req)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const body = await req.json();
    const { title, description, details, relatedProjectIds } = body ?? {};
    if (!title || !description) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const created = await prisma.service.create({
      data: {
        title,
        description,
        details: details ?? [],
        relatedProjectIds: relatedProjectIds ?? [],
      },
    });
    return NextResponse.json({ ok: true, item: created });
  } catch {
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
