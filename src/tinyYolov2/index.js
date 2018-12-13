"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var TinyYolov2_1 = require("./TinyYolov2");
__export(require("./TinyYolov2"));
function createTinyYolov2(weights, withSeparableConvs) {
    if (withSeparableConvs === void 0) { withSeparableConvs = true; }
    var net = new TinyYolov2_1.TinyYolov2(withSeparableConvs);
    net.extractWeights(weights);
    return net;
}
exports.createTinyYolov2 = createTinyYolov2;
