import { NextResponse } from "next/server";
import { Message } from "@/app/_types/message";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SHEET_ID = "1DdkM7HbhJ5xpyJDMJQJ00Pe8RMXDNs1SrDfGWLNEB1k";
const SHEET_TAB_NAME = "Lời chúc";

// Define local type for this specific sheet
type MessageRow = {
  Tên: string;
  "Lời chúc": string;
  "Thời gian": string;
};

const getDoc = async () => {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
};

const getSheet = async (doc: GoogleSpreadsheet) => {
  let sheet = doc.sheetsByTitle[SHEET_TAB_NAME];

  if (!sheet) {
    sheet = await doc.addSheet({
      title: SHEET_TAB_NAME,
    });
  }

  try {
    await sheet.loadHeaderRow();
  } catch (err) {
    await sheet.setHeaderRow(["Tên", "Lời chúc", "Thời gian"]);
    await sheet.loadHeaderRow();
  }

  return sheet;
};

export async function GET() {
  try {
    const doc = await getDoc();
    const sheet = await getSheet(doc);

    const rows = await sheet.getRows<MessageRow>();

    const messages: Message[] = rows.map((row, index) => ({
      id: index.toString(), // Or use row.rowIndex if available, or generate a UUID
      name: row.get("Tên") || "",
      content: row.get("Lời chúc") || "",
      createdAt: row.get("Thời gian") || "",
    }));

    // Reverse to show newest first? Or leave as is.
    // The previous implementation read from JSON which appended, so newer at bottom?
    // Usually UI controls order. WidgetMessage.tsx renders [...messages, ...messages] in scrolling list.
    // Let's just return list.

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages from Sheet:", error);
    return NextResponse.json({ messages: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, content } = body; // createdAt from body is ignored in favor of server time or kept?
    // User's widget sends createdAt as unix timestamp, but previous local logic generated ISO string server side.
    // Let's stick to generating formatted string server side for the sheet.

    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and content are required" },
        { status: 400 }
      );
    }

    const doc = await getDoc();
    const sheet = await getSheet(doc);

    const timestamp = new Date().toLocaleString("vi-VN");

    await sheet.addRow({
      Tên: name.trim(),
      "Lời chúc": content.trim(),
      "Thời gian": timestamp,
    });

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      createdAt: timestamp,
    };

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error adding message to Sheet:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Delete not supported with Google Sheets" },
    { status: 405 }
  );
}
