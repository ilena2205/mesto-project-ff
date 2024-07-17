const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: 'fb23e767-a971-4593-a4ab-12aecf4b3efd',
      'Content-Type': 'application/json'
    }
}

const handleRes = (res) => {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
}

export const handleErr = (err) => {
    console.log(err);
}

export const getInitialCards = () => {
      return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
      .then(handleRes)
      .catch(handleErr);
}

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(handleRes)
      .catch(handleErr);
}

export const addUser = (nameValue, jobValue) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: nameValue,
          about: jobValue
        })
      })
      .catch(handleErr);
}

export const addNewCard = (cardNameValue, urlValue) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: cardNameValue,
          link: urlValue
        })
      })
    .then(handleRes)
    .catch(handleErr);
}

export const apiDeleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleRes)
    .catch(handleErr);
}

export const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleRes)
    .catch(handleErr);
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleRes)
    .catch(handleErr);
}

export const avatarUser = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
    .then(handleRes)
    .catch(handleErr);
}

