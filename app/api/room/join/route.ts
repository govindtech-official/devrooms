import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";

export async function POST(req: Request) {
  await connectDB();

  const { code } = await req.json();

  const room = await Room.findOne({ code });

  if (!room) {
    return NextResponse.json(
      { error: "Invalid room code" },
      { status: 404 }
    );
  }

  return NextResponse.json({ room });
}