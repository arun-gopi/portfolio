import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import resume from "@/assets/resumedata.json";

export const runtime = "edge";             // fast, low‑latency

export async function POST(req) {
  const { message } = await req.json();

  // System guardrail: answer only résumé‑related questions
  const systemPrompt = `You are a helpful assistant. 
    If the user greets you respond with a friendly greeting.
    Only answer questions related to the following resume details. 
    If the question is unrelated to the resume, politely respond that you can only answer questions about the resume."`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",                 // 4.1 mini‑equivalent
    temperature: 0.3,
    messages: [
      { role: "system", content: systemPrompt.trim() },
      { 
        role: "system",
        name: "resume_json",
        content: JSON.stringify(resume),
      },
      { role: "user", content: message },
    ],
  });
  function removeBoldTags(markdownText) {
  // Replace all occurrences of double asterisks (**) with an empty string
  return markdownText.replace(/\*\*/g, '');
  }
  const answermdx = completion.choices[0]?.message?.content ?? "";
  const answer = removeBoldTags(answermdx);
  return NextResponse.json({ answer });
}
