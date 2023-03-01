// Start state
let profileNameText = "Жак-Ив Кусто";
let profileDescriptionText = "Исследователь океана";
let isPopupDisplayed = false;

setDefaultProfileNameAndDescription();

// Name and description

function onSubmit() {
    let popupName = getPopupName();
    let popupDescription = getPopupDescription();

    let profileName = getProfileName();
    let profileDescription = getProfileDescription();

    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;

    isPopupDisplayed = false;
    setPopupDisplay();
}

function setDefaultProfileNameAndDescription() {
    let profileName = getProfileName();
    let profileDescription = getProfileDescription();

    profileName.textContent = profileNameText;
    profileDescription.textContent = profileDescriptionText;    
}

function getProfileName() {
    let profileInfo = getProfileInfo();
    let profileEdit = profileInfo.querySelector(".profile__edit");
    let profileName = profileEdit.querySelector(".profile__name"); 
    return profileName;
}

function getProfileDescription() {
    let profileInfo = getProfileInfo();
    let profileDescription = profileInfo.querySelector(".profile__description");
    return profileDescription;
}

function getProfileInfo() {
    let body = getBody();
    let profile = body.querySelector(".profile");
    let profileInfo = profile.querySelector(".profile__info");
    return profileInfo
}

// Popup

function onTogglePopup() {
    isPopupDisplayed = !isPopupDisplayed;
    setPopupDisplay();

    if (isPopupDisplayed) {
        setDefaulPopupNameAndDescription();
    }
}

function setPopupDisplay() {
    let popup = getPopup();
    if (isPopupDisplayed) {
        popup.classList.add("popup_opened");
    } else {
        popup.classList.remove("popup_opened");
    }
}

function setDefaulPopupNameAndDescription() {
    let popupName = getPopupName();
    let popupDescription = getPopupDescription();

    let profileName = getProfileName();
    let profileDescription = getProfileDescription();

    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
}

function getPopup() {
    let body = getBody();
    let popup = body.querySelector(".popup");
    return popup;
}

function getPopupContainer() {
    let popup = getPopup();
    let popupContainer = popup.querySelector(".popup__container");
    return popupContainer;
}

function getPopupName() {
    let popupContainer = getPopupContainer();
    let popupName = popupContainer.querySelector(".popup__input_name");
    return popupName;
}

function getPopupDescription() {
    let popupContainer = getPopupContainer();
    let popupDescription = popupContainer.querySelector(".popup__input_description");
    return popupDescription;
}

// Main body

function getBody() {
    let body = document.querySelector("body");
    return body;
}