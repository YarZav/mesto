// Properties
let body = document.querySelector("body");

let popup = body.querySelector(".popup");
let popupContainer = popup.querySelector(".popup__container");
let popupCrossButton = popup.querySelector(".popup__cross-button");
let popupSubmitButton = popupContainer.querySelector(".popup__submit-button");
let popupName = popupContainer.querySelector(".popup__input-name");
let popupDescription = popupContainer.querySelector(".popup__input-description");

let profile = body.querySelector(".profile");
let profileInfo = profile.querySelector(".profile__info");
let profileEdit = profileInfo.querySelector(".profile__edit");
let profileName = profileEdit.querySelector(".profile__name");
let profileEditButton = profileEdit.querySelector(".profile__edit-button");
let profileDescription = profileInfo.querySelector(".profile__description");

popupCrossButton.addEventListener("click", onClosePopup);
popupContainer.addEventListener("submit", onSubmitPopup);
profileEditButton.addEventListener("click", onShowPopup);

// Name and description

function onSubmitPopup(evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;

    onClosePopup();
}

// Popup

function onShowPopup() {
    popup.classList.add("popup_opened");
    setDefaulPopupNameAndDescription();
}

function onClosePopup() {
    popup.classList.remove("popup_opened");
}

function setDefaulPopupNameAndDescription() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}