const GROQ_URL = '/api/chat';

// Central API client for Chat assistant and semantic AI search
export const postToChatApi = async (payload) => {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.status}`);
  }

  return await response.json();
};
