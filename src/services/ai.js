const GROQ_URL = '/api/chat';

// Call Groq API via our backend
const callGroq = async (prompt, systemPrompt = '') => {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 500,
      temperature: 0.7,
      messages: [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

// Feature 1: Get AI solution tips for a problem
export const getAISolution = async (problemText) => {
  try {
    const prompt = `A user has this daily life problem: "${problemText}"
    
Give exactly 4 practical, specific tips to solve this problem.
Return ONLY a JSON array of 4 strings. No explanation, no markdown, just the array.
Example: ["Tip one here", "Tip two here", "Tip three here", "Tip four here"]`;

    const result = await callGroq(prompt);
    
    // Clean the response and parse JSON
    const cleaned = result.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('AI solution error:', error);
    // Fallback tips
    return [
      'Identify the root cause of the problem first.',
      'Start with small, manageable changes.',
      'Use the right tools designed for this specific issue.',
      'Build a consistent habit around the solution.'
    ];
  }
};

// Feature 2: AI-powered problem search
export const matchProblemToQuery = async (query, problems) => {
  try {
    const problemList = problems.map(p => `ID: ${p.id} | Title: ${p.title}`).join('\n');
    
    const prompt = `A user is searching for: "${query}"

Here are available problems:
${problemList}

Return the IDs of the top 3 most relevant problems as a JSON array of strings.
Return ONLY the array, no explanation.
Example: ["messy-desk", "tangled-cables", "bad-posture"]`;

    const result = await callGroq(prompt);
    const cleaned = result.replace(/```json|```/g, '').trim();
    const ids = JSON.parse(cleaned);
    return problems.filter(p => ids.includes(p.id));
  } catch (error) {
    console.error('AI match error:', error);
    return problems.slice(0, 3); // fallback to first 3
  }
};

import { getProblemRecommendations, extractProblemIntent } from './recommendationEngine';

// Feature 2.1: Advanced semantic search for problems & products
export const semanticSearchProblems = async (query, problems) => {
  try {
    const analysis = await getProblemRecommendations(query);
    if (!analysis.hasMatch) {
      return [];
    }

    const problemList = problems.map(p => `ID: ${p.id} | Title: ${p.title} | Tags: ${p.tags?.join(', ')}`).join('\n');
    
    const prompt = `A user described this problem: "${query}"

Understood needs: ${JSON.stringify(analysis.intent?.needs || [])}

Here are the available Fixora problem categories:
${problemList}

Rank the most relevant problems matching these needs.
Return ONLY a JSON array of objects with "id" and "matchScore" (a float between 0.40 and 0.98).
Example:
[
  { "id": "messy-desk", "matchScore": 0.95 },
  { "id": "bad-posture", "matchScore": 0.88 }
]`;

    const result = await callGroq(prompt);
    const cleaned = result.replace(/```json|```/g, '').trim();
    const matches = JSON.parse(cleaned);
    
    return matches.map(match => {
      const problem = problems.find(p => p.id === match.id);
      return problem ? { ...problem, matchScore: match.matchScore } : null;
    }).filter(Boolean);
  } catch (error) {
    console.error('AI semantic search error:', error);
    // Safe keyword match fallback
    const lower = (query || '').toLowerCase();
    return problems.filter(p => 
      p.title.toLowerCase().includes(lower) || 
      p.shortDesc.toLowerCase().includes(lower) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(lower)))
    ).map((p, i) => ({ ...p, matchScore: 0.95 - (i * 0.1) }));
  }
};

// Export getProblemRecommendations for full catalog search
export { getProblemRecommendations, extractProblemIntent };

// Feature 3: Generate a personalized product recommendation reason
export const getProductRecommendationReason = async (problemTitle, productName) => {
  try {
    const prompt = `In exactly one sentence (max 15 words), explain why "${productName}" solves the problem "${problemTitle}". Be specific and direct.`;
    
    const result = await callGroq(prompt);
    return result.trim();
  } catch (error) {
    return `${productName} directly addresses the core issue you are experiencing.`;
  }
};

// Feature 4: AI chat assistant for problem solving
export const chatWithAI = async (userMessage, conversationHistory = []) => {
  try {
    const systemPrompt = `You are Fixora's AI assistant. You help people solve their daily life problems by recommending products and practical tips. 
Keep responses short (2-3 sentences max). 
Always be helpful and suggest checking Fixora's product catalog.
Focus on workspace, productivity, health, and lifestyle problems.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 200,
        temperature: 0.8,
        messages
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "I am having trouble connecting right now. Please browse our problems page to find your solution.";
  }
};
