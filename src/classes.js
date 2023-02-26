class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;   
    }

    equals(vec2) {
        return this.x == vec2.x && this.y == vec2.y;
    }

    copy() {
        return new Vector2(x, y);
    }

    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    }

    add(vec2) {
        this.x += vec2.x;
        this.y += vec2.y
    }

    subtract(vec2) {
        this.x -= vec2.x;
        this.y -= vec2.y
    }

    toArr() {
        return [this.x, this.y];
    }

    fromArr(arr) {
        this.x = arr[0];
        this.y = arr[1];
    }
}