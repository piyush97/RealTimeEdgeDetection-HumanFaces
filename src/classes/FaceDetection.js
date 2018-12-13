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
var tfjs_image_recognition_base_1 = require("tfjs-image-recognition-base");
var FaceDetection = /** @class */ (function (_super) {
    __extends(FaceDetection, _super);
    function FaceDetection(score, relativeBox, imageDims) {
        return _super.call(this, score, score, '', relativeBox, imageDims) || this;
    }
    return FaceDetection;
}(tfjs_image_recognition_base_1.ObjectDetection));
exports.FaceDetection = FaceDetection;
