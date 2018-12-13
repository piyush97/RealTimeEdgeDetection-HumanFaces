"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tfjs_tiny_yolov2_1 = require("tfjs-tiny-yolov2");
var TinyFaceDetectorOptions = /** @class */ (function (_super) {
    __extends(TinyFaceDetectorOptions, _super);
    function TinyFaceDetectorOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._name = 'TinyFaceDetectorOptions';
        return _this;
    }
    return TinyFaceDetectorOptions;
}(tfjs_tiny_yolov2_1.TinyYolov2Options));
exports.TinyFaceDetectorOptions = TinyFaceDetectorOptions;
