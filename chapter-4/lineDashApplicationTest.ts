/**
 * @Author: huangw1
 * @Date: 2019/8/26 14:07
 */
import {Canvas2DApplication} from "./src/application";
import {Size, Vec2, Rectangle} from "./src/math2d";

import jpg from './data/test.jpg'

type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end';

type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom';

type FontType = "10px sans-serif" | "15px sans-serif" | "20px sans-serif" | "25px sans-serif";

type PatternRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

type FontStyle = "normal" | "italic" | "oblique";

type FontVariant = "normal" | "small-caps";

type FontWeight =
    "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";

type FontSize =
    "10px"
    | "12px"
    | "16px"
    | "18px"
    | "24px"
    | "50%"
    | "75%"
    | "100%"
    | "125%"
    | "150%"
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large";

type FontFamily = "sans-serif" | "serif" | "courier" | "fantasy" | "monospace";

export enum ELayout {
    LEFT_TOP,
    RIGHT_TOP,
    RIGHT_BOTTOM,
    LEFT_BOTTOM,
    CENTER_MIDDLE,
    CENTER_TOP,
    RIGHT_MIDDLE,
    CENTER_BOTTOM,
    LEFT_MIDDLE
}

export enum EImageFillType {
    STRETCH,
    REPEAT,
    REPEAT_X,
    REPEAT_Y
}

class LineDashApplicationTest extends Canvas2DApplication {
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.strokeGrid();
        this.loadAndDrawImage(jpg)
    }

    public fillCircle(x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern = 'red'): void {
        if (this.context2D) {
            this.context2D.save();
            this.context2D.fillStyle = fillStyle;
            this.context2D.beginPath();
            this.context2D.arc(x, y, radius, 0, Math.PI * 2);
            this.context2D.fill();
            this.context2D.restore();
        }
    }

    public strokeLine(x0: number, y0: number, x1: number, y1: number): void {
        if (this.context2D) {
            this.context2D.beginPath();
            this.context2D.moveTo(x0, y0);
            this.context2D.lineTo(x1, y1);
            this.context2D.stroke();
        }
    }

    public strokeCoord(originX: number, originY: number, width: number, height: number, lineWidth: number = 2): void {
        if (this.context2D) {
            this.context2D.save();
            this.context2D.lineWidth = lineWidth;
            this.context2D.strokeStyle = 'red';
            this.strokeLine(originX, originY, originX + width, originY);
            this.context2D.strokeStyle = 'blue';
            this.strokeLine(originX, originY, originX, originY + height);
            this.context2D.restore();
        }
    }

    public strokeGrid(color: string = 'gray', interval: number = 10): void {
        if (this.context2D) {
            this.context2D.save();
            this.context2D.strokeStyle = color;
            this.context2D.lineWidth = 0.5;
            for (let i: number = interval + 0.5; i < this.canvas.width; i += interval) {
                this.strokeLine(i, 0, i, this.canvas.height);
            }
            for (let j: number = interval + 0.5; j < this.canvas.height; j += interval) {
                this.strokeLine(0, j, this.canvas.width, j);
            }
            this.context2D.restore();
            this.fillCircle(0, 0, 5, 'green');
            this.strokeCoord(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    public fillText(
        text: string,
        x: number,
        y: number,
        color: string = 'white',
        align: TextAlign = 'left',
        baseline: TextBaseline = 'top',
        font: FontType = '10px sans-serif'
    ): void {
        if (this.context2D) {
            this.context2D.save();
            this.context2D.textAlign = align;
            this.context2D.textBaseline = baseline;
            this.context2D.font = font;
            this.context2D.fillStyle = color;
            this.context2D.fillText(text, x, y);
            this.context2D.restore();
        }
    }

    public calcTextSize(text: string, char: string = 'W', scale: number = 0.5): Size {
        if (this.context2D) {
            let size: Size = new Size();
            size.width = this.context2D.measureText(text).width;
            let w: number = this.context2D.measureText(char).width;
            size.height = w + w * scale;
            return size;
        }
    }

    public calcLocalTextRectangle(layout: ELayout, text: string, parentWidth: number, parentHeight: number) {
        let s: Size = this.calcTextSize(text);
        let o: Vec2 = Vec2.create();
        let left: number = 0;
        let top: number = 0;
        let right: number = parentWidth - s.width;
        let bottom: number = parentHeight - s.height;
        let center: number = right * 0.5;
        let middle: number = bottom * 0.5;
        switch (layout) {
            case ELayout.LEFT_TOP:
                o.x = left;
                o.y = top;
                break;
            case ELayout.RIGHT_TOP:
                o.x = right;
                o.y = top;
                break;
            case ELayout.RIGHT_BOTTOM:
                o.x = right;
                o.y = bottom;
                break;
            case ELayout.LEFT_BOTTOM:
                o.x = left;
                o.y = bottom;
                break;
            case ELayout.CENTER_MIDDLE:
                o.x = center;
                o.y = middle;
                break;
            case ELayout.CENTER_TOP:
                o.x = center;
                o.y = 0;
                break;
            case ELayout.RIGHT_MIDDLE:
                o.x = right;
                o.y = middle;
                break;
            case ELayout.CENTER_BOTTOM:
                o.x = center;
                o.y = bottom;
                break;
            case ELayout.LEFT_MIDDLE:
                o.x = left;
                o.y = middle;
                break;
        }
        return new Rectangle(o, s);
    }

    public strokeRect(x: number, y: number, w: number, h: number, color: string = 'black'): void {
        if (this.context2D) {
            this.context2D.save();
            this.context2D.strokeStyle = color;
            this.context2D.beginPath();
            this.context2D.moveTo(x, y);
            this.context2D.lineTo(x + w, y);
            this.context2D.lineTo(x + w, y + h);
            this.context2D.lineTo(x, y + h);
            this.context2D.closePath();
            this.context2D.stroke();
            this.context2D.restore();
        }
    }

    public fillRectWithTitle(x: number, y: number, width: number, height: number, title: string = '', layout: ELayout = ELayout.CENTER_MIDDLE, color: string = 'grey', showCoord: boolean = true): void {
        if (this.context2D) {

            this.context2D.save();
            this.context2D.fillStyle = color;
            this.context2D.beginPath();
            this.context2D.rect(x, y, width, height);
            this.context2D.fill();
            if (title.length !== 0) {
                let rect: Rectangle = this.calcLocalTextRectangle(layout, title, width, height);
                this.fillText(title, x + rect.origin.x, y + rect.origin.y, 'white', 'left', 'top' /*, '10px sans-serif'*/);
                this.strokeRect(x + rect.origin.x, y + rect.origin.y, rect.size.width, rect.size.height, 'rgba(0 ,0 ,0 ,0.5 ) ');
                this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2);
            }
            if (showCoord) {
                this.strokeCoord(x, y, width + 20, height + 20);
                this.fillCircle(x, y, 3);
            }

            this.context2D.restore();
        }
    }

    // font 顺序: font-style font-variant font-weight font-size font-family
    public makeFontString(
        size: FontSize = '10px',
        weight: FontWeight = 'normal',
        style: FontStyle = 'normal',
        variant: FontVariant = 'normal',
        family: FontFamily = 'sans-serif',
    ): string {
        let str: string[] = [];
        str.push(style);
        str.push(variant);
        str.push(weight);
        str.push(size);
        str.push(family);
        return str.join(" ");
    }

    /**
     * 手动计算文本的对齐
     * @param font
     */
    public testMyTextLayout(font: string = this.makeFontString("10px", "normal", "normal", "normal", 'sans-serif')): void {
        let x: number = 20;
        let y: number = 20;
        let width: number = this.canvas.width - x * 2;
        let height: number = this.canvas.height - y * 2;
        let right: number = x + width;
        let bottom: number = y + height;

        let drawX: number = x;
        let drawY: number = y;
        let drawWidth: number = 150;
        let drawHeight: number = 50;

        if (this.context2D) {

            this.context2D.save();
            this.context2D.font = font;
            this.fillRectWithTitle(x, y, width, height);
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-top', ELayout.LEFT_TOP, 'rgba( 255 , 255 , 0 , 0.2 )');
            drawX = right - drawWidth;
            drawY = y;
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-top', ELayout.RIGHT_TOP, 'rgba( 255 , 255 , 0 , 0.2 )');
            drawX = right - drawWidth;
            drawY = bottom - drawHeight;
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-bottom', ELayout.RIGHT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
            drawX = x;
            drawY = bottom - drawHeight;
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-bottom', ELayout.LEFT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
            drawX = (right - drawWidth) * 0.5;
            drawY = (bottom - drawHeight) * 0.5;
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-middle', ELayout.CENTER_MIDDLE, 'rgba( 255 , 0 , 0 , 0.2 )');
            drawX = (right - drawWidth) * 0.5;
            drawY = y;
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-top', ELayout.CENTER_TOP, 'rgba( 0 , 255 , 0 , 0.2 )');
            drawX = (right - drawWidth);
            drawY = (bottom - drawHeight) * 0.5;
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-middle', ELayout.RIGHT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
            drawX = (right - drawWidth) * 0.5;
            drawY = (bottom - drawHeight);
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-bottom', ELayout.CENTER_BOTTOM, 'rgba( 0 , 255 , 0 , 0.2 )');
            drawX = x;
            drawY = (bottom - drawHeight) * 0.5;
            this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-middle', ELayout.LEFT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
        }
    }

    public testCanvas2DTextLayout(): void {
        let x: number = 20;
        let y: number = 20;
        let width: number = this.canvas.width - x * 2;
        let height: number = this.canvas.height - y * 2;
        let drawX: number = x;
        let drawY: number = y;
        let radius: number = 3;

        this.fillRectWithTitle(x, y, width, height);
        this.fillText("left-top", drawX, drawY, 'white', 'left', 'top' /*, '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'black');

        drawX = x + width;
        drawY = y;
        this.fillText("right-top", drawX, drawY, 'white', 'right', 'top' /* , '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'black');

        drawX = x + width;
        drawY = y + height;
        this.fillText("right-bottom", drawX, drawY, 'white', 'right', 'bottom' /* , '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'black');

        drawX = x;
        drawY = y + height;
        this.fillText("left-bottom", drawX, drawY, 'white', 'left', 'bottom' /* , '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'black');

        drawX = x + width * 0.5;
        drawY = y + height * 0.5;
        this.fillText("center-middle", drawX, drawY, 'black', 'center', 'middle' /* , '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'red');

        drawX = x + width * 0.5;
        drawY = y;
        this.fillText("center-top", drawX, drawY, 'blue', 'center', 'top' /* , '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'black');

        drawX = x + width;
        drawY = y + height * 0.5;
        this.fillText("right-middle", drawX, drawY, 'blue', 'right', 'middle' /* , '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'black');

        drawX = x + width * 0.5;
        drawY = y + height;
        this.fillText("center-bottom", drawX, drawY, 'blue', 'center', 'bottom');
        this.fillCircle(drawX, drawY, radius, 'black');

        drawX = x;
        drawY = y + height * 0.5;
        this.fillText("left-middle", drawX, drawY, 'blue', 'left', 'middle' /* , '20px sans-serif' */);
        this.fillCircle(drawX, drawY, radius, 'black');
    }

    public loadAndDrawImage(url: string): void {
        let img: HTMLImageElement = document.createElement('img') as HTMLImageElement;
        img.src = url;
        img.onload = (ev: Event): void => {
            if (this.context2D !== null) {
                // 原样画图
                // this.context2D.drawImage(img, 10, 10);
                // 缩放图
                // this.context2D.drawImage(img, img.width + 30, 10, 200, img.height);
                // 将srcImage的部分区域[ 44 , 6 , 162 , 175 , 200 ]以拉伸缩放的方式绘制到Canvas画布指定的矩形[ 200 , img . height + 30 , 200 , 130 ]中去
                // this.context2D.drawImage(img, 44, 6, 162, 175, 200, img.height + 30, 200, 130);
                // this.drawImage(img, Rectangle.create(20, 20, 540, 300), Rectangle.create(44, 6, 162, 175), EImageFillType.STRETCH);
                this.drawImage(img, Rectangle.create(20, 20, this.canvas.width - 40, this.canvas.height - 40), Rectangle.create(0, 0, img.width, img.height), EImageFillType.REPEAT);
            }
        }
    }

    public fillRectangleWithColor(rect: Rectangle, color: string): void {
        if (rect.isEmpty()) {
            return;
        }
        if (this.context2D) {
            this.context2D.save();
            this.context2D.fillStyle = color;
            this.context2D.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
            this.context2D.restore();
        }
    }

    public drawImage(
        img: HTMLImageElement | HTMLCanvasElement,
        destRect: Rectangle,
        srcRect: Rectangle = Rectangle.create(0, 0, img.width, img.height),
        fillType: EImageFillType = EImageFillType.STRETCH
    ): boolean {
        if (this.context2D) {
            if (destRect.isEmpty() || srcRect.isEmpty()) {
                return
            }
            if (fillType === EImageFillType.STRETCH) {
                this.context2D.drawImage(img,
                    srcRect.origin.x,
                    srcRect.origin.y,
                    srcRect.size.width,
                    srcRect.size.height,
                    destRect.origin.x,
                    destRect.origin.y,
                    destRect.size.width,
                    destRect.size.height
                );
            } else {
                this.fillRectangleWithColor(destRect, 'grey');
                let rows: number = Math.ceil(destRect.size.width / srcRect.size.width);
                let columns: number = Math.ceil(destRect.size.height / srcRect.size.height);
                let left: number = 0;
                let top: number = 0;
                let right: number = 0;
                let bottom: number = 0;
                let width: number = 0;
                let height: number = 0;
                let destRight: number = destRect.origin.x + destRect.size.width;
                let destBottom: number = destRect.origin.y + destRect.size.height;
                if (fillType === EImageFillType.REPEAT_X) {
                    columns = 1;
                } else if (fillType === EImageFillType.REPEAT_Y) {
                    rows = 1;
                }

                for (let i: number = 0; i < rows; i++) {
                    for (let j: number = 0; j < columns; j++) {
                        left = destRect.origin.x + i * srcRect.size.width;
                        top = destRect.origin.y + j * srcRect.size.height;

                        width = srcRect.size.width;
                        height = srcRect.size.height;
                        right = left + width;
                        bottom = top + height;
                        if (right > destRight) {
                            width = srcRect.size.width - (right - destRight);
                        }
                        if (bottom > destBottom) {
                            height = srcRect.size.height - (bottom - destBottom);
                        }
                        this.context2D.drawImage(img,
                            srcRect.origin.x,
                            srcRect.origin.y,
                            width,
                            height,
                            left, top, width, height
                        );
                    }
                }
            }
        }
    }
}

let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let app: LineDashApplicationTest = new LineDashApplicationTest(canvas);
app.start();
