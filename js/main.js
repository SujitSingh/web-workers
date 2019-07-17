let worker0For = new Worker('../workers/for.js');
let worker1For = new Worker('../workers/for.js');
let worker2For = new Worker('../workers/for.js');
let worker3For = new Worker('../workers/for.js');
let worker4For = new Worker('../workers/for.js');
let worker5For = new Worker('../workers/for.js');
let tbody = document.querySelector('#result tbody');

let workers = [worker0For, worker1For, worker2For, worker3For, worker4For, worker5For];

function loadResults() {
  tbody.innerHTML = '';
  let till = 200000000;

  for (let i = 0; i < workers.length; i++) {
    let workName = `Worker${i}`;
    workers[i].onmessage = onMessage;
    workers[i].onerror = onError;

    console.time(workName);
    workers[i].postMessage({ index: i, name: workName, till: till, startTime: performance.now() });
  }

  // console.time('mainThread');
  // let sum = 0;
  // for (let i = 0; i < till; i++) {
  //   sum += i;
  // }
  // console.timeEnd('mainThread');
  // console.log('MainWorker -> ', sum);
}

function onMessage(event) {
  let data = event.data;
  console.timeEnd(data.name);
  data.timeTaken = performance.now() - data.startTime;
  console.log(`Work -> ${data.name}`, data);
  addResultRow(data);
}

function onError(event) {
  console.log('Error workerFor => ', event);
}

function addResultRow(result) {
  let row = `<tr>
    <td>${result.index}</td>
    <td>${result.name}</td>
    <td>${result.timeTaken}</td>
    <td>${result.till}</td>
    <td>${result.result}</td>
  </tr>`;

  tbody.innerHTML += row;
}