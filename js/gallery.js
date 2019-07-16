'use strict';

(function () {

  var createUserPhotos = function (userPhotos) {
    var myUserPhotos = [];
    for (var i = 0; i < window.util.PHOTOS_AMOUNT; i++) {
      myUserPhotos.push({
        url: userPhotos[i].url,
        likes: userPhotos[i].likes,
        comments: userPhotos[i].comments
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


  window.load(window.util.URL, function (userPhotos) {
    var photos = createUserPhotos(userPhotos);
    var picturesTitleElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesTitleElement.appendChild(fragment);
  });
})();
