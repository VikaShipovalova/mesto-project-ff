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
  overlayPopups,
  formEdit,
  nameInput,
  jobInput,
  formEditButton,
  formAddCard,
  newPlaceName,
  newPlaceLink,
  formAvatar,
  avatarInput,
  formAvatarButton,
  placeAddButton,
} from "./scripts/constant.js";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  deleteCard,
  openPopupForImage,
  likeCard,
} from "./scripts/card.js";

import { closeModal, openModal } from "./scripts/modal.js";

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
        openPopupForImage,
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
  formEditButton.textContent = "Сохранение...";
  editProfileInfo(newInfo)
    .then((newInfo) => {
      profileTitle.textContent = newInfo.name;
      profileDescription.textContent = newInfo.about;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.log("Ошибка при сохранении данных пользователя", error);
    })
    .finally(() => {
      formEditButton.textContent = "Сохранить";
    });
}

function editAvatar(evt) {
  evt.preventDefault();
  const avatar = avatarInput.value;
  formAvatarButton.textContent = "Сохранение...";
  editProfileAvatar(avatar)
    .then((newAvatar) => {
      profileImage.style.backgroundImage = `url(${newAvatar.avatar})`;
      closeModal(popupEditAvatar);
    })
    .catch((error) => {
      console.log(`Ошибка при сохранении аватара: ${error.message}`);
    })
    .finally(() => {
      formAvatarButton.textContent = "Сохранить";
    });
}

enableValidation(validationConfig);

formEdit.addEventListener("submit", editProfile);

formAvatar.addEventListener("submit", editAvatar);

profileAvatarButton.addEventListener("click", function () {
  clearValidation(popupEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});

function addNewCard(evt) {
  evt.preventDefault();
  const cardInfo = {
    name: newPlaceName.value,
    link: newPlaceLink.value,
  };
  placeAddButton.textContent = "Сохранение...";
  appendNewCard(cardInfo, userId)
    .then((cardInfo) => {
      const cardItem = createCard(
        cardInfo,
        deleteCard,
        openPopupForImage,
        likeCard,
        userId
      );
      cardsList.prepend(cardItem);
      closeModal(popupAddCard);
      newPlaceName.value = "";
      newPlaceLink.value = "";
    })
    .catch((error) => {
      console.log("Ошибка при добавлении карточки", error);
    })
    .finally(() => {
      placeAddButton.textContent = "Сохранить";
    });
}

formAddCard.addEventListener("submit", addNewCard);

function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
}

editButton.addEventListener("click", openProfilePopup);

addCardButton.addEventListener("click", function () {
  clearValidation(popupAddCard, validationConfig);
  openModal(popupAddCard);
});

/*popupClosers.forEach((closeButton) => {
  closeButton.addEventListener("click", function (closeButton) {
    const parentPopup = closeButton.target.closest(".popup");
    closeModal(parentPopup);
  });
});*/

popupClosers.forEach((closeButton) => {
  const parentPopup = closeButton.closest(".popup");  // 1 раз находим и не тратим ресурсы при каждом клике
  closeButton.addEventListener("click", () => {
    closeModal(parentPopup);
  });
}); 