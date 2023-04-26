import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    // Init

    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;

        this._inputName = this._popup.querySelector(".popup__input_type_name");
        this._inputDescription = this._popup.querySelector(".popup__input_type_description");

        this._handleSubmitBinder = this._handleSubmit.bind(this)
    }

    // Private

    _getInputValues() {
        return { name: this._inputName.value, description: this._inputDescription.value }
    }

    _handleSubmit(event) {
        event.preventDefault();

        const inputValues = this._getInputValues();
        this._submitHandler(inputValues);

        this._popupCrossButton.click();
    }

    // Overrride public

    open(data) {
        this._inputName.value = data.name;
        this._inputDescription.value = data.description;

        super.open();

        this._popup.addEventListener("submit", this._handleSubmitBinder);
    }

    close() {
        this._inputName.value = "";
        this._inputDescription.value = "";

        super.close();

        this._popup.removeEventListener('click', this._handleCrossButtonClose);
    }
}

export { PopupWithForm }