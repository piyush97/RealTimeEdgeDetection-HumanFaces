"use strict";
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
var tfjs_image_recognition_base_1 = require("tfjs-image-recognition-base");
var FaceDetection_1 = require("../classes/FaceDetection");
/**
 * Extracts the image regions containing the detected faces.
 *
 * @param input The image that face detection has been performed on.
 * @param detections The face detection results or face bounding boxes for that image.
 * @returns The Canvases of the corresponding image region for each detected face.
 */
function extractFaces(input, detections) {
    return __awaiter(this, void 0, void 0, function () {
        var Canvas, canvas, netInput, tensorOrCanvas, _a, ctx, boxes;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Canvas = tfjs_image_recognition_base_1.env.getEnv().Canvas;
                    canvas = input;
                    if (!!(input instanceof Canvas)) return [3 /*break*/, 5];
                    return [4 /*yield*/, tfjs_image_recognition_base_1.toNetInput(input)];
                case 1:
                    netInput = _b.sent();
                    if (netInput.batchSize > 1) {
                        throw new Error('extractFaces - batchSize > 1 not supported');
                    }
                    tensorOrCanvas = netInput.getInput(0);
                    if (!(tensorOrCanvas instanceof Canvas)) return [3 /*break*/, 2];
                    _a = tensorOrCanvas;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, tfjs_image_recognition_base_1.imageTensorToCanvas(tensorOrCanvas)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    canvas = _a;
                    _b.label = 5;
                case 5:
                    ctx = tfjs_image_recognition_base_1.getContext2dOrThrow(canvas);
                    boxes = detections.map(function (det) { return det instanceof FaceDetection_1.FaceDetection
                        ? det.forSize(canvas.width, canvas.height).box.floor()
                        : det; })
                        .map(function (box) { return box.clipAtImageBorders(canvas.width, canvas.height); });
                    return [2 /*return*/, boxes.map(function (_a) {
                            var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                            var faceImg = tfjs_image_recognition_base_1.createCanvas({ width: width, height: height });
                            tfjs_image_recognition_base_1.getContext2dOrThrow(faceImg)
                                .putImageData(ctx.getImageData(x, y, width, height), 0, 0);
                            return faceImg;
                        })];
            }
        });
    });
}
exports.extractFaces = extractFaces;
