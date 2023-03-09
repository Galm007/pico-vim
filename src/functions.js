const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function arrToList(list, arr) {
    for (let i in arr)
        list.push(arr[i]);
    return list;
}