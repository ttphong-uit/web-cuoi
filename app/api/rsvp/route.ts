import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";

import { GHeader, GRowValue } from "@/app/_types/google-sheet";

const SHEET_ID = "1DdkM7HbhJ5xpyJDMJQJ00Pe8RMXDNs1SrDfGWLNEB1k";
const SHEET_TAB_NAME = "RSVP";
const HEADERS: GHeader = ["Tên", "Tham dự", "Bài hát", "Thời gian"];

const getGoogleSheet = async (doc: GoogleSpreadsheet) => {
  let sheet = doc.sheetsByTitle[SHEET_TAB_NAME];

  if (!sheet) {
    sheet = await doc.addSheet({
      title: SHEET_TAB_NAME,
    });
  }
  try {
    await sheet.loadHeaderRow();
  } catch (err) {
    await sheet.setHeaderRow(HEADERS);
    await sheet.loadHeaderRow();
  }

  return sheet;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { attendance, name, partnerName, song } = body;

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);

    await doc.loadInfo();

    const sheet = await getGoogleSheet(doc);

    // Format data for row
    const row: GRowValue = {
      Tên: name,
      "Tham dự":
        attendance === "yes"
          ? "Tham gia"
          : attendance === "yesPartner"
          ? "Tham gia cùng người bạn"
          : "Không tham gia",
      "Bài hát": song || "",
      "Thời gian": new Date().toLocaleString("vi-VN"),
    };

    await sheet.addRow(row);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GSHEET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
