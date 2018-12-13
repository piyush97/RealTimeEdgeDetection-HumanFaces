"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
function bgrToRgbTensor(tensor) {
    return tf.tidy(function () { return tf.stack(tf.unstack(tensor, 3).reverse(), 3); });
}
exports.bgrToRgbTensor = bgrToRgbTensor;
