let batches = [];
let batchNb = 6;
for (let  i= 0; i < batchNb; i++) {
  batches[i] = [];
}
let test_batch = [];
let labels = ["airplane","automobile","bird","cat","deer","dog","frog","horse","ship","truck"];
async function loadfile(file, offset) {
    let r = await fetch(file);
    let data = await r.arrayBuffer();
    return new Uint8Array(data).slice(offset);
}
function LoadCIFAR(callback) {
    loadfile('CIFAR/data_batch_1.bin',0)
        .then(data => {
            batches[0] = data;
        })
        loadfile('CIFAR/data_batch_2.bin',0)
            .then(data => {
                batches[1] = data;
            })
            loadfile('CIFAR/data_batch_3.bin',0)
                .then(data => {
                    batches[2] = data;
                })
                loadfile('CIFAR/data_batch_4.bin',0)
                    .then(data => {
                        batches[3] = data;
                    })
                    loadfile('CIFAR/data_batch_5.bin',0)
                        .then(data => {
                            batches[4] = data;
                        })
                        loadfile('CIFAR/test_batch.bin',0)
                            .then(data => {
                                batches[5] = data;
                            })
}
function printImgArray(img) {
  let size = 8;
  let x = 0;
  let y = 0;
  let w = sqrt(img.length);
  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      let col = img[(j*w)+i];

      noStroke();
      let r = map(col[0],0,1,0,255);
      let g = map(col[1],0,1,0,255);
      let b = map(col[2],0,1,0,255);
      fill(r,g,b);
      rect((i*size)+x,(j*size)+y,size,size);
    }
  }
}
function uarrayToData(batch,index) {
  let imgIndex = (index*3073);
  let arr = [];

  let j = 0;
  let trainbatch = batches[batch];
  let labelIndex = trainbatch[imgIndex];
  let a = trainbatch.slice(imgIndex+1,imgIndex+3073);
  let inputs = [];
  for (let i = 0; i < a.length;i++) {
    inputs[i] = map(a[i],0,255,0,1);
  }

  let data = {
    inputs: inputs,
    target: labelIndex
  }
  return data;
}
function uarrayToImage(batch,index) {
  let imgIndex = (index*3073);
  let arr = [];
  let r = [];
  let g = [];
  let b = [];
  let j = 0;
  let trainbatch = batches[batch];
  let labelIndex = trainbatch[imgIndex];
  //console.log(labels[labelIndex])
  for (let i = imgIndex+1; i < imgIndex+1025;i++) {

    r[j] = trainbatch[i];
    j++
  }
  j=0;
  for (let i = imgIndex+1025; i < imgIndex+1025+1024;i++) {
    g[j] = trainbatch[i];
    j++
  }

  j=0;
  for (let i = imgIndex+1025+1024; i < imgIndex+1025+1024+1024;i++) {
    b[j] = trainbatch[i];
    j++
  }
  for (let i = 0; i < 1024; i++) {
    let rc = map(r[i],0,255,0,1);
    let gc = map(g[i],0,255,0,1);
    let bc = map(b[i],0,255,0,1);
    arr[i] = [rc,gc,bc];
  }
  return arr;
}
let img1;
function downloadObjectAsJson(exportObj, exportName){

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function formatBatches() {
  let dataset = [];

  for (let b = 0; b < 5;b++) {
    let batch = [];

    for (let i = 0; i < 10000; i++) {
      batch[i] = uarrayToData(b,i);

    }



    dataset[b] = batch;
    console.log("finished batch: " + b);
  }


  //console.log(dataset);
  //downloadObjectAsJson(dataset[0], "data1")
  return dataset;
}
function setup() {
  LoadCIFAR();
  createCanvas(600,600);
}
let count = 0;
let index = 0;
function draw() {
  background(51);

}
