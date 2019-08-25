"use strict";
/**
 * @Author: huangw1
 * @Date: 2019/8/24 17:18
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var math2d_1 = require("./math2d");
/**
 * 事件类型
 * 1. MOUSEEVENT 鼠标事件
 * 2. KEYBOARDEVENT 键盘事件
 */
var EInputEventType;
(function (EInputEventType) {
    EInputEventType[EInputEventType["MOUSEEVENT"] = 0] = "MOUSEEVENT";
    EInputEventType[EInputEventType["MOUSEDOWN"] = 1] = "MOUSEDOWN";
    EInputEventType[EInputEventType["MOUSEUP"] = 2] = "MOUSEUP";
    EInputEventType[EInputEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
    EInputEventType[EInputEventType["MOUSEDRAG"] = 4] = "MOUSEDRAG";
    EInputEventType[EInputEventType["KEYBOARDEVENT"] = 5] = "KEYBOARDEVENT";
    EInputEventType[EInputEventType["KEYUP"] = 6] = "KEYUP";
    EInputEventType[EInputEventType["KEYDOWN"] = 7] = "KEYDOWN";
    EInputEventType[EInputEventType["KEYPRESS"] = 8] = "KEYPRESS";
})(EInputEventType = exports.EInputEventType || (exports.EInputEventType = {}));
/**
 * 基础事件
 */
var CanvasInputEvent = /** @class */ (function () {
    function CanvasInputEvent(type, altKey, ctrlKey, shiftKey) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        this.type = type;
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
    }
    return CanvasInputEvent;
}());
exports.CanvasInputEvent = CanvasInputEvent;
/**
 * 鼠标事件
 */
var CanvasMouseEvent = /** @class */ (function (_super) {
    __extends(CanvasMouseEvent, _super);
    function CanvasMouseEvent(type, canvasPos, button, altKey, ctrlKey, shiftKey) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        var _this = _super.call(this, type, altKey, ctrlKey, shiftKey) || this;
        _this.button = button;
        _this.canvasPosition = canvasPos;
        _this.hasLocalPosition = false;
        _this.localPosition = math2d_1.Vec2.create();
        return _this;
    }
    return CanvasMouseEvent;
}(CanvasInputEvent));
exports.CanvasMouseEvent = CanvasMouseEvent;
/**
 * 键盘事件
 */
var CanvasKeyBoardEvent = /** @class */ (function (_super) {
    __extends(CanvasKeyBoardEvent, _super);
    function CanvasKeyBoardEvent(type, key, keyCode, repeat, altKey, ctrlKey, shiftKey) {
        if (altKey === void 0) { altKey = false; }
        if (ctrlKey === void 0) { ctrlKey = false; }
        if (shiftKey === void 0) { shiftKey = false; }
        var _this = _super.call(this, type, altKey, ctrlKey, shiftKey) || this;
        _this.key = key;
        _this.keyCode = keyCode;
        _this.repeat = repeat;
        return _this;
    }
    return CanvasKeyBoardEvent;
}(CanvasInputEvent));
exports.CanvasKeyBoardEvent = CanvasKeyBoardEvent;
/**
 * 计时器
 * 1. 每个计时器能以不同帧率重复执行任务
 * 2. 每个计时器能够以倒计时方式执行一次任务
 * 3. 尽量让内存使用和执行效率达到相对平衡
 */
var Timer = /** @class */ (function () {
    function Timer(callback) {
        this.countdown = 0;
        this.timeout = 0;
        this.onlyOnce = false;
        this.callback = callback;
    }
    return Timer;
}());
exports.Timer = Timer;
var Application = /** @class */ (function () {
    function Application(canvas) {
        this.timers = [];
        this._timeId = -1;
        this._fps = 0;
        this._start = false;
        this._requestId = -1;
        this.canvas = canvas;
        this.canvas.addEventListener("mousedown", this, false);
        this.canvas.addEventListener("mouseup", this, false);
        this.canvas.addEventListener("mousemove", this, false);
        window.addEventListener("keydown", this, false);
        window.addEventListener("keyup", this, false);
        window.addEventListener("keypress", this, false);
        this._isMouseDown = false;
        this.isSupportMouseMove = false;
    }
    Object.defineProperty(Application.prototype, "isRunning", {
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.start = function () {
        var _this = this;
        if (!this._start) {
            this._start = true;
            this._lastTime = -1;
            this._startTime = -1;
            this._requestId = requestAnimationFrame(function (timestamp) {
                _this.step(timestamp);
            });
        }
    };
    Application.prototype.step = function (timestamp) {
        var _this = this;
        if (this._startTime === -1) {
            this._startTime = timestamp;
        }
        if (this._lastTime === -1) {
            this._lastTime = timestamp;
        }
        var elapsedMsec = timestamp - this._startTime;
        var intervalMsec = timestamp - this._lastTime;
        if (intervalMsec) {
            this._fps = 1000 / intervalMsec;
        }
        this._handleTimers(intervalMsec);
        this.update(elapsedMsec, intervalMsec);
        this.render();
        this._lastTime = timestamp;
        this._requestId = requestAnimationFrame(function (timestamp) {
            _this.step(timestamp);
        });
    };
    Application.prototype.stop = function () {
        if (this._start) {
            cancelAnimationFrame(this._requestId);
            this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    };
    Application.prototype.update = function (elapsedMsec, intervalMsec) {
    };
    Application.prototype.render = function () {
    };
    Application.prototype.addTimer = function (callback, timeout, onlyOnce, data) {
        if (timeout === void 0) { timeout = 1000; }
        if (onlyOnce === void 0) { onlyOnce = false; }
        if (data === void 0) { data = undefined; }
        var timer = this.timers.filter(function (timer) { return timer.enabled; })[0];
        if (timer) {
            timer.enabled = true;
            timer.callback = callback;
            timer.callbackData = data;
            timer.timeout = timeout;
            timer.countdown = timeout;
            timer.onlyOnce = onlyOnce;
            return timer.id;
        }
        else {
            timer = new Timer(callback);
            timer.enabled = true;
            timer.callback = callback;
            timer.callbackData = data;
            timer.timeout = timeout;
            timer.countdown = timeout;
            timer.onlyOnce = onlyOnce;
            timer.id = ++this._timeId;
            this.timers.push(timer);
            return timer.id;
        }
    };
    Application.prototype.removeTimer = function (id) {
        var timer = this.timers.filter(function (timer) { return timer.id === id; })[0];
        if (timer) {
            timer.enabled = false;
            return true;
        }
        return false;
    };
    Application.prototype._handleTimers = function (intervalMsec) {
        var _this = this;
        this.timers.forEach(function (timer) {
            if (timer.enabled) {
                timer.countdown -= intervalMsec;
                if (timer.countdown <= 0) {
                    timer.callback(timer.id, timer.callbackData);
                    if (!timer.onlyOnce) {
                        timer.countdown = timer.timeout;
                    }
                    else {
                        _this.removeTimer(timer.id);
                    }
                }
            }
        });
    };
    Application.prototype.handleEvent = function (evt) {
        switch (evt.type) {
            case 'mousedown':
                this._isMouseDown = true;
                this.dispatchMouseDown(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN));
                break;
            case "mouseup":
                this._isMouseDown = false;
                this.dispatchMouseUp(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP));
                break;
            case "mousemove":
                if (this.isSupportMouseMove) {
                    this.dispatchMouseMove(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE));
                }
                if (this._isMouseDown) {
                    this.dispatchMouseDrag(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG));
                }
                break;
            case "keypress":
                this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYPRESS));
                break;
            case "keydown":
                this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYDOWN));
                break;
            case "keyup":
                this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYUP));
                break;
        }
    };
    Application.prototype._toCanvasMouseEvent = function (evt, type) {
        var event = evt;
        var mousePosition = this._viewportToCanvasCoordinate(event);
        return new CanvasMouseEvent(type, mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
    };
    Application.prototype._toCanvasKeyBoardEvent = function (evt, type) {
        var event = evt;
        return new CanvasKeyBoardEvent(type, event.key, event.keyCode, event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
    };
    Application.prototype._viewportToCanvasCoordinate = function (evt) {
        if (this.canvas) {
            var rect = this.canvas.getBoundingClientRect();
            var borderLeftWidth = 0;
            var borderTopWidth = 0;
            var paddingLeft = 0;
            var paddingTop = 0;
            var style = getComputedStyle(evt.target);
            var w = style.borderLeftWidth;
            if (w) {
                borderLeftWidth = parseInt(w, 10);
            }
            w = style.borderTopWidth;
            if (w) {
                borderTopWidth = parseInt(w, 10);
            }
            w = style.paddingLeft;
            if (w) {
                paddingLeft = parseInt(w, 10);
            }
            w = style.paddingTop;
            if (w) {
                paddingTop = parseInt(w, 10);
            }
            var x = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
            var y = evt.clientY - rect.top - borderTopWidth - paddingTop;
            return new math2d_1.Vec2(x, y);
        }
        else {
            throw new Error('');
        }
    };
    Application.prototype.dispatchMouseDown = function (evt) {
        return;
    };
    Application.prototype.dispatchMouseUp = function (evt) {
        return;
    };
    Application.prototype.dispatchMouseMove = function (evt) {
        return;
    };
    Application.prototype.dispatchMouseDrag = function (evt) {
        return;
    };
    Application.prototype.dispatchKeyDown = function (evt) {
        return;
    };
    Application.prototype.dispatchKeyUp = function (evt) {
        return;
    };
    Application.prototype.dispatchKeyPress = function (evt) {
        return;
    };
    return Application;
}());
exports.Application = Application;
var Canvas2DApplication = /** @class */ (function (_super) {
    __extends(Canvas2DApplication, _super);
    function Canvas2DApplication(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.context2D = _this.canvas.getContext('2d');
        return _this;
    }
    return Canvas2DApplication;
}(Application));
exports.Canvas2DApplication = Canvas2DApplication;
var WebGLApplication = /** @class */ (function (_super) {
    __extends(WebGLApplication, _super);
    function WebGLApplication(canvas, contextAttributes) {
        var _this = _super.call(this, canvas) || this;
        _this.context3D = _this.canvas.getContext("webgl", contextAttributes);
        if (!_this.context3D) {
            _this.context3D = _this.canvas.getContext('experimental-webgl');
        }
        return _this;
    }
    return WebGLApplication;
}(Application));
exports.WebGLApplication = WebGLApplication;
