'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLOR = ['black', 'red', 'blue', 'eyllow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

//--------------------------- 1 ----------------------------
var setupShow = function(userDialog) {
  userDialog.classList.remove('page-hidden');
}

//--------------------------- 2 ----------------------------
var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getWizardsArray = function (names, surnames, coatColors, eyesColors) {
  var wizardsArray = [];

  for (var i = 0; i < 4; i++) {
    wizardsArray[i] = {
      name: getRandomItem(names) + ' ' + getRandomItem(surnames),
      coatColor: getRandomItem(coatColors),
      eyesColor: getRandomItem(eyesColors)
    };
  }

  return wizardsArray;
};

//--------------------------- 3 ----------------------------
var renderWizard = function (wizard) {
  var wizardItem = similarWizardTemplate.cloneNode(true);

  wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardItem;
};

//--------------------------- 4 ----------------------------
var wizards = getWizardsArray(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);

var getWizardsFragment = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

//--------------------------- 5 ----------------------------
var setupSimilarShow = function() {
  var userDialog = document.querySelector('.setup-similar');

  userDialog.classList.remove('hidden');
};
