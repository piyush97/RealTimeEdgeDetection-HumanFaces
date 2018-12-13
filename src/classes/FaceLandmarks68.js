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
var FaceLandmarks_1 = require("../classes/FaceLandmarks");
var FaceLandmarks68 = /** @class */ (function (_super) {
    __extends(FaceLandmarks68, _super);
    function FaceLandmarks68() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaceLandmarks68.prototype.getJawOutline = function () {
        return this.positions.slice(0, 17);
    };
    FaceLandmarks68.prototype.getLeftEyeBrow = function () {
        return this.positions.slice(17, 22);
    };
    FaceLandmarks68.prototype.getRightEyeBrow = function () {
        return this.positions.slice(22, 27);
    };
    FaceLandmarks68.prototype.getNose = function () {
        return this.positions.slice(27, 36);
    };
    FaceLandmarks68.prototype.getLeftEye = function () {
        return this.positions.slice(36, 42);
    };
    FaceLandmarks68.prototype.getRightEye = function () {
        return this.positions.slice(42, 48);
    };
    FaceLandmarks68.prototype.getMouth = function () {
        return this.positions.slice(48, 68);
    };
    FaceLandmarks68.prototype.getRefPointsForAlignment = function () {
        return [
            this.getLeftEye(),
            this.getRightEye(),
            this.getMouth()
        ].map(tfjs_image_recognition_base_1.getCenterPoint);
    };
    return FaceLandmarks68;
}(FaceLandmarks_1.FaceLandmarks));
exports.FaceLandmarks68 = FaceLandmarks68;
