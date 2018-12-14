# RealTimeEdgeDetection-HumanFaces



**JavaScript App for Detecting edges of the human face**



Table of Contents:

# Examples



## Realtime Face Tracking



<img src="https://i.ibb.co/j3KyJx3/Screenshot-2018-12-14-at-3-15-00-PM.jpg" border="0">



## Running the Examples



Clone the repository:



``` bash

git clone https://github.com/piyush97/RealTimeEdgeDetection-HumanFaces.git

```



### Running the Browser Examples



``` bash

cd RealTimeEdgeDetection-HumanFaces/examples/examples-browser

npm i

npm start

```



Browse to http://localhost:3000/.



## Face Detection Models



### Tiny Face Detector





The face detector has been trained on a custom dataset of ~14K images labeled with bounding boxes. Furthermore the model has been trained to predict bounding boxes, which entirely cover facial feature points, thus it in general produces better results in combination with subsequent face landmark detection than SSD Mobilenet V1.



This model is basically an even tinier version of Tiny Yolo V2, replacing the regular convolutions of Yolo with depthwise separable convolutions. Yolo is fully convolutional, thus can easily adapt to different input image sizes to trade off accuracy for performance (inference time).



## 68 Point Face Landmark Detection Models



This package implements a very lightweight and fast, yet accurate 68 point face landmark detector. The default model has a size of only 350kb (**face_landmark_68_model**) and the tiny model is only 80kb (**face_landmark_68_tiny_model**). Both models employ the ideas of depthwise separable convolutions as well as densely connected blocks. The models have been trained on a dataset of ~35k face images labeled with 68 face landmark points.



The size of the quantized model is roughly 6.2 MB (**face_recognition_model**).





# Getting Started





# Usage

## Loading the Models



To load a model, you have provide the corresponding manifest.json file as well as the model weight files (shards) as assets. Simply copy them to your public or assets folder. The manifest.json and shard files of a model have to be located in the same directory / accessible under the same route.



Assuming the models reside in **public/models**:



``` javascript

await RealTimeEdgeDetection-HumanFaces.loadSsdMobilenetv1Model('/models')

// accordingly for the other models:

// await RealTimeEdgeDetection-HumanFaces.loadTinyFaceDetectorModel('/models')

// await RealTimeEdgeDetection-HumanFaces.loadMtcnnModel('/models')

// await RealTimeEdgeDetection-HumanFaces.loadFaceLandmarkModel('/models')

// await RealTimeEdgeDetection-HumanFaces.loadFaceLandmarkTinyModel('/models')

// await RealTimeEdgeDetection-HumanFaces.loadFaceRecognitionModel('/models')

```



All global neural network instances are exported via RealTimeEdgeDetection-HumanFaces.nets:



``` javascript

console.log(RealTimeEdgeDetection-HumanFaces.nets)

```



The following is equivalent to `await RealTimeEdgeDetection-HumanFaces.loadSsdMobilenetv1Model('/models')`:



``` javascript

await RealTimeEdgeDetection-HumanFaces.nets.ssdMobilenetv1.loadFromUri('/models')

```



In a nodejs environment you can furthermore load the models directly from disk:



``` javascript

await RealTimeEdgeDetection-HumanFaces.nets.ssdMobilenetv1.loadFromDisk('./models')

```



You can also load the model from a tf.NamedTensorMap:



``` javascript

await RealTimeEdgeDetection-HumanFaces.nets.ssdMobilenetv1.loadFromWeightMap(weightMap)

```



Alternatively, you can also create own instances of the neural nets:



``` javascript

const net = new RealTimeEdgeDetection-HumanFaces.SsdMobilenetv1()

await net.load('/models')

```



You can also load the weights as a Float32Array (in case you want to use the uncompressed models):



``` javascript

// using fetch

net.load(await RealTimeEdgeDetection-HumanFaces.fetchNetWeights('/models/face_detection_model.weights'))



// using axios

const res = await axios.get('/models/face_detection_model.weights', { responseType: 'arraybuffer' })

const weights = new Float32Array(res.data)

net.load(weights)

```



## High Level API



In the following **input** can be an HTML img, video or canvas element or the id of that element.



``` html

<img id="myImg" src="images/example.png" />

<video id="myVideo" src="media/example.mp4" />

<canvas id="myCanvas" />

```



``` javascript

const input = document.getElementById('myImg')

// const input = document.getElementById('myVideo')

// const input = document.getElementById('myCanvas')

// or simply:

// const input = 'myImg'

```



### Detecting Faces



Detect all faces in an image. Returns **Array<[FaceDetection](#interface-face-detection)>**:



``` javascript

const detections = await RealTimeEdgeDetection-HumanFaces.detectAllFaces(input)

```



Detect the face with the highest confidence score in an image. Returns **[FaceDetection](#interface-face-detection) | undefined**:



``` javascript

const detection = await RealTimeEdgeDetection-HumanFaces.detectSingleFace(input)

```



By default **detectAllFaces** and **detectSingleFace** utilize the SSD Mobilenet V1 Face Detector. You can specify the face detector by passing the corresponding options object:



``` javascript

const detections1 = await RealTimeEdgeDetection-HumanFaces.detectAllFaces(input, new RealTimeEdgeDetection-HumanFaces.SsdMobilenetv1Options())

const detections2 = await RealTimeEdgeDetection-HumanFaces.detectAllFaces(input, new RealTimeEdgeDetection-HumanFaces.TinyFaceDetectorOptions())

const detections3 = await RealTimeEdgeDetection-HumanFaces.detectAllFaces(input, new RealTimeEdgeDetection-HumanFaces.MtcnnOptions())

```



You can tune the options of each face detector as shown [here](#usage-face-detection-options).



``` javascript

export interface ISsdMobilenetv1Options {

// minimum confidence threshold

// default: 0.5

minConfidence?: number



// maximum number of faces to return

// default: 100

maxResults?: number

}



// example

const options = new RealTimeEdgeDetection-HumanFaces.SsdMobilenetv1Options({ minConfidence: 0.8 })

```



### TinyFaceDetectorOptions



``` javascript

export interface ITinyFaceDetectorOptions {

// size at which image is processed, the smaller the faster,

// but less precise in detecting smaller faces, must be divisible

// by 32, common sizes are 128, 160, 224, 320, 416, 512, 608,

// for face tracking via webcam I would recommend using smaller sizes,

// e.g. 128, 160, for detecting smaller faces use larger sizes, e.g. 512, 608

// default: 416

inputSize?: number



// minimum confidence threshold

// default: 0.5

scoreThreshold?: number

}



// example

const options = new RealTimeEdgeDetection-HumanFaces.TinyFaceDetectorOptions({ inputSize: 320 })
const detections1 = await RealTimeEdgeDetection-HumanFaces.ssdMobilenetv1(input, options)

const detections2 = await RealTimeEdgeDetection-HumanFaces.tinyFaceDetector(input, options)

const detections3 = await RealTimeEdgeDetection-HumanFaces.mtcnn(input, options)

const landmarks1 = await RealTimeEdgeDetection-HumanFaces.detectFaceLandmarks(faceImage)

const landmarks2 = await RealTimeEdgeDetection-HumanFaces.detectFaceLandmarksTiny(faceImage)

const descriptor = await RealTimeEdgeDetection-HumanFaces.computeFaceDescriptor(alignedFaceImage)

```



### Extracting a Canvas for an Image Region



``` javascript

const regionsToExtract = [

new RealTimeEdgeDetection-HumanFaces.Rect(0, 0, 100, 100)

]

// actually extractFaces is meant to extract face regions from bounding boxes

// but you can also use it to extract any other region

const canvases = await RealTimeEdgeDetection-HumanFaces.extractFaces(input, regionsToExtract)

```



### Euclidean Distance



``` javascript

// ment to be used for computing the euclidean distance between two face descriptors

const dist = RealTimeEdgeDetection-HumanFaces.euclideanDistance([0, 0], [0, 10])

console.log(dist) // 10

```



### Retrieve the Face Landmark Points and Contours



``` javascript

const landmarkPositions = landmarks.positions



// or get the positions of individual contours,

// only available for 68 point face ladnamrks (FaceLandmarks68)

const jawOutline = landmarks.getJawOutline()

const nose = landmarks.getNose()

const mouth = landmarks.getMouth()

const leftEye = landmarks.getLeftEye()

const rightEye = landmarks.getRightEye()

const leftEyeBbrow = landmarks.getLeftEyeBrow()

const rightEyeBrow = landmarks.getRightEyeBrow()

```



### Fetch and Display Images from an URL



``` html

<img id="myImg" src="">

```



``` javascript

const image = await RealTimeEdgeDetection-HumanFaces.fetchImage('/images/example.png')



console.log(image instanceof HTMLImageElement) // true



// displaying the fetched image content

const myImg = document.getElementById('myImg')

myImg.src = image.src

```



### Fetching JSON



``` javascript

const json = await RealTimeEdgeDetection-HumanFaces.fetchJson('/files/example.json')

```



### Creating an Image Picker



``` html

<img id="myImg" src="">

<input id="myFileUpload" type="file" onchange="uploadImage()" accept=".jpg, .jpeg, .png">

```



``` javascript

async function uploadImage() {

const imgFile = document.getElementById('myFileUpload').files[0]

// create an HTMLImageElement from a Blob

const img = await RealTimeEdgeDetection-HumanFaces.bufferToImage(imgFile)

document.getElementById('myImg').src = img.src

}

```



### Creating a Canvas Element from an Image or Video Element



``` html

<img id="myImg" src="images/example.png" />

<video id="myVideo" src="media/example.mp4" />

```



``` javascript

const canvas1 = RealTimeEdgeDetection-HumanFaces.createCanvasFromMedia(document.getElementById('myImg'))

const canvas2 = RealTimeEdgeDetection-HumanFaces.createCanvasFromMedia(document.getElementById('myVideo'))
```
