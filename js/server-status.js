'use strict';
(function () {
  window.initServerStatus = function () {
    var mainPage = document.querySelector('main');
    var impUpload = document.querySelector('.img-upload__overlay');

    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var responseData = function () {
      impUpload.classList.add('hidden');
      var successElement = successTemplate.cloneNode(true);
      mainPage.appendChild(successElement);
      window.resetForm();
      successElement.addEventListener('click', function () {
        onSectionClick('success');
      });
    };

    var showErrorOfLoad = function (message) {
      var errorElement = errorTemplate.cloneNode(true);
      errorElement.querySelector('.error__buttons > button:last-child').classList.add('hidden');
      errorElement.querySelector('.error__title').textContent = message;
      mainPage.appendChild(errorElement);
      errorElement.addEventListener('click', function () {
        onSectionClick('error');
      });
    };

    var showErrorOfLoadForm = function (message) {
      impUpload.classList.add('hidden');
      showErrorOfLoad(message);
      window.resetForm();
      var errorSection = document.querySelector('.error');
      errorSection.querySelector('.error__buttons > button:last-child').classList.remove('hidden');
    };

    var closeSection = function (section) {
      var sectionElement = document.querySelector('.' + section);
      mainPage.removeChild(sectionElement);
      document.removeEventListener('click', onSectionClick);
    };

    var onSectionClick = function (section) {
      closeSection(section);
    };

    window.serverStatus = {
      responseData: responseData,
      showErrorOfLoad: showErrorOfLoad,
      showErrorOfLoadForm: showErrorOfLoadForm,
      close: closeSection
    };
  };
})();
