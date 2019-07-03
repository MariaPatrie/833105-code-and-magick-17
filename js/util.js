'use strict';

(function () {

  window.util = {
    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    showElement: function (item) {
      item.classList.remove('hidden');
    },
    hideElement: function (item) {
      item.classList.add('hidden');
    }
  };

})();
