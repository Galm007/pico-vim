const screen = { w: 500, h: 400 };
const resolution = { w: 160, h: 128 };
const charRes = { w: 3, h: 5 };
const spacing = { w: 1, h: 1 };
const border = 10;

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
    [resolution.w, resolution.h]);

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
  noStroke();
  for (let i = 0; i < buffer.length; i++) {
    let pos = [0, i * (charRes.h + spacing.h)];
    RenderText(pixy, buffer[i], clr, loadedFont, [spacing.w, spacing.h], pos);
  }
  pixy.display();
}
