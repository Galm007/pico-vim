const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function divmod(num, div) {
    const toReturn = [Math.floor(num / div), undefined];
    toReturn[1] = num - toReturn[0] * div;
    return toReturn;
}

function InitBuffer() {
    for (const i in buffer)
        buffer[i] = arrToList(new DoubleLinked.List(), buffer[i]);
    buffer = arrToList(new DoubleLinked.List(), buffer);
}

function arrToList(list, arr) {
    for (const i in arr)
        list.push(arr[i]);
    return list;
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
