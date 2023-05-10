import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    // Init

    constructor() {
        super(".popup_type_image");

        this._popupImage = this._popup.querySelector(".popup__image");
        this._popupImageDescription = this._popup.querySelector(".popup__image-description");
    }

    // Override public

    open(cardData) {
        this._popupImage.src = cardData.link;
        this._popupImage.alt = cardData.name;
        this._popupImageDescription.textContent = cardData.name;

        super.open();
    }
}

export { PopupWithImage }