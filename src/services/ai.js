const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Call Groq API
const callGroq = async (prompt, systemPrompt = '') => {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant', // updated to the latest working model
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

// Feature 2.1: Advanced semantic search for problems
export const semanticSearchProblems = async (query, problems) => {
  try {
    const problemList = problems.map(p => `ID: ${p.id} | Title: ${p.title} | Tags: ${p.tags?.join(', ')}`).join('\n');
    
    const prompt = `A user is searching for: "${query}"

Here are the available problems:
${problemList}

Rank the top 4 most relevant problems based on semantic similarity to the query.
Return ONLY a JSON array of objects, where each object has "id" and "matchScore" (a float between 0 and 1).
Example:
[
  { "id": "messy-desk", "matchScore": 0.95 },
  { "id": "tangled-cables", "matchScore": 0.82 },
  { "id": "bad-posture", "matchScore": 0.65 },
  { "id": "losing-items", "matchScore": 0.40 }
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
    // fallback logic
    return problems.slice(0, 4).map((p, i) => ({ ...p, matchScore: 0.9 - (i * 0.1) }));
  }
};

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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
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
