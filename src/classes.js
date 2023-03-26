class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;   
    }

    static MonoVec2(x) {
        return new Vector2(x, x);
    }

    equals(vec2) {
        return this.x == vec2.x && this.y == vec2.y;
    }

    copy() {
        return new Vector2(this.x, this.y);
    }

    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    add(vec2) {
        this.x += vec2.x;
        this.y += vec2.y
        return this;
    }

    sub(vec2) {
        this.x -= vec2.x;
        this.y -= vec2.y
        return this;
    }

    mul(vec2) {
        this.x *= vec2.x;
        this.y *= vec2.y;
        return this;
    } 

    div(vec2) {
        this.x /= vec2.x;
        this.y /= vec2.y;
        return this;
    }

    toArr() {
        return [this.x, this.y];
    }

    fromArr(arr) {
        this.x = arr[0];
        this.y = arr[1];
        return this;
    }
}
