let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/uzlnyLSlZ/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// AC: Is this function called anywhere? Looks like it might never be used
// Load the model first
function preload() {
  // AC: Testing if this gets called
  console.log("preload") // AC: yes, this shows up
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  // AC: print whenever setup is called
  console.log("setup") // AC: only seems to be called once
  let canvas = createCanvas(300, 260); // AC: looks like this is where the canvas gets created. Why is it getting created more than once?
  // canvas.parent("canvasParent");
  // Create the video
  video = createCapture(VIDEO);
  video.size(300, 240);
  video.hide();
  
  // AC: we call flipImage in multiple place, we might be flipping the image more than necessary
  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  // AC: How about this function?
  // console.log("draw") AC: yes, this is called in a loop
  // AC: Ah! I think we need to clear the canvas

  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}