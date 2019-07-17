self.onmessage = (taskObj) => {
  let task = taskObj.data;
  let sum = 0;
  for (let i = 0; i < task.till; i++) {
    sum += i;
  }

  self.postMessage({ result: sum, ...task });
};