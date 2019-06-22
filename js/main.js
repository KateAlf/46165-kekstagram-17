'use strict';
var PHOTOS_AMOUNT = 25;

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

var getCommentIndex = function () {
  var randomComment = Math.floor(Math.random() * userComments.length);
  return userComments[randomComment];
};

var createObjectComments = function () {
  var objectComments = [];
  for (var i = 0; i < userNames.length; i++) {
    objectComments.push({
      avatar: 'img/avatar-' + (i + 1) + '.svg',
      message: getCommentIndex(),
      name: userNames[getRandom(i, userNames.length - 1)]
    });
  }
  return objectComments;
};

var createUserPhotos = function () {
  var userPhotos = [];
  for (var i = 1; i <= PHOTOS_AMOUNT; i++) {
    userPhotos.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandom(15, 200),
      comments: getCommentIndex()
    });
  }
  return userPhotos;
};

var renderUserImages = function () {

  var photos = createUserPhotos(PHOTOS_AMOUNT);
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var picturesTitleElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var renderPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }

  picturesTitleElement.appendChild(fragment);
};

renderUserImages();
