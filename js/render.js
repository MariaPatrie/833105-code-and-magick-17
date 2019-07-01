'use strict';

(function () {
  var WIZARD_COUNT = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'eyllow', 'green'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var getWizard = function (wizard) {
    var wizardItem = similarWizardTemplate.cloneNode(true);

    wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardItem;
  };

  window.render = {
    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getWizardsArray: function () {
      var wizardsArray = [];

      for (var i = 0; i < WIZARD_COUNT; i++) {
        wizardsArray[i] = {
          name: this.getRandomItem(WIZARD_NAMES) + ' ' + this.getRandomItem(WIZARD_SURNAMES),
          coatColor: this.getRandomItem(COAT_COLORS),
          eyesColor: this.getRandomItem(EYES_COLORS)
        };
      };
    },
    renderWizards: function (wizardsArray) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < wizardsArray.length; i++) {
        fragment.appendChild(getWizard(wizardsArray[i]));
      }

      similarListElement.appendChild(fragment);
    }
  };

})();
