class Popup {
    // Init

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    // Private

    _removeListeners() {
        const popup = document.querySelector(this._popupSelector);
        const popupCrossButton = popup.querySelector(".popup__cross-button")

        popup.removeEventListener('click', this._closeByOverlay);
        popupCrossButton.removeEventListener('click', this._handleCrossButtonClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape" || event.key === "Esc") {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target !== event.currentTarget) return;
        this.close();
    }

    // Public

    open() {
        const popup = document.querySelector(this._popupSelector);

        popup.classList.add("popup_opened");
    }

    close() {
        const popup = document.querySelector(this._popupSelector);

        popup.classList.remove("popup_opened");
        this._removeListeners();
    }

    setEventListeners() {
        const popup = document.querySelector(this._popupSelector);
        const popupCrossButton = popup.querySelector(".popup__cross-button")

        document.addEventListener('keydown', this._handleEscClose.bind(this));
        popup.addEventListener("click", this._handleOverlayClose.bind(this));
        popupCrossButton.addEventListener('click', this.close.bind(this));
    }
}

export { Popup }