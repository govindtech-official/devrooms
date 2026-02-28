import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  await connectDB();

  const { name, creator } = await req.json();

  const code = generateRoomCode();

  const room = await Room.create({
    name,
    creator,
    code,
  });

  return NextResponse.json({ room });
}