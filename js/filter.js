'use strict';

(function () {

  var effectsList = document.querySelector('.effects__list');
  var effectsSlider = document.querySelector('.img-upload__effect-level');
  var currentEffect = '';

  effectsSlider.classList.add('hidden');

  var addEffectToImg = function (effect) {
    window.elements.imgPreview.classList.remove('effects__preview--' + currentEffect);
    window.elements.imgPreview.classList.add('effects__preview--' + effect);
    effectsSlider.classList.remove('hidden');
    currentEffect = effect;
  };

  effectsList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'INPUT') {
      var targetEffect = target.value;
      addEffectToImg(targetEffect);
    }

    switch (evt.target.value) {
      case 'none':
        window.elements.imgPreview.style.filter = '';
        effectsSlider.classList.add('hidden');
        break;
      case 'chrome':
        window.elements.imgPreview.style.filter = 'grayscale(1)';
        break;
      case 'sepia':
        window.elements.imgPreview.style.filter = 'sepia(1)';
        break;
      case 'marvin':
        window.elements.imgPreview.style.filter = 'invert(100%)';
        break;
      case 'phobos':
        window.elements.imgPreview.style.filter = 'blur(3px)';
        break;
      case 'heat':
        window.elements.imgPreview.style.filter = 'brightness(3)';
        break;
    }

    window.elements.effectSliderPin.style.left = '100%';
    window.elements.effectLevelDepth.style.width = '100%';
  });

  (function () {

    window.elements.effectSliderPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };

        var nextCoordinate = window.elements.effectSliderPin.offsetLeft - shift.x;
        var pinCoordinate;

        if (nextCoordinate >= window.util.LEVEL_LINE_WIDTH) {
          pinCoordinate = window.util.LEVEL_LINE_WIDTH + 'px';
        } else if (nextCoordinate <= 0) {
          pinCoordinate = 0 + 'px';
        } else {
          pinCoordinate = nextCoordinate + 'px';
        }

        var effectsListClass = window.elements.imgPreview;
        window.elements.effectSliderPin.style.left = pinCoordinate;
        window.elements.effectLevelDepth.style.width = window.elements.effectSliderPin.style.left;
        window.elements.effectLevelInput.value = (window.elements.effectSliderPin.offsetLeft / window.util.LEVEL_LINE_WIDTH).toFixed(2) * window.util.PERCENT;

        switch (effectsListClass.classList[1]) {
          case 'effects__preview--chrome':
            window.elements.imgPreview.style.filter =
              'grayscale(' + parseInt(window.elements.effectLevelInput.value, 10) / 100 + ')';
            break;
          case 'effects__preview--sepia':
            window.elements.imgPreview.style.filter =
              'sepia(' + window.elements.effectLevelInput.value / 100 + ')';
            break;
          case 'effects__preview--marvin':
            window.elements.imgPreview.style.filter =
              'invert(' + window.elements.effectLevelInput.value + '%)';
            break;
          case 'effects__preview--phobos':
            window.elements.imgPreview.style.filter =
              'blur(' + (window.elements.effectLevelInput.value / 100) * 3 + 'px)';
            break;
          case 'effects__preview--heat':
            window.elements.imgPreview.style.filter =
              'brightness(' +
              (window.elements.effectLevelInput.value / 100) * 3 +
              ')';
            break;
        }
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  })();
})();
