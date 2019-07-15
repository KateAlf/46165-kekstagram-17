'use strict';

(function () {
var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var userNames = [
  'Семён',
  'Степан',
  'Ангелина',
  'Мария',
  'Афанасий',
  'Тихон'
];

var getRandom = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min) + min);
  return rand;
};

var getComment = function () {
  var randomComment = getRandom(0, userComments.length);
  return userComments[randomComment];
};


var createObjectComments = function () {
  var objectComments = [];
  for (var i = 0; i < userNames.length; i++) {
    if (Math.random() > 0.5) {
      objectComments.push({
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: getComment(),
        name: userNames[getRandom(i, userNames.length)]
      });
    }
  }
  return objectComments;
};

var createUserPhotos = function () {
  
  for (var i = 0; i < window.util.PHOTOS_AMOUNT; i++) {
    window.util.userPhotos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
      comments: createObjectComments()
    });
  }
  return window.util.userPhotos;
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

var renderUserImages = function () {
  var photos = createUserPhotos(window.util.PHOTOS_AMOUNT);
  var picturesTitleElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesTitleElement.appendChild(fragment);
}();
})();
 