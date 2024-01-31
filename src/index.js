import "./pages/index.css";
import {
  cardsPlace,
  cardsList,
  editButton,
  addCardButton,
  profileImage,
  profileAvatarButton,
  popupEdit,
  popupAddCard,
  popupEditAvatar,
  popupClosers,
  popupOverlay,
  formEdit,
  nameInput,
  jobInput,
  formEditButton,
  formPlace,
  placeInput,
  linkPlaceInput,
  formAvatar,
  avatarInput,
  formAvatarButton,
} from "./scripts/constant.js";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  deleteCard,
  popupForImage,
  likeCard,
} from "./scripts/card.js";

import { closeModal, openModal, closeOverlay } from "./scripts/modal.js";

import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./scripts/validation.js";

import {
  getBaseCards,
  getUserInfo,
  editProfileInfo,
  editProfileAvatar,
  appendNewCard,
} from "./scripts/api.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

let userId = 1;
const formAddCard = document.forms["new-place"];
const newPlaceName = formAddCard.elements["place-name"];
const newLink = formAddCard.elements.link;

Promise.all([getUserInfo(), getBaseCards()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url("${userInfo.avatar}")`;
    userId = userInfo._id;
    cards.forEach((cardInfo) => {
      const cardItem = createCard(
        cardInfo,
        deleteCard,
        popupForImage,
        likeCard,
        userId
      );
      cardsList.append(cardItem);
    });
  })
  .catch((error) => {
    console.log(`Ошибка при получении данных: ${error.message}`);
  });

function editProfile(evt) {
  evt.preventDefault();
  const newInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };
  const parentPopup = evt.target.closest(".popup");
  formEditButton.textContent = "Сохранение...";
  editProfileInfo(newInfo)
    .then((newInfo) => {
      profileTitle.textContent = newInfo.name;
      profileDescription.textContent = newInfo.about;
      formEditButton.textContent = "Сохранить";
      closeModal(parentPopup);
    })
    .catch((error) => {
      console.log("Ошибка при сохранении данных пользователя", error);
    });
}

function editAvatar(evt) {
  evt.preventDefault();
  const avatar = avatarInput.value;
  formAvatarButton.textContent = "Сохранение...";
  editProfileAvatar(avatar)
    .then((newAvatar) => {
      profileImage.style.backgroundImage = `url(${newAvatar.avatar})`;
      formAvatarButton.textContent = "Сохранить";
      closeModal(popupEditAvatar);
    })
    .catch((error) => {
      console.log(`Ошибка при сохранении аватара: ${error.message}`);
    });
}

enableValidation(validationConfig);
formEdit.addEventListener("submit", editProfile);
formAvatarButton.addEventListener("click", editAvatar);

profileAvatarButton.addEventListener("click", function () {
  clearValidation(popupEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});

function addNewCard(evt) {
  evt.preventDefault();
  const cardInfo = {
    name: newPlaceName.value,
    link: newLink.value,
  };
  const parentPopup = evt.target.closest(".popup");
  appendNewCard(cardInfo, userId)
    .then((cardInfo) => {
      const cardItem = createCard(
        cardInfo,
        deleteCard,
        popupForImage,
        likeCard,
        userId
      );
      cardsList.prepend(cardItem);
      closeModal(parentPopup);
      newPlaceName.value = "";
      newLink.value = "";
    })
    .catch((error) => {
      console.log("Ошибка при добавлении карточки", error);
    });
}

formAddCard.addEventListener("submit", addNewCard);

function startvalueEditForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
}

editButton.addEventListener("click", startvalueEditForm);

addCardButton.addEventListener("click", function () {
  clearValidation(popupAddCard, validationConfig);
  openModal(popupAddCard);
});

popupClosers.forEach((closeButton) => {
  closeButton.addEventListener("click", function (closeButton) {
    const parentPopup = closeButton.target.closest(".popup");
    closeModal(parentPopup);
  });
});

popupOverlay.forEach((evt) => {
  evt.addEventListener("click", closeOverlay);
});
