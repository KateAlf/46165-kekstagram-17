'use strict';
(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var setZoomValue = function (value) {
    scaleControlValue.value = value + '%';
  };

  var decreaseValue = function () {
    var scaleSmaller = parseInt(scaleControlValue.value, 10) - window.util.VALUE_STEP;
    if (scaleSmaller <= window.util.VALUE_BEGINNING) {
      scaleSmaller = window.util.VALUE_BEGINNING;
      setZoomValue(window.util.VALUE_BEGINNING);
    } else {
      setZoomValue(scaleSmaller);
    }

    window.elements.imgPreview.style.transform = 'scale(' + scaleSmaller / 100 + ')';
  };

  var increaseValue = function () {
    var scaleBigger = parseInt(scaleControlValue.value, 10) + window.util.VALUE_STEP;

    if (scaleBigger >= window.util.VALUE_MAX) {
      scaleBigger = window.util.VALUE_MAX;
      setZoomValue(window.util.VALUE_MAX);
    } else {
      setZoomValue(scaleBigger);
    }

    window.elements.imgPreview.style.transform = 'scale(' + scaleBigger / 100 + ')';
  };

  scaleControlBigger.addEventListener('click', function () {
    increaseValue();
  });

  scaleControlSmaller.addEventListener('click', function () {
    decreaseValue();
  });
})();
