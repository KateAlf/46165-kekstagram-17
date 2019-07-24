'use strict';

(function () {
  window.initFilterSort = function () {
    var effectsList = document.querySelector('.effects__list');
    var effectsSlider = document.querySelector('.img-upload__effect-level');
    var imgPreview = document.querySelector('.img-upload__preview');
    var effectSliderPin = document.querySelector('.effect-level__pin');
    var effectLevelDepth = document.querySelector('.effect-level__depth');
    var currentEffect = '';

    effectsSlider.classList.add('hidden');

    var addEffectToImg = function (effect) {
      imgPreview.classList.remove('effects__preview--' + currentEffect);
      imgPreview.classList.add('effects__preview--' + effect);
      effectsSlider.classList.remove('hidden');
      currentEffect = effect;
    };

    effectsList.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.tagName === 'INPUT') {
        var targetEffect = target.value;
        addEffectToImg(targetEffect);
      }
      var applyFilterSettings = function (element, effect, value) {
        element.style.filter = effect + '(' + value + ')';
      };

      switch (evt.target.value) {
        case 'none':
          imgPreview.style.filter = '';
          effectsSlider.classList.add('hidden');
          break;
        case 'chrome':
          applyFilterSettings(imgPreview, 'grayscale', 1);
          break;
        case 'sepia':
          applyFilterSettings(imgPreview, 'sepia', 1);
          break;
        case 'marvin':
          imgPreview.style.filter = 'invert(100%)';
          break;
        case 'phobos':
          imgPreview.style.filter = 'blur(3px)';
          break;
        case 'heat':
          applyFilterSettings(imgPreview, 'brightness', 3);
          break;
      }

      effectSliderPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
    });

    (function () {
      var effectLevelInput = document.querySelector('.effect-level__value');

      effectSliderPin.addEventListener('mousedown', function (evt) {
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

          var nextCoordinate = effectSliderPin.offsetLeft - shift.x;
          var pinCoordinate;

          if (nextCoordinate >= window.util.LEVEL_LINE_WIDTH) {
            pinCoordinate = window.util.LEVEL_LINE_WIDTH + 'px';
          } else if (nextCoordinate <= 0) {
            pinCoordinate = 0 + 'px';
          } else {
            pinCoordinate = nextCoordinate + 'px';
          }


          effectSliderPin.style.left = pinCoordinate;
          effectLevelDepth.style.width = effectSliderPin.style.left;
          effectLevelInput.value = (effectSliderPin.offsetLeft / window.util.LEVEL_LINE_WIDTH).toFixed(2) * window.util.PERCENT;

          switch (imgPreview.classList[1]) {
            case 'effects__preview--chrome':
              imgPreview.style.filter =
                'grayscale(' + parseInt(effectLevelInput.value, 10) / 100 + ')';
              break;
            case 'effects__preview--sepia':
              imgPreview.style.filter =
                'sepia(' + effectLevelInput.value / 100 + ')';
              break;
            case 'effects__preview--marvin':
              imgPreview.style.filter =
                'invert(' + effectLevelInput.value + '%)';
              break;
            case 'effects__preview--phobos':
              imgPreview.style.filter =
                'blur(' + (effectLevelInput.value / 100) * 3 + 'px)';
              break;
            case 'effects__preview--heat':
              imgPreview.style.filter =
                'brightness(' +
                (effectLevelInput.value / 100) * 3 +
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
  };
})();
