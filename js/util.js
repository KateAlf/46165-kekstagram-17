'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PERCENT = 100;
  var PHOTOS_AMOUNT = 25;
  var LEVEL_LINE_WIDTH = 450;
  var VALUE_BEGINNING = 0;
  var VALUE_STEP = 25;
  var VALUE_MAX = 100;
  var URL = 'https://js.dump.academy/kekstagram/data';
  var userPhotos = [];
  
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectSliderPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelInput = document.querySelector('.effect-level__value');

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    PERCENT: PERCENT,
    PHOTOS_AMOUNT: PHOTOS_AMOUNT,
    LEVEL_LINE_WIDTH: LEVEL_LINE_WIDTH,
    VALUE_BEGINNING: VALUE_BEGINNING,
    VALUE_STEP: VALUE_STEP,
    VALUE_MAX: VALUE_MAX,
    URL: URL,
    userPhotos: userPhotos,
  };

  window.elements = {
    imgUpload: imgUpload,
    imgPreview: imgPreview,
    effectSliderPin: effectSliderPin,
    effectLevelDepth: effectLevelDepth,
    effectLevelInput: effectLevelInput
  }
})();
