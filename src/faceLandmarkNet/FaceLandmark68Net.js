"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
var tfjs_image_recognition_base_1 = require("tfjs-image-recognition-base");
var depthwiseSeparableConv_1 = require("./depthwiseSeparableConv");
var extractParams_1 = require("./extractParams");
var extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
var FaceLandmark68NetBase_1 = require("./FaceLandmark68NetBase");
var fullyConnectedLayer_1 = require("./fullyConnectedLayer");
function denseBlock(x, denseBlockParams, isFirstLayer) {
    if (isFirstLayer === void 0) { isFirstLayer = false; }
    return tf.tidy(function () {
        var out1 = tf.relu(isFirstLayer
            ? tf.add(tf.conv2d(x, denseBlockParams.conv0.filters, [2, 2], 'same'), denseBlockParams.conv0.bias)
            : depthwiseSeparableConv_1.depthwiseSeparableConv(x, denseBlockParams.conv0, [2, 2]));
        var out2 = depthwiseSeparableConv_1.depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
        var in3 = tf.relu(tf.add(out1, out2));
        var out3 = depthwiseSeparableConv_1.depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
        var in4 = tf.relu(tf.add(out1, tf.add(out2, out3)));
        var out4 = depthwiseSeparableConv_1.depthwiseSeparableConv(in4, denseBlockParams.conv3, [1, 1]);
        return tf.relu(tf.add(out1, tf.add(out2, tf.add(out3, out4))));
    });
}
var FaceLandmark68Net = /** @class */ (function (_super) {
    __extends(FaceLandmark68Net, _super);
    function FaceLandmark68Net() {
        return _super.call(this, 'FaceLandmark68Net') || this;
    }
    FaceLandmark68Net.prototype.runNet = function (input) {
        var params = this.params;
        if (!params) {
            throw new Error('FaceLandmark68Net - load model before inference');
        }
        return tf.tidy(function () {
            var batchTensor = input.toBatchTensor(112, true);
            var meanRgb = [122.782, 117.001, 104.298];
            var normalized = tfjs_image_recognition_base_1.normalize(batchTensor, meanRgb).div(tf.scalar(255));
            var out = denseBlock(normalized, params.dense0, true);
            out = denseBlock(out, params.dense1);
            out = denseBlock(out, params.dense2);
            out = denseBlock(out, params.dense3);
            out = tf.avgPool(out, [7, 7], [2, 2], 'valid');
            return fullyConnectedLayer_1.fullyConnectedLayer(out.as2D(out.shape[0], -1), params.fc);
        });
    };
    FaceLandmark68Net.prototype.getDefaultModelName = function () {
        return 'face_landmark_68_model';
    };
    FaceLandmark68Net.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap);
    };
    FaceLandmark68Net.prototype.extractParams = function (weights) {
        return extractParams_1.extractParams(weights);
    };
    return FaceLandmark68Net;
}(FaceLandmark68NetBase_1.FaceLandmark68NetBase));
exports.FaceLandmark68Net = FaceLandmark68Net;
