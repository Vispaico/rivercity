// api/chat.js
import { PiAgent } from '@mariozechner/pi-agent-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body || {};

  try {
    const agent = new PiAgent({
      model: {
        provider: 'groq',
        model: 'llama-3.1-8b-instant',
        baseUrl: 'https://api.groq.com/openai/v1',
        apiKey: process.env.GROQ_API_KEY,
      },

      extensionsPath: path.join(__dirname, '../pi-extensions'),

      systemPrompt: `You are Huyen, a friendly assistant for RiverCity Bike Rentals in Haiphong, Vietnam.

Always reply in the same language the user is using.
Speak simply, clearly, and kindly. Keep answers short.`,

      enabledExtensions: [
        'pi-boomerang',
        'pi-prompt-template-model',
        'pi-subagents',
        'pi-model-switch'
      ]
    });

    const response = await agent.chat(messages);

    return res.status(200).json({ content: response.content });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(200).json({ 
      content: "Sorry, I'm having trouble right now. Please try again." 
    });
  }
}