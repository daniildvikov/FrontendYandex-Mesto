export function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

export function addCloseButtonListeners() {
  document.querySelectorAll('.popup__close').forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(popup));
  });
}

export function addPopupClickListeners() {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target === popup) closeModal(popup);
    });
  });
}

export function addEscapeKeyListener() {
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closeModal(openedPopup);
    }
  });
}
