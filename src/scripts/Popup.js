class Popup {
    // Init

    constructor(popupSelector) {
        this._popupSelector = popupSelector;

        this._popup = document.querySelector(popupSelector);
        this._submitButton = this._popup.querySelector(".popup__button");
        this._popupCrossButton = this._popup.querySelector(".popup__cross-button");

        this._handleEscCloseBinder = this._handleEscClose.bind(this);
        this._handleOverlayCloseBinder = this._handleOverlayClose.bind(this);
        this._handleCrossButtonCloseBinder = this.close.bind(this)
    }

    // Private

    _handleEscClose(event) {
        if (event.key === "Escape" || event.key === "Esc") {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target !== event.currentTarget) return;
        this.close();
    }

    _removeListeners() {
        document.removeEventListener('keydown', this._handleEscCloseBinder);
        this._popup.removeEventListener('click', this._handleOverlayCloseBinder);
        this._popupCrossButton.removeEventListener('click', this._handleCrossButtonClose);
    }

    // Public

    open() {
        this._popup.classList.add("popup_opened");
        this.setEventListeners();
    }

    close() {
        this._removeListeners();
        this._popup.classList.remove("popup_opened");
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscCloseBinder);
        this._popup.addEventListener("click", this._handleOverlayCloseBinder);
        this._popupCrossButton.addEventListener('click', this._handleCrossButtonCloseBinder);
    }
}

export { Popup }