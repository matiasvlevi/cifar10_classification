let train_batch_1 = [];

async function loadfile(file, offset) {
    let r = await fetch(file);
    let data = await r.arrayBuffer();
    return new Uint8Array(data).slice(offset);
}
//
// function LoadCIFAR(callback) {
//     loadfile('data_batch_1.bin', 8)
//         .then(data => {
//             train_batch_1 = data;
//             return loadfile('data_batch_1.bin', 16);
//         })
//         .then(data => {
//             train_images = data;
//             callback();
//         })
// }


function setup() {
  createCanvas(600,600);
  let d = loadfile('CIFAR/data_batch_2.bin',8);
  console.log(d)
}

function draw() {
  background(51);
}
