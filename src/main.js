/* Use this for getting the keys rest use normal
 *```node.addEventListener('keydown', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
});```
 */

const screen = { w: 500, h: 400 }; // size of screen (in pixels)
const border = 50;                 // border width
const spacing = { w: 1, h: 2 };    // space between characters (in pixy pixels)
const gridSize = { w: 40, h: 20 }; // amount of characters to fit on screen

let pixy;
let loadedFont;
let charRes;        // resolution of the font
let charSize;       // resolution + spacing
let pixyResolution; // size of screen (in pixy pixels)

let cursor = { x: 0, y: 0 };
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

function setup() {
  createCanvas(screen.w, screen.h);

  // load font
  loadedFont = LoadFont(lcd_font_5x7);

  // calculate 
  charRes = {
    w: loadedFont.get(' ')[0].length,
    h: loadedFont.get(' ').length
  };
  charSize = {
    w: charRes.w + spacing.w,
    h: charRes.h + spacing.h
  };
  pixyResolution = {
    w: gridSize.w * charSize.w,
    h: gridSize.h * charSize.h
  };

  // initialize Pixy
  pixy = new Pixy(
    [border, border],
    [screen.w - border * 2, screen.h - border * 2],
    [pixyResolution.w, pixyResolution.h]);
}

function keyPressed() {
  if (normalMode) {
    switch (key) {
      case "h":
        cursor.x--;
        break;
      case "j":
        cursor.y++;
        break;
      case "k":
        cursor.y--;
        break;
      case "l":
        cursor.x++;
        break;
      default:
        break;
    }
  } else {

  }

  // keep the cursor inside the buffer
  cursor.y = min(max(cursor.y, 0), max(buffer.length - 1, 0));
  cursor.x = min(max(cursor.x, 0), buffer[cursor.y].length);

  // scroll if the cursor is travelling off the screen
  if (cursor.y - scroll >= gridSize.h - 1)
    scroll += cursor.y - scroll - gridSize.h + 2;
  else if (cursor.y - scroll < 0)
    scroll += cursor.y - scroll;
}

function draw() {
  background(0);

  const clr = color(10, 230, 10);

  // draw border
  strokeWeight(border);
  stroke(clr);
  noFill();
  rect(0, 0, screen.w, screen.h);

  // reset pixy pixels
  pixy.img = createImage(pixyResolution.w, pixyResolution.h);

  // display text
  let offset = 0;
  for (let i = 0; i < min(buffer.length - scroll, gridSize.h - 1); i++) {
    const pos = [0, (i + offset) * charSize.h];
    const idx = i + scroll;
    RenderText(pixy, buffer[idx], clr, loadedFont, [spacing.w, spacing.h], pos);

    // adjust the next rows if the current row is too long
    if (buffer[idx].length > gridSize.w)
      offset++;
  }

  // display cursor
  RenderText(
    pixy,
    "█",
    clr,
    loadedFont,
    [spacing.w, spacing.h],
    [cursor.x * charSize.w, cursor.y * charSize.h]);

  RenderStatusBar(clr);

  // render pixy
  pixy.updatePixels();
  pixy.display();
}

function RenderStatusBar(clr) {
  // display current mode
  const modeStr = normalMode ? "--- NORMAL ---" : "--- INSERT ---";

  // display cursor position
  const cursorPosStr = (cursor.x + 1) + ":" + (cursor.y + 1);

  // add space between modeStr and cursorPosStr
  let spaceStr = "";
  for (let i = 0; i < gridSize.w - modeStr.length - cursorPosStr.length; i++)
    spaceStr = spaceStr.concat(' ');

  // display status bar
  RenderText(
    pixy,
    modeStr + spaceStr + cursorPosStr,
    clr,
    loadedFont,
    [spacing.w, spacing.h],
    [0, (gridSize.h - 1) * charSize.h]);
}