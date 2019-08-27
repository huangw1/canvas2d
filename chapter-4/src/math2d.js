"use strict";
/**
 * @Author: huangw1
 * @Date: 2019/8/24 17:00
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EPSILON = 0.00001;
var PiBy180 = 0.017453292519943295;
var Math2D = /** @class */ (function () {
    function Math2D() {
    }
    Math2D.isEquals = function (left, right, espilon) {
        if (espilon === void 0) { espilon = EPSILON; }
        return Math.abs(left - right) < EPSILON;
    };
    return Math2D;
}());
exports.Math2D = Math2D;
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.values = new Float32Array([x, y]);
    }
    Vec2.prototype.toString = function () {
        return " [ " + this.values[0] + " , " + this.values[1] + " ] ";
    };
    Object.defineProperty(Vec2.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (x) {
            this.values[0] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (y) {
            this.values[1] = y;
        },
        enumerable: true,
        configurable: true
    });
    Vec2.prototype.reset = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.values[0] = x;
        this.values[1] = y;
        return this;
    };
    Vec2.create = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new Vec2(x, y);
    };
    return Vec2;
}());
exports.Vec2 = Vec2;
var Size = /** @class */ (function () {
    function Size(w, h) {
        if (w === void 0) { w = 1; }
        if (h === void 0) { h = 1; }
        this.values = new Float32Array([w, h]);
    }
    Object.defineProperty(Size.prototype, "width", {
        get: function () {
            return this.values[0];
        },
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "height", {
        get: function () {
            return this.values[1];
        },
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: true,
        configurable: true
    });
    Size.create = function (w, h) {
        if (w === void 0) { w = 1; }
        if (h === void 0) { h = 1; }
        return new Size(w, h);
    };
    return Size;
}());
exports.Size = Size;
var Rectangle = /** @class */ (function () {
    function Rectangle(origin, size) {
        if (origin === void 0) { origin = new Vec2(); }
        if (size === void 0) { size = new Size(1, 1); }
        this.origin = origin;
        this.size = size;
    }
    Rectangle.prototype.isEmpty = function () {
        var area = this.size.width * this.size.height;
        return Math2D.isEquals(area, 0);
    };
    Rectangle.create = function (x, y, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        var origin = new Vec2(x, y);
        var size = new Size(w, h);
        return new Rectangle(origin, size);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
