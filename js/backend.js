'use strict';

(function () {
  var STATUS_OK = 200;
  var TIME = 10000;

  window.backend = {
    save: function (url, data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('POST', url);
      xhr.send(data);
    },

    load: function (url, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.timeout = TIME;
      xhr.open('GET', url);
      xhr.send();
    }
  };

  var createRequest = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };
})();
