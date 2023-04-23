import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    // Init

    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;
    }

    // Private

    _getInputValues() {
        const popup = document.querySelector(this._popupSelector);
        const name = popup.querySelector(".popup__input_type_name").value;
        const description = popup.querySelector(".popup__input_type_description").value;

        return { name: name, description: description }
    }

    _handleSubmit(event) {
        event.preventDefault();

        const inputValues = this._getInputValues();
        this._submitHandler(inputValues);

        const popup = document.querySelector(this._popupSelector);
        const crossButton = popup.querySelector(".popup__cross-button");
        crossButton.click();
    }

    // Overrride public

    open(data) {
        const popup = document.querySelector(this._popupSelector);
        popup.querySelector(".popup__input_type_name").value = data.name;
        popup.querySelector(".popup__input_type_description").value = data.description;

        super.open();
    }

    close() {
        const popup = document.querySelector(this._popupSelector);
        popup.querySelector(".popup__input_type_name").value = "";
        popup.querySelector(".popup__input_type_description").value = "";

        super.close();
    }

    setEventListeners() {
        const popup = document.querySelector(this._popupSelector);
        popup.addEventListener("submit", this._handleSubmit.bind(this));

        super.setEventListeners();
    }
}

export { PopupWithForm }