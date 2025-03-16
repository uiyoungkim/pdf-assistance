import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// OpenAI LLM-Instanz initialisieren
const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  openAIApiKey: OPENAI_API_KEY,
  temperature: 0.7, // 0 = deterministisch, 1 = kreativer
  maxTokens: 500, // Begrenzung der Antwortlänge
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { query, model, temperature } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Keine Eingabe erhalten" },
        { status: 400 }
      );
    }

    console.log("Eingehende Frage:", query);

    // Falls Model oder Temperature mitgegeben werden, überschreiben
    const response = await llm.invoke(query, {
      modelName: model || "gpt-4",
      temperature: temperature !== undefined ? temperature : 0.7,
    });

    return NextResponse.json({ answer: response });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
