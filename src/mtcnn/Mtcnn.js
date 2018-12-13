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
var FaceDetectionWithLandmarks_1 = require("../classes/FaceDetectionWithLandmarks");
var FaceLandmarks5_1 = require("../classes/FaceLandmarks5");
var bgrToRgbTensor_1 = require("./bgrToRgbTensor");
var config_1 = require("./config");
var extractParams_1 = require("./extractParams");
var extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
var getSizesForScale_1 = require("./getSizesForScale");
var MtcnnOptions_1 = require("./MtcnnOptions");
var pyramidDown_1 = require("./pyramidDown");
var stage1_1 = require("./stage1");
var stage2_1 = require("./stage2");
var stage3_1 = require("./stage3");
var Mtcnn = /** @class */ (function (_super) {
    __extends(Mtcnn, _super);
    function Mtcnn() {
        return _super.call(this, 'Mtcnn') || this;
    }
    Mtcnn.prototype.forwardInput = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var params, inputCanvas, stats, tsTotal, imgTensor, onReturn, _a, height, width, _b, minFaceSize, scaleFactor, maxNumScales, scoreThresholds, scaleSteps, scales, ts, out1, out2, out3, results;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        params = this.params;
                        if (!params) {
                            throw new Error('Mtcnn - load model before inference');
                        }
                        inputCanvas = input.canvases[0];
                        if (!inputCanvas) {
                            throw new Error('Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet.');
                        }
                        stats = {};
                        tsTotal = Date.now();
                        imgTensor = tf.tidy(function () {
                            return bgrToRgbTensor_1.bgrToRgbTensor(tf.expandDims(tf.fromPixels(inputCanvas)).toFloat());
                        });
                        onReturn = function (results) {
                            // dispose tensors on return
                            imgTensor.dispose();
                            stats.total = Date.now() - tsTotal;
                            return results;
                        };
                        _a = imgTensor.shape.slice(1), height = _a[0], width = _a[1];
                        _b = new MtcnnOptions_1.MtcnnOptions(forwardParams), minFaceSize = _b.minFaceSize, scaleFactor = _b.scaleFactor, maxNumScales = _b.maxNumScales, scoreThresholds = _b.scoreThresholds, scaleSteps = _b.scaleSteps;
                        scales = (scaleSteps || pyramidDown_1.pyramidDown(minFaceSize, scaleFactor, [height, width]))
                            .filter(function (scale) {
                            var sizes = getSizesForScale_1.getSizesForScale(scale, [height, width]);
                            return Math.min(sizes.width, sizes.height) > config_1.CELL_SIZE;
                        })
                            .slice(0, maxNumScales);
                        stats.scales = scales;
                        stats.pyramid = scales.map(function (scale) { return getSizesForScale_1.getSizesForScale(scale, [height, width]); });
                        ts = Date.now();
                        return [4 /*yield*/, stage1_1.stage1(imgTensor, scales, scoreThresholds[0], params.pnet, stats)];
                    case 1:
                        out1 = _c.sent();
                        stats.total_stage1 = Date.now() - ts;
                        if (!out1.boxes.length) {
                            return [2 /*return*/, onReturn({ results: [], stats: stats })];
                        }
                        stats.stage2_numInputBoxes = out1.boxes.length;
                        // using the inputCanvas to extract and resize the image patches, since it is faster
                        // than doing this on the gpu
                        ts = Date.now();
                        return [4 /*yield*/, stage2_1.stage2(inputCanvas, out1.boxes, scoreThresholds[1], params.rnet, stats)];
                    case 2:
                        out2 = _c.sent();
                        stats.total_stage2 = Date.now() - ts;
                        if (!out2.boxes.length) {
                            return [2 /*return*/, onReturn({ results: [], stats: stats })];
                        }
                        stats.stage3_numInputBoxes = out2.boxes.length;
                        ts = Date.now();
                        return [4 /*yield*/, stage3_1.stage3(inputCanvas, out2.boxes, scoreThresholds[2], params.onet, stats)];
                    case 3:
                        out3 = _c.sent();
                        stats.total_stage3 = Date.now() - ts;
                        results = out3.boxes.map(function (box, idx) { return new FaceDetectionWithLandmarks_1.FaceDetectionWithLandmarks(new FaceDetection_1.FaceDetection(out3.scores[idx], new tfjs_image_recognition_base_1.Rect(box.left / width, box.top / height, box.width / width, box.height / height), {
                            height: height,
                            width: width
                        }), new FaceLandmarks5_1.FaceLandmarks5(out3.points[idx].map(function (pt) { return pt.sub(new tfjs_image_recognition_base_1.Point(box.left, box.top)).div(new tfjs_image_recognition_base_1.Point(box.width, box.height)); }), { width: box.width, height: box.height })); });
                        return [2 /*return*/, onReturn({ results: results, stats: stats })];
                }
            });
        });
    };
    Mtcnn.prototype.forward = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, tfjs_image_recognition_base_1.toNetInput(input)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent(),
                            forwardParams])];
                    case 2: return [2 /*return*/, (_b.sent()).results];
                }
            });
        });
    };
    Mtcnn.prototype.forwardWithStats = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, tfjs_image_recognition_base_1.toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(),
                            forwardParams])];
                }
            });
        });
    };
    Mtcnn.prototype.getDefaultModelName = function () {
        return 'mtcnn_model';
    };
    Mtcnn.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap);
    };
    Mtcnn.prototype.extractParams = function (weights) {
        return extractParams_1.extractParams(weights);
    };
    return Mtcnn;
}(tfjs_image_recognition_base_1.NeuralNetwork));
exports.Mtcnn = Mtcnn;
