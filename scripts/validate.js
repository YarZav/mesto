// Public

function isPopupValid(popup) {
    return getPopupName(popup).validity.valid && getPopupDescription(popup).validity.valid;
}

function enableValidation(popup) {
    addPopupNameValidationListener(popup);
    addPopupDescriptionValidationListener(popup);
}

// Private

function addPopupNameValidationListener(popup) {
    getPopupName(popup).addEventListener('input', function (event) {
        getPopupErrorName(popup).textContent = event.target.validationMessage;
        updatePopupSubmitButton(popup);
    });
}
  
function addPopupDescriptionValidationListener(popup) {
    getPopupDescription(popup).addEventListener('input', function (event) {
        getPopupErrorDescription(popup).textContent = event.target.validationMessage;
        updatePopupSubmitButton(popup);
    });
}

function updatePopupSubmitButton(popup) {
    if (isPopupValid(popup)) {
        getPopupSubmitButton(popup).classList.remove("popup-form__button_disabled");
    } else {
        getPopupSubmitButton(popup).classList.add("popup-form__button_disabled");
    }
}