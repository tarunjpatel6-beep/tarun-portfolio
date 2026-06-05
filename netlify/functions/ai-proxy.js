// netlify/functions/ai-proxy.js
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const { prompt, systemPrompt } = JSON.parse(event.body);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI request failed" }),
    };
  }
};
