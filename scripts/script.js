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
const elementTemplate = elementContainer.querySelector("#element-template").content;

// Mock data

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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

  const element = createElement(popupPlaceDescription.value, popupPlaceName.value);
  elementContainer.prepend(element);

  popupPlaceCrossButton.click();
});

// Element

setupElements();

function onLikePlace(event) {
  event.target.classList.toggle("element__heart-button_active");
}

function onDeletePlace(event) {
  event.target.closest(".element").remove();
}

function onShowImage(link, name) {
  openPopup(popupImage, popupImageCrossButton);

  popupImageFigureImage.src = link;
  popupImageFigureImage.alt = name;
  popupImageFigureDescription.textContent = name;
}

function setupElements() {
  initialCards.forEach((initialCard) => {
    const element = createElement(initialCard.link, initialCard.name);
    elementContainer.prepend(element);
  });
}

function createElement(src, title) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);

  element.querySelector(".element__image").src = src;
  element.querySelector(".element__image").alt = title;
  element.querySelector(".element__info").querySelector(".element__title").textContent = title;

  const elementHeartButton = element.querySelector(".element__info").querySelector(".element__heart-button");
  elementHeartButton.addEventListener("click", onLikePlace);

  const elementDeleteButton = element.querySelector(".element__delete-button");
  elementDeleteButton.addEventListener("click", onDeletePlace);

  element.querySelector(".element__image").addEventListener("click", function() {
    onShowImage(src, title);
  });

  return element
}

// Popup init

function setupPopup(popup, popupName, popupDescription, crossButton, name = "", description = "") {
  setupPopupDefault(popup, popupName, popupDescription, name, description);
  openPopup(popup, crossButton);
}

function setupPopupDefault(popup, popupName, popupDescription, name, description) {
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