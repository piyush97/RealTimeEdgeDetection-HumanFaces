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
var FaceLandmark68Net_1 = require("./FaceLandmark68Net");
__export(require("./FaceLandmark68Net"));
__export(require("./FaceLandmark68TinyNet"));
var FaceLandmarkNet = /** @class */ (function (_super) {
    __extends(FaceLandmarkNet, _super);
    function FaceLandmarkNet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FaceLandmarkNet;
}(FaceLandmark68Net_1.FaceLandmark68Net));
exports.FaceLandmarkNet = FaceLandmarkNet;
function createFaceLandmarkNet(weights) {
    var net = new FaceLandmarkNet();
    net.extractWeights(weights);
    return net;
}
exports.createFaceLandmarkNet = createFaceLandmarkNet;
