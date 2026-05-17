import { problems } from '../data/problems';
import { matchQuery } from '../utils/helpers';

// Stub for AI service (OpenAI / Gemini)
// Currently returns mock data for the demo

export const getAISolution = async (problemText) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        "Organize vertically to free up desk space.",
        "Use cable routing clips behind your desk edge.",
        "Keep only daily-use items within arm's reach.",
        "Implement the 'one in, one out' rule for desk accessories."
      ]);
    }, 1500); // simulate AI processing delay
  });
};

export const matchProblemToQuery = async (query) => {
  return new Promise(resolve => {
    setTimeout(() => {
      // For demo, just use simple text matching, 
      // but in reality this would be an embedding search or LLM classification
      const matches = matchQuery(query, problems);
      resolve(matches.slice(0, 3));
    }, 800);
  });
};
