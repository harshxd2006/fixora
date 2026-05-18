const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'data', 'products.js');
let content = fs.readFileSync(file, 'utf8');

const regex = /(name:\s*'([^']+)',\s*price:\s*(\d+),[\s\S]*?)inStock:/g;

const newContent = content.replace(regex, (match, p1, name, price) => {
  const amazonPrice = parseInt(price) + Math.floor(Math.random() * 50) + 10;
  const flipkartPrice = parseInt(price) + Math.floor(Math.random() * 60) - 20;
  const cromaPrice = parseInt(price) + Math.floor(Math.random() * 100);

  const externalLinks = `externalLinks: [
      { platform: 'Amazon', url: \`https://www.amazon.in/s?k=\${encodeURIComponent('${name}')}\`, price: ${amazonPrice} },
      { platform: 'Flipkart', url: \`https://www.flipkart.com/search?q=\${encodeURIComponent('${name}')}\`, price: ${flipkartPrice} },
      { platform: 'Croma', url: \`https://www.croma.com/searchB?q=\${encodeURIComponent('${name}')}\`, price: ${cromaPrice} }
    ],
    inStock:`;

  return p1 + externalLinks;
});

fs.writeFileSync(file, newContent);
console.log("Products updated successfully!");
