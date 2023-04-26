class FormValidator {
    constructor(formConfiguration, form) {
        this._formConfiguration = formConfiguration;
        this._form = form;

        this._submitButton = form.querySelector(formConfiguration.submitButtonSelector);
    }

    // Private

    _setupPopupListeners() {    
        this._inputs.forEach((input) => {
            this._setupInputListener(input);
        });
    }
    
    _setupInputListener(input) {
        input.addEventListener('keyup', (event) => {
            input.nextElementSibling.textContent = event.target.validationMessage;
    
            if (input.validity.valid) {
                input.classList.remove(this._formConfiguration.inputErrorClass);
                input.nextElementSibling.classList.remove(this._formConfiguration.errorClass);
            } else {
                input.classList.add(this._formConfiguration.inputErrorClass);
                input.nextElementSibling.classList.add(this._formConfiguration.errorClass);
            }
    
            this._updateSubmitButton();
        });
    }
    
    _updateSubmitButton() {
        const isInputsValid = this._inputs.map(input => input.validity.valid).every(valid => valid === true);
    
        if (isInputsValid) {
            this._submitButton.classList.remove(this._formConfiguration.inactiveButtonClass);
            this._submitButton.removeAttribute("disabled");
        } else {
            this._submitButton.classList.add(this._formConfiguration.inactiveButtonClass);
            this._submitButton.setAttribute("disabled", true);
        }
    }

    // Public

    enableValidation() {
        this._inputs = Array.from(this._form.querySelectorAll(this._formConfiguration.inputSelector));

        this._setupPopupListeners(this._form, this._formConfiguration);
    }
}

// Export

export { FormValidator }