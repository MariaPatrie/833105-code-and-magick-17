'use strict';

(function () {

  window.util = {
    showElement: function (item) {
      item.classList.remove('hidden');
    },
    hideElement: function (item) {
      item.classList.add('hidden');
    }
  };

})();
