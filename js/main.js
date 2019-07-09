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

var imgUpload = document.querySelector('.img-upload__overlay');
var imgPreview = document.querySelector('.img-upload__preview');

var showUploadForm = function () {
  var formUpload = document.getElementById('upload-file');
  var cancelUpload = document.getElementById('upload-cancel');
  var commentInput = document.querySelector('.text__description');

  formUpload.addEventListener('change', function () {
    imgUpload.classList.remove('hidden');
  });

  cancelUpload.addEventListener('click', function () {
    imgUpload.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && !commentInput.matches(':focus')) {
      imgUpload.classList.add('hidden');
    }
  });
};

/*

var resetSlider = function  () {
  effectsSliderPin.style.left = '100%';
  effectLevelDepth.style.width = '100%';
  effectLevelInput.value = '100';
};
*/

var applyEffectSwitcher = function () {

  var effectsList = document.querySelector('.effects__list');
  var effectsSlider = document.querySelector('.img-upload__effect-level');
  var currentEffect = '';

  // effectsSlider.classList.add('hidden');

  var addEffectToImg = function (effect) {
    imgPreview.classList.remove('effects__preview--' + currentEffect);
    imgPreview.classList.add('effects__preview--' + effect);
    //   effectsSlider.classList.remove('hidden');
    currentEffect = effect;
  };

  effectsList.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'INPUT') {
      var targetEffect = target.value;
      addEffectToImg(targetEffect);
    }

    switch (evt.target.value) {
      case 'none':
        imgPreview.style.filter = '';
        effectsSlider.classList.add('hidden');
        break;
      case 'chrome':
        imgPreview.style.filter = 'grayscale(1)';
        break;
      case 'sepia':
        imgPreview.style.filter = 'sepia(1)';
        break;
      case 'marvin':
        imgPreview.style.filter = 'invert(100%)';
        break;
      case 'phobos':
        imgPreview.style.filter = 'blur(3px)';
        break;
      case 'heat':
        imgPreview.style.filter = 'brightness(3)';
        break;
    }

    effectsSliderPin.style.left = '100%';
    effectLevelDepth = '100%';
  });
};

var zoomImgSwitcher = function () {

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var VALUE_BEGINNING = 0;
  var VALUE_STEP = 25;
  var VALUE_MAX = 100;

  var setZoomValue = function (value) {
    scaleControlValue.value = value + '%';
  };

  var decreaseValue = function () {
    var scaleSmaller = parseInt(scaleControlValue.value, 10) - VALUE_STEP;

    if (scaleSmaller <= VALUE_BEGINNING) {
      scaleSmaller = VALUE_BEGINNING;
      setZoomValue(VALUE_BEGINNING);
    } else {
      setZoomValue(scaleSmaller);
    }

    imgPreview.style.transform = 'scale(' + scaleSmaller / 100 + ')';
  };

  var increaseValue = function () {
    var scaleBigger = parseInt(scaleControlValue.value, 10) + VALUE_STEP;

    if (scaleBigger >= VALUE_MAX) {
      scaleBigger = VALUE_MAX;
      setZoomValue(VALUE_MAX);
    } else {
      setZoomValue(scaleBigger);
    }

    imgPreview.style.transform = 'scale(' + scaleBigger / 100 + ')';
  };

  scaleControlBigger.addEventListener('click', function () {
    increaseValue();
  });

  scaleControlSmaller.addEventListener('click', function () {
    decreaseValue();
  });
};

var WIDTH_OF_LEVEL_LINE = 450;
var PERCENT = 100;
var effectsSliderPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelInput = document.querySelector('.effect-level__value');

var applyEffectIntensity = function () {

  effectsSliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var nextCoordinate = effectsSliderPin.offsetLeft - shift.x;
      var pinCoordinate;

      if (nextCoordinate >= WIDTH_OF_LEVEL_LINE) {
        pinCoordinate = WIDTH_OF_LEVEL_LINE + 'px';
      } else if (nextCoordinate <= 0) {
        pinCoordinate = 0 + 'px';
      } else {
        pinCoordinate = nextCoordinate + 'px';
      }

      var effectsListClass = imgPreview;
      effectsSliderPin.style.left = pinCoordinate;
      effectLevelDepth.style.width = effectsSliderPin.style.left;
      effectLevelInput.value = (effectsSliderPin.offsetLeft / WIDTH_OF_LEVEL_LINE).toFixed(2) * PERCENT;

      switch (effectsListClass.classList[1]) {
        case 'effects__preview--chrome':
          imgPreview.style.filter =
            'grayscale(' + parseInt(effectLevelInput.value, 10) / 100 + ')';
          break;
        case 'effects__preview--sepia':
          imgPreview.style.filter =
            'sepia(' + effectLevelInput.value / 100 + ')';
          break;
        case 'effects__preview--marvin':
          imgPreview.style.filter =
            'invert(' + effectLevelInput.value + '%)';
          break;
        case 'effects__preview--phobos':
          imgPreview.style.filter =
            'blur(' + (effectLevelInput.value / 100) * 3 + 'px)';
          break;
        case 'effects__preview--heat':
          imgPreview.style.filter =
            'brightness(' +
            (effectLevelInput.value / 100) * 3 +
            ')';
          break;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
};

renderUserImages();
showUploadForm();
zoomImgSwitcher();
applyEffectSwitcher();
applyEffectIntensity();
