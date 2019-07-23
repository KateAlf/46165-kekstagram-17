'use strict';

(function () {
  window.initUploadForm = function () {
    var formUpload = document.getElementById('upload-file');
    var cancelUpload = document.getElementById('upload-cancel');
    var commentInput = document.querySelector('.text__description');
    var hashtagsInput = document.querySelector('.text__hashtags');

    formUpload.addEventListener('change', function () {
      window.elements.imgUpload.classList.remove('hidden');
    });

    cancelUpload.addEventListener('click', function () {
      window.elements.imgUpload.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE &&
        !commentInput.matches(':focus') &&
        !hashtagsInput.matches(':focus')) {
        window.elements.imgUpload.classList.add('hidden');
      }
    })
  }
})();
