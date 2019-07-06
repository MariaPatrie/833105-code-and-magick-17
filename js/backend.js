'use strict';

(function () {
  var urlPost = 'https://js.dump.academy/code-and-magick';
  var urlGet = 'https://js.dump.academy/code-and-magick/data';

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('POST', urlPost);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.timeout = 10000;
      xhr.open('GET', urlGet);
      xhr.send();
    }
  };

  var createRequest = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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