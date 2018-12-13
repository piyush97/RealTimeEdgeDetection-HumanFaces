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
var FaceDetectionWithLandmarks_1 = require("./FaceDetectionWithLandmarks");
var FullFaceDescription = /** @class */ (function (_super) {
    __extends(FullFaceDescription, _super);
    function FullFaceDescription(detection, unshiftedLandmarks, descriptor) {
        var _this = _super.call(this, detection, unshiftedLandmarks) || this;
        _this._descriptor = descriptor;
        return _this;
    }
    Object.defineProperty(FullFaceDescription.prototype, "descriptor", {
        get: function () {
            return this._descriptor;
        },
        enumerable: true,
        configurable: true
    });
    FullFaceDescription.prototype.forSize = function (width, height) {
        var _a = _super.prototype.forSize.call(this, width, height), detection = _a.detection, landmarks = _a.landmarks;
        return new FullFaceDescription(detection, landmarks, this.descriptor);
    };
    return FullFaceDescription;
}(FaceDetectionWithLandmarks_1.FaceDetectionWithLandmarks));
exports.FullFaceDescription = FullFaceDescription;
