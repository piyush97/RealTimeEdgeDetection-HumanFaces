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
var tf = require("@tensorflow/tfjs-core");
var tfjs_image_recognition_base_1 = require("tfjs-image-recognition-base");
var normalize_1 = require("./normalize");
function extractImagePatches(img, boxes, _a) {
    var width = _a.width, height = _a.height;
    return __awaiter(this, void 0, void 0, function () {
        var imgCtx, bitmaps, imagePatchesDatas;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    imgCtx = tfjs_image_recognition_base_1.getContext2dOrThrow(img);
                    return [4 /*yield*/, Promise.all(boxes.map(function (box) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, y, ey, x, ex, fromX, fromY, imgData;
                            return __generator(this, function (_b) {
                                _a = box.padAtBorders(img.height, img.width), y = _a.y, ey = _a.ey, x = _a.x, ex = _a.ex;
                                fromX = x - 1;
                                fromY = y - 1;
                                imgData = imgCtx.getImageData(fromX, fromY, (ex - fromX), (ey - fromY));
                                return [2 /*return*/, tfjs_image_recognition_base_1.env.isNodejs() ? tfjs_image_recognition_base_1.createCanvasFromMedia(imgData) : createImageBitmap(imgData)];
                            });
                        }); }))];
                case 1:
                    bitmaps = _b.sent();
                    imagePatchesDatas = [];
                    bitmaps.forEach(function (bmp) {
                        var patch = tfjs_image_recognition_base_1.createCanvas({ width: width, height: height });
                        var patchCtx = tfjs_image_recognition_base_1.getContext2dOrThrow(patch);
                        patchCtx.drawImage(bmp, 0, 0, width, height);
                        var data = patchCtx.getImageData(0, 0, width, height).data;
                        var currData = [];
                        // RGBA -> BGR
                        for (var i = 0; i < data.length; i += 4) {
                            currData.push(data[i + 2]);
                            currData.push(data[i + 1]);
                            currData.push(data[i]);
                        }
                        imagePatchesDatas.push(currData);
                    });
                    return [2 /*return*/, imagePatchesDatas.map(function (data) {
                            var t = tf.tidy(function () {
                                var imagePatchTensor = tf.transpose(tf.tensor4d(data, [1, width, height, 3]), [0, 2, 1, 3]).toFloat();
                                return normalize_1.normalize(imagePatchTensor);
                            });
                            return t;
                        })];
            }
        });
    });
}
exports.extractImagePatches = extractImagePatches;
