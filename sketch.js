const screen = { w: 500, h: 400 };
const border = 50;
const charRes = { w: 3, h: 5 };
const spacing = { w: 1, h: 2 };

const charSize = { w: charRes.w + spacing.w, h: charRes.h + spacing.h };
const pixyResolution = { w: 40 * charSize, h: 20 * charSize };

let pixy;
let loaded_font;

let buffer = [
  "#include <stdio.h>",
  "",
  "int main(int argc, char** argv)",
  "{",
  "  printf(\"Hello, World!\\n\");",
  "  return 0;",
  "}",
];

function setup() {
  createCanvas(screen.w, screen.h);

  // initialize Pixy
  pixy = new Pixy(
    [border, border],
    [screen.w - border * 2, screen.h - border * 2],
    [pixyResolution.w, pixyResolution.h]);

  // load font
  loadedFont = LoadFont(font);
}

function draw() {
  background(0);

  const clr = color(10, 230, 10);

  // draw border
  strokeWeight(border);
  stroke(clr);
  noFill();
  rect(0, 0, screen.w, screen.h);

  // display text
  let offset = 0;
  for (let i = 0; i < buffer.length; i++) {
    let pos = [0, (i + offset) * charSize.h];
    RenderText(pixy, buffer[i], clr, loadedFont, [spacing.w, spacing.h], pos);

    // adjust the next rows if the current row is too long
    if (buffer[i].length * charSize.w > pixyResolution.w)
      offset++;
  }

  // render pixy
  noStroke();
  pixy.display();
}