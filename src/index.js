// Import

// CSS
import "./pages/index.css";

// Modules
import { Card } from "./scripts/Card.js";
import { Section } from "./scripts/Section.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { PopupWithForm }  from "./scripts/PopupWithForm.js";
import { PopupWithImage }  from "./scripts/PopupWithImage.js";
import { UserInfo }  from "./scripts/UserInfo.js";
import { initialCards } from "./scripts/сonstants.js";

// UI elements

const section = new Section(initialCards, setupElement, ".elements")
const popupProfile = new PopupWithForm(".popup_type_profile", updateProfileData);
const popupPlace = new PopupWithForm(".popup_type_place", addCardData);
const popupImage = new PopupWithImage();
const userInfo = new UserInfo(".profile__name", ".profile__description")

const body = document.querySelector("body");
const profileEditButton = body.querySelector(".profile__edit-button");
const profileAddButton = body.querySelector(".profile__add-button");

// Setup

body.querySelector(".header__logo").src = new URL("./images/header_logo.svg", import.meta.url);
body.querySelector(".profile__avatar").src = new URL("./images/profile.jpg", import.meta.url);

section.renderElements();

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupImage.setEventListeners();

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
});

function updateProfileData(data) {
  userInfo.setUserInfo(data)
}

profileAddButton.addEventListener("click", function () {
  const data = { name: "", description: "" };
  popupPlace.open(data);
});

function addCardData(data) {
  const cardData = { name: data.name, link: data.description };
  setupElement(cardData);
}

// Element

function setupElement(cardData) {
  const templateSelector = "#element-template";
  const card = new Card(cardData, templateSelector, onOpenElement);
  const cardElement = card.getCardElement();

  section.addItem(cardElement);
}

function onOpenElement(cardData) {
  popupImage.open(cardData);
}