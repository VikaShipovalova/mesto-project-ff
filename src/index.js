
import "./pages/index.css";
import {initialCards, createCard, deleteCard, popupForImage, likeCard} 
from "./scripts/cards.js";
import {closeModal, openModal, closeOverlay} from "./scripts/modal.js";

const mainContent = document.querySelector(".content");
const cardsPlace = mainContent.querySelector(".places");
const cardsList = cardsPlace.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popupEdit=document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card")
const popupClosers = document.querySelectorAll(".popup__close");
const popupOverlay = document.querySelectorAll(".popup");

const formEdit = document.forms["edit-profile"];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const newName = nameInput.value;
  const newJob = jobInput.value;
  document.querySelector(".profile__title").textContent = newName;
  document.querySelector(".profile__description").textContent = newJob;
  closeModal(evt);
};

formEdit.addEventListener('submit', handleFormSubmit); 

const formAddCard = document.forms["new-place"];
const newPlaceName = formAddCard.elements["place-name"];
const newLink = formAddCard.elements.link;

function addNewCard(evt){
  evt.preventDefault(); 
  const placeNew = newPlaceName.value;
  const linkNew = newLink.value;
  const cardItem = createCard(placeNew, linkNew, deleteCard, popupForImage, likeCard);
  cardsList.prepend(cardItem);
  closeModal(evt);
  newPlaceName.value = '';
  newLink.value = '';
}

formAddCard.addEventListener('submit', addNewCard);

//первые шесть карточек
initialCards.forEach(function ({name, link}) {
  const cardItem = createCard(name, link, deleteCard, popupForImage, likeCard);
  cardsList.append(cardItem);
});

editButton.addEventListener('click', function() {
  openModal(popupEdit);});

addCardButton.addEventListener('click', function() {
  openModal(popupAddCard);});

popupClosers.forEach((closeButton) => {
  closeButton.addEventListener('click', function (closeButton) {
    closeModal(closeButton);
  });
}); 

popupOverlay.forEach((evt) => {
  evt.addEventListener('click', closeOverlay);
}); 
