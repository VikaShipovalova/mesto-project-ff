
function escClose(evt) {
    if (evt.key === 'Escape') {
        const popupForClose = document.querySelector('.popup_is-opened');
        closeModal(popupForClose);
    }
};
export function openModal(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escClose);
};

export function closeModal(popup) { 
    popup.classList.remove('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.removeEventListener('keydown',escClose);
}

export function closeOverlay(evt) {
    if(evt.target !== 'is-opened') {
       closeModal(evt.target);
    }
}
