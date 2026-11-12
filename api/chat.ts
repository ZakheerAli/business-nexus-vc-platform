import { GoogleGenAI } from '@google/genai';
import { generateWithModelFallback, getContextualFallbackResponse } from '../chatHelpers';

// Initialize Google Gen AI client
const aiApiKey = process.env.GEMINI_API_KEY || '';
const ai = aiApiKey
  ? new GoogleGenAI({
      apiKey: aiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    })
  : null;

const PLATFORM_CONTEXT = `
You are Nexus AI, the elite Institutional Venture Capital Co-Pilot and Dealflow Analyst on the Business Nexus platform.
Platform details:
- Business Nexus connects high-growth startup founders and institutional VC check-writers.
- Featured Startups:
  1. SynthFlow AI: Autonomous enterprise workflow engine, $1.2M ARR, +280% YoY growth, raising $2.0M at $10.0M valuation cap, Lead: Accel Scout Syndicate. Founder: Marcus Chen.
  2. QuantumEdge: Quantum-accelerated drug discovery platform, Seed round, raising $3.5M.
  3. BioGenix Labs: Next-gen synthetic biology & gene therapies, $2.5M Target Raise.
  4. EcoSphere: CleanTech enterprise carbon tracking software, Series A.
- Core Features:
  - Interactive Post-Money SAFE Cap Table Dilution Modeler (NVCA & Y-Combinator standards).
  - Confidential Data Room Vaults with dynamic email and timestamp watermarking, and instant founder access revocation.
  - Dual Personas: Victoria Sterling (Partner at Peak Horizon Capital, $50M AUM) and Marcus Chen (CEO at SynthFlow AI).
  - Spotlight Command Palette: ⌘K / Ctrl+K.
  - Full bilingual support in both English and Roman Urdu.
- Startup and investor details are sample platform data; do not present them as independently verified facts.

Behavior & Tone:
- Answer with institutional precision, executive brevity, and venture acumen.
- If the user writes in Roman Urdu or Urdu, respond naturally in crisp Roman Urdu!
- If the user writes in English, respond in professional executive English.
- Be helpful, friendly, and structured (use bullet points and bold highlights).
`;

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages = [], language = 'en' } = req.body || {};
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    if (!lastUserMessage.trim()) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    if (ai) {
      try {
        const promptMessages = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

        const reply =
          (await generateWithModelFallback(
            ai,
            promptMessages,
            PLATFORM_CONTEXT +
              `\nCurrent user interface language preference: ${language}. If the user writes in Roman Urdu or asks for Urdu, always respond in natural Roman Urdu.`
          )) || '';
        if (reply) {
          return res.status(200).json({ reply });
        }
      } catch (geminiError: any) {
        console.warn('All Gemini model candidates failed in serverless function:', geminiError?.message || geminiError);
      }
    }

    const fallbackReply = getContextualFallbackResponse(lastUserMessage, language);
    return res.status(200).json({ reply: fallbackReply });
  } catch (error: any) {
    console.error('Serverless chat error:', error);
    return res.status(500).json({ error: 'An error occurred while processing your message.' });
  }
}
