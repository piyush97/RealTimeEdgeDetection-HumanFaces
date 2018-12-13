"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var Mtcnn_1 = require("./Mtcnn");
__export(require("./Mtcnn"));
__export(require("./MtcnnOptions"));
function createMtcnn(weights) {
    var net = new Mtcnn_1.Mtcnn();
    net.extractWeights(weights);
    return net;
}
exports.createMtcnn = createMtcnn;
