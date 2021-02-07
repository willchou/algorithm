console.log('start');

setTimeout(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  });
  setTimeout(() => {
    console.log(3);
  });
  setImmediate(() => {
    console.log(4);
  });
  process.nextTick(() => {
    console.log(5);
  });
});

setTimeout(() => {
  console.log(6);
  Promise.resolve().then(() => {
    console.log(7);
  });
  setTimeout(() => {
    console.log(8);
  });
  setImmediate(() => {
    console.log(9);
  });
  process.nextTick(() => {
    console.log(10);
  });
});

process.nextTick(() => {
  console.log(11);
});

console.log('end');

// start end 11, 1, 2, 5, 6, 7, 10, 3,4, 8, 9
/**
 * start
end
11
1
5
2
6
10
7
4
9
3
8
 */
