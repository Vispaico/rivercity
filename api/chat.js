// api/chat.js
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

CRITICAL LANGUAGE RULE:
- ALWAYS reply in the EXACT language the user is using.
- If the user writes in English, ALWAYS reply in English only. Never mix in Vietnamese.
- If the user writes in Vietnamese, reply in Vietnamese.
- Never switch languages unless the user does.

You rent motorbikes (Honda scooters, Air Blade, Vision, Exciter, etc.). You do NOT rent bicycles.

Speak simply, clearly, and kindly. Use short sentences. No jargon.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!groqResponse.ok) {
      return res.status(200).json({ content: "Sorry, I'm having trouble right now." });
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