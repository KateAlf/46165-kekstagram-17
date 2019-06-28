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
  var userPhotos = [];
  for (var i = 0; i < PHOTOS_AMOUNT; i++) {
    userPhotos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
      comments: createObjectComments()
    });
  }
  return userPhotos;
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
  var photos = createUserPhotos(PHOTOS_AMOUNT);
  var picturesTitleElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesTitleElement.appendChild(fragment);
};

renderUserImages();

var formUpload = document.getElementById('upload-file');
var imgUpload = document.querySelector('.img-upload__overlay');
var cancelUpload = document.getElementById('upload-cancel');

formUpload.addEventListener('change', function() {
  imgUpload.classList.remove('hidden');
});

cancelUpload.addEventListener('click', function() {
  imgUpload.classList.add('hidden');
});

cancelUpload.addEventListener('keydown', function(evt) {
  
  if (evt.keyCode === 27) {
    imgUpload.classList.add('hidden');
  }
});

var effectsList = document.querySelector('.effects__list');
var effectsSlider = document.querySelector('.img-upload__effect-level');
var imgPreview = document.querySelector('.img-upload__preview');
var currentEffect = '';

effectsSlider.classList.add('hidden');

var addEffectToImg = function (effect) {
  imgPreview.classList.remove('effects__preview--' + currentEffect);
  imgPreview.classList.add('effects__preview--' + effect);
  effectsSlider.classList.remove('hidden');
  currentEffect = effect;
};

effectsList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName === 'INPUT') {
    var targetEffect = target.value;
    addEffectToImg(targetEffect);
  }
});

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');

var VALUE_MIN = 25;
var VALUE_STEP = 25;
var VALUE_MAX = 100;
var intScaleValue = parseInt(scaleControlValue.value, 10);

var increaseValue = function () {

  if (scaleControlValue.value < VALUE_MAX) {
    intScaleValue = intScaleValue + VALUE_STEP;
    scaleControlValue.value = intScaleValue;
  }
  console.log(intScaleValue);
  transformUploadPreview(scaleControlValue.value);

};

var decreaseValue = function () {

  if (scaleControlValue.value > VALUE_MIN) {
    scaleControlValue -= VALUE_STEP;
  }
  transformUploadPreview(scaleControlValue.value);
};

var transformUploadPreview = function (value) {
  if (value === '100') {
    imgPreview.style.transform = 'scale(1)';
  } else {
    imgPreview.style.transform = 'scale(0.' + value + ')';
  }
};

scaleControlBigger.addEventListener('click', function () {
  increaseValue();
});

scaleControlSmaller.addEventListener('click', function () {
  decreaseValue();
});