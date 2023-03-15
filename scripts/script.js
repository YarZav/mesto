// UI elements

const body = document.querySelector("body");

const popupProfile = body.querySelector(".popup_type_profile");
const popupProfileContainer = popupProfile.querySelector(".popup__container_type_profile");
const popupProfileCrossButton = popupProfileContainer.querySelector(".popup__cross-button");
const popupProfileFormName = popupProfileContainer.querySelector(".popup-form__input_type_name");
const popupProfileFormDescription = popupProfileContainer.querySelector(".popup-form__input_type_description");

const popupPlace = body.querySelector(".popup_type_place");
const popupPlaceContainer = popupPlace.querySelector(".popup__container_type_place");
const popupPlaceCrossButton = popupPlaceContainer.querySelector(".popup__cross-button");
const popupPlaceFormName = popupPlaceContainer.querySelector(".popup-form__input_type_name");
const popupPlaceFormDescription = popupPlaceContainer.querySelector(".popup-form__input_type_description");

const popupImage = body.querySelector(".popup_type_image");
const popupImageContainer = popupImage.querySelector(".popup__container-image");
const popupImageCrossButton = popupImageContainer.querySelector(".popup__cross-button");
const popupImageFigure = popupImageContainer.querySelector(".popup__figure");
const popupImageFigureImage = popupImageFigure.querySelector(".popup__image");
const popupImageFigureDescription = popupImageFigure.querySelector(".popup__image-description");

const profile = body.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const profileEdit = profileInfo.querySelector(".profile__edit");
const profileName = profileEdit.querySelector(".profile__name");
const profileEditButton = profileEdit.querySelector(".profile__edit-button");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileAddButton = profile.querySelector(".profile__add-button");

const elementContainer = body.querySelector(".elements");
const elementTemplate = elementContainer.querySelector("#element-template").content;

profileEditButton.addEventListener("click", onEditProfile);
profileAddButton.addEventListener("click", onAddPlace);

popupProfileCrossButton.addEventListener("click", onClosePopupProfile);
popupProfileContainer.addEventListener("submit", onSubmitPopupProfile);

popupPlaceCrossButton.addEventListener("click", onClosePopupPlace);
popupPlaceContainer.addEventListener("submit", onSubmitPopupPlace);

popupImageCrossButton.addEventListener("click", onClosePopupImage);

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

// Setup UI

setupUI();

function setupUI() {
    initialCards.forEach((initialCard) => {
      const element = createElement(initialCard.link, initialCard.name);
      elementContainer.prepend(element);
    });
}

// Popup Profile

function onEditProfile() {
  setDefaulProfilePopupValues();

  openPopup(popupProfile);
}

function onClosePopupProfile() {
  closePopup(popupProfile);
}

function setDefaulProfilePopupValues() {
  popupProfileFormName.value = profileName.textContent;
  popupProfileFormDescription.value = profileDescription.textContent;
}

function onSubmitPopupProfile(event) {
  event.preventDefault();

  profileName.textContent = popupProfileFormName.value;
  profileDescription.textContent = popupProfileFormDescription.value;

  onClosePopupProfile();
}

// Popup Place

function onAddPlace() {
  setDefaulPlacePopupValues();

  openPopup(popupPlace);
}

function onClosePopupPlace() {
  closePopup(popupPlace);
}

function setDefaulPlacePopupValues() {
  popupPlaceFormName.value = "";
  popupPlaceFormDescription.value = "";
}

function onSubmitPopupPlace(event) {
  event.preventDefault();

  const element = createElement(popupPlaceFormDescription.value, popupPlaceFormName.value);
  elementContainer.prepend(element);

  onClosePopupPlace();
}

// Popup Image

function onClosePopupImage() {
  closePopup(popupImage);
}

// Popup

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Element

function onLikePlace(event) {
  event.target.classList.toggle("element__heart-button_active");
}

function onDeletePlace(event) {
  event.target.closest(".element").remove();
}

function onShowImage(link, name) {
  openPopup(popupImage);

  popupImageFigureImage.src = link;
  popupImageFigureImage.alt = name;
  popupImageFigureDescription.textContent = name;
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
