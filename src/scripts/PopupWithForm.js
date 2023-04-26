import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    // Init

    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;
    }

    // Private

    _getInputValues() {
        const name = this._popup.querySelector(".popup__input_type_name").value;
        const description = this._popup.querySelector(".popup__input_type_description").value;

        return { name: name, description: description }
    }

    _handleSubmit(event) {
        event.preventDefault();

        const inputValues = this._getInputValues();
        this._submitHandler(inputValues);

        this._popupCrossButton.click();
    }

    // Overrride public

    open(data) {
        this._popup.querySelector(".popup__input_type_name").value = data.name;
        this._popup.querySelector(".popup__input_type_description").value = data.description;

        super.open();
    }

    close() {
        this._popup.querySelector(".popup__input_type_name").value = "";
        this._popup.querySelector(".popup__input_type_description").value = "";

        super.close();
    }

    setEventListeners() {
        this._popup.addEventListener("submit", this._handleSubmit.bind(this));

        super.setEventListeners();
    }
}

export { PopupWithForm }