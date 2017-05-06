const fs = require('fs');

fs.readFile('.build/deploy.out', 'utf8', (err, data) => {
  if (err) throw new Error(err.message);

  const lines = data.split('\n');
  //console.log(lines);
  lines.forEach((line) => {
    if (line.startsWith('POST')) {
      console.log(line.split('POST - ')[1]);
    }
  });
});
