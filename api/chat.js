// api/chat.js - SIMPLE TEST VERSION (no PiAgent, no Supabase)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
            content: 'You are RiverBot, a friendly and helpful assistant for RiverCity Bike Rentals in Haiphong, Vietnam. Speak simply, clearly, and kindly. Keep answers short.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      return res.status(200).json({ 
        content: "Sorry, I'm having trouble connecting to my brain right now. Please try again." 
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return res.status(200).json({ content });

  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(200).json({ 
      content: "Sorry, something went wrong on my side. Please try again in a moment." 
    });
  }
}