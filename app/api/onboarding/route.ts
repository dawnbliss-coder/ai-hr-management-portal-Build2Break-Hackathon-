import { NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { dbPromise } from "@/lib/mongodb";
import PDFParser from "pdf2json";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("employeeName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: "employeeName is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text using pdf2json (kept consistent with the rest of the app).
    const pdfParser = new (PDFParser as any)(null, 1);
    const rawText: string = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (err: any) => reject(err));
      pdfParser.on("pdfParser_dataReady", () => resolve(pdfParser.getRawTextContent()));
      pdfParser.parseBuffer(buffer);
    });

    let cleanText = "";
    try {
      cleanText = decodeURIComponent(rawText);
    } catch {
      console.warn("URI Decoding failed for resume, using fallback cleaning.");
      cleanText = rawText.replace(/%([0-9A-F]{2})/g, " ");
    }
    cleanText = cleanText.trim();

    const prompt = `Create a 2-week onboarding plan for ${name} based on this resume: ${cleanText.substring(
      0,
      2000
    )}. Return ONLY a JSON array: [{"day": 1, "task": "...", "description": "..."}]`;

    const rawJson = (await callGemini(prompt)) as string;
    const plan = JSON.parse(rawJson.replace(/```json|```/g, "").trim());

    const db = await dbPromise;
    await db.collection("onboarding").insertOne({ employeeName: name, plan, createdAt: new Date() });

    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    console.error("ONBOARDING ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
