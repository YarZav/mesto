class FormValidator {
    constructor(formConfiguration, form) {
        this._formConfiguration = formConfiguration;
        this._form = form;
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
        const button = this._form.querySelector(this._formConfiguration.submitButtonSelector);
    
        if (isInputsValid) {
            button.classList.remove(this._formConfiguration.inactiveButtonClass);
            button.removeAttribute("disabled");
        } else {
            button.classList.add(this._formConfiguration.inactiveButtonClass);
            button.setAttribute("disabled", true);
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