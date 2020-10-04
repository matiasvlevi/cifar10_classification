

let nn;
let nng;
let losses = [];
let accuracies = [];
function preload() {
  LoadCIFAR();
}
function setup() {

  createCanvas(600,600);

}
function initiateNN() {
  nn = new Dann(3072,10);

  nn.addHiddenLayer(64,leakyReLU);
  nn.addHiddenLayer(32,leakyReLU);
  nn.addHiddenLayer(32,leakyReLU);
  nn.addHiddenLayer(16,leakyReLU);
  nn.makeWeights();
  nn.activation(nn.Layers.length,sigmoid)
  nn.lr = 0.000003
  nn.log();
  nng = new Graph(0,0,600,200);
  nng.addValue(losses,color(0,150,255),"loss");
  nng.addValue(accuracies,color(255,150,0),"accuracy");
}
let time = 0;
let d_index = 0;
function display() {
  if (nng !== undefined) {
    nng.render();
    printImgArray(uarrayToImage(0,d_index));
    nn.feedForward(dataset[0][d_index].inputs);
    guess = labels[findBiggest(nn.outs)];
    console.log(nn.outs)
    fill(255);
    text(guess + "/   confidence: "+nn.outs[findBiggest(nn.outs)],320,220);
    if (time > 250) {
      if (d_index > 10) {
        d_index = 0;
      } else {
        d_index++;
      }
      time = 0;
    } else {
      time++;
    }


  }

}
function draw() {
  background(51);
  display();
}

let currentIndex = 0;
let currentBatch = 0;

function train(minibatch) {
  for (let m = 0; m < minibatch;m++) {
    let accsum = 0;
    let losssum = 0;
    if (currentIndex >= 10000) {
      currentIndex=0;
      if (currentBatch >= 5) {
        currentBatch = 0;
        epoch++;
      } else {
        currentBatch++;
      }

    }
    for (let i = 0; i < 100; i++) {
      let data = dataset[currentBatch][i+currentIndex];
      // console.log(data,currentIndex+i,currentBatch)
      nn.backpropagate(data.inputs,data.target);
      accsum += test(dataset[0]);
      losssum+=nn.loss;
    }
    accuracies.push(accsum/100);
    losses.push(losssum/100);
    if (cuurenIndex <= 10000) {
      currentIndex+=100;
    }

  }

}
