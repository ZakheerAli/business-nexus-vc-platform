import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateWithModelFallback, getContextualFallbackResponse } from './chatHelpers';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google Gen AI client with telemetry User-Agent header
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

// Contextual Knowledge Base for Business Nexus Platform
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

// POST /api/chat - AI Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages = [], language = 'en' } = req.body;
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    if (!lastUserMessage.trim()) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    // If Gemini client is available and API key is present
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
          return res.json({ reply });
        }
      } catch (geminiError: any) {
        console.warn('All Gemini model candidates failed; using contextual fallback:', geminiError?.message || geminiError);
      }
    }

    // Contextual intelligent fallback
    const fallbackReply = getContextualFallbackResponse(lastUserMessage, language);
    return res.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: 'An error occurred while processing your message.' });
  }
});

// Direct ZIP download route for export and local development
app.get('/business-nexus.zip', (_req, res) => {
  const zipPath = path.join(__dirname, 'public', 'business-nexus.zip');
  res.download(zipPath, 'business-nexus.zip', (err) => {
    if (err) {
      console.error('Error downloading zip:', err);
      if (!res.headersSent) {
        res.status(404).send('ZIP Archive not found');
      }
    }
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Business Nexus Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
