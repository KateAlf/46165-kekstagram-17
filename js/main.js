'use strict';
var PHOTOS_NUMBER = 25;

var userComments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

var userNames = ['Семён',
  'Степан',
  'Ангелина',
  'Мария',
  'Афанасий',
  'Тихон'
  ];

//Функция вычисления случайного числа

var getRandom = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min) + min);
  return rand;
};



var getComment = function () {
  var randomComment = Math.floor(Math.random() * userComments.length);
  return userComments[randomComment];
};

// Функция создания объекта с комментариями
var createObjectComments = function () {
  var objectComments = [];
  for (var i = 0; i < userNames.length; i++) {
    objectComments.push({
      avatar: 'img/avatar-' + i + '.svg',
      message: getComment(),
      name: userNames[getRandom(i, userNames.length - 1)]
    })
  }
  return objectComments;
};

// Функция создания объекта с фото
var createUserPhotos = function(count) {
  var userPhotos = [];
  for (var i = 0; i <= PHOTOS_NUMBER; i++) {
    userPhotos.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandom(15, 200),
      comments: getComment()
    });
  }
  return userPhotos;
};

// Генерируем контент на странице

var photos = createUserPhotos(PHOTOS_NUMBER);

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var picturesTitleElement = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var renderPhoto = function(photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

for (var i = 1; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

picturesTitleElement.appendChild(fragment);