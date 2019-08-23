var Canvas2DUtil = /** @class */ (function () {
    function Canvas2DUtil(canvas) {
        this.context = canvas.getContext('2d');
    }
    Canvas2DUtil.prototype.drawText = function (text) {
        if (!this.context) {
            return;
        }
        this.context.save();
        this.context.textBaseline = 'middle';
        this.context.textAlign = 'center';
        var centerX = this.context.canvas.width / 2;
        var centerY = this.context.canvas.height / 2;
        this.context.fillStyle = 'red';
        this.context.fillText(text, centerX, centerY);
        this.context.strokeStyle = "green";
        this.context.strokeText(text, centerX, centerY);
        this.context.restore();
    };
    return Canvas2DUtil;
}());
var canvas = document.getElementById('canvas');
var canvas2D = new Canvas2DUtil(canvas);
canvas2D.drawText('Hello World');
