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
var FaceLandmarks68_1 = require("../classes/FaceLandmarks68");
var FaceLandmark68NetBase = /** @class */ (function (_super) {
    __extends(FaceLandmark68NetBase, _super);
    function FaceLandmark68NetBase(_name) {
        var _this = _super.call(this, _name) || this;
        _this.__name = _name;
        return _this;
    }
    FaceLandmark68NetBase.prototype.postProcess = function (output, inputSize, originalDimensions) {
        var inputDimensions = originalDimensions.map(function (_a) {
            var width = _a.width, height = _a.height;
            var scale = inputSize / Math.max(height, width);
            return {
                width: width * scale,
                height: height * scale
            };
        });
        var batchSize = inputDimensions.length;
        return tf.tidy(function () {
            var createInterleavedTensor = function (fillX, fillY) {
                return tf.stack([
                    tf.fill([68], fillX),
                    tf.fill([68], fillY)
                ], 1).as2D(1, 136).as1D();
            };
            var getPadding = function (batchIdx, cond) {
                var _a = inputDimensions[batchIdx], width = _a.width, height = _a.height;
                return cond(width, height) ? Math.abs(width - height) / 2 : 0;
            };
            var getPaddingX = function (batchIdx) { return getPadding(batchIdx, function (w, h) { return w < h; }); };
            var getPaddingY = function (batchIdx) { return getPadding(batchIdx, function (w, h) { return h < w; }); };
            var landmarkTensors = output
                .mul(tf.fill([batchSize, 136], inputSize))
                .sub(tf.stack(Array.from(Array(batchSize), function (_, batchIdx) {
                return createInterleavedTensor(getPaddingX(batchIdx), getPaddingY(batchIdx));
            })))
                .div(tf.stack(Array.from(Array(batchSize), function (_, batchIdx) {
                return createInterleavedTensor(inputDimensions[batchIdx].width, inputDimensions[batchIdx].height);
            })));
            return landmarkTensors;
        });
    };
    FaceLandmark68NetBase.prototype.forwardInput = function (input) {
        var _this = this;
        return tf.tidy(function () {
            var out = _this.runNet(input);
            return _this.postProcess(out, input.inputSize, input.inputDimensions.map(function (_a) {
                var height = _a[0], width = _a[1];
                return ({ height: height, width: width });
            }));
        });
    };
    FaceLandmark68NetBase.prototype.forward = function (input) {
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
    FaceLandmark68NetBase.prototype.detectLandmarks = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var netInput, landmarkTensors, landmarksForBatch;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tfjs_image_recognition_base_1.toNetInput(input)];
                    case 1:
                        netInput = _a.sent();
                        landmarkTensors = tf.tidy(function () { return tf.unstack(_this.forwardInput(netInput)); });
                        return [4 /*yield*/, Promise.all(landmarkTensors.map(function (landmarkTensor, batchIdx) { return __awaiter(_this, void 0, void 0, function () {
                                var landmarksArray, _a, _b, xCoords, yCoords;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = Array).from;
                                            return [4 /*yield*/, landmarkTensor.data()];
                                        case 1:
                                            landmarksArray = _b.apply(_a, [_c.sent()]);
                                            xCoords = landmarksArray.filter(function (_, i) { return tfjs_image_recognition_base_1.isEven(i); });
                                            yCoords = landmarksArray.filter(function (_, i) { return !tfjs_image_recognition_base_1.isEven(i); });
                                            return [2 /*return*/, new FaceLandmarks68_1.FaceLandmarks68(Array(68).fill(0).map(function (_, i) { return new tfjs_image_recognition_base_1.Point(xCoords[i], yCoords[i]); }), {
                                                    height: netInput.getInputHeight(batchIdx),
                                                    width: netInput.getInputWidth(batchIdx)
                                                })];
                                    }
                                });
                            }); }))];
                    case 2:
                        landmarksForBatch = _a.sent();
                        landmarkTensors.forEach(function (t) { return t.dispose(); });
                        return [2 /*return*/, netInput.isBatchInput
                                ? landmarksForBatch
                                : landmarksForBatch[0]];
                }
            });
        });
    };
    return FaceLandmark68NetBase;
}(tfjs_image_recognition_base_1.NeuralNetwork));
exports.FaceLandmark68NetBase = FaceLandmark68NetBase;
