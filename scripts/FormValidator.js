class FormValidator {
    constructor(formConfiguration, form) {
        this._formConfiguration = formConfiguration;
        this._form = form;
    }

    // Private

    _setupPopupListeners(form, formConfiguration) {
        const inputs = Array.from(form.querySelectorAll(formConfiguration.inputSelector));
    
        inputs.forEach((input) => {
            this._setupInputListener(form, input, formConfiguration);
        });
    }
    
    _setupInputListener(form, input, formConfiguration) {
        const updateSubmitButton = this._updateSubmitButton;

        input.addEventListener('input', function (event) {
            input.nextElementSibling.textContent = event.target.validationMessage;
    
            if (input.validity.valid) {
                input.classList.remove(formConfiguration.inputErrorClass);
                input.nextElementSibling.classList.remove(formConfiguration.errorClass);
            } else {
                input.classList.add(formConfiguration.inputErrorClass);
                input.nextElementSibling.classList.add(formConfiguration.errorClass);
            }
    
            updateSubmitButton(form, formConfiguration);
        });
    }
    
    _updateSubmitButton(form, formConfiguration) {
        const inputs = Array.from(form.querySelectorAll(formConfiguration.inputSelector));
        const isInputsValid = inputs.map(input => input.validity.valid).every(valid => valid === true);
        const button = form.querySelector(formConfiguration.submitButtonSelector);
    
        if (isInputsValid) {
            button.classList.remove(formConfiguration.inactiveButtonClass);
            button.removeAttribute("disabled");
        } else {
            button.classList.add(formConfiguration.inactiveButtonClass);
            button.setAttribute("disabled", true);
        }
    }

    // Public

    enableValidation() {
        this._setupPopupListeners(this._form, this._formConfiguration);
    }
}

// Export

export { FormValidator }