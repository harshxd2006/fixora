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

export const matchQuery = (query, list, keys = ['title', 'tags', 'shortDesc']) => {
  if (!query) return list;
  const lowerQuery = query.toLowerCase();
  
  return list.filter(item => {
    return keys.some(key => {
      const val = item[key];
      if (Array.isArray(val)) {
        return val.some(v => v.toLowerCase().includes(lowerQuery));
      }
      return val && val.toLowerCase().includes(lowerQuery);
    });
  });
};
