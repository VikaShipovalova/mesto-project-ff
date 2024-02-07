export const mainContent = document.querySelector(".content");
export const cardsPlace = mainContent.querySelector(".places");
export const cardsList = cardsPlace.querySelector(".places__list");
export const editButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");
export const profileImage = document.querySelector(".profile__image");
export const profileAvatarButton = document.querySelector(".avatar__button");

export const popupEdit=document.querySelector(".popup_type_edit");
export const popupAddCard = document.querySelector(".popup_type_new-card");
export const popupEditAvatar = document.querySelector(".popup_avatar_edit");
export const popupClosers = document.querySelectorAll(".popup__close");
export const overlayPopups = document.querySelectorAll(".popup");


export const formEdit = document.forms["edit-profile"];
export const nameInput = formEdit.elements.name;
export const jobInput = formEdit.elements.description;
export const formEditButton = formEdit.querySelector(".popup__button");

export const formAvatar = document.forms["edit-avatar"];
export const avatarInput = formAvatar.elements.link;
export const formAvatarButton = formAvatar.querySelector(".popup__button");

export const formAddCard = document.forms["new-place"];
export const newPlaceName = formAddCard.elements["place-name"]; 
export const newPlaceLink = formAddCard.elements["link"];
export const placeAddButton = formAddCard.querySelector(".popup__button");
