// UI elements

const body = document.querySelector("body");

const popupProfile = body.querySelector(".popup_type_profile");

const popupPlace = body.querySelector(".popup_type_place");

const popupImage = body.querySelector(".popup_type_image");
const popupImageCrossButton = popupImage.querySelector(".popup__cross-button");
const popupImageFigureImage = popupImage.querySelector(".popup__image");
const popupImageFigureDescription = popupImage.querySelector(".popup__image-description");

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
  setupPopup(popupProfile, profileName.textContent, profileDescription.textContent);
});

profileAddButton.addEventListener("click", function (event) {
  setupPopup(popupPlace);
});

// Popup profile

popupProfile.addEventListener("submit", function (event) {
  event.preventDefault();

  profileName.textContent = getPopupName(popupProfile).value;
  profileDescription.textContent = getPopupDescription(popupProfile).value;

  getPopupCrossButton(popupProfile).click();
});

// Popup Place

popupPlace.addEventListener("submit", function (event) {
  event.preventDefault();

  let src = getPopupDescription(popupPlace).value;
  let name = getPopupName(popupPlace).value;
  const element = createElement(src, name);
  elementContainer.prepend(element);

  getPopupCrossButton(popupPlace).click();
});

// Popup Image

popupImageCrossButton.addEventListener("click", function () {
  closePopup(popupImage)
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
  openPopup(popupImage);
  addPopupCloseListeners(popupImage, popupImageCrossButton);

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

function setupPopup(popup, name = "", description = "") {
  setupPopupDefault(popup, name, description);
  addPopupCloseListeners(popup, getPopupCrossButton(popup));
  openPopup(popup);
}

function setupPopupDefault(popup, name, descriptionElement) {
  getPopupName(popup).value = name;
  getPopupDescription(popup).value = descriptionElement;

  getPopupName(popup).dispatchEvent(new Event("input"));
  getPopupDescription(popup).dispatchEvent(new Event("input"));
}

// Popup close events

function addPopupCloseListeners(popup, crossButton) {
  addPopupOverlayListener(popup, crossButton);
  addCrossButtonListener(popup, crossButton);
  addPopupEscListener(crossButton);
}

function addPopupOverlayListener(popup, crossButton) {
  popup.addEventListener("click", function (event) {
    if (event.target !== event.currentTarget) return;
    crossButton.click();
  });
}

function addCrossButtonListener(popup, crossbutton) {
  crossbutton.addEventListener('click', function (event) {
    closePopup(popup)
  });
}

function addPopupEscListener(crossButton) {
  document.onkeydown = function(event) {
    event = event || window.event;

    var isEscape = false;
    if ("key" in event) {
      isEscape = (event.key === "Escape" || event.key === "Esc");
    } else {
      isEscape = (event.keyCode === 27);
    }
    if (isEscape) {
      crossButton.click();
    }
  };
}

// Popup open/close

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Popup elements

function getPopupName(popup) {
  return popup.querySelector(".popup__input_type_name");
}

function getPopupDescription(popup) {
  return popup.querySelector(".popup__input_type_description");
}

function getPopupCrossButton(popup) {
  return popup.querySelector(".popup__cross-button");
}
