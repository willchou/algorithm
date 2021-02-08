var debounce = function(fn, delayTime, immediate) {
  var timerId;
  return function() {
    var context = this, args = arguments;
    if(immediate) {
      var callNow = !timerId;
      if(callNow) {
        fn.apply(context, args);
      }
    }
    timerId && clearTimeout(timerId);
    timerId = setTimeout(function() {
      fn.apply(context, args);
    }, delayTime)
  }
}