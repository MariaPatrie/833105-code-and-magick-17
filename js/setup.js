'use strict';

var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'eyllow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var coatColorInput = setup.querySelector('input[name=coat-color]');
var eyesColorInput = setup.querySelector('input[name=eyes-color]');
var fireballColorInput = setup.querySelector('input[name=fireball-color]');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userDialogSimilar = document.querySelector('.setup-similar');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var userNameInput = setup.querySelector('.setup-user-name');

var wizards = [];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var showElement = function (item) {
  item.classList.remove('hidden');
};

var deleteElement = function (item) {
  item.classList.add('hidden');
};

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getWizardsArray = function (names, surnames, coatColors, eyesColors) {
  var wizardsArray = [];

  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizardsArray[i] = {
      name: getRandomItem(names) + ' ' + getRandomItem(surnames),
      coatColor: getRandomItem(coatColors),
      eyesColor: getRandomItem(eyesColors)
    };
  }

  return wizardsArray;
};

var getWizard = function (wizard) {
  var wizardItem = similarWizardTemplate.cloneNode(true);

  wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardItem;
};

var renderWizards = function (wizardsArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(getWizard(wizardsArray[i]));
  }

  similarListElement.appendChild(fragment);
};

var onCoatClick = function () {
  var color = getRandomItem(COAT_COLORS);
  wizardCoat.style.fill = color;
  coatColorInput.value = color;
};

var onEyesClick = function () {
  var color = getRandomItem(EYES_COLORS);
  wizardEyes.style.fill = color;
  eyesColorInput.value = color;
};

var onFireballClick = function () {
  var color = getRandomItem(FIREBALL_COLORS);
  wizardFireball.style.background = color;
  fireballColorInput.value = color;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  showElement(setup);
  showElement(userDialogSimilar);
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  wizardFireball.addEventListener('click', onFireballClick);
};

var closePopup = function () {
  deleteElement(setup);
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', onCoatClick);
  wizardEyes.removeEventListener('click', onEyesClick);
  wizardFireball.removeEventListener('click', onFireballClick);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

wizards = getWizardsArray(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);
renderWizards(wizards);
