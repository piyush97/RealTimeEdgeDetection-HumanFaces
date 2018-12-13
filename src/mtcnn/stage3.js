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
var extractImagePatches_1 = require("./extractImagePatches");
var MtcnnBox_1 = require("./MtcnnBox");
var ONet_1 = require("./ONet");
function stage3(img, inputBoxes, scoreThreshold, params, stats) {
    return __awaiter(this, void 0, void 0, function () {
        var ts, onetInputs, onetOuts, scoresTensor, scores, _a, _b, indices, filteredRegions, filteredBoxes, filteredScores, finalBoxes, finalScores, points, indicesNms;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ts = Date.now();
                    return [4 /*yield*/, extractImagePatches_1.extractImagePatches(img, inputBoxes, { width: 48, height: 48 })];
                case 1:
                    onetInputs = _c.sent();
                    stats.stage3_extractImagePatches = Date.now() - ts;
                    ts = Date.now();
                    onetOuts = onetInputs.map(function (onetInput) {
                        var out = ONet_1.ONet(onetInput, params);
                        onetInput.dispose();
                        return out;
                    });
                    stats.stage3_onet = Date.now() - ts;
                    scoresTensor = onetOuts.length > 1
                        ? tf.concat(onetOuts.map(function (out) { return out.scores; }))
                        : onetOuts[0].scores;
                    _b = (_a = Array).from;
                    return [4 /*yield*/, scoresTensor.data()];
                case 2:
                    scores = _b.apply(_a, [_c.sent()]);
                    scoresTensor.dispose();
                    indices = scores
                        .map(function (score, idx) { return ({ score: score, idx: idx }); })
                        .filter(function (c) { return c.score > scoreThreshold; })
                        .map(function (_a) {
                        var idx = _a.idx;
                        return idx;
                    });
                    filteredRegions = indices.map(function (idx) { return new MtcnnBox_1.MtcnnBox(onetOuts[idx].regions.get(0, 0), onetOuts[idx].regions.get(0, 1), onetOuts[idx].regions.get(0, 2), onetOuts[idx].regions.get(0, 3)); });
                    filteredBoxes = indices
                        .map(function (idx, i) { return inputBoxes[idx].calibrate(filteredRegions[i]); });
                    filteredScores = indices.map(function (idx) { return scores[idx]; });
                    finalBoxes = [];
                    finalScores = [];
                    points = [];
                    if (filteredBoxes.length > 0) {
                        ts = Date.now();
                        indicesNms = tfjs_image_recognition_base_1.nonMaxSuppression(filteredBoxes, filteredScores, 0.7, false);
                        stats.stage3_nms = Date.now() - ts;
                        finalBoxes = indicesNms.map(function (idx) { return filteredBoxes[idx]; });
                        finalScores = indicesNms.map(function (idx) { return filteredScores[idx]; });
                        points = indicesNms.map(function (idx, i) {
                            return Array(5).fill(0).map(function (_, ptIdx) {
                                return new tfjs_image_recognition_base_1.Point(((onetOuts[idx].points.get(0, ptIdx) * (finalBoxes[i].width + 1)) + finalBoxes[i].left), ((onetOuts[idx].points.get(0, ptIdx + 5) * (finalBoxes[i].height + 1)) + finalBoxes[i].top));
                            });
                        });
                    }
                    onetOuts.forEach(function (t) {
                        t.regions.dispose();
                        t.scores.dispose();
                        t.points.dispose();
                    });
                    return [2 /*return*/, {
                            boxes: finalBoxes,
                            scores: finalScores,
                            points: points
                        }];
            }
        });
    });
}
exports.stage3 = stage3;
