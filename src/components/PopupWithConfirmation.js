import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
    // Init

    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;
        this._handleSubmitBinder = this._handleSubmit.bind(this)
        this._submitButton = this._popup.querySelector(".popup__button");
    }

    // Private

    _handleSubmit(event) {
        event.preventDefault();

        this._submitHandler(this._card);
    }

    // Overrride public

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener("submit", this._handleSubmitBinder);
    }

    open(card) {
        super.open();

        this._card = card;
    }

    close() {
        super.close();
    }

    setLoading(isLoading) {
        this._submitButton.value = isLoading ? "Удаление..." : "Да";
    }
}

export { PopupWithConfirmation }