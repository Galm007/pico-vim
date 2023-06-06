const Clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function DivMod(dividend, divisor) {
    const tmp = Math.floor(dividend / divisor);
    return [tmp, dividend - tmp * divisor];
}

function GetFontRes(font) {
    return new Vector2(font.get(' ')[0].length, font.get(' ').length);
}

function ArrToList(arr) {
    let list = new DoubleLinked.List();
    for (let i = 0; i < arr.length; i++)
        list.push(arr[i]);
    return list;
}

function UpdateCursorRefs() {
    if (buffer.length > 0) {
        cursorRefs[1] = buffer.ind(0);

        if (cursorRefs[1].length > 0)
            cursorRefs[0] = cursorRefs[1].ind(0);
    }
}

function InitBuffer(strArray) {
    for (let i = 0; i < strArray.length; i++)
        buffer.push(ArrToList(strArray[i]));

    UpdateCursorRefs();
}

function Controls() {
    switch (key) {
        case "Escape":
            mode = Mode.Normal;
            break;''
    }
}

function NormalControls() {
    switch (key) {
        case 'h':
            cursor.x--;
            break;
        case 'j':
            cursor.y++;
            break;
        case 'k':
            cursor.y--;
            break;
        case 'l':
            cursor.x++;
            break;

        case 'a':
            cursor.x++;
        case 'i':
            mode = Mode.Insert;
            break;

        default:
            break;
    }

    if (cursor.y >= buffer.length) {
        cursor.y = buffer.length - 1;
        cursorRefs[1] = buffer.tail;
    }
    if (cursor.y < 0) {
        cursor.y = 0;
        cursorRefs[1] = buffer.head;
    }
    cursorRefs[1] = buffer.ind(cursor.y);

    const lineData = cursorRefs[1].data;
    if (cursor.x >= lineData.length) {
        cursor.x = lineData.length - 1;
        cursorRefs[0] = lineData.tail;
    }
    if (cursor.x < 0) {
        cursor.x = 0;
        cursorRefs[0] = lineData.head;
    }
    cursorRefs[0] = cursorRefs[1].data.ind(cursor.x);

    // scroll if the cursor is travelling off the screen
    if (cursor.y - scroll >= gridSize.y - 1)
        scroll += cursor.y - scroll - gridSize.y + 2;
    else if (cursor.y - scroll < 0)
        scroll += cursor.y - scroll;
}

function InsertControls() {
    if (cursorRefs[1].data.head == cursorRefs[0])
        cursorRefs[1].data.insert_head(key);
    else
        cursorRefs[1].data.insert(cursorRefs[0].before, key);
    cursor.x++;
}

function CommandControls() {

}
