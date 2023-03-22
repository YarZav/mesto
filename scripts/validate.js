// Public

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

function enableValidation(popupConfiguration) {
    const popups = Array.from(document.querySelectorAll(popupConfiguration.formSelector));

    popups.forEach((popup) => {
        setupPopupListeners(popup, popupConfiguration);
    });
}

function setupPopupListeners(popup, popupConfiguration) {
    const inputs = Array.from(popup.querySelectorAll(popupConfiguration.inputSelector));

    inputs.forEach((input) => {
        setupInputListener(popup, input, popupConfiguration);
    });
}

function setupInputListener(popup, input, popupConfiguration) {
    input.addEventListener('input', function (event) {
        input.nextElementSibling.textContent = event.target.validationMessage;

        if (input.validity.valid) {
            input.classList.remove(popupConfiguration.inputErrorClass);
            input.nextElementSibling.classList.remove(popupConfiguration.errorClass);
        } else {
            input.classList.add(popupConfiguration.inputErrorClass);
            input.nextElementSibling.classList.add(popupConfiguration.errorClass);
        }

        updateSubmitButton(popup, popupConfiguration);
    });
}

function updateSubmitButton(popup, popupConfiguration) {
    const inputs = Array.from(popup.querySelectorAll(popupConfiguration.inputSelector));
    const isInputsValid = inputs.map(input => input.validity.valid).every(valid => valid === true);
    const button = popup.querySelector(popupConfiguration.submitButtonSelector);

    if (isInputsValid) {
        button.classList.remove(popupConfiguration.inactiveButtonClass);
        button.removeAttribute("disabled");
    } else {
        button.classList.add(popupConfiguration.inactiveButtonClass);
        button.setAttribute("disabled", true);
    }
}