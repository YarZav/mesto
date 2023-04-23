// Import

import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm }  from "./PopupWithForm.js";
import { PopupWithImage }  from "./PopupWithImage.js";
import { UserInfo }  from "./UserInfo.js";
import { initialCards } from "./сonstants.js";

// UI elements

const section = new Section(initialCards, setupElement, ".elements")
const popupProfile = new PopupWithForm(".popup_type_profile", updateProfileData);
const popupPlace = new PopupWithForm(".popup_type_place", addCardData);
const popupImage = new PopupWithImage();
const userInfo = new UserInfo(".profile__name", ".profile__description")

const body = document.querySelector("body");
const profileEditButton = body.querySelector(".profile__edit-button");
const profileAddButton = body.querySelector(".profile__add-button");

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

profileEditButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  popupProfile.open(data);
  popupProfile.setEventListeners();
});

function updateProfileData(data) {
  userInfo.setUserInfo(data)
}

profileAddButton.addEventListener("click", function () {
  const data = { name: "", description: "" };
  popupPlace.open(data);
  popupPlace.setEventListeners();
});

function addCardData(data) {
  const cardData = { name: data.name, link: data.description };
  const cardElement = setupElement(cardData);
  prependElement(cardElement);
}

// Element

section.renderElements();

function setupElement(cardData) {
  const templateSelector = "#element-template";
  const card = new Card(cardData, templateSelector, onOpenElement);
  const cardElement = card.getCardElement();

  section.addItem(cardElement);
}

function onOpenElement(cardData) {
  popupImage.open(cardData);
  popupImage.setEventListeners();
}