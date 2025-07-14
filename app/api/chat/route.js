import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import resume from "@/assets/resumedata.json";

export const runtime = "edge";             // fast, low‑latency

export async function POST(req) {
  const { message } = await req.json();

  // System guardrail: answer only résumé‑related questions
  const systemPrompt = `
    You are a helpful résumé assistant.
    If the user greets you respond with a friendly greeting. 
    If the user asks about your capabilities, explain that you can answer questions about the résumé data provided.
    if user asks for summary, provide a brief summary of the résumé.
    If the user asks for a specific section, provide details from that section.
    Answer ONLY questions directly related to the résumé data provided.
    If the question is unrelated, reply: 
    "I'm sorry, but I can answer only questions about the résumé."`;

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

  const answer = completion.choices[0]?.message?.content ?? "";
  return NextResponse.json({ answer });
}
