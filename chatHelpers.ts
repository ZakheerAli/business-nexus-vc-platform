import { GoogleGenAI } from '@google/genai';

type PromptMessage = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

function includesAny(query: string, terms: string[]): boolean {
  return terms.some((term) => query.includes(term));
}

function isUrduQuery(query: string, lang: string): boolean {
  return (
    (typeof lang === 'string' && lang.toLowerCase() === 'romanurdu') ||
    /\b(kya|kaise|batao|hai|mujhe|salam|kese|kon|kaun|haan|nahi|shukriya|hisaab|ka|ki|mein)\b/.test(
      query
    )
  );
}

export function getContextualFallbackResponse(userMessage: string, lang: string): string {
  const query = userMessage.toLowerCase().trim();
  const isUrdu = isUrduQuery(query, lang);

  if (
    /\b(who are you|what are you|how are you|kaun ho|kon ho|kese ho)\b/.test(query) ||
    /^(?:(?:hello|hi|hey|salam|assalam(?:u)?(?: alaikum)?|walaikum assalam)[.!?,\s]*)+$/i.test(query)
  ) {
    if (isUrdu) {
      return `**Walaikum Assalam! Main Nexus AI hun.** 💎

Main Business Nexus platform ka venture aur dealflow co-pilot hun. Main aapki in cheezon mein madad kar sakta hun:

- 🚀 **Active Startups:** SynthFlow AI, QuantumEdge, BioGenix Labs, aur EcoSphere ke demo deal details.
- 📊 **SAFE Dilution:** Post-money SAFE ki ownership math aur cap table samajhna.
- 🔒 **Data Rooms:** Watermarked documents aur founder access controls ke bare mein maloomat.
- 💼 **Investor aur Founder Views:** Victoria Sterling aur Marcus Chen ke demo personas explore karna.

Aap kisi startup, SAFE, ya platform feature ke bare mein pooch sakte hain!`;
    }

    return `**Hello! I am Nexus AI.** 💎

I’m the venture and dealflow co-pilot for the Business Nexus platform. I can help with:

- 🚀 **Active Startups:** Demo deal details for SynthFlow AI, QuantumEdge, BioGenix Labs, and EcoSphere.
- 📊 **SAFE Dilution:** Post-money SAFE ownership math and cap-table concepts.
- 🔒 **Data Rooms:** Watermarked documents and founder access controls.
- 💼 **Investor and Founder Views:** Exploring the Victoria Sterling and Marcus Chen demo personas.

What would you like to know?`;
  }

  if (
    includesAny(query, [
      'platform',
      'website',
      'ye kya',
      'what is this',
      'features',
      'faide',
      'about',
      'what can i do here'
    ])
  ) {
    if (isUrdu) {
      return `**Business Nexus Platform Ka Khulasa:**

Business Nexus ek demo platform hai jo startup founders aur investors ko connect karta hai:

1. **Investor aur Founder Views:** Victoria Sterling (Investor) aur Marcus Chen (Founder) ke demo dashboards explore karein.
2. **SAFE Modeler:** Investment amount aur valuation cap ke zariye estimated dilution dekhein.
3. **Data Rooms:** Pitch documents par viewer ka email aur timestamp watermark hota hai; founder access revoke kar sakta hai.
4. **Bilingual Support:** English aur Roman Urdu ke darmiyan switch karein.
5. **Command Palette:** \`Ctrl + K\` ya \`Cmd + K\` se platform mein search karein.`;
    }

    return `**About Business Nexus:**

Business Nexus is a demo platform connecting startup founders and investors. Its features include:

1. **Investor and Founder Views:** Explore the Victoria Sterling and Marcus Chen demo dashboards.
2. **SAFE Modeler:** Estimate dilution using an investment amount and valuation cap.
3. **Data Rooms:** Documents can show the viewer’s email and timestamp as a watermark, and founders can revoke access.
4. **Bilingual Support:** Switch between English and Roman Urdu.
5. **Command Palette:** Search the platform with \`Ctrl + K\` or \`Cmd + K\`.`;
  }

  if (
    includesAny(query, [
      'synthflow',
      'quantumedge',
      'biogenix',
      'ecosphere',
      'startup',
      'deal',
      'traction'
    ]) ||
    /\barr\b/.test(query)
  ) {
    if (isUrdu) {
      return `**Active Startups Dealflow Snapshot (Demo Data):**

1. **SynthFlow AI (Series A):** Enterprise AI workflow automation; **$1.20M ARR**, **+280% YoY growth**, aur **$2.0M** raise target, **$10.0M post-money cap** par. $1.4M committed hai.
2. **QuantumEdge (Seed):** Quantum-enabled drug discovery; **$3.5M** raise target.
3. **BioGenix Labs (Seed):** Synthetic biology; **$2.5M** target raise.
4. **EcoSphere (Series A):** Enterprise carbon tracking software.

Yeh platform ke sample deal details hain. Kisi startup ke specific traction ya round ke bare mein poochain to main uski maloomat bata sakta hun.`;
    }

    return `**Active Dealflow Snapshot (Demo Data):**

1. **SynthFlow AI (Series A):** Enterprise AI workflow automation; **$1.20M ARR**, **+280% YoY growth**, and a **$2.0M** target raise at a **$10.0M post-money cap**. $1.4M is committed.
2. **QuantumEdge (Seed):** Quantum-enabled drug discovery; **$3.5M** target raise.
3. **BioGenix Labs (Seed):** Synthetic biology; **$2.5M** target raise.
4. **EcoSphere (Series A):** Enterprise carbon-tracking software.

These are sample deal details from the platform. Ask about a company’s traction or round for more information.`;
  }

  if (
    includesAny(query, [
      'safe',
      'dilution',
      'valuation',
      'cap table',
      'equity',
      'hisaab',
      'formula',
      'post-money'
    ])
  ) {
    if (isUrdu) {
      return `**Post-Money SAFE Dilution Ka Formula:**

Post-money SAFE ke simple cap-only estimate mein investor ownership:

\`Investment amount / Post-money valuation cap × 100\`

**Misaal:** $250,000 investment aur $10,000,000 cap se estimate **2.5%** ownership hai. Mukhtalif SAFE terms, jaise discount ya conversion definitions, final result ko badal sakti hain.

Website ka **SAFE Dilution Modeler** amount aur cap ke mutabiq estimate dikhata hai.`;
    }

    return `**Post-Money SAFE Dilution:**

A simple cap-only estimate of investor ownership is:

\`Investment amount / Post-money valuation cap × 100\`

**Example:** A $250,000 investment at a $10,000,000 cap estimates **2.5%** ownership. Other SAFE terms, such as a discount or conversion definitions, can change the final result.

Use the website’s **SAFE Dilution Modeler** to see an estimate for a specific amount and cap.`;
  }

  if (
    includesAny(query, [
      'investor',
      'vc',
      'victoria',
      'syndicate',
      'angel',
      'check size'
    ]) ||
    /\bfund\b/.test(query)
  ) {
    if (isUrdu) {
      return `**Investors aur Syndicates:**

- **Victoria Sterling:** Peak Horizon Capital ki General Partner persona, **$50M AUM** ke sath; demo profile mein typical check size **$500k** hai.
- **Syndicates:** Chhote investors lead investor ke sath mil kar deal mein hissa le sakte hain.
- **Investor View:** Navigation se Victoria Sterling ka demo dashboard explore karein.

Yeh platform ke sample profiles aur dealflow hain.`;
    }

    return `**Investors and Syndicates:**

- **Victoria Sterling:** The Peak Horizon Capital General Partner demo persona, with **$50M AUM**; the sample profile lists a typical **$500k** check.
- **Syndicates:** Smaller investors can participate alongside a lead investor.
- **Investor View:** Open Victoria Sterling’s demo dashboard from the navigation.

These are sample profiles and dealflow from the platform.`;
  }

  if (
    includesAny(query, [
      'data room',
      'vault',
      'security',
      'watermark',
      'nda',
      'killswitch',
      'kill switch',
      'hifazat'
    ])
  ) {
    if (isUrdu) {
      return `**Data Room aur Access Controls:**

- Documents par viewer ka **email aur timestamp watermark** dikhaya ja sakta hai.
- Founder **killswitch** ke zariye investor ka access revoke kar sakta hai.
- Watermark sharing ko rokne ki guarantee nahi, lekin document par viewer ki pehchan dikhata hai.

Data Room Vault mein available documents inspect karein; yahan encryption ya NDA enforcement ka dawa nahi kiya ja raha.`;
    }

    return `**Data Rooms and Access Controls:**

- Documents can display a **watermark with the viewer’s email and timestamp**.
- Founders can revoke an investor’s access with the **killswitch**.
- A watermark does not guarantee that sharing is prevented; it identifies the viewer on the document.

Inspect the available documents in the Data Room Vault. This demo does not establish encryption or NDA enforcement.`;
  }

  if (
    includesAny(query, [
      'founder',
      'fundraising',
      'raise',
      'marcus',
      'pitch',
      'paisa'
    ])
  ) {
    if (isUrdu) {
      return `**Founder Fundraising Tips:**

1. **Traction saaf dikhayein:** ARR, growth, retention, aur customer evidence ko pitch mein wazeh rakhein.
2. **Round terms samjhein:** SAFE cap aur doosri terms ke dilution par asar ko model karein.
3. **Cap table update rakhein:** Existing shares, options, aur convertibles ko include karein.
4. **Diligence tayyar rakhein:** Investors ke liye relevant documents ko Data Room mein munazzam karein.

Marcus Chen platform ka founder demo persona hai.`;
    }

    return `**Founder Fundraising Tips:**

1. **Show evidence of traction:** Clearly present ARR, growth, retention, and customer evidence.
2. **Understand the round terms:** Model how the SAFE cap and other terms affect dilution.
3. **Keep the cap table current:** Include existing shares, options, and convertibles.
4. **Prepare for diligence:** Organize relevant investor documents in the Data Room.

Marcus Chen is the platform’s founder demo persona.`;
  }

  const excerpt = userMessage.trim().replace(/\s+/g, ' ').slice(0, 120);
  if (isUrdu) {
    return `Aapka sawal mila: *“${excerpt}”*

Main Nexus AI hun. Is waqt mera AI model available nahi, lekin main Business Nexus ke demo deals, SAFE dilution, investors, fundraising, aur Data Room features ke bare mein jawab de sakta hun. Apne sawal ko in topics mein se kisi ek ke hawale se thora wazeh karein.`;
  }

  return `I received your question: *“${excerpt}”*

I’m Nexus AI. My AI model is currently unavailable, but I can answer questions about Business Nexus demo deals, SAFE dilution, investors, fundraising, and Data Room features. Please narrow your question to one of those topics and I’ll help with the available platform information.`;
}

export async function generateWithModelFallback(
  aiClient: GoogleGenAI,
  promptMessages: PromptMessage[],
  systemInstruction: string
): Promise<string | null> {
  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];

  for (const model of candidateModels) {
    try {
      const response = await aiClient.models.generateContent({
        model,
        contents: promptMessages,
        config: {
          systemInstruction,
          maxOutputTokens: 1000
        }
      });

      const reply = response.text?.trim();
      if (reply) {
        return reply;
      }
    } catch (error) {
      const detail =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error !== null && 'status' in error
            ? String(error.status)
            : String(error);
      console.warn(`[Gemini Fallback] Model ${model} encountered an issue: ${detail}`);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
  }

  return null;
}
