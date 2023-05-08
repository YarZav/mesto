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

// API

import { Api } from "./scripts/Api";

// UI elements

const section = new Section(setupElement, ".elements")
const popupProfile = new PopupWithForm(".popup_type_profile", updateProfileData);
const popupPlace = new PopupWithForm(".popup_type_place", addCardData);
const popupImage = new PopupWithImage();
const userInfo = new UserInfo(".profile__name", ".profile__description")

const body = document.querySelector("body");
const profileAvatar = body.querySelector(".profile__avatar");
const profileInfo = body.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileEditButton = body.querySelector(".profile__edit-button");
const profileAddButton = body.querySelector(".profile__add-button");
const profileLoader = body.querySelector(".profile").querySelector(".loader");

const elements = body.querySelector(".elements");
const elementsLoader = elements.querySelector(".loader");

// Setup UI

body.querySelector(".header__logo").src = new URL("./images/header_logo.svg", import.meta.url);

// API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'e4e7d31e-adbb-40d6-b9b1-467496d1a1d0',
    'Content-Type': 'application/json'
  }
});

startProfileLoading();
startElementsLoading();

fetchProfileInfo();

function fetchProfileInfo() {
  api.getProfilInfo()
  .then(result => {
    userInfo.setUserInfo(result);

    profileAvatar.src = new URL(result.avatar, import.meta.url);
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    stopProfileLoading();
    fetchInitialCards(); 
  });
}

function fetchInitialCards() {
  api.getInitialCards()
  .then(result => {
    section.renderElements(result);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    stopElementsLoading();
  });
}

function startProfileLoading() {
  profileLoader.style.display = "inline-block";
  profileAvatar.style.display = "none";
  profileInfo.style.display = "none";
  profileAddButton.style.display = "none";  
}

function stopProfileLoading() {
  profileLoader.style.display = "none";
  profileAvatar.style.display = "block";
  profileInfo.style.display = "block";
  profileAddButton.style.display = "block";
}

function startElementsLoading() {
  elementsLoader.style.display = "inline-block";
}

function stopElementsLoading() {
  elementsLoader.style.display = "none";
}

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
  const inputValues = userInfo.getUserInfo();
  popupProfile.setInputValues(inputValues);
  popupProfile.open();
});

function updateProfileData(data) {
  startProfileLoading();
  api.setProfileInfo(data.name, data.occupation)
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      stopProfileLoading();
    }); 
}

profileAddButton.addEventListener("click", function () {
  const inputValues = { name: "", occupation: "" };
  popupProfile.setInputValues(inputValues);
  popupPlace.open();
});

function addCardData(data) {
  startElementsLoading();
  api.addCard(data.name, data.occupation)
    .then((result) => {
      setupElement(result);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      stopElementsLoading();
    });
}

// Element

function setupElement(cardData) {
  const cardElement = createCardElement(cardData);
  section.addItem(cardElement);
}

function createCardElement(cardData) {
  const templateSelector = "#element-template";
  const userData = userInfo.getUserInfo();
  const card = new Card(cardData, userData, templateSelector, onOpenElement);
  const cardElement = card.getCardElement();

  return cardElement
}

function onOpenElement(cardData) {
  popupImage.open(cardData);
}