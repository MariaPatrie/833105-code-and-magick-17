'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'eyllow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var wizards = [];

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
  var userNameInput = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');

  var onCoatClick = function () {
    var color = window.util.getRandomItem(COAT_COLORS);
    wizardCoat.style.fill = color;
    coatColorInput.value = color;
  };

  var onEyesClick = function () {
    var color = window.util.getRandomItem(EYES_COLORS);
    wizardEyes.style.fill = color;
    eyesColorInput.value = color;
  };

  var onFireballClick = function () {
    var color = window.util.getRandomItem(FIREBALL_COLORS);
    wizardFireball.style.background = color;
    fireballColorInput.value = color;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    window.util.showElement(setup);
    window.util.showElement(userDialogSimilar);
    document.addEventListener('keydown', onPopupEscPress);
    wizardCoat.addEventListener('click', onCoatClick);
    wizardEyes.addEventListener('click', onEyesClick);
    wizardFireball.addEventListener('click', onFireballClick);
  };

  var closePopup = function () {
    window.util.hideElement(setup);
    document.removeEventListener('keydown', onPopupEscPress);
    wizardCoat.removeEventListener('click', onCoatClick);
    wizardEyes.removeEventListener('click', onEyesClick);
    wizardFireball.removeEventListener('click', onFireballClick);
    setup.style.top = '5%';
    setup.style.left = '50%';
  };

  var onCheck = function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
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

  userNameInput.addEventListener('invalid', onCheck);

  var onSubmitHandler = function () {
    window.util.hideElement(setup);
  };

  var onErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSubmitHandler, onErrorHandler);
    evt.preventDefault();
  });

  var onLoadHandler = function (wizards) {
    window.wizard.render(wizards);
  };

  window.backend.load(onLoadHandler, onErrorHandler);
})();
