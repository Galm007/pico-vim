function LoadFont(font) {
  const map = new Map();
  
  for (let i = 0; i < font.length; i++) {
    let chars = font[i].shift();
    for (let j = 0; j < chars.length; j++)
      map.set(chars[j], font[i]);
  }
  
  return map;
}

function CarriageReturn(cursor, height, spacing) {
  cursor[0] = 0;
  cursor[1] += height + spacing[1];
}

function RenderText(pixy, text, color, font, spacing) {
  let cursor = [0, 0];
  for (let i = 0; i < text.length; i++) {
    let char = font.get(text[i]);
    if (text[i] == '\n') {
      CarriageReturn(cursor, font.get(' ').length, spacing);
      continue;
    }
    for (let j = 0; j < char.length; j++)
      for (let k = 0; k < char[0].length; k++)
        if (char[j][k])
          pixy.pixels[cursor[0] + k][cursor[1] + j] = color;
    let charWidth = char[0].length + spacing[0];
    cursor[0] += charWidth;
    if (cursor[0] + charWidth >= pixy.pixels.length)
      CarriageReturn(cursor, char.length, spacing);
  }
}
