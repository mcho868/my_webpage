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
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents, system_instruction, generationConfig }),
            }
        );

        const data = await upstream.json();

        if (!upstream.ok) {
            res.status(upstream.status).json(data);
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Unexpected server error.' });
    }
};
