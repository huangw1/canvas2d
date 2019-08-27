"use strict";
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
/**
 * @Author: huangw1
 * @Date: 2019/8/26 14:07
 */
var application_1 = require("./src/application");
var math2d_1 = require("./src/math2d");
var test_jpg_1 = require("./data/test.jpg");
var ELayout;
(function (ELayout) {
    ELayout[ELayout["LEFT_TOP"] = 0] = "LEFT_TOP";
    ELayout[ELayout["RIGHT_TOP"] = 1] = "RIGHT_TOP";
    ELayout[ELayout["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
    ELayout[ELayout["LEFT_BOTTOM"] = 3] = "LEFT_BOTTOM";
    ELayout[ELayout["CENTER_MIDDLE"] = 4] = "CENTER_MIDDLE";
    ELayout[ELayout["CENTER_TOP"] = 5] = "CENTER_TOP";
    ELayout[ELayout["RIGHT_MIDDLE"] = 6] = "RIGHT_MIDDLE";
    ELayout[ELayout["CENTER_BOTTOM"] = 7] = "CENTER_BOTTOM";
    ELayout[ELayout["LEFT_MIDDLE"] = 8] = "LEFT_MIDDLE";
})(ELayout = exports.ELayout || (exports.ELayout = {}));
var EImageFillType;
(function (EImageFillType) {
    EImageFillType[EImageFillType["STRETCH"] = 0] = "STRETCH";
    EImageFillType[EImageFillType["REPEAT"] = 1] = "REPEAT";
    EImageFillType[EImageFillType["REPEAT_X"] = 2] = "REPEAT_X";
    EImageFillType[EImageFillType["REPEAT_Y"] = 3] = "REPEAT_Y";
})(EImageFillType = exports.EImageFillType || (exports.EImageFillType = {}));
var LineDashApplicationTest = /** @class */ (function (_super) {
    __extends(LineDashApplicationTest, _super);
    function LineDashApplicationTest(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.strokeGrid();
        _this.loadAndDrawImage(test_jpg_1.default);
        return _this;
    }
    LineDashApplicationTest.prototype.fillCircle = function (x, y, radius, fillStyle) {
        if (fillStyle === void 0) { fillStyle = 'red'; }
        if (this.context2D) {
            this.context2D.save();
            this.context2D.fillStyle = fillStyle;
            this.context2D.beginPath();
            this.context2D.arc(x, y, radius, 0, Math.PI * 2);
            this.context2D.fill();
            this.context2D.restore();
        }
    };
    LineDashApplicationTest.prototype.strokeLine = function (x0, y0, x1, y1) {
        if (this.context2D) {
            this.context2D.beginPath();
            this.context2D.moveTo(x0, y0);
            this.context2D.lineTo(x1, y1);
            this.context2D.stroke();
        }
    };
    LineDashApplicationTest.prototype.strokeCoord = function (originX, originY, width, height, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 2; }
        if (this.context2D) {
            this.context2D.save();
            this.context2D.lineWidth = lineWidth;
            this.context2D.strokeStyle = 'red';
            this.strokeLine(originX, originY, originX + width, originY);
            this.context2D.strokeStyle = 'blue';
            this.strokeLine(originX, originY, originX, originY + height);
            this.context2D.restore();
        }
    };
    LineDashApplicationTest.prototype.strokeGrid = function (color, interval) {
        if (color === void 0) { color = 'gray'; }
        if (interval === void 0) { interval = 10; }
        if (this.context2D) {
            this.context2D.save();
            this.context2D.strokeStyle = color;
            this.context2D.lineWidth = 0.5;
            for (var i = interval + 0.5; i < this.canvas.width; i += interval) {
                this.strokeLine(i, 0, i, this.canvas.height);
            }
            for (var j = interval + 0.5; j < this.canvas.height; j += interval) {
                this.strokeLine(0, j, this.canvas.width, j);
            }
            this.context2D.restore();
            this.fillCircle(0, 0, 5, 'green');
            this.strokeCoord(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    LineDashApplicationTest.prototype.fillText = function (text, x, y, color, align, baseline, font) {
        if (color === void 0) { color = 'white'; }
        if (align === void 0) { align = 'left'; }
        if (baseline === void 0) { baseline = 'top'; }
        if (font === void 0) { font = '10px sans-serif'; }
        if (this.context2D) {
            this.context2D.save();
            this.context2D.textAlign = align;
            this.context2D.textBaseline = baseline;
            this.context2D.font = font;
            this.context2D.fillStyle = color;
            this.context2D.fillText(text, x, y);
            this.context2D.restore();
        }
    };
    LineDashApplicationTest.prototype.calcTextSize = function (text, char, scale) {
        if (char === void 0) { char = 'W'; }
        if (scale === void 0) { scale = 0.5; }
        if (this.context2D) {
            var size = new math2d_1.Size();
            size.width = this.context2D.measureText(text).width;
            var w = this.context2D.measureText(char).width;
            size.height = w + w * scale;
            return size;
        }
    };
    LineDashApplicationTest.prototype.calcLocalTextRectangle = function (layout, text, parentWidth, parentHeight) {
        var s = this.calcTextSize(text);
        var o = math2d_1.Vec2.create();
        var left = 0;
        var top = 0;
        var right = parentWidth - s.width;
        var bottom = parentHeight - s.height;
        var center = right * 0.5;
        var middle = bottom * 0.5;
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
        return new math2d_1.Rectangle(o, s);
    };
    LineDashApplicationTest.prototype.strokeRect = function (x, y, w, h, color) {
        if (color === void 0) { color = 'black'; }
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
    };
    LineDashApplicationTest.prototype.fillRectWithTitle = function (x, y, width, height, title, layout, color, showCoord) {
        if (title === void 0) { title = ''; }
        if (layout === void 0) { layout = ELayout.CENTER_MIDDLE; }
        if (color === void 0) { color = 'grey'; }
        if (showCoord === void 0) { showCoord = true; }
        if (this.context2D) {
            this.context2D.save();
            this.context2D.fillStyle = color;
            this.context2D.beginPath();
            this.context2D.rect(x, y, width, height);
            this.context2D.fill();
            if (title.length !== 0) {
                var rect = this.calcLocalTextRectangle(layout, title, width, height);
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
    };
    // font 顺序: font-style font-variant font-weight font-size font-family
    LineDashApplicationTest.prototype.makeFontString = function (size, weight, style, variant, family) {
        if (size === void 0) { size = '10px'; }
        if (weight === void 0) { weight = 'normal'; }
        if (style === void 0) { style = 'normal'; }
        if (variant === void 0) { variant = 'normal'; }
        if (family === void 0) { family = 'sans-serif'; }
        var str = [];
        str.push(style);
        str.push(variant);
        str.push(weight);
        str.push(size);
        str.push(family);
        return str.join(" ");
    };
    /**
     * 手动计算文本的对齐
     * @param font
     */
    LineDashApplicationTest.prototype.testMyTextLayout = function (font) {
        if (font === void 0) { font = this.makeFontString("10px", "normal", "normal", "normal", 'sans-serif'); }
        var x = 20;
        var y = 20;
        var width = this.canvas.width - x * 2;
        var height = this.canvas.height - y * 2;
        var right = x + width;
        var bottom = y + height;
        var drawX = x;
        var drawY = y;
        var drawWidth = 150;
        var drawHeight = 50;
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
    };
    LineDashApplicationTest.prototype.testCanvas2DTextLayout = function () {
        var x = 20;
        var y = 20;
        var width = this.canvas.width - x * 2;
        var height = this.canvas.height - y * 2;
        var drawX = x;
        var drawY = y;
        var radius = 3;
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
    };
    LineDashApplicationTest.prototype.loadAndDrawImage = function (url) {
        var _this = this;
        var img = document.createElement('img');
        img.src = url;
        img.onload = function (ev) {
            if (_this.context2D !== null) {
                // 原样画图
                // this.context2D.drawImage(img, 10, 10);
                // 缩放图
                // this.context2D.drawImage(img, img.width + 30, 10, 200, img.height);
                // 将srcImage的部分区域[ 44 , 6 , 162 , 175 , 200 ]以拉伸缩放的方式绘制到Canvas画布指定的矩形[ 200 , img . height + 30 , 200 , 130 ]中去
                // this.context2D.drawImage(img, 44, 6, 162, 175, 200, img.height + 30, 200, 130);
                // this.drawImage(img, Rectangle.create(20, 20, 540, 300), Rectangle.create(44, 6, 162, 175), EImageFillType.STRETCH);
                _this.drawImage(img, math2d_1.Rectangle.create(20, 20, _this.canvas.width - 40, _this.canvas.height - 40), math2d_1.Rectangle.create(0, 0, img.width, img.height), EImageFillType.REPEAT);
            }
        };
    };
    LineDashApplicationTest.prototype.fillRectangleWithColor = function (rect, color) {
        if (rect.isEmpty()) {
            return;
        }
        if (this.context2D) {
            this.context2D.save();
            this.context2D.fillStyle = color;
            this.context2D.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
            this.context2D.restore();
        }
    };
    LineDashApplicationTest.prototype.drawImage = function (img, destRect, srcRect, fillType) {
        if (srcRect === void 0) { srcRect = math2d_1.Rectangle.create(0, 0, img.width, img.height); }
        if (fillType === void 0) { fillType = EImageFillType.STRETCH; }
        if (this.context2D) {
            if (destRect.isEmpty() || srcRect.isEmpty()) {
                return;
            }
            if (fillType === EImageFillType.STRETCH) {
                this.context2D.drawImage(img, srcRect.origin.x, srcRect.origin.y, srcRect.size.width, srcRect.size.height, destRect.origin.x, destRect.origin.y, destRect.size.width, destRect.size.height);
            }
            else {
                this.fillRectangleWithColor(destRect, 'grey');
                var rows = Math.ceil(destRect.size.width / srcRect.size.width);
                var columns = Math.ceil(destRect.size.height / srcRect.size.height);
                var left = 0;
                var top_1 = 0;
                var right = 0;
                var bottom = 0;
                var width = 0;
                var height = 0;
                var destRight = destRect.origin.x + destRect.size.width;
                var destBottom = destRect.origin.y + destRect.size.height;
                if (fillType === EImageFillType.REPEAT_X) {
                    columns = 1;
                }
                else if (fillType === EImageFillType.REPEAT_Y) {
                    rows = 1;
                }
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < columns; j++) {
                        left = destRect.origin.x + i * srcRect.size.width;
                        top_1 = destRect.origin.y + j * srcRect.size.height;
                        width = srcRect.size.width;
                        height = srcRect.size.height;
                        right = left + width;
                        bottom = top_1 + height;
                        if (right > destRight) {
                            width = srcRect.size.width - (right - destRight);
                        }
                        if (bottom > destBottom) {
                            height = srcRect.size.height - (bottom - destBottom);
                        }
                        this.context2D.drawImage(img, srcRect.origin.x, srcRect.origin.y, width, height, left, top_1, width, height);
                    }
                }
            }
        }
    };
    return LineDashApplicationTest;
}(application_1.Canvas2DApplication));
var canvas = document.getElementById('canvas');
var app = new LineDashApplicationTest(canvas);
app.start();
