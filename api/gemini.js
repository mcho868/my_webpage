const GEMINI_MODEL = 'gemini-3-flash-preview';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: 'Server is missing GEMINI_API_KEY.' });
        return;
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { contents, system_instruction, generationConfig } = body || {};

        if (!Array.isArray(contents)) {
            res.status(400).json({ error: 'Request body must include contents array.' });
            return;
        }

        const upstream = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents,
                    system_instruction,
                    generationConfig,
                }),
            }
        );

        if (!upstream.ok) {
            const errorText = await upstream.text();
            res.status(upstream.status).send(errorText);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        });

        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(decoder.decode(value, { stream: true }));
        }

        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message || 'Unexpected server error.' });
    }
};
