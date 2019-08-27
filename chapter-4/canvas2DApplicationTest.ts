/**
 * @Author: huangw1
 * @Date: 2019/8/26 09:56
 */

class RenderState {
    public lineWidth: number = 1;
    public strokeStyle: string = 'red';
    public fillStyle: string = 'green';

    public clone(): RenderState {
        const state = new RenderState()
        state.lineWidth = this.lineWidth;
        state.strokeStyle = this.strokeStyle;
        state.fillStyle = this.fillStyle;
        return state;
    }

    public toString(): string {
        return JSON.stringify(this, null, '  ')
    }
}

class RenderStateStack {
    private _stack: RenderState[] = [new RenderState()];
    
    private get _currentState(): RenderState {
        return this._stack[this._stack.length - 1];
    }
    
    public save(): void {
        this._stack.push(this._currentState.clone());
    }
    
    public restore(): void {
        this._stack.pop();
    }

    public get lineWidth (): number {
        return this._currentState.lineWidth;
    }

    public set lineWidth ( value: number ) {
        this._currentState.lineWidth = value;
    }

    public get strokeStyle (): string {
        return this._currentState.strokeStyle;
    }

    public set strokeStyle ( value: string ) {
        this._currentState.strokeStyle = value;
    }

    public get fillStyle (): string {
        return this._currentState.strokeStyle;
    }

    public set fillStyle ( value: string ) {
        this._currentState.strokeStyle = value;
    }

    public printInfo(): void {
        console.log(this._currentState.toString());
    }
}
