/**
 * @Author: huangw1
 * @Date: 2019/8/24 17:18
 */

import {Vec2} from "./math2d";

/**
 * 事件类型
 * 1. MOUSEEVENT 鼠标事件
 * 2. KEYBOARDEVENT 键盘事件
 */
export enum EInputEventType {
    MOUSEEVENT,
    MOUSEDOWN,
    MOUSEUP,
    MOUSEMOVE,
    MOUSEDRAG,

    KEYBOARDEVENT,
    KEYUP,
    KEYDOWN,
    KEYPRESS
}

/**
 * 基础事件
 */
export class CanvasInputEvent {
    public altKey: boolean;
    public ctrlKey: boolean;
    public shiftKey: boolean;
    public type: EInputEventType;

    public constructor(
        type: EInputEventType,
        altKey: boolean = false,
        ctrlKey: boolean = false,
        shiftKey: boolean = false
    ) {
        this.type = type;
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
    }
}

/**
 * 鼠标事件
 */
export class CanvasMouseEvent extends CanvasInputEvent {
    // 鼠标键 [0: 左键，1: 中键，2: 右键]
    public button: number;
    public canvasPosition: Vec2;

    public localPosition: Vec2;
    public hasLocalPosition: boolean;

    public constructor(
        type: EInputEventType,
        canvasPos: Vec2,
        button: number,
        altKey: boolean = false,
        ctrlKey: boolean = false,
        shiftKey: boolean = false
    ) {
        super(type, altKey, ctrlKey, shiftKey);
        this.button = button;
        this.canvasPosition = canvasPos;
        this.hasLocalPosition = false;
        this.localPosition = Vec2.create()
    }
}

/**
 * 键盘事件
 */
export class CanvasKeyBoardEvent extends CanvasInputEvent {
    public key: string;
    public keyCode: number;
    public repeat: boolean;

    public constructor(
        type: EInputEventType,
        key: string,
        keyCode: number,
        repeat: boolean,
        altKey: boolean = false,
        ctrlKey: boolean = false,
        shiftKey: boolean = false
    ) {
        super(type, altKey, ctrlKey, shiftKey);
        this.key = key;
        this.keyCode = keyCode;
        this.repeat = repeat;
    }
}

/**
 * 计时器回调
 */
export type TimerCallback = (id: number, data: any) => void;

/**
 * 计时器
 * 1. 每个计时器能以不同帧率重复执行任务
 * 2. 每个计时器能够以倒计时方式执行一次任务
 * 3. 尽量让内存使用和执行效率达到相对平衡
 */
export class Timer {
    public id: number;
    public enabled: boolean;

    public callback: TimerCallback;
    public callbackData: any;

    public countdown: number = 0;
    public timeout: number = 0;
    public onlyOnce: boolean = false;

    public constructor(callback: TimerCallback) {
        this.callback = callback;
    }
}

export class Application {
    public timers: Timer[] = [];
    public canvas: HTMLCanvasElement;

    private _timeId: number = -1;
    private _fps: number = 0;

    public isSupportMouseMove: boolean;
    protected _isMouseDown: boolean;

    protected _start: boolean = false;
    protected _requestId: number = -1;

    protected _lastTime: number;
    protected _startTime: number;

    public constructor(canvas: HTMLCanvasElement) {
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

    public get isRunning(): boolean {
        return this._start;
    }

    public get fps() {
        return this._fps;
    }

    public start(): void {
        if (!this._start) {
            this._start = true;
            this._lastTime = -1;
            this._startTime = -1;
            this._requestId = requestAnimationFrame((timestamp: number) => {
                this.step(timestamp);
            })
        }
    }

    protected step(timestamp: number) {
        if (this._startTime === -1) {
            this._startTime = timestamp;
        }
        if (this._lastTime === -1) {
            this._lastTime = timestamp;
        }
        const elapsedMsec = timestamp - this._startTime;
        const intervalMsec = timestamp - this._lastTime;
        if (intervalMsec) {
            this._fps = 1000 / intervalMsec;
        }
        this._handleTimers(intervalMsec);
        this.update(elapsedMsec, intervalMsec);
        this.render();
        this._lastTime = timestamp;
        this._requestId = requestAnimationFrame((timestamp: number) => {
            this.step(timestamp);
        })
    }

    public stop(): void {
        if (this._start) {
            cancelAnimationFrame(this._requestId);
            this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    }

    public update(elapsedMsec: number, intervalMsec: number): void {

    }

    public render(): void {

    }

    public addTimer(callback: TimerCallback, timeout: number = 1000, onlyOnce: boolean = false, data: any = undefined): number {
        let timer = this.timers.filter(timer => timer.enabled)[0];
        if (timer) {
            timer.enabled = true;
            timer.callback = callback;
            timer.callbackData = data;
            timer.timeout = timeout;
            timer.countdown = timeout;
            timer.onlyOnce = onlyOnce;
            return timer.id;
        } else {
            timer = new Timer(callback);
            timer.enabled = true;
            timer.callback = callback;
            timer.callbackData = data;
            timer.timeout = timeout;
            timer.countdown = timeout;
            timer.onlyOnce = onlyOnce;
            timer.id = ++this._timeId;
            this.timers.push(timer);
            return timer.id
        }
    }

    public removeTimer(id: number): boolean {
        const timer = this.timers.filter(timer => timer.id === id)[0];
        if (timer) {
            timer.enabled = false;
            return true;
        }
        return false;
    }

    private _handleTimers(intervalMsec: number): void {
        this.timers.forEach(timer => {
            if (timer.enabled) {
                timer.countdown -= intervalMsec;
                if (timer.countdown <= 0) {
                    timer.callback(timer.id, timer.callbackData);
                    if (!timer.onlyOnce) {
                        timer.countdown = timer.timeout;
                    } else {
                        this.removeTimer(timer.id);
                    }
                }
            }
        })
    }

    public handleEvent(evt: Event): void {
        switch (evt.type) {
            case 'mousedown':
                this._isMouseDown = true;
                this.dispatchMouseDown(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN));
                break;
            case "mouseup" :
                this._isMouseDown = false;
                this.dispatchMouseUp(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP));
                break;
            case "mousemove" :
                if (this.isSupportMouseMove) {
                    this.dispatchMouseMove(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE));
                }
                if (this._isMouseDown) {
                    this.dispatchMouseDrag(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG));
                }
                break;
            case "keypress" :
                this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYPRESS));
                break;
            case "keydown" :
                this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYDOWN));
                break;
            case "keyup" :
                this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt, EInputEventType.KEYUP));
                break;
        }
    }

    private _toCanvasMouseEvent(evt: Event, type: EInputEventType): CanvasMouseEvent {
        const event: MouseEvent = evt as MouseEvent;
        const mousePosition: Vec2 = this._viewportToCanvasCoordinate(event);
        return new CanvasMouseEvent(type, mousePosition, event.button, event.altKey, event.ctrlKey, event.shiftKey);
    }

    private _toCanvasKeyBoardEvent(evt: Event, type: EInputEventType): CanvasKeyBoardEvent {
        const event: KeyboardEvent = evt as KeyboardEvent;
        return new CanvasKeyBoardEvent(type, event.key, event.keyCode, event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
    }

    private _viewportToCanvasCoordinate(evt: MouseEvent): Vec2 {
        if (this.canvas) {
            let rect: ClientRect = this.canvas.getBoundingClientRect();
            let borderLeftWidth: number = 0;
            let borderTopWidth: number = 0;
            let paddingLeft: number = 0;
            let paddingTop: number = 0;
            let style = getComputedStyle(evt.target as HTMLElement);
            let w: string | undefined = style.borderLeftWidth;
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
            let x = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
            let y = evt.clientY - rect.top - borderTopWidth - paddingTop;
            return new Vec2(x, y);
        } else {
            throw new Error('')
        }
    }

    protected dispatchMouseDown(evt: CanvasMouseEvent): void {
        return;
    }

    protected dispatchMouseUp(evt: CanvasMouseEvent): void {
        return;
    }

    protected dispatchMouseMove(evt: CanvasMouseEvent): void {
        return;
    }

    protected dispatchMouseDrag(evt: CanvasMouseEvent): void {
        return;
    }

    protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
        return;
    }

    protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
        return;
    }

    protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
        return;
    }
}

export class Canvas2DApplication extends Application {
    public context2D: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.context2D = this.canvas.getContext('2d');
    }
}

export class WebGLApplication extends Application {
    public context3D: WebGLRenderingContext;

    public constructor(canvas: HTMLCanvasElement, contextAttributes: WebGLContextAttributes) {
        super(canvas);
        this.context3D = this.canvas.getContext("webgl", contextAttributes);
        if (!this.context3D) {
            this.context3D = this.canvas.getContext('experimental-webgl');
        }
    }
}
