import { NextResponse } from "next/server";
import { Message } from "@/app/_types/message";

// In-memory storage (for demo purposes)
// In production, use a database like Firebase, Supabase, or MongoDB
let messages: Message[] = [
  {
    id: "1",
    name: "Tuấn Anh",
    content: "🎊 Một hành trình hạnh phúc đang chờ đón hai bạn!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Ngọc Anh",
    content: "🎉 Chúc hai bạn luôn vui vẻ, thấu hiểu và nâng đỡ nhau!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Nam",
    content: "💕💕 Chúc hai bạn trăm năm hạnh phúc!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Thu Hà",
    content: "🎊 Chúc cho tình yêu của hai bạn mỗi ngày một lớn mạnh!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Trang",
    content: "⭐ Chúc mừng hạnh phúc lứa đôi!",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, content } = body;

    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and content are required" },
        { status: 400 }
      );
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
