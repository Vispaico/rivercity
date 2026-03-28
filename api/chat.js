// api/chat.js - Full version with PiAgent + Bootstrap
import { PiAgent } from '@mariozechner/pi-agent-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body;

  try {
    // Load bootstrap files safely
    const bootstrapFiles = [
      '/bootstrap/IDENTITY.md',
      '/bootstrap/SOUL.md',
      '/bootstrap/AGENTS.md',
      '/bootstrap/USER.md',
    ];

    const bootstrapContents = await Promise.all(
      bootstrapFiles.map(async (path) => {
        try {
          const response = await fetch(`https://${process.env.VERCEL_URL}${path}`);
          if (!response.ok) return '';
          return await response.text();
        } catch (e) {
          console.warn(`Failed to load ${path}`);
          return '';
        }
      })
    );

    const bootstrap = bootstrapContents.filter(Boolean).join('\n\n');

    const agent = new PiAgent({
      model: {
        provider: 'groq',
        model: 'llama-3.1-8b-instant',
        baseUrl: 'https://api.groq.com/openai/v1',
        apiKey: process.env.GROQ_API_KEY,
      },
      systemPrompt: `${bootstrap || 'You are RiverBot, a friendly assistant for RiverCity Bike Rentals in Haiphong, Vietnam.'}

Current date: ${new Date().toISOString().split('T')[0]}
Always reply in the language the user is using.
Keep answers short, friendly and easy to understand.`,
      tools: [] // We'll add tools later
    });

    const response = await agent.chat(messages);

    return res.status(200).json({ 
      content: response.content || "Sorry, I couldn't generate a response." 
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(200).json({ 
      content: "Sorry, I'm having trouble right now. Please try again in a moment." 
    });
  }
}