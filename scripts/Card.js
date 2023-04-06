class Card {
    // Init

    constructor(data, templateSelector, onOpenPopup) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._onOpenPopup = onOpenPopup;
    }

    // Private

    _setupCardElement() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        this._cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    }

    _setDataForCardElement() {
        this._cardElementImage = this._cardElement.querySelector(".element__image");
        this._cardElementImage.src = this._data.link;
        this._cardElementImage.alt = this._data.name;

        this._cardElement.querySelector(".element__info").querySelector(".element__title").textContent = this._data.name;
    }

    _setListenersForCardElement() {
        const data = this._data;
        const onOpenPopup = this._onOpenPopup;

        this._cardElement.querySelector(".element__info")
            .querySelector(".element__heart-button")
            .addEventListener("click", this._onLikePlace);
  
        this._cardElement.querySelector(".element__delete-button")
            .addEventListener("click", this._onDeletePlace);

        this._cardElementImage
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

    // Public

    getCardElement() {
        this._setupCardElement();
        this._setDataForCardElement();
        this._setListenersForCardElement();

        return this._cardElement;
    }
}

// Export

export { Card }