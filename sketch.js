const screen = { w: 500, h: 400 };
const border = 50;
const charRes = { w: 3, h: 5 };
const spacing = { w: 1, h: 2 };
const gridSize = { w: 40, h: 20 };

const charSize = {
  w: charRes.w + spacing.w,
  h: charRes.h + spacing.h
};
const pixyResolution = {
  w: gridSize.w * charSize.w,
  h: gridSize.h * charSize.h
};

let pixy;
let loaded_font;

// where enums ;-;
const NORMAL = 0;
const INSERT = 1;
const VISUAL = 2;

let cursor = { x: 0, y: 0 };
let mode = NORMAL;;
let scroll = 0;
let buffer = [
  "#include <stdio.h>",
  "",
  "int main(int argc, char** argv)",
  "{",
  "  printf(\"Hello, World!\\n\");",
  "  return 0;",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
  "}",
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

function keyPressed() {
  if (mode == NORMAL) {
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
  } else if (mode == INSERT) {

  } else if (mode == VISUAL) {

  } else {
    print("Invalid Mode!");
  }

  // keep the cursor inside the buffer
  cursor.y = min(max(cursor.y, 0), buffer.length);
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

  // clear pixy pixels
  pixy.pixels.forEach(column => column.fill(color(0)));

  // display text
  let offset = 0;
  for (let i = 0; i < min(buffer.length - scroll, gridSize.h - 1); i++) {
    let pos = [0, (i + offset) * charSize.h];
    let idx = i + scroll;
    RenderText(pixy, buffer[idx], clr, loadedFont, [spacing.w, spacing.h], pos);

    // adjust the next rows if the current row is too long
    if (buffer[idx].length > gridSize.w)
      offset++;
  }

  // display cursor
  for (let i = 0; i < charRes.w; i++) 
    for (let j = 0; j < charRes.h; j++) {
      let x = cursor.x * charSize.w + i;
      let y = (cursor.y - scroll) * charSize.h + j;
      pixy.pixels[x][y] = clr;
    }

  // display current mode
  let modeStr = mode == NORMAL
    ? "--- NORMAL ---"
    : mode == INSERT
      ? "--- INSERT ---"
      : mode == VISUAL
        ? "--- VISUAL ---"
        : "INVALID MODE !!!";

  // display cursor position
  let cursorPosStr = (cursor.x + 1) + ":" + (cursor.y + 1);

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

  // render pixy
  noStroke();
  pixy.display();
}
