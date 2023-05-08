const body = document.querySelector("body");

const headerLogo = body.querySelector(".header__logo");

const profileAvatar = body.querySelector(".profile__avatar");
const profileInfo = body.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileEditButton = body.querySelector(".profile__edit-button");
const profileAddButton = body.querySelector(".profile__add-button");
const profileLoader = body.querySelector(".profile").querySelector(".loader");

const elements = body.querySelector(".elements");
const elementsLoader = elements.querySelector(".loader");

export { 
    headerLogo,
    profileAvatar, 
    profileInfo, 
    profileName, 
    profileDescription, 
    profileEditButton,
    profileAddButton,
    profileLoader,
    elementsLoader
}