const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function InitBuffer() {
    for (let i in buffer)
    buffer[i] = arrToList(new DoubleLinked.List(), buffer[i]);
    buffer = arrToList(new DoubleLinked.List(), buffer);
}

function ClearPixy(pixy) {
    for (let i in pixy.img.pixels)
        pixy.img.pixels[i] = 0;
}

function GetLinkedInd(list, i) {
    let toReturn = list.head;
    for (let j = 0; j < i; j++)
        toReturn = toReturn.next;
    return toReturn;
}

function arrToList(list, arr) {
    for (let i in arr)
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
            cursorRefs[0] = cursorRefs[0].before;
            break;
        case 'j':
            cursor.y++;
            cursorRefs[1] = cursorRefs[1].next;
            break;
        case 'k':
            cursor.y--;
            cursorRefs[1] = cursorRefs[1].before;
            break;
        case 'l':
            cursor.x++;
            cursorRefs[0] = cursorRefs[0].next;
            break;

        case 'a':
            cursor.x++;
            cursorRefs[0] = cursorRefs[0].next;
        case 'i':
            mode = Mode.Insert;
            break;

        default:
            break;
    }

    // keep the cursor inside the buffer
    cursor.y = clamp(cursor.y, 0, max(buffer.length - 1, 0));
    cursor.x = clamp(cursor.x, 0, GetLinkedInd(buffer, cursor.y).data.length); // replace this later

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