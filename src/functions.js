const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function arrToList(list, arr) {
    for (let i in arr)
        list.push(arr[i]);
    return list;
}

    function Controls() {
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

    // keep the cursor inside the buffer
    cursor.y = clamp(cursor.y, 0, max(buffer.length - 1, 0));
    //cursor.x = clamp(cursor.x, 0, buffer[cursor.y].length);

    // scroll if the cursor is travelling off the screen
    if (cursor.y - scroll >= gridSize.y - 1)
        scroll += cursor.y - scroll - gridSize.y + 2;
    else if (cursor.y - scroll < 0)
        scroll += cursor.y - scroll;
}