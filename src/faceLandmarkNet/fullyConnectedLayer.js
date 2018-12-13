"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
function fullyConnectedLayer(x, params) {
    return tf.tidy(function () {
        return tf.add(tf.matMul(x, params.weights), params.bias);
    });
}
exports.fullyConnectedLayer = fullyConnectedLayer;
