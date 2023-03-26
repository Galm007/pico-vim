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

function GetLinkedInd(list, i) {
    let toReturn = list.head;
    for (let j = 0; j < i; j++)
        toReturn = toReturn.next;
    return toReturn;
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
    cursorRefs[1] = GetLinkedInd(buffer, cursor.y);

    const lineData = cursorRefs[1].data;
    if (cursor.x >= lineData.length) {
        cursor.x = lineData.length - 1;
        cursorRefs[0] = lineData.tail;
    }
    if (cursor.x < 0) {
        cursor.x = 0;
        cursorRefs[0] = lineData.head;
    }
    cursorRefs[0] = GetLinkedInd(cursorRefs[1].data, cursor.x);

    // scroll if the cursor is travelling off the screen
    if (cursor.y - scroll >= gridSize.y - 1)
        scroll += cursor.y - scroll - gridSize.y + 2;
    else if (cursor.y - scroll < 0)
        scroll += cursor.y - scroll;
}

function InsertControls() {
    //buffer.head.data.insert_head(key);

    cursorRefs[1].data.insert(cursorRefs[0].before, key);
    cursor.x++;
    //cursorRefs[0] = cursorRefs[0].next;
}

function CommandControls() {

}
