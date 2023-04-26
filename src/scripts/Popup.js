class Popup {
    // Init

    constructor(popupSelector) {
        this._popupSelector = popupSelector;

        this._popup = document.querySelector(popupSelector);
        this._popupCrossButton = this._popup.querySelector(".popup__cross-button")
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

    // Public

    open() {
        this._popup.classList.add("popup_opened");
    }

    close() {
        this._popup.classList.remove("popup_opened");
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.addEventListener("click", this._handleOverlayClose.bind(this));
        this._popupCrossButton.addEventListener('click', this.close.bind(this));
    }
}

export { Popup }