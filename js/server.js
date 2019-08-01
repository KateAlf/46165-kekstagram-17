'use strict';

(function () {
  var Code = {
    SUCCESS: 200,
    INCORRECT_REQUEST: 400,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  var serverResponse = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.INCORRECT_REQUEST:
          onError('Неверный запрос');
          break;
        case Code.NOT_FOUND_ERROR:
          onError('Данных не найдено');
          break;
        case Code.SERVER_ERROR:
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

  var load = function (URL, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    serverResponse(xhr, onSuccess);
    xhr.timeout = 10000;
    xhr.open('GET', window.util.URL_GET);
    xhr.send(null);
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    serverResponse(xhr, onSuccess, onError);
    xhr.open('POST', window.util.URL_POST);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };

})();
