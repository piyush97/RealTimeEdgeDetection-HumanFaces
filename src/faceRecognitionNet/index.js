"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var FaceRecognitionNet_1 = require("./FaceRecognitionNet");
__export(require("./FaceRecognitionNet"));
function createFaceRecognitionNet(weights) {
    var net = new FaceRecognitionNet_1.FaceRecognitionNet();
    net.extractWeights(weights);
    return net;
}
exports.createFaceRecognitionNet = createFaceRecognitionNet;
