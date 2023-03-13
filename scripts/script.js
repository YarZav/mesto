// Properties

var PopupType = {
  PROFILE: { value: 0 }, 
  PLACE: { value: 1 }
};
var currentPopupType;

// UI elements

let body = document.querySelector("body");

let popup = body.querySelector(".popup");
let popupContainer = popup.querySelector(".popup__container");
let popupCrossButton = popup.querySelector(".popup__cross-button");
let popupTitle = popupContainer.querySelector(".popup__title");
let popupFormName = popupContainer.querySelector(".popup-form__input_type_name");
let popupFormDescription = popupContainer.querySelector(".popup-form__input_type_description");

let popupImage = body.querySelector(".popup_type_image");
let popupImageContainer = popupImage.querySelector(".popup__container-image");
let popupImageCrossButton = popupImageContainer.querySelector(".popup__cross-button");
let popupImageFigure = popupImageContainer.querySelector(".popup__figure");
let popupImageFigureImage = popupImageFigure.querySelector(".popup__image");
let popupImageFigureDescription = popupImageFigure.querySelector(".popup__image-description");

let profile = body.querySelector(".profile");
let profileInfo = profile.querySelector(".profile__info");
let profileEdit = profileInfo.querySelector(".profile__edit");
let profileName = profileEdit.querySelector(".profile__name");
let profileEditButton = profileEdit.querySelector(".profile__edit-button");
let profileDescription = profileInfo.querySelector(".profile__description");
let profileAddButton = profile.querySelector(".profile__add-button");

let elements = body.querySelector(".elements");
let elementTemplate = elements.querySelector("#element-template").content;

popupCrossButton.addEventListener("click", onClosePopup);
popupContainer.addEventListener("submit", onSubmitPopup);

profileEditButton.addEventListener("click", onEditProfile);
profileAddButton.addEventListener("click", onAddPlace);

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

        element.querySelector(".element__image").src = initialCard.link;
        element.querySelector(".element__info").querySelector(".element__title").textContent = initialCard.name;
        
        let elementHeartButton = element.querySelector(".element__info").querySelector(".element__heart-button");
        elementHeartButton.addEventListener("click", onLikePlace);

        let elementDeleteButton = element.querySelector(".element__delete-button");
        elementDeleteButton.addEventListener("click", onDeletePlace);

        let elementImage = element.querySelector(".element__image");
        elementImage.addEventListener("click", function() {
          onShowImage(initialCard.link, initialCard.name);
        });

        elements.append(element);
    });
}

// Popup

function onEditProfile() {
  currentPopupType = PopupType.PROFILE;

  popup.style.visibility = "visible";
  popup.style.opacity = 1;

  setDefaulProfilePopupValues();
}

function onClosePopup() {
  popup.style.visibility = "hidden";
  popup.style.opacity = 0;
}

function setDefaulProfilePopupValues() {
    popupTitle.textContent = "Редактировать профиль";
    popupFormName.value = profileName.textContent;
    popupFormDescription.value = profileDescription.textContent;
    popupFormName.placeholder = "Имя и Фамилия";
    popupFormDescription.placeholder = "Занятость";
}

function onAddPlace() {
  currentPopupType = PopupType.PLACE;

  popup.style.visibility = "visible";
  popup.style.opacity = 1;

  setDefaulPlacePopupValues();
}

function setDefaulPlacePopupValues() {
  popupTitle.textContent = "Новое место";
  popupFormName.value = "";
  popupFormDescription.value = "";
  popupFormName.placeholder = "Название";
  popupFormDescription.placeholder = "Ссылка на картинку";
}

function onSubmitPopup(event) {
  event.preventDefault();

  if (currentPopupType == PopupType.PROFILE) {
    profileName.textContent = popupFormName.value;
    profileDescription.textContent = popupFormDescription.value;
  }

  if (currentPopupType == PopupType.PLACE) {
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = popupFormDescription.value;
    element.querySelector(".element__info").querySelector(".element__title").textContent = popupFormName.value;
    element.querySelector(".element__image").addEventListener("click", function() {
      onShowImage(popupFormDescription.value, popupFormName.value);
    });
    elements.prepend(element);
  }

  onClosePopup();
}

function onClosePopupImage() {
  popupImage.style.visibility = "hidden";
  popupImage.style.opacity = 0;
}

// Element

function onLikePlace(event) {
  const eventTarget = event.target;

  if (eventTarget.classList.contains("element__heart-button_active")) {
    eventTarget.classList.remove("element__heart-button_active");
  } else {
    eventTarget.classList.add("element__heart-button_active");
  }
}

function onDeletePlace(event) {
  event.target.parentElement.remove();
}

function onShowImage(link, name) {
  popupImage.style.visibility = "visible";
  popupImage.style.opacity = 1;

  popupImageFigureImage.src = link;
  popupImageFigureDescription.textContent = name;
}
