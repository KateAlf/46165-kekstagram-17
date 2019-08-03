'use strict';

(function () {
  window.initUploadForm = function () {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    var formUpload = document.querySelector('#upload-file');
    var cancelUpload = document.querySelector('#upload-cancel');
    var commentInput = document.querySelector('.text__description');
    var hashtagsInput = document.querySelector('.text__hashtags');
    var imgUpload = document.querySelector('.img-upload__overlay');
    var fileChooser = document.querySelector('.img-upload__input');
    var preview = document.querySelector('.img-upload__preview > img');
    var effectsSlider = document.querySelector('.img-upload__effect-level');
    var scaleControlValue = imgUpload.querySelector('.scale__control--value');

    formUpload.addEventListener('change', function () {
      imgUpload.classList.remove('hidden');
    });

    cancelUpload.addEventListener('click', function () {
      imgUpload.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE &&
        !commentInput.matches(':focus') &&
        !hashtagsInput.matches(':focus')) {
        imgUpload.classList.add('hidden');
      }
    });

    var openImgUpload = function () {
      imgUpload.classList.remove('hidden');
      scaleControlValue.value = '100%';
      effectsSlider.classList.add('hidden');
    };

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
          openImgUpload();
        });

        reader.readAsDataURL(file);
      }
    });
  };
})();
