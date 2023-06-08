const Clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// returns an array with two items, the quotient and the remainder
function DivMod(dividend, divisor) {
    const tmp = Math.floor(dividend / divisor);
    return [tmp, dividend - tmp * divisor];
}

// returns the resolution of a font in Vector2
function GetFontRes(font) {
    return new Vector2(font.get(' ')[0].length, font.get(' ').length);
}

// creates a new DoubleLinked.List from an array
function ArrToList(arr) {
    let list = new DoubleLinked.List();
    for (let i = 0; i < arr.length; i++)
        list.push(arr[i]);
    return list;
}

// updates `cursorRef` based on the cursor's position inside the buffer
//
// Don't forget to call this function after changing the cursor's position!
function UpdateCursorRefs() {
    if (buffer.length > 0) {
        cursorRefs[1] = buffer.ind(cursor.y);

        if (cursorRefs[1].data.length > 0)
            cursorRefs[0] = cursorRefs[1].data.ind(cursor.x);
    }
}

// initializes the DoubleLinked.List buffer with an array of strings
function InitBuffer(strArray) {
    for (let i = 0; i < strArray.length; i++)
        buffer.push(ArrToList(strArray[i]));

    UpdateCursorRefs();
}

// restricts the cursor within the bounds of the buffer
function ClampCursorInBuffer() {
    cursor.y = Clamp(cursor.y, 0, buffer.length - 1);

    const lineLen = buffer.ind(cursor.y).data.length;
    cursor.x = lineLen > 0 ? Clamp(cursor.x, 0, lineLen - 1) : 0;

    UpdateCursorRefs();
}

// returns the x-position of the first non-whitespace character
// of the current line. Otherwise it just returns 0.
function FirstNonWhitespace() {
    let node = cursorRefs[1].data.head;
    for (let i = 0; i < cursorRefs[1].data.length; i++) {
        if (node.data != ' ' && node.data != '\t')
            return i;
        node = node.next;
    }
    return 0;
}

function NormalControls() {
    switch (commandStr) {
        // move cursor left
        case 'h':
            cursor.x -= 1;
            ClampCursorInBuffer();
            break;

        // move cursor down
        case 'j':
            cursor.y += 1;
            ClampCursorInBuffer();
            break;

        // move cursor up
        case 'k':
            cursor.y -= 1;
            ClampCursorInBuffer();
            break;

        // move cursor right
        case 'l':
            cursor.x += 1;
            ClampCursorInBuffer();
            break;

        // enter insert mode
        case 'i':
            mode = Mode.Insert;
            break;

        // go to the first non-whitespace character of the current line
        // then enter insert mode
        case 'I':
            cursor.x = FirstNonWhitespace();
            UpdateCursorRefs();
            mode = Mode.Insert;
            break;

        // move cursor right then enter insert mode
        case 'a':
            cursor.x += 1;
            UpdateCursorRefs();
            mode = Mode.Insert;
            break;

        // go beyond the end of the line then enter insert mode
        case 'A':
            cursor.x = cursorRefs[1].data.length;
            UpdateCursorRefs();
            mode = Mode.Insert;
            break;

        // go to beginning of the line
        case '0':
            cursor.x = 0;
            UpdateCursorRefs();
            break;

        // go to end of the line
        case '$':
            cursor.x = cursorRefs[1].data.length - 1;
            UpdateCursorRefs();
            break;
            
        /*
         * TODO:
         * - directional movement commands like "d2j"
         * - repeated commands like "3dd"
         * - edit text objects like "diw" or "daw"
         * - navigate text objects like "w" or "b"
         * - inline character search like "fa" or "Fa"
         * - search entire buffer for a character/word like "/" or "?"
         */
        default:
            return;
    }

    commandStr = "";

    // scroll if the cursor is travelling off the screen
    if (cursor.y - scroll >= gridSize.y - 1)
        scroll += cursor.y - scroll - gridSize.y + 2;
    else if (cursor.y - scroll < 0)
        scroll += cursor.y - scroll;
}

function InsertControls() {
    if (cursor.x == 0) {
        // start of line
        cursorRefs[1].data.insert_head(key);
        cursor.x++;
        UpdateCursorRefs();
    }
    else if (cursor.x >= cursorRefs[1].data.length) {
        // end of line
        cursorRefs[1].data.push(key);
        cursor.x = cursorRefs[1].data.length;
    }
    else {
        cursorRefs[1].data.insert(cursorRefs[0].before, key);
        cursor.x++;
        UpdateCursorRefs();
    }
}

function CommandControls() {

}
