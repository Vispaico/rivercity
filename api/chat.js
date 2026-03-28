// api/chat.js - Improved Language Control
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body || {};

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are Huyen, a friendly assistant for RiverCity Bike Rentals in Haiphong, Vietnam.

IMPORTANT LANGUAGE RULE:
- Always reply in the exact language the user is using.
- If the user writes in English, ALWAYS reply in English.
- Never switch to Vietnamese unless the user writes in Vietnamese.
- Even if you detect the user is in Vietnam, respect the language they are currently using.

Speak simply, clearly, and kindly. Use short sentences. No jargon.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!groqResponse.ok) {
      return res.status(200).json({ 
        content: "Sorry, I'm having trouble connecting right now. Please try again." 
      });
    }

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content || "Can you ask again?";

    return res.status(200).json({ content });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(200).json({ 
      content: "Sorry, I'm having trouble right now. Please try again." 
    });
  }
}