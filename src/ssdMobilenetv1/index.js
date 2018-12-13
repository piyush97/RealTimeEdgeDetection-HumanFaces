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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var SsdMobilenetv1_1 = require("./SsdMobilenetv1");
__export(require("./SsdMobilenetv1"));
__export(require("./SsdMobilenetv1Options"));
function createSsdMobilenetv1(weights) {
    var net = new SsdMobilenetv1_1.SsdMobilenetv1();
    net.extractWeights(weights);
    return net;
}
exports.createSsdMobilenetv1 = createSsdMobilenetv1;
function createFaceDetectionNet(weights) {
    return createSsdMobilenetv1(weights);
}
exports.createFaceDetectionNet = createFaceDetectionNet;
// alias for backward compatibily
var FaceDetectionNet = /** @class */ (function (_super) {
    __extends(FaceDetectionNet, _super);
    function FaceDetectionNet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FaceDetectionNet;
}(SsdMobilenetv1_1.SsdMobilenetv1));
exports.FaceDetectionNet = FaceDetectionNet;
