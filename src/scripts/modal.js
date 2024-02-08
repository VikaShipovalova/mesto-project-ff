function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popupForClose = document.querySelector(".popup_is-opened");
    closeModal(popupForClose);
  }
}
export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("mousedown", closeOverlay);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("mousedown", closeOverlay);
}

function closeOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
        closeModal(evt.target);
  }
}
