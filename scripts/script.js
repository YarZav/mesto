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

const elements = body.querySelector(".elements");
const elementTemplate = elements.querySelector("#element-template").content;

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
        const element = elementTemplate.querySelector(".element").cloneNode(true);
        prependElement(element, initialCard.link, initialCard.name);
    });
}

// Popup Profile

function onEditProfile() {
  setDefaulProfilePopupValues();

  popupProfile.style.visibility = "visible";
  popupProfile.style.opacity = 1;
}

function onClosePopupProfile() {
  popupProfile.style.visibility = "hidden";
  popupProfile.style.opacity = 0;
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

  popupPlace.style.visibility = "visible";
  popupPlace.style.opacity = 1;
}

function onClosePopupPlace() {
  popupPlace.style.visibility = "hidden";
  popupPlace.style.opacity = 0;
}

function setDefaulPlacePopupValues() {
  popupPlaceFormName.value = "";
  popupPlaceFormDescription.value = "";
}

function onSubmitPopupPlace(event) {
  event.preventDefault();

  const element = elementTemplate.querySelector(".element").cloneNode(true);
  prependElement(element, popupPlaceFormDescription.value, popupPlaceFormName.value);

  onClosePopupPlace();
}

// Popup Image

function onClosePopupImage() {
  popupImage.style.visibility = "hidden";
  popupImage.style.opacity = 0;
}

// Element

function onLikePlace(event) {
  console.log("Like");
  const eventTarget = event.target;

  if (eventTarget.classList.contains("element__heart-button_active")) {
    eventTarget.classList.remove("element__heart-button_active");
  } else {
    eventTarget.classList.add("element__heart-button_active");
  }
}

function onDeletePlace(event) {
  console.log("delete");
  event.target.parentElement.remove();
}

function onShowImage(link, name) {
  popupImage.style.visibility = "visible";
  popupImage.style.opacity = 1;

  popupImageFigureImage.src = link;
  popupImageFigureDescription.textContent = name;
}

function prependElement(element, src, title) {
  element.querySelector(".element__image").src = src;
  element.querySelector(".element__info").querySelector(".element__title").textContent = title;

  const elementHeartButton = element.querySelector(".element__info").querySelector(".element__heart-button");
  elementHeartButton.addEventListener("click", onLikePlace);

  const elementDeleteButton = element.querySelector(".element__delete-button");
  elementDeleteButton.addEventListener("click", onDeletePlace);

  element.querySelector(".element__image").addEventListener("click", function() {
    onShowImage(src, title);
  });

  elements.prepend(element);
}
