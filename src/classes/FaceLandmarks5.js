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
var FaceLandmarks_1 = require("./FaceLandmarks");
var FaceLandmarks5 = /** @class */ (function (_super) {
    __extends(FaceLandmarks5, _super);
    function FaceLandmarks5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaceLandmarks5.prototype.getRefPointsForAlignment = function () {
        var pts = this.positions;
        return [
            pts[0],
            pts[1],
            tfjs_image_recognition_base_1.getCenterPoint([pts[3], pts[4]])
        ];
    };
    return FaceLandmarks5;
}(FaceLandmarks_1.FaceLandmarks));
exports.FaceLandmarks5 = FaceLandmarks5;
