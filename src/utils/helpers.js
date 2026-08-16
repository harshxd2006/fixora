export const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const truncate = (text, len = 100) => {
  if (!text) return '';
  return text.length > len ? text.substring(0, len) + '...' : text;
};

export const getRandomItems = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const GROQ_URL = '/api/chat';

export const matchQuery = async (query, list, keys = ['title', 'tags', 'shortDesc']) => {
  if (!query) return list;
  
  try {
    const itemList = list.map((item, idx) => {
      let desc = `Index: ${idx}`;
      keys.forEach(k => {
        if (item[k]) desc += ` | ${k}: ${Array.isArray(item[k]) ? item[k].join(', ') : item[k]}`;
      });
      return desc;
    }).join('\n');
    
    const prompt = `A user is searching for: "${query}"

Here is a list of items:
${itemList}

Rank the top most relevant items based on semantic similarity to the query.
Return ONLY a JSON array of the matching indices (integers).
Example: [2, 0, 5]`;

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 300,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error('API error');
    
    const data = await response.json();
    const cleaned = data.choices[0].message.content.replace(/```json|```/g, '').trim();
    const indices = JSON.parse(cleaned);
    
    return indices.map(idx => {
      const item = list[idx];
      if (item) return { ...item, searchTerm: query };
      return null;
    }).filter(Boolean);
  } catch (err) {
    console.error('Semantic search failed, falling back to string match', err);
    const lowerQuery = query.toLowerCase();
    
    return list.filter(item => {
      return keys.some(key => {
        const val = item[key];
        if (Array.isArray(val)) {
          return val.some(v => v.toLowerCase().includes(lowerQuery));
        }
        return val && typeof val === 'string' && val.toLowerCase().includes(lowerQuery);
      });
    }).map(item => ({ ...item, searchTerm: query }));
  }
};
