"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
exports.tf = tf;
__export(require("tfjs-image-recognition-base"));
__export(require("./classes/index"));
__export(require("./dom/index"));
__export(require("./faceLandmarkNet/index"));
__export(require("./faceRecognitionNet/index"));
__export(require("./globalApi/index"));
__export(require("./mtcnn/index"));
__export(require("./ssdMobilenetv1/index"));
__export(require("./tinyFaceDetector/index"));
__export(require("./tinyYolov2/index"));
__export(require("./euclideanDistance"));
