const config = {
  token: 'bf33940d-be3d-4ef9-bf49-2e98c11384ae',
  cohortId: 'apf-cohort-202',
  get baseUrl() {
    return `https://nomoreparties.co/v1/${this.cohortId}`;
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function sendRequest(endpoint, options = {}) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    ...options,
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).then(checkResponse);
}

export function fetchUserData() {
  return sendRequest('/users/me');
}

export function updateUserData(userData) {
  return sendRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(userData),
  });
}

export function fetchInitialCards() {
  return sendRequest('/cards');
}

export function createCard(cardData) {
  return sendRequest('/cards', {
    method: 'POST',
    body: JSON.stringify(cardData),
  });
}

export function toggleLikeOnServer(cardId, like) {
  const method = like ? 'PUT' : 'DELETE';
  return sendRequest(`/cards/${cardId}/likes`, { method });
}

export function deleteCard(cardId) {
  return sendRequest(`/cards/${cardId}`, {
    method: 'DELETE',
  });
}

export function updateAvatar(avatarUrl) {
  return sendRequest('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar: avatarUrl }),
  });
}
