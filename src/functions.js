const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function ClearPixy(pixy) {
    for (let i in pixy.img.pixels)
        pixy.img.pixels[i] = 0;
}

function GetLinkedInd(list, i) {
    let toReturn = list.head;
    for (let j = 0; j < i; j++)
        toReturn = toReturn.next;
    return toReturn.data;
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

    // keep the cursor inside the buffer
    cursor.y = clamp(cursor.y, 0, max(buffer.length - 1, 0));
    cursor.x = clamp(cursor.x, 0, GetLinkedInd(buffer, cursor.y).length); // replace this later

    // scroll if the cursor is travelling off the screen
    if (cursor.y - scroll >= gridSize.y - 1)
        scroll += cursor.y - scroll - gridSize.y + 2;
    else if (cursor.y - scroll < 0)
        scroll += cursor.y - scroll;
}