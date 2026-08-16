import { products } from '../data/products';

const GROQ_URL = '/api/chat';

/**
 * Dynamic fallback generator for offline or network retry mode
 * Produces highly specific root causes and fixes matching the user's problem.
 */
const getSpecificFallback = (query) => {
  const lower = query.toLowerCase();

  if (lower.includes('cable') || lower.includes('wire')) {
    return {
      problem_summary: "Unorganized Cable Routing",
      root_cause: "Multiple power cords and charging cables are routed without a defined path, causing them to overlap and clutter your workspace.",
      the_fix: "Group cords together using magnetic cable clips and conceal bulky power strips inside a dedicated cable management box.",
      needs: ["group charging cables", "conceal power strips"],
      categories: ["Cable Management"],
      keywords: ["cable box", "cable clips", "cable sleeves"]
    };
  }
  if (lower.includes('laptop') || lower.includes('neck') || lower.includes('back')) {
    return {
      problem_summary: "Uncomfortable Laptop Workstation",
      root_cause: "The laptop screen is positioned too low relative to your natural eye line, encouraging downward neck tilt and upper back slouching during long work sessions.",
      the_fix: "Elevate the laptop display to eye level using an adjustable ergonomic laptop stand or monitor riser.",
      needs: ["elevate laptop screen", "improve posture"],
      categories: ["Desk Setup", "Wellness"],
      keywords: ["laptop stand", "monitor riser", "posture"]
    };
  }
  if (lower.includes('dark') || lower.includes('light') || lower.includes('night')) {
    return {
      problem_summary: "Insufficient Workspace Illumination",
      root_cause: "The desk area lacks focused task lighting, creating harsh shadows and forcing your eyes to strain in low light.",
      the_fix: "Install an adjustable LED task lamp or monitor light bar to cast glare-free, direct illumination over your desk.",
      needs: ["focused desk lighting", "reduce eye strain"],
      categories: ["Lighting"],
      keywords: ["desk lamp", "webcam light", "light bar"]
    };
  }
  if (lower.includes('noise') || lower.includes('focus') || lower.includes('concentrat') || lower.includes('distract')) {
    return {
      problem_summary: "Acoustic Distraction & Focus Interruption",
      root_cause: "Unfiltered ambient room noise and environmental sounds disrupt sustained attention during deep work.",
      the_fix: "Use active noise-canceling earbuds or an ambient white noise sound generator to mask environmental chatter.",
      needs: ["block ambient noise", "enhance focus"],
      categories: ["Focus Tools", "Sleep & Rest"],
      keywords: ["noise earbuds", "white noise", "fidget cube"]
    };
  }
  if (lower.includes('messy') || lower.includes('clutter') || lower.includes('small') || lower.includes('organiz')) {
    return {
      problem_summary: "Unorganized Workspace Clutter",
      root_cause: "Small accessories and paperwork without designated storage accumulate on open surfaces, creating visual friction.",
      the_fix: "Assign every item a permanent compartment using modular drawer trays and a desktop organizer.",
      needs: ["desk organization", "drawer storage"],
      categories: ["Desk Setup"],
      keywords: ["desk organizer", "drawer organizer", "cable box"]
    };
  }

  return {
    problem_summary: query.slice(0, 40),
    root_cause: `Specific structural or environmental friction related to: "${query}".`,
    the_fix: `Implementing targeted setup adjustments and tools designed to resolve "${query}".`,
    needs: [query],
    categories: ["Desk Setup"],
    keywords: lower.split(' ').filter(w => w.length > 3)
  };
};

/**
 * STEP 1: AI STRUCTURED INTENT & DIAGNOSIS EXTRACTION
 * Analyzes the user's natural language problem using Groq AI and returns structured intent metadata:
 * {
 *   problem_summary: string,
 *   root_cause: string,
 *   the_fix: string,
 *   needs: string[],
 *   categories: string[],
 *   keywords: string[]
 * }
 */
export const extractProblemIntent = async (userProblem) => {
  if (!userProblem || !userProblem.trim()) return null;

  try {
    const systemPrompt = `You are Fixora's AI Workspace & Ergonomic Analyst. Analyze the user's specific daily problem and generate a precise, problem-focused analysis.
Return ONLY a raw valid JSON object with no markdown syntax.

JSON schema:
{
  "problem_summary": "Short 3-6 word summary of main problem",
  "root_cause": "A clear 1-2 sentence explanation of what is physically or structurally causing THIS exact problem. (Do NOT use generic text like 'improper setup' or 'lack of ergonomic support' unless specifically about posture. For cables explain unrouted wires. For dark rooms explain lack of task lighting. For noise explain acoustic distraction. Never make medical diagnoses).",
  "the_fix": "A specific 1-2 sentence description of how to fix THIS exact root cause using targeted tools or adjustments.",
  "needs": ["1-3 specific physical/workspace needs"],
  "categories": ["relevant category names from: Desk Setup, Cable Management, Focus Tools, Lighting, Wellness, Sleep & Rest"],
  "keywords": ["3-6 search terms, e.g. laptop stand, cable box, task lamp, noise earbuds"]
}`;

    const userPrompt = `User Problem: "${userProblem.trim()}"`;

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 300,
        temperature: 0.2, // Low temperature for consistent structured output
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`AI Intent extraction failed: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const cleaned = rawContent.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    // Verify root cause is not generic
    if (!parsed.root_cause || parsed.root_cause.includes('improper setup, lack of ergonomic support')) {
      const fallback = getSpecificFallback(userProblem);
      parsed.root_cause = fallback.root_cause;
      parsed.the_fix = fallback.the_fix;
    }

    return parsed;

  } catch (error) {
    console.error('Intent extraction error:', error);
    return getSpecificFallback(userProblem);
  }
};

/**
 * STEP 2: RELEVANCE RANKING ENGINE
 * Scores real products from products.js against the extracted intent.
 * Evaluates problem IDs, title/description matches, tag overlap, and category relevance.
 */
export const scoreAndRankProducts = (intent, userProblemText) => {
  if (!intent && !userProblemText) return [];

  const textLower = (userProblemText || '').toLowerCase();
  const keywords = (intent?.keywords || []).map(k => k.toLowerCase());
  const needs = (intent?.needs || []).map(n => n.toLowerCase());
  const targetCategories = (intent?.categories || []).map(c => c.toLowerCase());

  const scoredProducts = products.map(product => {
    let score = 0;
    const pName = product.name.toLowerCase();
    const pDesc = (product.description || '').toLowerCase();
    const pShort = (product.shortSolution || '').toLowerCase();
    const pCat = (product.category || '').toLowerCase();
    const pTags = (product.tags || []).map(t => t.toLowerCase());

    // 1. Direct Problem ID & Domain Match (Highest Weight: +50)
    if (textLower.includes('neck') || textLower.includes('laptop') || keywords.some(k => k.includes('laptop') || k.includes('neck'))) {
      if (product.id === 'laptop-stand-1' || product.id === 'monitor-riser-1' || product.id === 'posture-1') score += 50;
    }
    if (textLower.includes('cable') || textLower.includes('wire') || keywords.some(k => k.includes('cable') || k.includes('wire'))) {
      if (product.id === 'cable-box-1' || product.id === 'cable-clips-1' || product.id === 'cable-sleeves-1') score += 50;
    }
    if (textLower.includes('dark') || textLower.includes('light') || keywords.some(k => k.includes('dark') || k.includes('light'))) {
      if (product.id === 'desk-lamp-1' || product.id === 'webcam-light-1' || product.id === 'ambient-light-1') score += 50;
    }
    if (textLower.includes('noise') || textLower.includes('focus') || textLower.includes('loud') || keywords.some(k => k.includes('noise') || k.includes('focus'))) {
      if (product.id === 'noise-earbuds-1' || product.id === 'white-noise-1' || product.id === 'fidget-cube-1') score += 50;
    }
    if (textLower.includes('messy') || textLower.includes('clutter') || textLower.includes('organiz') || textLower.includes('small')) {
      if (product.id === 'desk-org-1' || product.id === 'drawer-org-1' || product.id === 'cable-box-1') score += 40;
    }

    // 2. Keyword Matches in Product Name, Short Solution, Description (+15 to +30)
    keywords.forEach(kw => {
      if (!kw || kw.length < 3) return;
      if (pName.includes(kw)) score += 30;
      else if (pShort.includes(kw)) score += 20;
      else if (pDesc.includes(kw)) score += 15;

      if (pTags.some(tag => tag.includes(kw))) score += 15;
    });

    // 3. Category Match (+15)
    if (targetCategories.some(c => pCat.includes(c))) {
      score += 15;
    }

    // Generate accurate, realistic "Why This Helps" explanation based on real product specifications
    let whyItHelps = product.shortSolution;
    if (product.id === 'laptop-stand-1') whyItHelps = 'Elevates your laptop screen to eye level to reduce neck and shoulder strain.';
    else if (product.id === 'monitor-riser-1') whyItHelps = 'Raises your monitor to an ergonomic height while opening storage space below.';
    else if (product.id === 'cable-box-1') whyItHelps = 'Instantly conceals power strips and tangled cords to clean up workspace clutter.';
    else if (product.id === 'desk-lamp-1') whyItHelps = 'Provides adjustable, flicker-free task lighting to eliminate eye strain in dark rooms.';
    else if (product.id === 'noise-earbuds-1') whyItHelps = 'Active noise cancellation blocks out distracting ambient noise for deep concentration.';
    else if (product.id === 'white-noise-1') whyItHelps = 'Creates soothing ambient soundscapes to mask sudden background disturbances.';

    return {
      product,
      score,
      whyItHelps
    };
  });

  // Strict Threshold: Exclude products with low relevance score (< 20)
  const relevantMatches = scoredProducts
    .filter(item => item.score >= 20)
    .sort((a, b) => b.score - a.score);

  // Return top 3-5 matches
  return relevantMatches.slice(0, 5);
};

/**
 * STEP 3: MAIN RECOMMENDATION API (Combines Intent Analysis + Product Ranking)
 */
export const getProblemRecommendations = async (userProblem) => {
  console.log('--- FIXORA SPECIFIC RECOMMENDATION ENGINE ---');
  console.log('1. User Input:', userProblem);

  const trimmed = userProblem ? userProblem.trim() : '';
  const isGibberish = /^[b-df-hj-np-tv-z]{5,}$/i.test(trimmed) || trimmed.length < 3;

  if (isGibberish) {
    console.log('2. Input classified as gibberish/irrelevant. Returning empty match.');
    return {
      problemSummary: 'Unrecognized query',
      intent: null,
      recommendations: [],
      bundle: null,
      hasMatch: false
    };
  }

  const intent = await extractProblemIntent(userProblem);
  console.log('2. Understood Intent & Diagnosis:', intent);

  const rankedItems = scoreAndRankProducts(intent, userProblem);
  console.log('3. Ranked Products:', rankedItems.map(i => `${i.product.name} (Score: ${i.score})`));

  // Determine if complementary products form a valid bundle
  let bundle = null;
  if (rankedItems.length >= 2 && (intent?.needs?.length >= 2 || userProblem.includes(' and '))) {
    const bundleProducts = rankedItems.slice(0, 2).map(i => i.product);
    const subtotal = bundleProducts.reduce((sum, p) => sum + p.price, 0);
    const bundlePrice = Math.round(subtotal * 0.85); // 15% Bundle Discount

    bundle = {
      id: `bundle-${Date.now()}`,
      name: `Fixora Solution Bundle: ${rankedItems[0].product.name} + ${rankedItems[1].product.name}`,
      description: `Combined ergonomic and workspace setup to address: ${intent?.problem_summary || userProblem}`,
      items: bundleProducts,
      originalPrice: subtotal,
      price: bundlePrice,
      discountPercent: 15
    };
  }

  return {
    problemSummary: intent?.problem_summary || userProblem,
    intent,
    recommendations: rankedItems.map(i => ({
      ...i.product,
      whyItHelps: i.whyItHelps,
      relevanceScore: i.score
    })),
    bundle,
    hasMatch: rankedItems.length > 0
  };
};
