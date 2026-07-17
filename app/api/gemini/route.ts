const GEMINI_MODEL = "gemini-3-flash-preview";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing GEMINI_API_KEY." },
      { status: 500 }
    );
  }

  try {
    const { contents, system_instruction, generationConfig } =
      (await req.json()) ?? {};

    if (!Array.isArray(contents)) {
      return Response.json(
        { error: "Request body must include contents array." },
        { status: 400 }
      );
    }

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents, system_instruction, generationConfig }),
      }
    );

    const data = await upstream.json();
    return Response.json(data, { status: upstream.status });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return Response.json({ error: message }, { status: 500 });
  }
}
