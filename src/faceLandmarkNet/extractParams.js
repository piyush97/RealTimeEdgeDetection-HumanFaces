"use strict";
exports.__esModule = true;
var tfjs_image_recognition_base_1 = require("tfjs-image-recognition-base");
var extractorsFactory_1 = require("./extractorsFactory");
function extractParams(weights) {
    var paramMappings = [];
    var _a = tfjs_image_recognition_base_1.extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var _b = extractorsFactory_1.extractorsFactory(extractWeights, paramMappings), extractDenseBlock4Params = _b.extractDenseBlock4Params, extractFCParams = _b.extractFCParams;
    var dense0 = extractDenseBlock4Params(3, 32, 'dense0', true);
    var dense1 = extractDenseBlock4Params(32, 64, 'dense1');
    var dense2 = extractDenseBlock4Params(64, 128, 'dense2');
    var dense3 = extractDenseBlock4Params(128, 256, 'dense3');
    var fc = extractFCParams(256, 136, 'fc');
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return {
        paramMappings: paramMappings,
        params: { dense0: dense0, dense1: dense1, dense2: dense2, dense3: dense3, fc: fc }
    };
}
exports.extractParams = extractParams;
