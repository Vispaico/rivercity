// api/chat.js - Hardened RAG + Groq flow for production
const LANGUAGE_INSTRUCTIONS = {
  en: 'Reply in English.',
  vi: 'Trả lời bằng tiếng Việt.',
  de: 'Antworte auf Deutsch.',
  es: 'Responde en español.',
  it: 'Rispondi in italiano.',
  fr: 'Réponds en français.',
  pl: 'Odpowiedz po polsku.',
  ja: '日本語で答えてください。',
  ko: '한국어로 답변해주세요.',
  zh: '用中文回答。',
  ru: 'Ответь на русском языке.',
};

const FETCH_TIMEOUT_MS = 12000;

function withTimeout(ms) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timeout) };
}

async function readJsonSafe(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { _raw: text };
  }
}

function normalizeRagResults(ragData) {
  if (!ragData || typeof ragData !== 'object') return [];
  const candidate = Array.isArray(ragData.results) ? ragData.results : [];
  return candidate
    .map((item) => ({
      title: typeof item?.title === 'string' ? item.title : 'Untitled',
      content: typeof item?.content === 'string' ? item.content : '',
    }))
    .filter((item) => item.content.trim().length > 0);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body || {};

  try {
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages payload' });
    }

    const lastMessage = messages[messages.length - 1]?.content || '';
    const languageInstruction = LANGUAGE_INSTRUCTIONS[userLanguage] || LANGUAGE_INSTRUCTIONS.en;

    let ragResults = [];
    let ragFailed = false;

    // Call RAG
    try {
      const ragTimeout = withTimeout(FETCH_TIMEOUT_MS);
      const ragResponse = await fetch(`${process.env.SUPABASE_URL}/functions/v1/search-knowledge`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: lastMessage,
          category: 'all',
        }),
        signal: ragTimeout.signal,
      });
      ragTimeout.clear();

      const ragData = await readJsonSafe(ragResponse);
      if (!ragResponse.ok) {
        ragFailed = true;
        console.error('[chat] RAG error', ragResponse.status, ragData);
      } else {
        ragResults = normalizeRagResults(ragData);
      }
    } catch (ragError) {
      ragFailed = true;
      console.error('[chat] RAG fetch failed', ragError);
    }

    let context = '';
    if (ragResults.length > 0) {
      context = `USE THIS INFORMATION ONLY. Do not make up prices or facts:\n${ragResults
        .map((r) => `• ${r.title}: ${r.content}`)
        .join('\n')}`;
    } else {
      context = ragFailed
        ? 'Knowledge service temporarily unavailable. Do not invent facts; give safe guidance and offer staff handover.'
        : 'No specific information found in knowledge base for this question.';
    }

    const groqTimeout = withTimeout(FETCH_TIMEOUT_MS);
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are Huyen from RiverCity Bike Rentals in Haiphong, Vietnam.

${context}

STRICT RULES:
- ONLY use the information provided above. Do not invent prices, models, or facts.
- If the knowledge base doesn't have the answer, say "I don't have the exact information, but I can help with..." or offer to check with the team.
- ${languageInstruction}
- Speak simply and clearly. Keep answers short and helpful.

You rent motorbikes and scooters. You do NOT rent bicycles.`
          },
          ...messages
        ],
        temperature: 0.35,
        max_tokens: 600,
      }),
      signal: groqTimeout.signal,
    });
    groqTimeout.clear();

    if (!groqResponse.ok) {
      const groqError = await readJsonSafe(groqResponse);
      console.error('[chat] Groq error', groqResponse.status, groqError);
      return res.status(200).json({ content: "Sorry, I'm having trouble right now." });
    }

    const data = await readJsonSafe(groqResponse);
    const content = data.choices?.[0]?.message?.content || "Can you ask again?";

    return res.status(200).json({
      content,
      ragHits: ragResults.length,
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(200).json({ 
      content: "Sorry, I'm having trouble right now. Please try again." 
    });
  }
}