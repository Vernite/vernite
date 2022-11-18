const fs = require('fs');

const messageFile = '../src/locales/messages.xlf';

const content = fs.readFileSync(messageFile, 'utf8');

fs.writeFileSync(messageFile, content
  .replaceAll(/\s<\/source>/g, '</source>')
  .replaceAll(/<source>\s/g, '<source>'));
