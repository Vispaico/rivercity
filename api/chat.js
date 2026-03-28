// api/chat.js
import { PiAgent } from '@mariozechner/pi-agent-core';

const loadBootstrap = async () => {
  const files = [
    '/bootstrap/IDENTITY.md',
    '/bootstrap/SOUL.md',
    '/bootstrap/AGENTS.md',
    '/bootstrap/USER.md',
  ];

  const contents = await Promise.all(
    files.map(async (file) => {
      const res = await fetch(`https://${process.env.VERCEL_URL || 'localhost:3000'}${file}`);
      return await res.text();
    })
  );

  return contents.join('\n\n');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body;

  try {
    const bootstrap = await loadBootstrap();

    const agent = new PiAgent({
      model: {
        provider: 'groq',
        model: 'llama-3.1-8b-instant',
        baseUrl: 'https://api.groq.com/openai/v1',
        apiKey: process.env.GROQ_API_KEY,
      },
      systemPrompt: `${bootstrap}

Current date: ${new Date().toISOString().split('T')[0]}

Always reply in the language the user is using.
Keep answers short, friendly, and easy to understand. No jargon.`,
      
      tools: [
        {
          name: "searchSupabase",
          description: "Search our knowledge base for rentals, transport, guides and FAQs",
          parameters: {
            type: "object",
            properties: {
              query: { type: "string", description: "User's question or topic" },
              category: { 
                type: "string", 
                enum: ["rental", "transport", "guide", "faq", "all"], 
                default: "all" 
              }
            },
            required: ["query"]
          },
          execute: async ({ query, category }) => {
            const response = await fetch(
              `${process.env.SUPABASE_URL}/functions/v1/search-knowledge`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, category }),
              }
            );

            const data = await response.json();
            return data.results?.length 
              ? data.results.map(r => `• ${r.title}\n${r.content.substring(0, 280)}...`).join('\n\n')
              : "I couldn't find exact information. Let me help with what I know.";
          }
        },

        {
          name: "staffHandover",
          description: "Request latest information or confirmation from the RiverCity team",
          parameters: {
            type: "object",
            properties: {
              reason: { type: "string", description: "Why we need staff input" },
              userMessage: { type: "string", description: "Original user question" }
            },
            required: ["reason", "userMessage"]
          },
          execute: async ({ reason, userMessage }) => {
            console.log(`Staff handover requested → Reason: ${reason}`);
            return "I've asked the team for the latest details. They usually reply quickly.";
          }
        }
      ]
    });

    const response = await agent.chat(messages);

    return res.status(200).json({ content: response.content });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(200).json({ 
      content: "Sorry, I'm having trouble right now. Can you try asking again?" 
    });
  }
}