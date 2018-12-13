"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var TinyFaceDetector_1 = require("./TinyFaceDetector");
__export(require("./TinyFaceDetector"));
__export(require("./TinyFaceDetectorOptions"));
function createTinyFaceDetector(weights) {
    var net = new TinyFaceDetector_1.TinyFaceDetector();
    net.extractWeights(weights);
    return net;
}
exports.createTinyFaceDetector = createTinyFaceDetector;
