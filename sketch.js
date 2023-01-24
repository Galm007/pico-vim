const screen = { w: 500, h: 400 };
const resolution = { w: 160, h: 128 };
const border = 10;

let pixy;
let loaded_font;

let buffer = "#include <stdio.h>\n\nint main(int argc, char** argv)\n{\n  printf(\"Hello, World!\\n\");\n  return 0;\n}\n\n█\n\n\n\n\n\n\n\n\n\n\n\n--- main.c ---\n";

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
  RenderText(pixy, buffer, clr, loadedFont, [1, 1]);
  pixy.display();
}
