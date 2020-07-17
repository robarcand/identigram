let browserWindowWidth = document.documentElement.clientWidth;
let browserWindowHeight = document.documentElement.clientHeight;
let c;

let mobilenet;

let video;

let snapButton;
let downloadButton;
let identifyButton;
let snapshots = [];
let counter = 'a';
let storage = window.localStorage;

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        fill(0);
        textFont('Roboto');
        textSize(32);

        let label = results[0].label;
        let confidence = results[0].confidence;

        label = label.split(',');

        text(`${label[0]}: ${confidence.toFixed(4)}`, width / 4, height - 100);
    }
}

function modelReady() {
    mobilenet.predict(video, gotResults);
}

function takeSnap() {
    snapshots.push(video.get());
    console.log('Snapshots:', snapshots);
    // storage[counter] = snapshots;
    // console.log('Storage:', storage);
    // counter += 'a';
}

function downloadSnap() {
    saveCanvas(c, 'mySnap', 'png');
}

function redrawCamera() {

}

function redrawBackground() {
    background(221);
}

function setup() {
        c = createCanvas(640, 480);
        background(221);

    // let videoConstraints = {
    //     audio: false,
    //     video: {
    //       facingMode: {
    //         exact: "environment"
    //       }
    //     }
        //video: {
          //facingMode: "user"
        //}
    // }

    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();
    mobilenet = ml5.imageClassifier('MobileNet');

    identifyButton = createButton('Identify');
    identifyButton.addClass('image-capture-button');
    identifyButton.mousePressed(modelReady);

    snapButton = createButton('Snap');
    snapButton.addClass('image-capture-button');
    snapButton.addClass('red-button');
    snapButton.mousePressed(takeSnap);


    downloadButton = createButton('Download');
    downloadButton.addClass('image-capture-button');
    downloadButton.addClass('black-button');
    downloadButton.mousePressed(downloadSnap);

    clearButton = createButton('Clear');
    clearButton.addClass('image-capture-button');
    clearButton.addClass('grey-button');
    clearButton.mousePressed(redrawBackground);
  }

  function draw() {
        image(video, width / 4, 50);
  }
