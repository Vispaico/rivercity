// api/chat.js
import { createAgentSession, SessionManager, DefaultResourceLoader } from '@mariozechner/pi-coding-agent';
import { getModel } from '@mariozechner/pi-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Store session globally for this simple API
let currentSession = null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userLanguage = 'en' } = req.body || {};

  try {
    // Initialize or reuse session
    if (!currentSession) {
      const model = getModel('groq', 'llama-3.1-8b-instant');
      
      if (!model) {
        throw new Error('Model not found: groq/llama-3.1-8b-instant');
      }

      // Configure resource loader to discover extensions
      const loader = new DefaultResourceLoader({
        cwd: process.cwd(),
        additionalExtensionPaths: [
          path.join(__dirname, '../pi-extensions/pi-boomerang/index.ts'),
          path.join(__dirname, '../pi-extensions/pi-prompt-template-model/index.ts'),
          path.join(__dirname, '../pi-extensions/pi-subagents/index.ts'),
          path.join(__dirname, '../pi-extensions/pi-model-switch/index.ts'),
        ],
        systemPromptOverride: () => {
          const languagePrompt = {
            en: 'Reply in English.',
            vi: 'Trả lời bằng tiếng Việt.',
            de: 'Antworte auf Deutsch.',
            es: 'Responde en español.',
            it: 'Rispondi in italiano.',
            fr: 'Réponds en français.',
            pl: 'Odpowiedz po polsku.',
            ja: '日本語で答えてください。',
            ko: '한국어로 답변해주세요.',
            zh: '用中文回答。',
            ru: 'Ответь на русском языке.',
          };
          const selectedLang = languagePrompt[userLanguage] || languagePrompt.en;
          
          return `You are Huyen, a friendly assistant for RiverCity Bike Rentals in Haiphong, Vietnam.

${selectedLang}
Speak simply, clearly, and kindly. Keep answers short.`;
        },
      });
      await loader.reload();

      // Set runtime API key for Groq
      const authStorage = loader.authStorage;
      authStorage.setRuntimeApiKey('groq', process.env.GROQ_API_KEY);

      const { session } = await createAgentSession({
        model,
        thinkingLevel: 'off',
        resourceLoader: loader,
        sessionManager: SessionManager.inMemory(),
      });

      currentSession = session;
    }

    // Subscribe to events to capture the response
    let responseContent = '';
    let isComplete = false;

    const unsubscribe = currentSession.subscribe((event) => {
      if (event.type === 'message_update' && 
          event.assistantMessageEvent.type === 'text_delta') {
        responseContent += event.assistantMessageEvent.delta;
      }
      if (event.type === 'agent_end') {
        isComplete = true;
      }
    });

    // Send the user's message
    const userMessage = messages[messages.length - 1].content;
    await currentSession.prompt(userMessage);

    // Wait for completion
    await new Promise((resolve) => {
      const checkComplete = setInterval(() => {
        if (isComplete) {
          clearInterval(checkComplete);
          resolve();
        }
      }, 100);
    });

    unsubscribe();

    return res.status(200).json({ content: responseContent.trim() });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(200).json({ 
      content: "Sorry, I'm having trouble right now. Please try again." 
    });
  }
}