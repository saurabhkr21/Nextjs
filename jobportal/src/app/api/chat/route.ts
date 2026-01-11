import { google } from "@ai-sdk/google";
import type { UIMessage } from "ai";
import { generateText } from "ai";

export const runtime = "edge";

const systemPrompt = `You are a helpful job assistant for a website called JobPortal.
Your goal is to help users discover jobs, manage applications, and explore companies.
When appropriate, respond with a confirmation and a navigation command in square brackets.

Use the following navigation commands when relevant:
- [NAVIGATE:/jobs?query=...] to search for jobs (URL-encode the query).
- [NAVIGATE:/saved] to show saved jobs.
- [NAVIGATE:/applied-jobs] to show applied jobs.
- [NAVIGATE:/profile] to open the user profile.
- [NAVIGATE:/company] to browse companies.
- [NAVIGATE:/AddCompany] to register a new company.

Be concise and professional. Never invent navigation commands that are not listed above.`;

function getMessageText(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request body: messages missing" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const messages = body.messages as UIMessage[];

    const result = await generateText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: getMessageText(m),
      })),
    });

    return new Response(
      JSON.stringify({
        id: "ai-reply",
        role: "assistant",
        parts: [{ type: "text", text: result.text }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    console.error("[CHAT API ERROR]", error);
    return new Response("An internal server error occurred.", { status: 500 });
  }
}
