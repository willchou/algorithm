console.log('script start');

new Promise((resolve) => {
  console.log('async1 start');
  console.log('async2');
  resolve();
}).then(() => {
  console.log('async1 end');
});

new Promise((resolve) => {
  console.log('promise1');

  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');
// new Promise(() => {
// });


setTimeout(() => {
  console.log('setTimeout');
}, 0);
