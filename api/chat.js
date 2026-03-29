// api/chat.js - Strong Language Enforcement
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

STRICT LANGUAGE RULE - FOLLOW THIS EXACTLY:
- The user has selected English in the language selector.
- The user is writing in English.
- You MUST reply ONLY in English. Never use Vietnamese words or sentences.
- Do not mix languages. Do not add Vietnamese translations unless the user specifically asks for them.
- If you are unsure about the language, default to English.

You rent motorbikes and scooters (Honda Air Blade, Honda Vision, Yamaha Exciter, etc.). You do NOT rent bicycles.

Speak simply, clearly, and kindly. Use short sentences. No jargon. Be helpful and practical.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!groqResponse.ok) {
      return res.status(200).json({ 
        content: "Sorry, I'm having trouble right now. Please try again." 
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