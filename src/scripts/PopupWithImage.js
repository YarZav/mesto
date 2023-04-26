import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    // Init

    constructor() {
        super(".popup_type_image");
    }

    // Override public

    open(cardData) {
        const popupImage = this._popup.querySelector(".popup__image");
        const popupImageDescription = this._popup.querySelector(".popup__image-description");

        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupImageDescription.textContent = cardData.name;

        super.open();
    }
}

export { PopupWithImage }