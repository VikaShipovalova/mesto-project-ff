import { openModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;

const popupWithImg = document.querySelector(".popup_type_image");
const popupImg = popupWithImg.querySelector(".popup__image");
const popupDescription = popupWithImg.querySelector(".popup__caption");

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
  const image = evt.target;
  popupImg.src = image.src;
  popupImg.alt = image.alt;
  popupDescription.textContent = image.alt;
  openModal(popupWithImg);
  
}

export {createCard, deleteCard, popupForImage, likeCard};
