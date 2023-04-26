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

        this._popupCrossButton.click();
    }

    // Overrride public

    open(data) {
        this._inputList[0].value = data.name;
        this._inputList[1].value = data.occupation;

        super.open();

        this._popup.addEventListener("submit", this._handleSubmitBinder);
    }

    close() {
        this._inputList.forEach(input => input.value = "")

        super.close();

        this._popup.removeEventListener('click', this._handleCrossButtonClose);
    }
}

export { PopupWithForm }