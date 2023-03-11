function setup() {
  createCanvas(screen.x, screen.y);
  noSmooth();

  let res = charSize.copy().mul(gridSize);

  pixy = new Pixy(
    Vector2.MonoVec2(0).toArr(),
    screen.toArr(),
    charSize.copy().mul(gridSize).toArr());

  pixy.res = res;
}

function keyPressed() {
  Controls();
  [
    NormalControls,
    InsertControls,
    CommandControls
  ][mode]();
}

function draw() {
  background(0);

  // reset pixy pixels
  ClearPixy(pixy);

  // display text
  let offset = 0;

  let i = buffer.head;
  for (let j = 0; j < gridSize.y; j++) {
    const pos = [0, (j + offset) * charSize.y];
    const idx = i + scroll;

    if (i == undefined) {
      RenderText(pixy, '~', emptyColor, loadedFont, spacing.toArr(), pos);
      continue;
    }

    if (i.data.length != 0) // render the ~ otherwise
      RenderTextLinkedList(pixy, i.data, textColor, loadedFont, spacing.toArr(), pos);
    else
      RenderText(pixy, '~', emptyColor, loadedFont, spacing.toArr(), pos);

    // adjust the next rows if the current row is too long
    if (i.data.length > gridSize.x)
      offset++;
    i = i.next;
  }

  // display cursor
  RenderText(
    pixy,
    "█",
    textColor,
    loadedFont,
    spacing.toArr(),
    cursor.copy().mul(charSize).toArr());

  RenderStatusBar(textColor);

  // render pixy
  pixy.updatePixels();
  pixy.display();
}

function RenderStatusBar(textColor) {
  // display current mode
  let modeStr = "";
  switch (mode) {
    case Mode.Insert:
      modeStr = "-- INSERT --"
      break;
    case Mode.Command:
      break;
  }

  // display cursor position
  const cursorPosStr = String(cursor.x + 1) + ":" + String(cursor.y + 1);

  // add space between modeStr and cursorPosStr
  let spaceStr = "";
  for (let i = 0; i < gridSize.x - modeStr.length - cursorPosStr.length; i++)
    spaceStr = spaceStr.concat(' ');

  // display status bar
  RenderText(
    pixy,
    modeStr + spaceStr + cursorPosStr,
    textColor,
    loadedFont,
    spacing.toArr(),
    [0, (gridSize.y - 1) * charSize.y]);
}