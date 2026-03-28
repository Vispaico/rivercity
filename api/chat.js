// api/chat.js - Clean & Stable Version
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
            content: `You are Huyen, a friendly and helpful assistant for RiverCity Bike Rentals in Haiphong, Vietnam. 
Speak simply, clearly, and kindly. Use short sentences. No jargon. 
Always reply in the same language the user is using.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!groqResponse.ok) {
      console.error('Groq error status:', groqResponse.status);
      return res.status(200).json({ 
        content: "Sorry, I'm having trouble connecting right now. Please try again." 
      });
    }

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content || "I didn't understand that. Can you ask again?";

    return res.status(200).json({ content });

  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(200).json({ 
      content: "Sorry, I'm having trouble right now. Please try again in a moment." 
    });
  }
}