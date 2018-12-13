"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
var tfjs_tiny_yolov2_1 = require("tfjs-tiny-yolov2");
var sharedLayers_1 = require("./sharedLayers");
function PNet(x, params) {
    return tf.tidy(function () {
        var out = sharedLayers_1.sharedLayer(x, params, true);
        var conv = tfjs_tiny_yolov2_1.convLayer(out, params.conv4_1, 'valid');
        var max = tf.expandDims(tf.max(conv, 3), 3);
        var prob = tf.softmax(tf.sub(conv, max), 3);
        var regions = tfjs_tiny_yolov2_1.convLayer(out, params.conv4_2, 'valid');
        return { prob: prob, regions: regions };
    });
}
exports.PNet = PNet;
