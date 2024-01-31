import { openModal } from "./modal.js";
import { addLikes, deleteLikes, deleteCardApi } from "./api.js";
const cardTemplate = document.querySelector("#card-template").content;

const popupWithImg = document.querySelector(".popup_type_image");
const popupImg = popupWithImg.querySelector(".popup__image");
const popupDescription = popupWithImg.querySelector(".popup__caption");

function createCard(cardInfo, funcDelete, popupForImage, likeCard, userId) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = newCard.querySelector(".card__image");

  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;
  newCard.querySelector(".card__title").textContent = cardInfo.name;
  cardImg.addEventListener("click", popupForImage);

  const likeQuantity = newCard.querySelector(".likes");
  likeQuantity.textContent = cardInfo.likes.length;
  const likeButton = newCard.querySelector(".card__like-button");
  const deleteButton = newCard.querySelector(".card__delete-button");

  //для сохранения активных лайков при перезагрузке страницы
  for (let i = 0; i < cardInfo.likes.length; i++) {
    if (cardInfo.likes[i]._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  }
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, likeQuantity, cardInfo, userId)
  );
  
  deleteButton.addEventListener("click", () =>
    deleteCard(deleteButton, cardInfo)
  );
  if (cardInfo.owner._id !== userId) {
    deleteButton.classList.add("card__delete-button_hidden");
  }
  return newCard;
}

function deleteCard(button, cardInfo) {
  deleteCardApi(cardInfo._id).then((res) => {
    button.closest(".card").remove();
  });
}

function likeCard(button, likeQuantity, cardInfo, userId) {
  if (button.classList.contains("card__like-button_is-active")) {
    deleteLikes(cardInfo._id)
      .then((newLike) => {
        likeQuantity.textContent = newLike;
        button.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.log("Ошибка при удалении лайка", error);
      });
  } else {
    addLikes(cardInfo._id)
      .then((newLike) => {
        likeQuantity.textContent = newLike;
        button.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.log("Ошибка при добавлении лайка", error);
      });
  }
}

function popupForImage(evt) {
  const image = evt.target;
  popupImg.src = image.src;
  popupImg.alt = image.alt;
  popupDescription.textContent = image.alt;
  openModal(popupWithImg);
}

export { createCard, deleteCard, popupForImage, likeCard };
