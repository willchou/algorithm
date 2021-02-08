const debounce = (fn, delayTime, immediate) => {
  let timerId;
  return function () {
    const that = this;
    const arg = arguments;
    if (immediate) {
      if (!timerId) {
        fn.apply(that, arg);
      }
    }

    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(that, arg);
    }, delayTime);
  };
};

const throttle = (fn, time) => {
  let flag = true;
  return function () {
    if (!flag) {
      return;
    }
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};

function add() {
  const _args = [...arguments];
  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function () {
    return _args.reduce((sum, cur) => sum + cur);
  };
  return fn;
}
