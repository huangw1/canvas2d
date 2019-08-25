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
 * @Date: 2019/8/25 23:29
 */
var application_1 = require("./src/application");
var ApplicationTest = /** @class */ (function (_super) {
    __extends(ApplicationTest, _super);
    function ApplicationTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationTest.prototype.dispatchKeyDown = function (evt) {
        console.log('key: ' + evt.key + ' is down');
    };
    ApplicationTest.prototype.dispatchMouseDown = function (evt) {
        console.log('canvasPosition: ' + evt.canvasPosition);
    };
    ApplicationTest.prototype.update = function (elapsedMsec, intervalMsec) {
        console.log('elapsedMsec : ' + elapsedMsec);
        console.log('intervalSec : ' + intervalMsec);
    };
    ApplicationTest.prototype.render = function () {
        console.log("调用render方法 ");
    };
    return ApplicationTest;
}(application_1.Application));
var canvas = document.getElementById('canvas');
var app = new ApplicationTest(canvas);
app.update(0, 0);
app.render();
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
startButton.onclick = function (evt) {
    app.start();
};
stopButton.onclick = function (evt) {
    app.stop();
};
