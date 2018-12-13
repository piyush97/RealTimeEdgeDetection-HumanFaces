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
var FaceDetectionWithLandmarks_1 = require("../classes/FaceDetectionWithLandmarks");
var dom_1 = require("../dom");
var ComposableTask_1 = require("./ComposableTask");
var ComputeFaceDescriptorsTasks_1 = require("./ComputeFaceDescriptorsTasks");
var nets_1 = require("./nets");
var DetectFaceLandmarksTaskBase = /** @class */ (function (_super) {
    __extends(DetectFaceLandmarksTaskBase, _super);
    function DetectFaceLandmarksTaskBase(detectFacesTask, input, useTinyLandmarkNet) {
        var _this = _super.call(this) || this;
        _this.detectFacesTask = detectFacesTask;
        _this.input = input;
        _this.useTinyLandmarkNet = useTinyLandmarkNet;
        return _this;
    }
    Object.defineProperty(DetectFaceLandmarksTaskBase.prototype, "landmarkNet", {
        get: function () {
            return this.useTinyLandmarkNet
                ? nets_1.nets.faceLandmark68TinyNet
                : nets_1.nets.faceLandmark68Net;
        },
        enumerable: true,
        configurable: true
    });
    return DetectFaceLandmarksTaskBase;
}(ComposableTask_1.ComposableTask));
exports.DetectFaceLandmarksTaskBase = DetectFaceLandmarksTaskBase;
var DetectAllFaceLandmarksTask = /** @class */ (function (_super) {
    __extends(DetectAllFaceLandmarksTask, _super);
    function DetectAllFaceLandmarksTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectAllFaceLandmarksTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var detections, faces, _a, faceLandmarksByFace;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.detectFacesTask];
                    case 1:
                        detections = _b.sent();
                        if (!(this.input instanceof tf.Tensor)) return [3 /*break*/, 3];
                        return [4 /*yield*/, dom_1.extractFaceTensors(this.input, detections)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, dom_1.extractFaces(this.input, detections)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        faces = _a;
                        return [4 /*yield*/, Promise.all(faces.map(function (face) { return _this.landmarkNet.detectLandmarks(face); }))];
                    case 6:
                        faceLandmarksByFace = _b.sent();
                        faces.forEach(function (f) { return f instanceof tf.Tensor && f.dispose(); });
                        return [2 /*return*/, detections.map(function (detection, i) {
                                return new FaceDetectionWithLandmarks_1.FaceDetectionWithLandmarks(detection, faceLandmarksByFace[i]);
                            })];
                }
            });
        });
    };
    DetectAllFaceLandmarksTask.prototype.withFaceDescriptors = function () {
        return new ComputeFaceDescriptorsTasks_1.ComputeAllFaceDescriptorsTask(this, this.input);
    };
    return DetectAllFaceLandmarksTask;
}(DetectFaceLandmarksTaskBase));
exports.DetectAllFaceLandmarksTask = DetectAllFaceLandmarksTask;
var DetectSingleFaceLandmarksTask = /** @class */ (function (_super) {
    __extends(DetectSingleFaceLandmarksTask, _super);
    function DetectSingleFaceLandmarksTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectSingleFaceLandmarksTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var detection, faces, _a, landmarks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.detectFacesTask];
                    case 1:
                        detection = _b.sent();
                        if (!detection) {
                            return [2 /*return*/];
                        }
                        if (!(this.input instanceof tf.Tensor)) return [3 /*break*/, 3];
                        return [4 /*yield*/, dom_1.extractFaceTensors(this.input, [detection])];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, dom_1.extractFaces(this.input, [detection])];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        faces = _a;
                        return [4 /*yield*/, this.landmarkNet.detectLandmarks(faces[0])];
                    case 6:
                        landmarks = _b.sent();
                        faces.forEach(function (f) { return f instanceof tf.Tensor && f.dispose(); });
                        return [2 /*return*/, new FaceDetectionWithLandmarks_1.FaceDetectionWithLandmarks(detection, landmarks)];
                }
            });
        });
    };
    DetectSingleFaceLandmarksTask.prototype.withFaceDescriptor = function () {
        return new ComputeFaceDescriptorsTasks_1.ComputeSingleFaceDescriptorTask(this, this.input);
    };
    return DetectSingleFaceLandmarksTask;
}(DetectFaceLandmarksTaskBase));
exports.DetectSingleFaceLandmarksTask = DetectSingleFaceLandmarksTask;
