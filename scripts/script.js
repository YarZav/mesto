// UI elements

const body = document.querySelector("body");

const popupProfile = body.querySelector(".popup_type_profile");
const popupProfileContainer = popupProfile.querySelector(".popup__container_type_profile");
const popupProfileCrossButton = popupProfileContainer.querySelector(".popup__cross-button");
const popupProfileFormName = popupProfileContainer.querySelector(".popup-form__input_type_name");
const popupProfileFormDescription = popupProfileContainer.querySelector(".popup-form__input_type_description");
const popupProfileFormErrorName = popupProfileContainer.querySelector(".popup-form__input-error_type_name");
const popupProfileFormErrorDescription = popupProfileContainer.querySelector(".popup-form__input-error_type_description");

const popupPlace = body.querySelector(".popup_type_place");
const popupPlaceContainer = popupPlace.querySelector(".popup__container_type_place");
const popupPlaceCrossButton = popupPlaceContainer.querySelector(".popup__cross-button");
const popupPlaceFormName = popupPlaceContainer.querySelector(".popup-form__input_type_name");
const popupPlaceFormDescription = popupPlaceContainer.querySelector(".popup-form__input_type_description");
const popupPlaceFormErrorName = popupPlaceContainer.querySelector(".popup-form__input-error_type_name");
const popupPlaceFormErrorDescription = popupPlaceContainer.querySelector(".popup-form__input-error_type_description");

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
  setupElements();
  setupPopupsCloseListener();
}

function setupElements() {
  initialCards.forEach((initialCard) => {
    const element = createElement(initialCard.link, initialCard.name);
    elementContainer.prepend(element);
  });
}

function setupPopupsCloseListener() {
  let popups = document.querySelectorAll(".popup");
  popups.forEach(function (popup) {
    popup.addEventListener("click", function (event) {
      if (event.target !== event.currentTarget) return ;
      onCloseAllPopups();
    });
  });

  document.onkeydown = function(event) {
    event = event || window.event;
    var isEscape = false;
    if ("key" in event) {
      isEscape = (event.key === "Escape" || event.key === "Esc");
    } else {
      isEscape = (event.keyCode === 27);
    }
    if (isEscape) {
      onCloseAllPopups();
    }
  };
}

function onCloseAllPopups() {
  onClosePopupProfile();
  onClosePopupPlace();
  onClosePopupImage();
}

// Profile

profileEditButton.addEventListener("click", onEditProfile);
profileAddButton.addEventListener("click", onAddPlace);

// Popup Profile

popupProfileCrossButton.addEventListener("click", onClosePopupProfile);
popupProfileContainer.addEventListener("submit", onSubmitPopupProfile);

function onEditProfile() {
  setDefaulProfilePopupValues();
  updatePopupProfileSubmitButton();

  openPopup(popupProfile);
}

function onClosePopupProfile() {
  closePopup(popupProfile);
}

function setDefaulProfilePopupValues() {
  popupProfileFormName.value = profileName.textContent;
  popupProfileFormDescription.value = profileDescription.textContent;

  popupProfileFormErrorName.textContent = "";
  popupProfileFormErrorDescription.textContent = "";
}

function onSubmitPopupProfile(event) {
  event.preventDefault();

  if (isPopupProfileDataValid) {
    profileName.textContent = popupProfileFormName.value;
    profileDescription.textContent = popupProfileFormDescription.value;

    onClosePopupProfile();
  }
}

popupProfileFormName.addEventListener('input', function (event) {
  popupProfileFormErrorName.textContent = event.target.validationMessage;

  updatePopupProfileSubmitButton();
});

popupProfileFormDescription.addEventListener('input', function (event) {
  popupProfileFormErrorDescription.textContent = event.target.validationMessage;

  updatePopupProfileSubmitButton();
});

function updatePopupProfileSubmitButton() {
  const submitButton = popupProfileContainer.querySelector(".popup-form__button");

  if (isPopupProfileDataValid()) {
    submitButton.classList.remove("popup-form__button_disabled");
  } else {
    submitButton.classList.add("popup-form__button_disabled");
  }
}

function isPopupProfileDataValid() {
  return popupProfileFormName.validity.valid && popupProfileFormDescription.validity.valid;
}

// Popup Place

popupPlaceCrossButton.addEventListener("click", onClosePopupPlace);
popupPlaceContainer.addEventListener("submit", onSubmitPopupPlace);

function onAddPlace() {
  setDefaulPlacePopupValues();
  updatePopupPlaceSubmitButton();

  openPopup(popupPlace);
}

function onClosePopupPlace() {
  closePopup(popupPlace);
}

function setDefaulPlacePopupValues() {
  popupPlaceFormName.value = "";
  popupPlaceFormDescription.value = "";

  popupPlaceFormErrorName.textContent = "";
  popupPlaceFormErrorDescription.textContent = "";
}

function onSubmitPopupPlace(event) {
  event.preventDefault();

  if (isPopupPlaceDataValid) {
    const element = createElement(popupPlaceFormDescription.value, popupPlaceFormName.value);
    elementContainer.prepend(element);

    onClosePopupPlace();
  }
}

popupPlaceFormName.addEventListener('input', function (event) {
  popupPlaceFormErrorName.textContent = event.target.validationMessage;

  updatePopupPlaceSubmitButton();
});

popupPlaceFormDescription.addEventListener('input', function (event) {
  popupPlaceFormErrorDescription.textContent = event.target.validationMessage;

  updatePopupPlaceSubmitButton();
});

function updatePopupPlaceSubmitButton() {
  const submitButton = popupPlaceContainer.querySelector(".popup-form__button");

  if (isPopupPlaceDataValid()) {
    submitButton.classList.remove("popup-form__button_disabled");
  } else {
    submitButton.classList.add("popup-form__button_disabled");
  }
}

function isPopupPlaceDataValid() {
  return popupPlaceFormName.validity.valid && popupPlaceFormDescription.validity.valid;
}

// Popup Image

popupImageCrossButton.addEventListener("click", onClosePopupImage);

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
