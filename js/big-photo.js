'use strict';
(function () {
  var COMMENTS_SHOWN = 5;
  var AVATAR_WIDTH = 35;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  var bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureImg = bigPicture.querySelector('img');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var commentLink = bigPicture.querySelector('.social__comments-loader');

  var showBigPicture = function (imgBig) {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = imgBig.url;
    bigPictureLikes.textContent = imgBig.likes;

    if (imgBig.comments.length > COMMENTS_SHOWN) {
      bigPictureCommentsCount.textContent = imgBig.comments.length;
      bigPictureCommentCount.innerHTML = '5 из ' + bigPictureCommentsCount.textContent + ' комментариев';
    } else {
      bigPictureCommentCount.innerHTML = ' ';
    }
    bigPictureDescription.innerHTML = imgBig.description;
    showComments(imgBig.comments);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        bigPicture.classList.add('hidden');
      }
    });
  };

  var createElement = function (element, elementClass) {
    var newElement = document.createElement(element);
    newElement.classList.add(elementClass);
    return newElement;
  };

  var showComments = function (comments) {
    var bigPictureComments = bigPicture.querySelectorAll('.social__comment');
    bigPictureComments.forEach(function (element) {
      element.remove();
    });
    comments.forEach(function (element) {
      var commentItem = createElement('li', 'social__comment');
      commentItem.style.display = 'none';
      var comment = createElement('p', 'social__text');
      var commentImg = createElement('img', 'social__picture');
      comment.textContent = element.message;
      commentImg.src = element.avatar;
      commentImg.alt = element.name;
      commentImg.width = AVATAR_WIDTH;
      bigPictureCommentsList.appendChild(commentItem);
      commentItem.appendChild(commentImg);
      commentItem.appendChild(comment);

      var idx = comments.indexOf(element);
      if (idx < COMMENTS_SHOWN) {
        commentLink.classList.add('hidden');
        commentItem.style.display = 'flex';
      } else {
        commentLink.classList.remove('hidden');
      }
    });
  };

  var showMoreComments = function (evt) {
    evt.preventDefault();
    var parentBlock = evt.target.parentNode;
    var commentItems = parentBlock.querySelectorAll('.social__comment');
    var newArray = Array.prototype.slice.call(commentItems);
    commentItems.forEach(function (element) {
      if (element.style.display === 'flex') {
        newArray.shift(element);
      }
      return newArray;
    });
    newArray.forEach(function (element) {
      var idx = newArray.indexOf(element);
      if (idx >= 0 && idx < COMMENTS_SHOWN) {
        element.style.display = 'flex';
      }
    });
    if (newArray.length < COMMENTS_SHOWN) {
      commentLink.classList.add('hidden');
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', window.util.onSectionEscPress);
  };

  commentLink.addEventListener('click', showMoreComments);

  bigPictureClose.addEventListener('click', closeBigPicture);

  window.bigphoto = {
    show: showBigPicture,
    close: closeBigPicture
  };
})();
