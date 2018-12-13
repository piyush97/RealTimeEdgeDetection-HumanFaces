"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
var tfjs_tiny_yolov2_1 = require("tfjs-tiny-yolov2");
function boxPredictionLayer(x, params) {
    return tf.tidy(function () {
        var batchSize = x.shape[0];
        var boxPredictionEncoding = tf.reshape(tfjs_tiny_yolov2_1.convLayer(x, params.box_encoding_predictor), [batchSize, -1, 1, 4]);
        var classPrediction = tf.reshape(tfjs_tiny_yolov2_1.convLayer(x, params.class_predictor), [batchSize, -1, 3]);
        return {
            boxPredictionEncoding: boxPredictionEncoding,
            classPrediction: classPrediction
        };
    });
}
exports.boxPredictionLayer = boxPredictionLayer;
