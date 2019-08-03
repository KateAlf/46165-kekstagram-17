'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var PERCENT = 100;
  var MIN_INTENSITY = 1;
  var MAX_INTENSITY = 3;
  var LEVEL_LINE_WIDTH = 450;
  var VALUE_MIN = 0;
  var VALUE_MAX = 100;
  var VALUE_STEP = 25;

  var debounce = function (fn) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fn.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    PERCENT: PERCENT,
    MIN_INTENSITY: MIN_INTENSITY,
    MAX_INTENSITY: MAX_INTENSITY,
    LEVEL_LINE_WIDTH: LEVEL_LINE_WIDTH,
    VALUE_MIN: VALUE_MIN,
    VALUE_STEP: VALUE_STEP,
    VALUE_MAX: VALUE_MAX,
    debounce: debounce
  };
})();
