// api/rivercity.js - External agent integration
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionId } = req.body || {};

  try {
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message payload' });
    }

    const agentResponse = await fetch('https://rivercity-agent.vercel.app/api/rivercity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!agentResponse.ok) {
      console.error('[rivercity] Agent error', agentResponse.status);
      return res.status(200).json({ response: "Sorry, I'm having trouble right now. Please try again." });
    }

    const data = await agentResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Rivercity agent error:', error);
    return res.status(200).json({ response: "Sorry, I'm having trouble right now. Please try again." });
  }
}
