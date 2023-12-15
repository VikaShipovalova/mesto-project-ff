export const mainContent = document.querySelector(".content");
export const cardsPlace = mainContent.querySelector(".places");
export const cardsList = cardsPlace.querySelector(".places__list");
export const editButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");

export const popupEdit=document.querySelector(".popup_type_edit");
export const popupAddCard = document.querySelector(".popup_type_new-card")
export const popupClosers = document.querySelectorAll(".popup__close");
export const popupOverlay = document.querySelectorAll(".popup");

export const formEdit = document.forms["edit-profile"];
export const nameInput = formEdit.elements.name;
export const jobInput = formEdit.elements.description;