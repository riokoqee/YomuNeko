const fs = require('fs');

const writeFile = (filePath, data) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
    if (err) {
      console.error('Ошибка при сохранении файла:', err);
    }
  });
};

module.exports = writeFile;