/**
 * @Author: huangw1
 * @Date: 2019/8/25 23:29
 */
import {Application, CanvasKeyBoardEvent, CanvasMouseEvent} from "./src/application";

class ApplicationTest extends Application {
    protected dispatchKeyDown(evt: CanvasKeyBoardEvent) {
        console.log('key: ' + evt.key + ' is down');
    }

    protected dispatchMouseDown(evt: CanvasMouseEvent) {
        console.log('canvasPosition: ' + evt.canvasPosition);
    }

    public update(elapsedMsec: number, intervalMsec: number): void {
        console.log('elapsedMsec : ' + elapsedMsec);
        console.log('intervalSec : ' + intervalMsec);
    }

    public render(): void {
        console.log("调用render方法 ");
    }
}

const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
const app: Application = new ApplicationTest(canvas);

app.update(0, 0);
app.render();

const startButton: HTMLButtonElement | null = document.getElementById('start') as HTMLButtonElement;
const stopButton: HTMLButtonElement | null = document.getElementById('stop') as HTMLButtonElement;

startButton.onclick = (evt: MouseEvent): void => {
    app.start();
};

stopButton.onclick = (evt: MouseEvent): void => {
    app.stop();
};
