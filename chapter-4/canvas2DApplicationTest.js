/**
 * @Author: huangw1
 * @Date: 2019/8/26 09:56
 */
var RenderState = /** @class */ (function () {
    function RenderState() {
        this.lineWidth = 1;
        this.strokeStyle = 'red';
        this.fillStyle = 'green';
    }
    RenderState.prototype.clone = function () {
        var state = new RenderState();
        state.lineWidth = this.lineWidth;
        state.strokeStyle = this.strokeStyle;
        state.fillStyle = this.fillStyle;
        return state;
    };
    RenderState.prototype.toString = function () {
        return JSON.stringify(this, null, '  ');
    };
    return RenderState;
}());
var RenderStateStack = /** @class */ (function () {
    function RenderStateStack() {
        this._stack = [new RenderState()];
    }
    Object.defineProperty(RenderStateStack.prototype, "_currentState", {
        get: function () {
            return this._stack[this._stack.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    RenderStateStack.prototype.save = function () {
        this._stack.push(this._currentState.clone());
    };
    RenderStateStack.prototype.restore = function () {
        this._stack.pop();
    };
    Object.defineProperty(RenderStateStack.prototype, "lineWidth", {
        get: function () {
            return this._currentState.lineWidth;
        },
        set: function (value) {
            this._currentState.lineWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderStateStack.prototype, "strokeStyle", {
        get: function () {
            return this._currentState.strokeStyle;
        },
        set: function (value) {
            this._currentState.strokeStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderStateStack.prototype, "fillStyle", {
        get: function () {
            return this._currentState.strokeStyle;
        },
        set: function (value) {
            this._currentState.strokeStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    RenderStateStack.prototype.printInfo = function () {
        console.log(this._currentState.toString());
    };
    return RenderStateStack;
}());
