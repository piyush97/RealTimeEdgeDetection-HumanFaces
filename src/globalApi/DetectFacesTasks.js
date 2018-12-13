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
var tfjs_tiny_yolov2_1 = require("tfjs-tiny-yolov2");
var MtcnnOptions_1 = require("../mtcnn/MtcnnOptions");
var SsdMobilenetv1Options_1 = require("../ssdMobilenetv1/SsdMobilenetv1Options");
var TinyFaceDetectorOptions_1 = require("../tinyFaceDetector/TinyFaceDetectorOptions");
var ComposableTask_1 = require("./ComposableTask");
var DetectFaceLandmarksTasks_1 = require("./DetectFaceLandmarksTasks");
var nets_1 = require("./nets");
var DetectFacesTaskBase = /** @class */ (function (_super) {
    __extends(DetectFacesTaskBase, _super);
    function DetectFacesTaskBase(input, options) {
        if (options === void 0) { options = new SsdMobilenetv1Options_1.SsdMobilenetv1Options(); }
        var _this = _super.call(this) || this;
        _this.input = input;
        _this.options = options;
        return _this;
    }
    return DetectFacesTaskBase;
}(ComposableTask_1.ComposableTask));
exports.DetectFacesTaskBase = DetectFacesTaskBase;
var DetectAllFacesTask = /** @class */ (function (_super) {
    __extends(DetectAllFacesTask, _super);
    function DetectAllFacesTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectAllFacesTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, input, options, faceDetectionFunction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, input = _a.input, options = _a.options;
                        if (!(options instanceof MtcnnOptions_1.MtcnnOptions)) return [3 /*break*/, 2];
                        return [4 /*yield*/, nets_1.nets.mtcnn.forward(input, options)];
                    case 1: return [2 /*return*/, (_b.sent())
                            .map(function (result) { return result.faceDetection; })];
                    case 2:
                        faceDetectionFunction = options instanceof TinyFaceDetectorOptions_1.TinyFaceDetectorOptions
                            ? function (input) { return nets_1.nets.tinyFaceDetector.locateFaces(input, options); }
                            : (options instanceof SsdMobilenetv1Options_1.SsdMobilenetv1Options
                                ? function (input) { return nets_1.nets.ssdMobilenetv1.locateFaces(input, options); }
                                : (options instanceof tfjs_tiny_yolov2_1.TinyYolov2Options
                                    ? function (input) { return nets_1.nets.tinyYolov2.locateFaces(input, options); }
                                    : null));
                        if (!faceDetectionFunction) {
                            throw new Error('detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options');
                        }
                        return [2 /*return*/, faceDetectionFunction(input)];
                }
            });
        });
    };
    DetectAllFacesTask.prototype.withFaceLandmarks = function (useTinyLandmarkNet) {
        if (useTinyLandmarkNet === void 0) { useTinyLandmarkNet = false; }
        return new DetectFaceLandmarksTasks_1.DetectAllFaceLandmarksTask(this, this.input, useTinyLandmarkNet);
    };
    return DetectAllFacesTask;
}(DetectFacesTaskBase));
exports.DetectAllFacesTask = DetectAllFacesTask;
var DetectSingleFaceTask = /** @class */ (function (_super) {
    __extends(DetectSingleFaceTask, _super);
    function DetectSingleFaceTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectSingleFaceTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var faceDetections, faceDetectionWithHighestScore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DetectAllFacesTask(this.input, this.options)];
                    case 1:
                        faceDetections = _a.sent();
                        faceDetectionWithHighestScore = faceDetections[0];
                        faceDetections.forEach(function (faceDetection) {
                            if (faceDetection.score > faceDetectionWithHighestScore.score) {
                                faceDetectionWithHighestScore = faceDetection;
                            }
                        });
                        return [2 /*return*/, faceDetectionWithHighestScore];
                }
            });
        });
    };
    DetectSingleFaceTask.prototype.withFaceLandmarks = function (useTinyLandmarkNet) {
        if (useTinyLandmarkNet === void 0) { useTinyLandmarkNet = false; }
        return new DetectFaceLandmarksTasks_1.DetectSingleFaceLandmarksTask(this, this.input, useTinyLandmarkNet);
    };
    return DetectSingleFaceTask;
}(DetectFacesTaskBase));
exports.DetectSingleFaceTask = DetectSingleFaceTask;
