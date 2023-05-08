class Card {
    // Init

    constructor(cardData, userData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._cardData = cardData;
        this._userData = userData;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    // Private

    _setupCardElement() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        this._cardElement = cardTemplate.querySelector(".element").cloneNode(true);
        this._cardElementImage = this._cardElement.querySelector(".element__image");
        this._cardElementLikeCount = this._cardElement.querySelector(".element__like-count");
        this._cardElementInfo = this._cardElement.querySelector(".element__info");
        this._cardElementTitle = this._cardElementInfo.querySelector(".element__title");
        this._cardElementHeartButton = this._cardElementInfo.querySelector(".element__heart-button");
        this._cardElementDeleteButton =  this._cardElement.querySelector(".element__delete-button");
    }

    _setDataForCardElement() {
        const isDeleteButtonShown = this._cardData.owner._id === this._userData._id;
        const isLiked = this._cardData.likes.filter(like => like._id === this._userData._id).length > 0;

        this._cardElementImage.src = this._cardData.link;
        this._cardElementImage.alt = this._cardData.name;
        this._cardElementLikeCount.textContent = this._cardData.likes.length;
        this._cardElementTitle.textContent = this._cardData.name;
        this._cardElementDeleteButton.style.display = isDeleteButtonShown ? "block" : "none";
        if (isLiked) {
            this._cardElementHeartButton.classList.add("element__heart-button_active");
        }
    }

    _setListenersForCardElement() {
        this._cardElementHeartButton.addEventListener("click", this._onLikePlace.bind(this));
  
        this._cardElementDeleteButton.addEventListener("click", this._onDeletePlace.bind(this));

        this._cardElementImage.addEventListener("click", () => {
            this._handleCardClick(this._cardData);
        });
    }

    _onLikePlace() {
        this._handleLikeClick(this._cardData, this._cardElement);
    }

    _onDeletePlace() {
        this._handleDeleteClick(this._cardData, this._cardElement);
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