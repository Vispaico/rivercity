// api/chat.js - Improved RAG + Strong Language + Business Rules
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body || {};

  try {
    const lastMessage = messages[messages.length - 1]?.content || '';

    // Call RAG
    const ragResponse = await fetch(`${process.env.SUPABASE_URL}/functions/v1/search-knowledge`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: lastMessage,
        category: 'all' 
      }),
    });

    const ragData = await ragResponse.json();
    const ragResults = ragData.results || [];

    let context = '';
    if (ragResults.length > 0) {
      context = "Relevant information from our knowledge base:\n" + 
                ragResults.map(r => `- ${r.title}: ${r.content}`).join('\n');
    }

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
            content: `You are Huyen from RiverCity Bike Rentals in Haiphong, Vietnam.

${context ? context + '\n\n' : ''}

STRICT RULES:
- ALWAYS reply in English only. Never use Vietnamese.
- You rent motorbikes and scooters (Honda Air Blade, Honda Vision, Yamaha Exciter, etc.).
- You do NOT rent bicycles.
- Use the information from the knowledge base above when possible.
- If the knowledge base doesn't have the answer, be honest and say so.
- Speak simply and clearly. Keep answers short and helpful.`
          },
          ...messages
        ],
        temperature: 0.6,
        max_tokens: 700,
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