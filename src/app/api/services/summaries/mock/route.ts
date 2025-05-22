import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "tests/fixtures/bookings-summaries.json"
  );
  const fileBuffer = await fs.readFile(filePath);
  const json = JSON.parse(fileBuffer.toString());
  return NextResponse.json(json);
}
