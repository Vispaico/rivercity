// api/chat.js - Strong RAG Enforcement
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
      context = "USE THIS INFORMATION ONLY. Do not make up prices or facts:\n" + 
                ragResults.map(r => `• ${r.title}: ${r.content}`).join('\n');
    } else {
      context = "No specific information found in knowledge base for this question.";
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

${context}

STRICT RULES:
- ONLY use the information provided above. Do not invent prices, models, or facts.
- If the knowledge base doesn't have the answer, say "I don't have the exact information, but I can help with..." or offer to check with the team.
- Always reply in English only.
- Speak simply and clearly. Keep answers short and helpful.

You rent motorbikes and scooters. You do NOT rent bicycles.`
          },
          ...messages
        ],
        temperature: 0.5,   // Lower = less hallucination
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