import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();

  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({
      success: false,
    });
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const filename =
    Date.now() + "-" + file.name;

  const filepath = path.join(
    process.cwd(),
    "public/uploads",
    filename
  );

  await writeFile(filepath, buffer);

  return NextResponse.json({
    success: true,
    image: `/uploads/${filename}`,
  });
}