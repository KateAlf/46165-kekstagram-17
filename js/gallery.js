'use strict';

(function () {
  window.initPictureGallery = function () {
    var similarListElement = document.querySelector('.pictures');
    var imgFilters = document.querySelector('.img-filters');
    var popularPhotoFilter = imgFilters.querySelector('#filter-popular');
    var discussedPhotoFilter = imgFilters.querySelector('#filter-discussed');
    var newPhotoFilter = imgFilters.querySelector('#filter-new');
    var photosFilters = imgFilters.querySelectorAll('button');
    var myUserPhotos = [];

    var createUserPhotos = function (userPhotos) {
      for (var i = 0; i < userPhotos.length; i++) {
        myUserPhotos.push({
          url: userPhotos[i].url,
          likes: userPhotos[i].likes,
          comments: userPhotos[i].comments,
          description: userPhotos[i].description,

        });
      }
      return myUserPhotos;
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

    var shuffleArray = function (array) {
      array.sort(function () {
        return Math.random() - 0.5;
      });
      return array;
    };

    window.load(window.util.URL_GET, function (userPhotos) {
      imgFilters.classList.remove('img-filters--inactive');
      var photos = createUserPhotos(userPhotos);
      var picturesTitleElement = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(renderPhoto(photos[i]));
      }
      picturesTitleElement.appendChild(fragment);
    });

    var showDiscussedFotos = function (array) {
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

    var showNewFotos = function (array) {
      var arrayCopy = array.slice();
      shuffleArray(arrayCopy);
      arrayCopy.length = 10;
      renderPhotos(arrayCopy);
    };

    var onFilterButtonClick = function (evt) {
      clearPictures();
      activateFilter(evt.target);
      var id = evt.target.id;
      if (id === 'filter-popular') {
        renderPhotos(myUserPhotos);
      } else if (id === 'filter-new') {
        showNewFotos(myUserPhotos);
      } else if (id === 'filter-discussed') {
        showDiscussedFotos(myUserPhotos);
      }
    };

    var showBigPhoto = function (attribute) {
      var newPhotos = myUserPhotos.filter(function (element) {
        return element.url === attribute;
      });
      window.bigphoto.show(newPhotos[0]);
    };

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
  };

})();
