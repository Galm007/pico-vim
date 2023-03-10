function setup() {
  createCanvas(screen.x, screen.y);
  noSmooth();

  textColor = color(255);
  emptyColor = color(59, 120, 255);

  for (let i in buffer)
    buffer[i] = arrToList(new DoubleLinked.List(), buffer[i]);
  buffer = arrToList(new DoubleLinked.List(), buffer);

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
    Controls()
    return;
  }

}

function draw() {
  background(0);

  // reset pixy pixels
  pixy.img = createImage(pixy.res.x, pixy.res.y);

  // display text
  let offset = 0;
  //for (let i = 0; i < min(buffer.length - scroll, gridSize.y - 1); i++) {

  /*
  let j = 0;
  for (let i = buffer.head; i != undefined; i = i.next) {
  */
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
    textColor,
    loadedFont,
    spacing.toArr(),
    [0, (gridSize.y - 1) * charSize.y]);
}