import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "admin_auth",
      value: "",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
