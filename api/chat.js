// api/chat.js - RAG First Version
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body || {};

  try {
    // Get the latest user message
    const lastMessage = messages[messages.length - 1].content;

    // First, try RAG
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

    // Build context from RAG
    let context = '';
    if (ragResults.length > 0) {
      context = "Relevant information from our knowledge base:\n" + 
                ragResults.map(r => `• ${r.title}: ${r.content}`).join('\n');
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
            content: `You are Huyen, a friendly assistant for RiverCity Bike Rentals in Haiphong, Vietnam.

${context ? context + '\n\n' : ''}

Speak simply, clearly, and kindly. Keep answers short and practical.
Always reply in the same language the user is using.

You rent motorbikes and scooters (Honda models). You do NOT rent bicycles.`
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