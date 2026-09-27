import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '25mb' }));

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is required. Add it to your .env file.');
}

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Gemini Caption & Rewrite API Endpoint
app.post('/api/ai/caption-suggestions', async (req, res) => {
  try {
    const { imageBase64, mimeType, eventTitle, eventDetails, currentCaption, requestedTone } =
      req.body;

    const parts: any[] = [];

    // Attach image inline data if base64 provided
    if (imageBase64 && typeof imageBase64 === 'string') {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    const prompt = `You are an elite AI social media syndication strategist and copywriter for event attendees.
Event Name: ${eventTitle || 'Tech Summit 2026'}
Event Context: ${JSON.stringify(eventDetails || {})}
Current User Draft / Raw Caption: "${currentCaption || ''}"
Requested Tone Focus: "${requestedTone || 'all'}"

Analyze the photo visual content (if provided) along with the event information.
Provide tailored caption suggestions in multiple distinct styles:
1. "funny": witty, relatable humor, lighthearted sarcasm, developer/attendee joke, coffee or hallway chat reference.
2. "professional": polished executive framing, networking value, industry impact, suitable for LinkedIn.
3. "policy": formal, institutional, press release, compliant, policy/governance, official documentation style.
4. "hype": high energy, excitement, viral FOMO, inspiring celebration, fire & rocket vibes.

Rules:
- Keep the official event hashtags and mentions intact or enhanced.
- Keep captions concise and punchy (around 120-240 characters) for maximum social feed readability across Instagram, LinkedIn, X, and Facebook.
- Return ONLY valid JSON in this exact structure:
{
  "suggestions": [
    {
      "tone": "funny",
      "title": "Funny & Witty 😂",
      "caption": "...",
      "pitch": "Humorous and relatable for high engagement"
    },
    {
      "tone": "professional",
      "title": "Professional & Executive 💼",
      "caption": "...",
      "pitch": "Executive tone ideal for LinkedIn and career networking"
    },
    {
      "tone": "policy",
      "title": "Formal & Policy 🏛️",
      "caption": "...",
      "pitch": "Institutional, governance, and official press documentation"
    },
    {
      "tone": "hype",
      "title": "High Energy & Viral ⚡",
      "caption": "...",
      "pitch": "High-voltage excitement and social media momentum"
    }
  ]
}`;

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = { suggestions: [] };
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Graceful fallback with rich suggestions if API limit or transient error
    res.json({
      fallback: true,
      error: error.message || 'Gemini inference failed',
      suggestions: [
        {
          tone: 'funny',
          title: 'Funny & Witty 😂',
          caption:
            'Came for the keynote, stayed for the existential debates on autonomous neural nets and unlimited espresso. ☕🤖 #TechSummit2026 @TechSummitOfficial',
          pitch: 'Humorous take on the event hallway energy',
        },
        {
          tone: 'professional',
          title: 'Professional & Executive 💼',
          caption:
            'Privileged to attend the live leadership keynote at #TechSummit2026. Inspiring breakthroughs in enterprise AI scaling and developer productivity. @TechSummitOfficial',
          pitch: 'Executive tone ideal for LinkedIn and career networking',
        },
        {
          tone: 'policy',
          title: 'Formal & Policy 🏛️',
          caption:
            'Official Session 02 Attendance: Technical deliberations convened at Moscone Center Mumbai on 18 Oct 2026. Advancing open AI infrastructure standards. @TechSummitOfficial #TechSummit2026',
          pitch: 'Institutional, governance, and official press documentation',
        },
        {
          tone: 'hype',
          title: 'High Energy & Viral ⚡',
          caption:
            'UNBELIEVABLE energy at #TechSummit2026! 🚀 The future of intelligence is happening right in this room. Absolute masterclass! @TechSummitOfficial @TechCommunity',
          pitch: 'High-voltage excitement and social media momentum',
        },
      ],
    });
  }
});

// Single-style fast rewrite endpoint
app.post('/api/ai/quick-rewrite', async (req, res) => {
  try {
    const { tone, caption, eventTitle, hashtags, mentions } = req.body;
    const prompt = `Rewrite this event attendee social caption into a "${tone}" style (funny, professional, policy, or hype).
Original: "${caption}"
Event: "${eventTitle || 'Tech Summit 2026'}"
Hashtags: ${JSON.stringify(hashtags || ['#TechSummit2026'])}
Mentions: ${JSON.stringify(mentions || ['@TechSummitOfficial'])}

Return ONLY the rewritten caption text, nothing else.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ rewrittenCaption: response.text?.trim() || caption });
  } catch (error: any) {
    console.error('Quick rewrite error:', error);
    res.json({ rewrittenCaption: req.body.caption || '' });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
