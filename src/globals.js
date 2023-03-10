const screen = new Vector2(500, 400); // size of screen (in pixels)
const spacing = new Vector2(1, 2);    // space between characters (in pixy pixels)
const gridSize = new Vector2(40, 20); // amount of characters to fit on screen

let pixy;
let loadedFont;
let charRes;        // resolution of the font
let charSize;       // resolution + spacing
let textColor;
let emptyColor;

let cursor = new Vector2(0, 0);
let normalMode = true;
let scroll = 0;
let buffer = [
  "#include <stdio.h>",
  "",
  "int main(int argc, char** argv)",
  "{",
  "  printf(\"Hello, World!\\n\");",
  "  return 0;",
  "}",
];