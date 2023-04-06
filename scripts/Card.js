class Card {
    // Init

    constructor(data, templateSelector, onOpenPopup) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._onOpenPopup = onOpenPopup;
    }

    // Private

    _getCardElement() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
        return cardElement;
    }

    _setDataForCardElement(cardElement) {
        cardElement.querySelector(".element__image").src = this._data.link;
        cardElement.querySelector(".element__image").alt = this._data.name;
        cardElement.querySelector(".element__info").querySelector(".element__title").textContent = this._data.name;
    }

    _setListenersForCardElement(cardElement) {
        const data = this._data;
        const onOpenPopup = this._onOpenPopup;

        cardElement.querySelector(".element__info")
            .querySelector(".element__heart-button")
            .addEventListener("click", this._onLikePlace);
  
        cardElement.querySelector(".element__delete-button")
            .addEventListener("click", this._onDeletePlace);

        cardElement.querySelector(".element__image")
            .addEventListener("click", function () {
                onOpenPopup(data);
            });
    }

    _onLikePlace(event) {
        event.target.classList.toggle("element__heart-button_active");
    }

    _onDeletePlace(event) {
        event.target.closest(".element").remove();
    }

    _onShowPopup(event) {
        console.log(event);
        // this._onOpenPopup(this._data);
    }

    // Public

    getCardElement() {
        const cardElement = this._getCardElement();

        this._setDataForCardElement(cardElement);
        this._setListenersForCardElement(cardElement);

        return cardElement;
    }
}

// Export

export { Card }