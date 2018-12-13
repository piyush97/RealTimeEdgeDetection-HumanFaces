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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-core");
var tfjs_image_recognition_base_1 = require("tfjs-image-recognition-base");
var FaceDetection_1 = require("../classes/FaceDetection");
var extractParams_1 = require("./extractParams");
var extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
var mobileNetV1_1 = require("./mobileNetV1");
var nonMaxSuppression_1 = require("./nonMaxSuppression");
var outputLayer_1 = require("./outputLayer");
var predictionLayer_1 = require("./predictionLayer");
var SsdMobilenetv1Options_1 = require("./SsdMobilenetv1Options");
var SsdMobilenetv1 = /** @class */ (function (_super) {
    __extends(SsdMobilenetv1, _super);
    function SsdMobilenetv1() {
        return _super.call(this, 'SsdMobilenetv1') || this;
    }
    SsdMobilenetv1.prototype.forwardInput = function (input) {
        var params = this.params;
        if (!params) {
            throw new Error('SsdMobilenetv1 - load model before inference');
        }
        return tf.tidy(function () {
            var batchTensor = input.toBatchTensor(512, false).toFloat();
            var x = tf.sub(tf.mul(batchTensor, tf.scalar(0.007843137718737125)), tf.scalar(1));
            var features = mobileNetV1_1.mobileNetV1(x, params.mobilenetv1);
            var _a = predictionLayer_1.predictionLayer(features.out, features.conv11, params.prediction_layer), boxPredictions = _a.boxPredictions, classPredictions = _a.classPredictions;
            return outputLayer_1.outputLayer(boxPredictions, classPredictions, params.output_layer);
        });
    };
    SsdMobilenetv1.prototype.forward = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, tfjs_image_recognition_base_1.toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    SsdMobilenetv1.prototype.locateFaces = function (input, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, maxResults, minConfidence, netInput, _b, _boxes, _scores, boxes, scores, i, scoresData, _c, _d, iouThreshold, indices, reshapedDims, inputSize, padX, padY, results;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = new SsdMobilenetv1Options_1.SsdMobilenetv1Options(options), maxResults = _a.maxResults, minConfidence = _a.minConfidence;
                        return [4 /*yield*/, tfjs_image_recognition_base_1.toNetInput(input)];
                    case 1:
                        netInput = _e.sent();
                        _b = this.forwardInput(netInput), _boxes = _b.boxes, _scores = _b.scores;
                        boxes = _boxes[0];
                        scores = _scores[0];
                        for (i = 1; i < _boxes.length; i++) {
                            _boxes[i].dispose();
                            _scores[i].dispose();
                        }
                        _d = (_c = Array).from;
                        return [4 /*yield*/, scores.data()];
                    case 2:
                        scoresData = _d.apply(_c, [_e.sent()]);
                        iouThreshold = 0.5;
                        indices = nonMaxSuppression_1.nonMaxSuppression(boxes, scoresData, maxResults, iouThreshold, minConfidence);
                        reshapedDims = netInput.getReshapedInputDimensions(0);
                        inputSize = netInput.inputSize;
                        padX = inputSize / reshapedDims.width;
                        padY = inputSize / reshapedDims.height;
                        results = indices
                            .map(function (idx) {
                            var _a = [
                                Math.max(0, boxes.get(idx, 0)),
                                Math.min(1.0, boxes.get(idx, 2))
                            ].map(function (val) { return val * padY; }), top = _a[0], bottom = _a[1];
                            var _b = [
                                Math.max(0, boxes.get(idx, 1)),
                                Math.min(1.0, boxes.get(idx, 3))
                            ].map(function (val) { return val * padX; }), left = _b[0], right = _b[1];
                            return new FaceDetection_1.FaceDetection(scoresData[idx], new tfjs_image_recognition_base_1.Rect(left, top, right - left, bottom - top), {
                                height: netInput.getInputHeight(0),
                                width: netInput.getInputWidth(0)
                            });
                        });
                        boxes.dispose();
                        scores.dispose();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    SsdMobilenetv1.prototype.getDefaultModelName = function () {
        return 'ssd_mobilenetv1_model';
    };
    SsdMobilenetv1.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap);
    };
    SsdMobilenetv1.prototype.extractParams = function (weights) {
        return extractParams_1.extractParams(weights);
    };
    return SsdMobilenetv1;
}(tfjs_image_recognition_base_1.NeuralNetwork));
exports.SsdMobilenetv1 = SsdMobilenetv1;
