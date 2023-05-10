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
  profileEditAvatarButton,
  profileInfo, 
  profileEditButton,
  profileAddButton,
  loader
} from "./scripts/constants.js"

// API

import { Api } from "./scripts/Api";

// Classes

const section = new Section(setupElement, ".elements");

const popupProfile = new PopupWithForm(".popup_type_profile", updateProfileData);
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm(".popup_type_avatar", updateAvatar);
popupAvatar.setEventListeners();

const popupPlace = new PopupWithForm(".popup_type_place", addCard);
popupPlace.setEventListeners();

const popupImage = new PopupWithImage();
popupImage.setEventListeners();

const popupDeletePlace = new PopupWithConfirmation(".popup_type_delete-place", deleteCard);
popupDeletePlace.setEventListeners();

const userInfo = new UserInfo(".profile__name", ".profile__description", ".profile__avatar");

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

fetchInitialData();

function fetchInitialData() {
  setLoading(true);

  Promise.all([
    api.getProfilInfo(),
    api.getInitialCards()
  ]) 
  .then(([initialUserInfo, initialCards]) => {
    userInfo.setUserInfo(initialUserInfo);
    section.renderElements(initialCards);
  }) 
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    setLoading(false);
  })
}

function setLoading(isLoading) {
  if (isLoading) {
    loader.classList.remove("hidden");
    profileAvatar.classList.add("hidden");
    profileInfo.classList.add("hidden");
    profileAddButton.classList.add("hidden");
  } else {
    loader.classList.add("hidden");
    profileAvatar.classList.remove("hidden");
    profileInfo.classList.remove("hidden");
    profileAddButton.classList.remove("hidden");
  }
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

profileEditAvatarButton.addEventListener("click", function () {
  popupAvatar.open();
});

function updateProfileData(data) {
  popupProfile.setLoading(true);

  api.setProfileInfo(data.name, data.about)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupProfile.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      popupProfile.setLoading(false);
    });
}

function updateAvatar(data) {
  popupAvatar.setLoading(true);

  api.setAvatar(data.about)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupAvatar.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      popupAvatar.setLoading(false);
    });
}

profileAddButton.addEventListener("click", function () {
  const inputValues = { name: "", about: "" };
  popupProfile.setInputValues(inputValues);
  popupPlace.open();
});

function addCard(data) {
  popupPlace.setLoading(true);

  api.addCard(data.name, data.about)
    .then((result) => {
      setupElement(result);
      popupPlace.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      popupPlace.setLoading(false);
    });
}

function deleteCard(cardData, cardElement) {
  popupDeletePlace.setLoading(true);

  api.deleteCard(cardData._id)
    .then(() => {
      cardElement.remove();
      popupDeletePlace.close();
    })
    .catch(error => {
      console.log(error);
    })    
    .finally(() => {
      popupDeletePlace.setLoading(false);
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
  const likeCount = cardElement.querySelector(".element__like-count");
  const heartButton = cardElement.querySelector(".element__heart-button");

  if (isLiked) {
    api.deleteCardLike(cardData._id)
    .then((result) => {
      likeCount.textContent = result.likes.length;
      heartButton.classList.remove("element__heart-button_active");
      cardData.likes = result.likes;
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    api.setCardLike(cardData._id)
      .then((result) => {
        likeCount.textContent = result.likes.length;
        heartButton.classList.add("element__heart-button_active");
        cardData.likes = result.likes;
      })
      .catch(error => {
        console.log(error);
      })
  }
}