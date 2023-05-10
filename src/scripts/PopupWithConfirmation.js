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

        this._submitHandler(this._cardData, this._cardElement);
    }

    // Overrride public

    open(cardData, cardElement) {
        super.open();

        this._cardData = cardData;
        this._cardElement = cardElement;

        this._popup.addEventListener("submit", this._handleSubmitBinder);
    }

    close() {
        super.close();

        this._popup.removeEventListener('click', this._handleCrossButtonClose);
    }

    setLoading() {
        this._submitButton.value = "Удаление...";
    }
}

export { PopupWithConfirmation }