// Public

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// });

function enableValidation(popup) {
    addPopupNameValidationListener(popup);
    addPopupDescriptionValidationListener(popup);
}

function isPopupNameValid(popup) {
    return getPopupName(popup).validity.valid
}

function isPopupDescriptionValid(popup) {
    return getPopupDescription(popup).validity.valid
}

function isPopupValid(popup) {
    return isPopupNameValid(popup) && isPopupDescriptionValid(popup);
}

// Private

function addPopupNameValidationListener(popup) {
    getPopupName(popup).addEventListener('input', function (event) {
        getPopupErrorName(popup).textContent = event.target.validationMessage;
        updatePopupValid(popup);
    });
}
  
function addPopupDescriptionValidationListener(popup) {
    getPopupDescription(popup).addEventListener('input', function (event) {
        getPopupErrorDescription(popup).textContent = event.target.validationMessage;
        updatePopupValid(popup);
    });
}

function updatePopupValid(popup) {
    if (isPopupNameValid(popup)) {
        getPopupName(popup).classList.remove("popup__input_error");
    } else {
        getPopupName(popup).classList.add("popup__input_error");
    }

    if (isPopupDescriptionValid(popup)) {
        getPopupDescription(popup).classList.remove("popup__input_error");
    } else {
        getPopupDescription(popup).classList.add("popup__input_error");
    }

    if (isPopupValid(popup)) {
        getPopupSubmitButton(popup).classList.remove("popup-form__button_disabled");
    } else {
        getPopupSubmitButton(popup).classList.add("popup-form__button_disabled");
    }
}