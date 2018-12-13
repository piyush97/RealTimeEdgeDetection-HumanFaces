"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
function prelu(x, alpha) {
    return tf.tidy(function () {
        return tf.add(tf.relu(x), tf.mul(alpha, tf.neg(tf.relu(tf.neg(x)))));
    });
}
exports.prelu = prelu;
