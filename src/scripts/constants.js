const body = document.querySelector("body");

const headerLogo = body.querySelector(".header__logo");

const profileAvatar = body.querySelector(".profile__avatar");
const profileEditAvatarButton = body.querySelector(".profile__avatar-edit-button");
const profileInfo = body.querySelector(".profile__info");
const profileEditButton = body.querySelector(".profile__edit-button");
const profileAddButton = body.querySelector(".profile__add-button");
const profileLoader = body.querySelector(".profile").querySelector(".loader");

const elements = body.querySelector(".elements");
const elementsLoader = elements.querySelector(".loader");

export { 
    headerLogo,
    profileAvatar, 
    profileEditAvatarButton,
    profileInfo, 
    profileEditButton,
    profileAddButton,
    profileLoader,
    elementsLoader
}