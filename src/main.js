const screen = new Vector2(500, 400); // size of screen (in pixels)
const spacing = new Vector2(1, 2);    // space between characters (in pixy pixels)
const gridSize = new Vector2(40, 20); // amount of characters to fit on screen

let pixy;
let loadedFont;
let charRes;        // resolution of the font
let charSize;       // resolution + spacing

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

function setup() {
  createCanvas(screen.x, screen.y);
  noSmooth();

  for (let i in buffer)
    buffer[i] = arrToList(new DoubleLinked.List(), buffer[i]);

  // load font
  loadedFont = LoadFont(lcd_font_5x7);

  // calculate 
  charRes = new Vector2(loadedFont.get(' ')[0].length, loadedFont.get(' ').length);

  charSize = charRes.copy().add(spacing);

  let res = charSize.copy().mul(gridSize);

  // initialize Pixy
  pixy = new Pixy(
    Vector2.MonoVec2(0).toArr(),
    screen.toArr(),
    res.toArr());

  pixy.res = res;
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
  cursor.y = clamp(cursor.y, 0, max(buffer.length - 1, 0));
  cursor.x = clamp(cursor.x, 0, buffer[cursor.y].length);

  // scroll if the cursor is travelling off the screen
  if (cursor.y - scroll >= gridSize.y - 1)
    scroll += cursor.y - scroll - gridSize.y + 2;
  else if (cursor.y - scroll < 0)
    scroll += cursor.y - scroll;
}

function draw() {
  background(0);

  const clr = color(10, 230, 10);

  // reset pixy pixels
  pixy.img = createImage(pixy.res.x, pixy.res.y);

  // display text
  let offset = 0;
  for (let i = 0; i < min(buffer.length - scroll, gridSize.y - 1); i++) {
    const pos = [0, (i + offset) * charSize.y];
    const idx = i + scroll;
    //RenderTextLinkedList
    RenderTextLinkedList(pixy, buffer[idx], clr, loadedFont, spacing.toArr(), pos);

    // adjust the next rows if the current row is too long
    if (buffer[idx].length > gridSize.x)
      offset++;
  }

  // display cursor
  RenderText(
    pixy,
    "█",
    clr,
    loadedFont,
    spacing.toArr(),
    cursor.copy().mul(charSize).toArr());

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
  for (let i = 0; i < gridSize.x - modeStr.length - cursorPosStr.length; i++)
    spaceStr = spaceStr.concat(' ');

  // display status bar
  RenderText(
    pixy,
    modeStr + spaceStr + cursorPosStr,
    clr,
    loadedFont,
    spacing.toArr(),
    [0, (gridSize.y - 1) * charSize.y]);
}