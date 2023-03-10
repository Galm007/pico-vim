const screen = new Vector2(500, 400); // size of screen (in pixels)
const spacing = new Vector2(1, 2);    // space between characters (in pixy pixels)
const gridSize = new Vector2(40, 20); // amount of characters to fit on screen
const textColor = [255, 255, 255, 255]; // the color of text
const emptyColor = [59, 120, 255, 255]; // the color of the ~ for empty lines
const loadedFont = LoadFont(lcd_font_5x7); // the loaded font
const charRes = new Vector2(loadedFont.get(' ')[0].length, loadedFont.get(' ').length); // resolution of the font
const charSize = charRes.copy().add(spacing); // resolution + spacing

let pixy; // pixy, the class and library used to render a pixel array

let cursor = new Vector2(0, 0); // the cursor location
let mode = Mode.Normal;
let modeDisplay = []
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