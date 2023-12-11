import { openModal } from "./modal.js";

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
const cardTemplate = document.querySelector("#card-template").content;

function createCard(title, link, funcDelete, popupForImage, likeCard) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = newCard.querySelector(".card__image");
  
  cardImg.src = link;
  cardImg.alt = title;
  newCard.querySelector(".card__title").textContent = title;
  cardImg.addEventListener("click", popupForImage);
 
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  
  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", funcDelete);
  
  return newCard;
}


function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}

function popupForImage(evt) {
  if (evt.target !== "card__delete-button" ) { 
    const image = evt.target;
    const popupWithImg = document.querySelector(".popup_type_image");
    const popupImg = popupWithImg.querySelector(".popup__image");
    const popupDescription = popupWithImg.querySelector(".popup__caption");
    popupImg.src = image.src;
    popupImg.alt = image.alt;
    popupDescription.textContent = image.alt;
    openModal(popupWithImg);
  }
}

export {initialCards, createCard, deleteCard, popupForImage, likeCard};
