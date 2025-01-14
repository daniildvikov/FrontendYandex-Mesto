import { cardTemplate, imagePopup, openConfirmPopup} from './index.js';
import { openModal } from './modal.js';
import { toggleLikeOnServer, deleteCard} from './api.js';

export function createCard(info, currentUserId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = document.createElement('span');
  
  likeCount.classList.add('card__like-count');
  likeCount.textContent = info.likes.length; 
  likeButton.after(likeCount);

  if (info.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  }

  cardImage.src = info.link;
  cardImage.alt = info.name;
  cardTitle.textContent = info.name;

  deleteButton.addEventListener('click', () => {
    openConfirmPopup(() => {
      deleteCard(info._id)
        .then(() => {
          cardElement.remove();
        })
        .catch(err => console.error('Ошибка при удалении карточки:', err));
    });
  });

  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    toggleLikeOnServer(info._id, !isLiked)
      .then(updatedCard => {
        likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error(`Ошибка изменения лайка: ${err}`));
  });

  cardImage.addEventListener('click', () => {
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = info.link;
    imagePopupImage.alt = info.name;
    imagePopupCaption.textContent = info.name;

    openModal(imagePopup);
  });

  return cardElement;
}

