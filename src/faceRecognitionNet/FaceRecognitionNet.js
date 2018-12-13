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
var convLayer_1 = require("./convLayer");
var extractParams_1 = require("./extractParams");
var extractParamsFromWeigthMap_1 = require("./extractParamsFromWeigthMap");
var residualLayer_1 = require("./residualLayer");
var FaceRecognitionNet = /** @class */ (function (_super) {
    __extends(FaceRecognitionNet, _super);
    function FaceRecognitionNet() {
        return _super.call(this, 'FaceRecognitionNet') || this;
    }
    FaceRecognitionNet.prototype.forwardInput = function (input) {
        var params = this.params;
        if (!params) {
            throw new Error('FaceRecognitionNet - load model before inference');
        }
        return tf.tidy(function () {
            var batchTensor = input.toBatchTensor(150, true).toFloat();
            var meanRgb = [122.782, 117.001, 104.298];
            var normalized = tfjs_image_recognition_base_1.normalize(batchTensor, meanRgb).div(tf.scalar(256));
            var out = convLayer_1.convDown(normalized, params.conv32_down);
            out = tf.maxPool(out, 3, 2, 'valid');
            out = residualLayer_1.residual(out, params.conv32_1);
            out = residualLayer_1.residual(out, params.conv32_2);
            out = residualLayer_1.residual(out, params.conv32_3);
            out = residualLayer_1.residualDown(out, params.conv64_down);
            out = residualLayer_1.residual(out, params.conv64_1);
            out = residualLayer_1.residual(out, params.conv64_2);
            out = residualLayer_1.residual(out, params.conv64_3);
            out = residualLayer_1.residualDown(out, params.conv128_down);
            out = residualLayer_1.residual(out, params.conv128_1);
            out = residualLayer_1.residual(out, params.conv128_2);
            out = residualLayer_1.residualDown(out, params.conv256_down);
            out = residualLayer_1.residual(out, params.conv256_1);
            out = residualLayer_1.residual(out, params.conv256_2);
            out = residualLayer_1.residualDown(out, params.conv256_down_out);
            var globalAvg = out.mean([1, 2]);
            var fullyConnected = tf.matMul(globalAvg, params.fc);
            return fullyConnected;
        });
    };
    FaceRecognitionNet.prototype.forward = function (input) {
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
    FaceRecognitionNet.prototype.computeFaceDescriptor = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var netInput, faceDescriptorTensors, faceDescriptorsForBatch;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tfjs_image_recognition_base_1.toNetInput(input)];
                    case 1:
                        netInput = _a.sent();
                        faceDescriptorTensors = tf.tidy(function () { return tf.unstack(_this.forwardInput(netInput)); });
                        return [4 /*yield*/, Promise.all(faceDescriptorTensors.map(function (t) { return t.data(); }))];
                    case 2:
                        faceDescriptorsForBatch = _a.sent();
                        faceDescriptorTensors.forEach(function (t) { return t.dispose(); });
                        return [2 /*return*/, netInput.isBatchInput
                                ? faceDescriptorsForBatch
                                : faceDescriptorsForBatch[0]];
                }
            });
        });
    };
    FaceRecognitionNet.prototype.getDefaultModelName = function () {
        return 'face_recognition_model';
    };
    FaceRecognitionNet.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return extractParamsFromWeigthMap_1.extractParamsFromWeigthMap(weightMap);
    };
    FaceRecognitionNet.prototype.extractParams = function (weights) {
        return extractParams_1.extractParams(weights);
    };
    return FaceRecognitionNet;
}(tfjs_image_recognition_base_1.NeuralNetwork));
exports.FaceRecognitionNet = FaceRecognitionNet;
