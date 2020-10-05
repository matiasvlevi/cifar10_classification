let batches = [];
let batchNb = 6;
for (let  i= 0; i < batchNb; i++) {
  batches[i] = [];
}
let img1;
let count = 0;
let index = 0;
let dataset = [];
let labels = ["airplane","automobile","bird","cat","deer","dog","frog","horse","ship","truck"];

async function loadfile(file, offset) {
    let r = await fetch(file);
    let data = await r.arrayBuffer();
    return new Uint8Array(data).slice(offset);
}
let guess = "";
function findBiggest(arr) {
  let best = 0;
  let bestIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > best) {
      best = arr[i];
      bestIndex = i;
    }
  }
  return bestIndex;
}
function LoadCIFAR(callback) {
    let ready = 0;
    loadfile('CIFAR/data_batch_1.bin',0)
        .then(data => {
            batches[0] = data;
            ready++;
            if (ready == 6) {
              console.log("ready");
              formatBatches();
            }
        })
        loadfile('CIFAR/data_batch_2.bin',0)
            .then(data => {
                batches[1] = data;
                ready++;
                if (ready == 6) {
                  console.log("ready");
                  formatBatches();
                }
            })
            loadfile('CIFAR/data_batch_3.bin',0)
                .then(data => {
                    batches[2] = data;
                    ready++;
                    if (ready == 6) {
                      console.log("ready");
                      formatBatches();
                    }
                })
                loadfile('CIFAR/data_batch_4.bin',0)
                    .then(data => {
                        batches[3] = data;
                        ready++;
                        if (ready == 6) {
                          console.log("ready");
                          formatBatches();
                        }
                    })
                    loadfile('CIFAR/data_batch_5.bin',0)
                        .then(data => {
                            batches[4] = data;
                            ready++;
                            if (ready == 6) {
                              console.log("ready");
                              formatBatches();
                            }
                        })
                        loadfile('CIFAR/test_batch.bin',0)
                            .then(data => {
                                batches[5] = data;
                                if (ready == 6) {
                                  console.log("ready");
                                  formatBatches();
                                }
                            })




}
function printImgArray(img) {
  let size = 8;
  let x = 0;
  let y = 200;
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


  let trainbatch = batches[batch];
  let labelIndex = trainbatch[imgIndex];
  let a = trainbatch.slice(imgIndex+1,imgIndex+3073);
  let inputs = [];
  for (let i = 0; i < a.length;i++) {
    inputs[i] = map(a[i],0,255,0,1);
  }

  let data = {
    inputs: inputs,
    target: makelabel(labelIndex)
  }
  return data;
}
function test(batch) {
  let sum = 0;
  let i = int(random(0,11));
  nn.feedForward(batch[i].inputs);
  guess = labels[findBiggest(nn.outs)];
  for (let j = 0; j < nn.outs.length; j++) {
    sum +=1 + batch[i].target[j]-nn.outs[j];
  }
  result = sum/nn.outs.length;




  return result/10;

}
function makelabel(x) {
  let arr = [];
  for (let i =0; i < 10; i++) {
    if (i == x) {
      arr[i] = 1;
    } else {
      arr[i]= 0;
    }

  }
  return arr;
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
function formatBatch(b) {
  dataset.push(setbatches(b));
}
function setbatches(b) {
  let data_set = [];


    let batch = [];

    for (let i = 0; i < 10000; i++) {
      batch[i] = uarrayToData(b,i);

    }



    data_set = batch;
    console.log("finished batch: " + b);



  //console.log(dataset);
  //downloadObjectAsJson(dataset[0], "data1")
  return data_set;
}
