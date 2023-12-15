
import "./pages/index.css";
import {cardsPlace, cardsList,editButton, addCardButton,popupEdit, popupAddCard, popupClosers,
       popupOverlay, formEdit, nameInput, jobInput} from "./scripts/constant.js"
import { initialCards } from "./scripts/cards.js";
import {createCard, deleteCard, popupForImage, likeCard} from "./scripts/card.js";
import {closeModal, openModal, closeOverlay} from "./scripts/modal.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function editProfile(evt) {
  evt.preventDefault(); 
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  const parentPopup = evt.target.closest('.popup');
  closeModal(parentPopup);
};

formEdit.addEventListener('submit', editProfile); 

const formAddCard = document.forms["new-place"];
const newPlaceName = formAddCard.elements["place-name"];
const newLink = formAddCard.elements.link;

function addNewCard(evt){
  evt.preventDefault(); 
  const placeNew = newPlaceName.value;
  const linkNew = newLink.value;
  const cardItem = createCard(placeNew, linkNew, deleteCard, popupForImage, likeCard);
  cardsList.prepend(cardItem);
  const parentPopup = evt.target.closest('.popup');
  closeModal(parentPopup);
  newPlaceName.value = '';
  newLink.value = '';
}

formAddCard.addEventListener('submit', addNewCard);

initialCards.forEach(function ({name, link}) {
  const cardItem = createCard(name, link, deleteCard, popupForImage, likeCard);
  cardsList.append(cardItem);
});

function startvalueEditForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
}

editButton.addEventListener('click', startvalueEditForm);

addCardButton.addEventListener('click', function() {
  openModal(popupAddCard);});

popupClosers.forEach((closeButton) => {
    closeButton.addEventListener('click', function (closeButton) {
      const parentPopup = closeButton.target.closest('.popup');
      closeModal(parentPopup);
  });
}); 

popupOverlay.forEach((evt) => {
  evt.addEventListener('click', closeOverlay);
}); 
