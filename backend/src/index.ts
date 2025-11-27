import WebSocket, { WebSocketServer } from "ws";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { randomUUID } from "crypto"; 

dotenv.config();

const PORT = Number(process.env.PORT || 4000);
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_KEY) {
  console.error("❌ Missing OPENAI_API_KEY in .env");
  process.exit(1);
}

const wss = new WebSocketServer({ port: PORT });
console.log(`WebSocket server running at ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (raw) => {
    let msg: any;

    try {
      msg = JSON.parse(raw.toString());
    } catch {
      console.log("Invalid JSON");
      return;
    }

    if (msg.type !== "user_message") return;

    const userId = msg.id;            // user message ID
    const userMessage = msg.content;

    // ACK
    ws.send(JSON.stringify({ type: "user_ack", id: userId }));

    // >>> New unique ID for assistant <<<
    const assistantId = randomUUID();

    // Notify frontend: assistant started typing
    ws.send(JSON.stringify({
      type: "assistant_start",
      id: assistantId
    }));

    // ------------ CALL OPENAI ------------
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        stream: true,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ],
      }),
    });

    if (!response.ok || !response.body) {
      ws.send(JSON.stringify({
        type: "assistant_chunk",
        id: assistantId,
        chunk: "[OpenAI Error: Could not start streaming]"
      }));
      ws.send(JSON.stringify({ type: "assistant_done", id: assistantId }));
      return;
    }

    // ---------------- STREAM PARSING ----------------
    const decoder = new TextDecoder();
    let buffer = "";

    for await (const chunk of response.body as any) {
      buffer += decoder.decode(chunk);

      let parts;
      while ((parts = buffer.split("\n\n")).length > 1) {
        const block = parts.shift()!;
        buffer = parts.join("\n\n");

        const lines = block.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const data = trimmed.replace("data:", "").trim();

          if (data === "[DONE]") {
            ws.send(JSON.stringify({ type: "assistant_done", id: assistantId }));
            return;
          }

          try {
            const json = JSON.parse(data);
            const delta = json?.choices?.[0]?.delta?.content || "";
            if (delta.length > 0) {
              ws.send(JSON.stringify({
                type: "assistant_chunk",
                id: assistantId,
                chunk: delta
              }));
            }
          } catch {}
        }
      }
    }

    ws.send(JSON.stringify({ type: "assistant_done", id: assistantId }));
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
