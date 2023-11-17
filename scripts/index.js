// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const mainContent = document.querySelector(".content");
const cardsPlace = mainContent.querySelector(".places");
const cardsList = cardsPlace.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(title, link, func_del) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  let cardImg = newCard.querySelector(".card__image");
  cardImg.src = link;
  cardImg.alt = title;
  newCard.querySelector(".card__description").textContent = title;

  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", func_del);
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


// @todo: Вывести карточки на страницу
/*for (let i = 0; i < initialCards.length; i++) {
  const cardItem = createCard(
    initialCards[i].name,
    initialCards[i].link,
    deleteCard
  );
  cardsList.append(cardItem);
}*/
