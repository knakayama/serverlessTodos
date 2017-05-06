const fs = require('fs');

fs.readFile('.build/deploy.out', 'utf8', (err, data) => {
  if (err) throw new Error(err);

  const lines = data.split('\n');
  for (let i = 0; lines.length > i; i += i) {
    if (lines[i].indexOf('POST') > -1) {
      const startIndex = lines[i].indexOf('https://') + 8;
      const endIndex = lines[i].indexOf('/todos');
      console.log(lines[i].substring(startIndex, endIndex));
      i = lines.length;
    }
  }
});
