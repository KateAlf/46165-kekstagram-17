'use strict';

(function () {

  var serverResponse = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Данных не найдено');
          break;
        case 500:
          onError('Ошибка сервера');
          break;

        default:
          onError(
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

  window.load = function (URL, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    serverResponse(xhr, onSuccess);
    xhr.timeout = 10000;
    xhr.open('GET', window.util.URL_GET);
    xhr.send(null);
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    serverResponse(xhr, onSuccess, onError);
    xhr.open('POST', window.util.URL_POST);
    xhr.send(data);
  };
})();
