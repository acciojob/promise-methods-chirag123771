Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(resolve).catch(reject);
    }
  });
};

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let settledCount = 0;

    for (const promise of promises) {
      promise.then(resolve).catch(() => {
        settledCount++;
        if (settledCount === promises.length) {
          reject('all promises rejected');
        }
      });
    }
  });
};

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let settledCount = 0;

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((value) => {
          results[i] = value;
          settledCount++;

          if (settledCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
};

Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const results = new Array(promises.length);
    let settledCount = 0;

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((value) => {
          results[i] = { status: 'fulfilled', value };
        })
        .catch((error) => {
          results[i] = { status: 'rejected', error };
        })
        .finally(() => {
          settledCount++;

          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    }
  });
};

// Sample Usage
Promise.myRace([
  new Promise((res) => setTimeout(() => res(0), 500)),
  Promise.resolve(5),
  new Promise((res) => setTimeout(() => res(10), 1000)),
])
  .then(console.log)
  .catch((error) => console.log('error: ' + error));

Promise.myAny([
  new Promise((res) => setTimeout(() => res(0), 500)),
  Promise.reject(5),
  new Promise((res) => setTimeout(() => res(10), 1000)),
])
  .then(console.log)
  .catch((error) => console.log('error: ' + error));

Promise.myAll([
  new Promise((res) => setTimeout(() => res(0), 500)),
  Promise.resolve(5),
  new Promise((res) => setTimeout(() => res(10), 1000)),
])
  .then(console.log)
  .catch((error) => console.log('error: ' + error));

Promise.myAll([
  new Promise((res) => setTimeout(() => res(0), 500)),
  Promise.reject(5),
  new Promise((res) => setTimeout(() => res(10), 1000)),
])
  .then(console.log)
  .catch((error) => console.log('error: ' + error));

Promise.myAllSettled([
  new Promise((res) => setTimeout(() => res(0), 500)),
  Promise.resolve(5),
  new Promise((res) => setTimeout(() => res(10), 1000)),
])
  .then(console.log);

Promise.myAllSettled([
  new Promise((res) => setTimeout(() => res(0), 500)),
  Promise.reject(5),
  new Promise((res) => setTimeout(() => res(10), 1000)),
])
  .then(console.log)
  .catch((error) => console.log('error: ' + error));
