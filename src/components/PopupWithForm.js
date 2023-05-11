import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    // Init

    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._submitButton = this._popup.querySelector(".popup__button");
        this._popupForm = this._popup.querySelector(".popup__form");
        this._handleSubmitBinder = this._handleSubmit.bind(this);
        this._submitButtonText = this._submitButton.value
    }

    // Private

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    _handleSubmit(event) {
        event.preventDefault();

        const inputValues = this._getInputValues();
        this._submitHandler(inputValues);
    }

    // Overrride public

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener("submit", this._handleSubmitBinder);
    }

    close() {
        this._popupForm.reset();

        super.close();
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            console.log(input.name);
            console.log(data);
            input.value = data[input.name];
        });
    }

    setLoading(isLoading) {
        this._submitButton.value = isLoading ? "Сохранение..." : this._submitButtonText;
    }
}

export { PopupWithForm }