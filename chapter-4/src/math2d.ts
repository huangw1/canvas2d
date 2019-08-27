/**
 * @Author: huangw1
 * @Date: 2019/8/24 17:00
 */

const EPSILON: number = 0.00001;
const PiBy180: number = 0.017453292519943295;

export class Math2D {
    public static isEquals(left: number, right: number, espilon: number = EPSILON): boolean {
        return Math.abs(left - right) < EPSILON;
    }
}

export class Vec2 {
    public values: Float32Array;

    public constructor(x: number = 0, y: number = 0) {
        this.values = new Float32Array([x, y])
    }

    public toString(): string {
        return ` [ ${this.values[0]} , ${this.values[1]} ] `
    }

    public get x(): number {
        return this.values[0]
    }

    public set x(x: number) {
        this.values[0] = x
    }

    public get y(): number {
        return this.values[1]
    }

    public set y(y: number) {
        this.values[1] = y
    }

    public reset(x: number = 0, y: number = 0): Vec2 {
        this.values[0] = x;
        this.values[1] = y;
        return this
    }

    public static create(x: number = 0, y: number = 0): Vec2 {
        return new Vec2(x, y)
    }
}

export class Size {

    public values: Float32Array;

    public constructor(w: number = 1, h: number = 1) {
        this.values = new Float32Array([w, h]);
    }

    set width(value: number) {
        this.values [0] = value;
    }

    get width(): number {
        return this.values [0];
    }

    set height(value: number) {
        this.values [1] = value;
    }

    get height(): number {
        return this.values [1];
    }

    public static create(w: number = 1, h: number = 1): Size {
        return new Size(w, h);
    }
}

export class Rectangle {
    public origin: Vec2;
    public size: Size;

    public constructor(origin: Vec2 = new Vec2(), size: Size = new Size(1, 1)) {
        this.origin = origin;
        this.size = size;
    }

    public isEmpty(): boolean {
        let area: number = this.size.width * this.size.height;
        return Math2D.isEquals(area, 0);
    }

    public static create(x: number = 0, y: number = 0, w: number = 0, h: number = 0): Rectangle {
        let origin: Vec2 = new Vec2(x, y);
        let size: Size = new Size(w, h);
        return new Rectangle(origin, size);
    }
}

