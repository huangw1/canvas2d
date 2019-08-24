import {Canvas2DUtil} from "./canvas2D";

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const canvas2D: Canvas2DUtil = new Canvas2DUtil(canvas)
canvas2D.drawText('Hello ff World')
