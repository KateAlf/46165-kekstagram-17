'use strict';

(function () {
  window.initImgSorter = function () {
    var imgFilters = document.querySelector('.img-filters');
    
    xhr.addEventListener('load', function () {
      imgFilters.classList.remove('img-filters--inactive');
    });

    cancelUpload.addEventListener('click', function () {
      imgUpload.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE &&
        !commentInput.matches(':focus') &&
        !hashtagsInput.matches(':focus')) {
        window.elements.imgUpload.classList.add('hidden');
      }
    });
  };
})();
