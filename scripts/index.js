// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const mainContent = document.querySelector(".content");
const cardsPlace = mainContent.querySelector(".places");
const cardsList = cardsPlace.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(title, link, funcDelete) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = newCard.querySelector(".card__image");
  cardImg.src = link;
  cardImg.alt = title;
  newCard.querySelector(".card__description").textContent = title;

  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", funcDelete);
  return newCard;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

initialCards.forEach(function ({name, link}) {
  const cardItem = createCard(name, link, deleteCard);
  cardsList.append(cardItem);
});

