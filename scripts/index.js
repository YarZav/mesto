// Import

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./Constants.js";

// UI elements

const body = document.querySelector("body");

const popupProfile = body.querySelector(".popup_type_profile");
const popupProfileName = popupProfile.querySelector(".popup__input_type_name");
const popupProfileDescription = popupProfile.querySelector(".popup__input_type_description");
const popupProfileCrossButton = popupProfile.querySelector(".popup__cross-button");

const popupPlace = body.querySelector(".popup_type_place");
const popupPlaceName = popupPlace.querySelector(".popup__input_type_name");
const popupPlaceDescription = popupPlace.querySelector(".popup__input_type_description");
const popupPlaceCrossButton = popupPlace.querySelector(".popup__cross-button");

const popupImage = body.querySelector(".popup_type_image");
const popupImageFigureImage = popupImage.querySelector(".popup__image");
const popupImageFigureDescription = popupImage.querySelector(".popup__image-description");
const popupImageCrossButton = popupImage.querySelector(".popup__cross-button");

const profile = body.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileDescription = profile.querySelector(".profile__description");
const profileAddButton = profile.querySelector(".profile__add-button");

const elementContainer = body.querySelector(".elements");

// Validation

enableValidationForms();

function enableValidationForms() {
  const formConfiguration = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };
  
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  forms.forEach((form) => {
    const formValidator = new FormValidator(formConfiguration, form);
    formValidator.enableValidation();
  });
}

// Profile

profileEditButton.addEventListener("click", function (event) {
  setupPopup(
    popupProfile, 
    popupProfileName, 
    popupProfileDescription,
    popupProfileCrossButton,
    profileName.textContent, 
    profileDescription.textContent
  );
});

profileAddButton.addEventListener("click", function (event) {
  setupPopup(
    popupPlace, 
    popupPlaceName, 
    popupPlaceDescription,
    popupPlaceCrossButton
  );
});

// Popup profile

popupProfile.addEventListener("submit", function (event) {
  event.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;

  popupProfileCrossButton.click();
});

// Popup Place

popupPlace.addEventListener("submit", function (event) {
  event.preventDefault();

  const cardData = { 
    name: popupPlaceName.value,
    link: popupPlaceDescription.value
  }

  setupElement(cardData);

  popupPlaceCrossButton.click();
});

// Element

setupElements();

function setupElements() {
  initialCards.forEach(initialCard => setupElement(initialCard) );
}

function setupElement(data) {
  const templateSelector = "#element-template";
  const card = new Card(data, templateSelector, onOpenElementPopup);
  const cardElement = card.getCardElement();

  elementContainer.prepend(cardElement);
}

function onOpenElementPopup(cardData) {
  openPopup(popupImage, popupImageCrossButton);

  popupImageFigureImage.src = cardData.link;
  popupImageFigureImage.alt = cardData.name;
  popupImageFigureDescription.textContent = cardData.name;
}

// Popup init

function setupPopup(popup, popupName, popupDescription, crossButton, name = "", description = "") {
  setupPopupDefault(popupName, popupDescription, name, description);
  openPopup(popup, crossButton);
}

function setupPopupDefault(popupName, popupDescription, name, description) {
  popupName.value = name;
  popupDescription.value = description;

  popupName.dispatchEvent(new Event("input"));
  popupDescription.dispatchEvent(new Event("input"));
}

// Popup close events

function addPopupCloseListeners(popup, crossButton) {
  popup.addEventListener("click", closeByOverlay);
  crossButton.addEventListener('click', closeByCrossButton);
  document.addEventListener('keydown', closeByEscape);
}

function removePopupCloseListenres(popup) {
  popup.removeEventListener('click', closeByOverlay);
  popup.querySelector(".popup__cross-button").removeEventListener('click', closeByCrossButton);
  document.removeEventListener('keydown', closeByEscape);
}

function closeByOverlay(event) {
  if (event.target !== event.currentTarget) return;
  closePopup(event.target);
}

function closeByCrossButton() {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function closeByEscape(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Popup open/close

function openPopup(popup, crossButton) {
  popup.classList.add("popup_opened");
  addPopupCloseListeners(popup, crossButton);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removePopupCloseListenres(popup);
}