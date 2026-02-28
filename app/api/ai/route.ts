import { NextResponse } from "next/server";

function generateResponse(message: string) {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hey 👋 I'm your DevRoom AI assistant.";
  }

  if (msg.includes("react")) {
    return "React is a JavaScript library used to build component-based user interfaces.";
  }

  if (msg.includes("javascript")) {
    return "JavaScript is a programming language used for web development and backend systems.";
  }

  if (msg.includes("mongodb")) {
    return "MongoDB is a NoSQL database that stores data as flexible JSON-like documents.";
  }

  if (msg.includes("debug")) {
    return "Paste your code and error message. I will help you debug it.";
  }

  if (msg.includes("optimize")) {
    return "To optimize code: reduce loops, cache repeated values, and use efficient data structures.";
  }

  if (msg.includes("explain")) {
    return "Sure. Please paste the code or topic you want me to explain.";
  }

  return "I understand your question. Please give more details so I can assist you better.";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const reply = generateResponse(message);
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: "AI processing error" },
      { status: 500 }
    );
  }
}