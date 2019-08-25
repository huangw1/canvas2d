"use strict";
/**
 * @Author: huangw1
 * @Date: 2019/8/24 17:00
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
