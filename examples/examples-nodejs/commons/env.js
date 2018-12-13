"use strict";
exports.__esModule = true;
// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
require("@tensorflow/tfjs-node");
// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
var canvas = require('canvas');
exports.canvas = canvas;
var faceapi = require("../../../src");
exports.faceapi = faceapi;
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
var Canvas = canvas.Canvas, Image = canvas.Image, ImageData = canvas.ImageData;
faceapi.env.monkeyPatch({ Canvas: Canvas, Image: Image, ImageData: ImageData });
