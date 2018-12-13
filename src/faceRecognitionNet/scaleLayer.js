"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
function scale(x, params) {
    return tf.add(tf.mul(x, params.weights), params.biases);
}
exports.scale = scale;
