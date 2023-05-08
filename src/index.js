// Import

// CSS
import "./pages/index.css";

// Modules
import { Card } from "./scripts/Card.js";
import { Section } from "./scripts/Section.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithConfirmation } from "./scripts/PopupWithConfirmation.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { headerLogo,
  profileAvatar, 
  profileInfo, 
  profileName, 
  profileDescription, 
  profileEditButton,
  profileAddButton,
  profileLoader,
  elementsLoader
} from "./scripts/constants.js"

// API

import { Api } from "./scripts/Api";

// Classes

const section = new Section(setupElement, ".elements");

const popupProfile = new PopupWithForm(".popup_type_profile", updateProfileData);
const popupPlace = new PopupWithForm(".popup_type_place", addCard);
const popupImage = new PopupWithImage();
const popupDeletePlace = new PopupWithConfirmation(".popup_type_delete-place", deleteCard);

const userInfo = new UserInfo(".profile__name", ".profile__description");

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'e4e7d31e-adbb-40d6-b9b1-467496d1a1d0',
    'Content-Type': 'application/json'
  }
});

// Setup UI

headerLogo.src = new URL("./images/header_logo.svg", import.meta.url);

// Fetch initial data

fetchProfileInfo();

function fetchProfileInfo() {
  setProfileLoading(true);

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
    setProfileLoading(false);
    fetchInitialCards(); 
  });
}

function fetchInitialCards() {
  setElementsLoading(true);

  api.getInitialCards()
  .then(result => {
    section.renderElements(result);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    setElementsLoading(false);
  });
}

function setProfileLoading(isLoading) {
  profileLoader.style.display = isLoading ? "inline-block" : "none";
  profileAvatar.style.display = isLoading ? "none" : "block";
  profileInfo.style.display = isLoading ? "none" : "block";
  profileAddButton.style.display = isLoading ? "none" : "block";
}

function setElementsLoading(isLoading) {
  elementsLoader.style.display = isLoading ? "inline-block" : "none";
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
  api.setProfileInfo(data.name, data.occupation)
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .catch(error => {
      console.log(error);
    })
}

profileAddButton.addEventListener("click", function () {
  const inputValues = { name: "", occupation: "" };
  popupProfile.setInputValues(inputValues);
  popupPlace.open();
});

function addCard(data) {
  api.addCard(data.name, data.occupation)
    .then((result) => {
      setupElement(result);
    })
    .catch(error => {
      console.log(error);
    })
}

function deleteCard(cardData, cardElement) {
  api.deleteCard(cardData._id)
    .then((result) => {
      cardElement.remove();
    })
    .catch(error => {
      console.log(error);
    })
}

// Element

function setupElement(cardData) {
  const cardElement = createCardElement(cardData);
  section.addItem(cardElement);
}

function createCardElement(cardData) {
  const templateSelector = "#element-template";
  const userData = userInfo.getUserInfo();
  const card = new Card(cardData, userData, templateSelector, onOpenElement, onDeleteElement, onLikeElement);
  const cardElement = card.getCardElement();

  return cardElement
}

function onOpenElement(cardData) {
  popupImage.open(cardData);
}

function onDeleteElement(cardData, cardElement) {
  popupDeletePlace.open(cardData, cardElement);
}

function onLikeElement(cardData, cardElement) {
  const userData = userInfo.getUserInfo();
  const isLiked = cardData.likes.filter(like => like._id === userData._id).length > 0;

  if (isLiked) {
    api.deleteCardLike(cardData._id)
    .then((result) => {
      cardElement.querySelector(".element__like-count").textContent = result.likes.length;
      cardElement.querySelector(".element__heart-button").classList.remove("element__heart-button_active");
      cardData.likes = result.likes;
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    api.setCardLike(cardData._id)
      .then((result) => {
        cardElement.querySelector(".element__like-count").textContent = result.likes.length;
        cardElement.querySelector(".element__heart-button").classList.add("element__heart-button_active");
        cardData.likes = result.likes;
      })
      .catch(error => {
        console.log(error);
      })
  }
}