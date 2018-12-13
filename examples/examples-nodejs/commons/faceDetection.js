"use strict";
exports.__esModule = true;
var env_1 = require("./env");
exports.faceDetectionNet = env_1.faceapi.nets.ssdMobilenetv1;
// export const faceDetectionNet = tinyFaceDetector
// export const faceDetectionNet = mtcnn
// SsdMobilenetv1Options
var minConfidence = 0.5;
// TinyFaceDetectorOptions
var inputSize = 408;
var scoreThreshold = 0.5;
// MtcnnOptions
var minFaceSize = 50;
var scaleFactor = 0.8;
function getFaceDetectorOptions(net) {
    return net === env_1.faceapi.nets.ssdMobilenetv1
        ? new env_1.faceapi.SsdMobilenetv1Options({ minConfidence: minConfidence })
        : (net === env_1.faceapi.nets.tinyFaceDetector
            ? new env_1.faceapi.TinyFaceDetectorOptions({ inputSize: inputSize, scoreThreshold: scoreThreshold })
            : new env_1.faceapi.MtcnnOptions({ minFaceSize: minFaceSize, scaleFactor: scaleFactor }));
}
exports.faceDetectionOptions = getFaceDetectorOptions(exports.faceDetectionNet);
