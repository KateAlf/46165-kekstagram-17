'use strict';

(function () {
  window.load = function (URL, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send(null);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          window.onError('Не верный запрос');
          break;
        case 401:
          window.onError('Пользователь не авторизован');
          break;
        case 404:
          window.onError('Данных не найдено');
          break;
        case 500:
          window.onError('Ошибка сервера');
          break;

        default:
          window.onError(
              'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText
          );
      }
    });
    xhr.addEventListener('error', function () {
      window.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };
})();
