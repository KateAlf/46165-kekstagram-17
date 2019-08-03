'use strict';

(function () {
  window.initPictureGallery = function () {
    var mainPage = document.querySelector('main');
    var similarListElement = document.querySelector('.pictures');
    var imgFilters = document.querySelector('.img-filters');
    var popularPhotoFilter = imgFilters.querySelector('#filter-popular');
    var discussedPhotoFilter = imgFilters.querySelector('#filter-discussed');
    var newPhotoFilter = imgFilters.querySelector('#filter-new');
    var photosFilters = imgFilters.querySelectorAll('button');
    var photosBlock = [];

    var Filters = {
      popular: 'filter-popular',
      new: 'filter-new',
      discussed: 'filter-discussed'
    };

    var renderPhoto = function (photo) {
      var pictureTemplate = document.querySelector('#picture')
        .content
        .querySelector('.picture');
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;
      return pictureElement;
    };

    var renderPhotos = function (array) {
      var fragment = document.createDocumentFragment();
      array.forEach(function (element) {
        fragment.appendChild(renderPhoto(element));
      });
      similarListElement.appendChild(fragment);
    };

    var activateFilter = function (buttonActive) {
      photosFilters.forEach(function (elem) {
        elem.classList.remove('img-filters__button--active');
      });
      buttonActive.classList.add('img-filters__button--active');
    };

    var clearPictures = function () {
      similarListElement.querySelectorAll('.picture').forEach(function (element) {
        element.remove();
      });
    };

    var closeSection = function (section) {
      var sectionElement = document.querySelector('.' + section);
      mainPage.removeChild(sectionElement);
      document.removeEventListener('click', onSectionClick);
      document.removeEventListener('keydown', window.util.onSectionEscPress);
    };

    var shuffleArray = function (array) {
      array.sort(function () {
        return Math.random() - 0.5;
      });
      return array;
    };

    var onSectionClick = function (section) {
      closeSection(section);
    };

    var showLoadSuccess = function (array) {
      photosBlock = array;
      imgFilters.classList.remove('img-filters--inactive');
      renderPhotos(photosBlock);
      return photosBlock;
    };

    var showDiscussedPhotos = function (array) {
      var arrayCopy = array.sort(function (first, second) {
        if (first.comments.length > second.comments.length) {
          return -1;
        } else if (first.comments.length < second.comments.length) {
          return 1;
        } else {
          return 0;
        }
      });
      renderPhotos(arrayCopy);
    };

    var showNewPhotos = function (array) {
      var arrayCopy = array.slice();
      shuffleArray(arrayCopy);
      arrayCopy.length = 10;
      renderPhotos(arrayCopy);
    };

    var onFilterButtonClick = function (evt) {
      clearPictures();
      activateFilter(evt.target);
      var id = evt.target.id;
      switch (id) {
        case Filters.popular:
          renderPhotos(photosBlock);
          break;
        case Filters.new:
          showNewPhotos(photosBlock);
          break;
        case Filters.discussed:
          showDiscussedPhotos(photosBlock);
          break;
      }
    };

    var showBigPhoto = function (attribute) {
      var newPhotos = photosBlock.filter(function (element) {
        return element.url === attribute;
      });
      window.bigphoto.show(newPhotos[0]);
    };

    window.server.load(showLoadSuccess, window.serverStatus.showErrorOfLoad);

    var onFilterButtonClickDebounce = window.util.debounce(onFilterButtonClick);

    discussedPhotoFilter.addEventListener('click', onFilterButtonClickDebounce);
    popularPhotoFilter.addEventListener('click', onFilterButtonClickDebounce);
    newPhotoFilter.addEventListener('click', onFilterButtonClickDebounce);

    similarListElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        var photoAttribute = evt.target.getAttribute('src');
        showBigPhoto(photoAttribute);
      }
    });

    var onsimilarListElementClick = function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE && evt.target.classList.contains('picture')) {
        var photo = evt.target.firstElementChild;
        var photoAttribute = photo.getAttribute('src');
        showBigPhoto(photoAttribute);
      }
    };

    similarListElement.addEventListener('keydown', onsimilarListElementClick);
  };
})();
