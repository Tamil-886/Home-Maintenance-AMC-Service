const fs = require('fs');

function validateFile(filename) {
  const html = fs.readFileSync(filename, 'utf8');
  const voidTags = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
  let clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/gi, '');
  clean = clean.replace(/href="data:[^"]*"/g, 'href=""');

  const tagRegex = /<\/?([a-zA-Z0-9]+)([^>]*)>/g;
  let match;
  const stack = [];
  let errorCount = 0;

  while ((match = tagRegex.exec(clean)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith("</");
    const isSelfClosing = fullTag.endsWith("/>") || voidTags.has(tagName);
    
    if (isClosing) {
      if (stack.length === 0) {
        console.log(`[${filename}] Unexpected closing tag </${tagName}> at pos ${match.index}`);
        errorCount++;
      } else {
        const top = stack.pop();
        if (top !== tagName) {
          console.log(`[${filename}] Mismatched closing tag </${tagName}>, expected </${top}> at pos ${match.index}`);
          errorCount++;
        }
      }
    } else if (!isSelfClosing) {
      stack.push(tagName);
    }
  }

  console.log(`[${filename}] Unclosed tags:`, stack);
  console.log(`[${filename}] Error count:`, errorCount);
}

validateFile('services.html');
validateFile('customer/booking.html');
