import { NextResponse } from "next/server";
import { Message } from "@/app/_types/message";
import fs from "fs";
import path from "path";

// Path to the JSON file that stores messages
const messagesFilePath = path.join(process.cwd(), "data", "messages.json");

// Default messages
const defaultMessages: Message[] = [
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

// Helper function to ensure the data directory and file exist
function ensureDataFileExists() {
  const dataDir = path.dirname(messagesFilePath);

  // Create data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Create messages.json with default messages if it doesn't exist
  if (!fs.existsSync(messagesFilePath)) {
    fs.writeFileSync(
      messagesFilePath,
      JSON.stringify(defaultMessages, null, 2),
      "utf-8"
    );
  }
}

// Helper function to read messages from the JSON file
function readMessages(): Message[] {
  try {
    ensureDataFileExists();
    const fileContent = fs.readFileSync(messagesFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading messages:", error);
    return [];
  }
}

// Helper function to write messages to the JSON file
function writeMessages(messages: Message[]): void {
  try {
    ensureDataFileExists();
    fs.writeFileSync(
      messagesFilePath,
      JSON.stringify(messages, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing messages:", error);
  }
}

export async function GET() {
  const messages = readMessages();
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

    const messages = readMessages();
    messages.push(newMessage);
    writeMessages(messages);

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
