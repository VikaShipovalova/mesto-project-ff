
function escClose(evt) {
    if (evt.key === 'Escape') {
        const popupForClose = document.querySelector('.popup_is-opened');
        popupForClose.classList.remove('popup_is-opened');
        document.removeEventListener('keydown',escClose);
    }
};
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', escClose);
};

export function closeModal(closeButton) { 
    const parentPopup = closeButton.target.closest('.popup');
    parentPopup.classList.remove('popup_is-opened');
    parentPopup.classList.remove('popup_is-animated');
}

export function closeOverlay(evt) {
    if(evt.target !== 'is-opened') {
        evt.target.classList.remove('popup_is-opened');
        evt.target.classList.remove('popup_is-animated');
    }
}
