import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    // Init

    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;

        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._handleSubmitBinder = this._handleSubmit.bind(this)
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

    _reset() {
        this._inputList.forEach(input => input.value = "");
    }

    // Overrride public

    open() {
        super.open();

        this._popup.addEventListener("submit", this._handleSubmitBinder);

        this._inputList.forEach((input) => {
            input.dispatchEvent(new Event('keyup'));
        });
    }

    close() {
        this._reset();

        super.close();

        this._popup.removeEventListener('click', this._handleCrossButtonClose);
    }

    setInputValues(data) {
        this._submitButton.value = "Сохранить";

        this._inputList.forEach((input) => {
            console.log(input.name);
            console.log(data);
            input.value = data[input.name];
        });
    }

    setLoading() {
        this._submitButton.value = "Сохранение...";
    }
}

export { PopupWithForm }