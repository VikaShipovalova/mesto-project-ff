// token = '5b012af6-9566-46e3-af76-7022bbe2d01b';
// groupID = 'wff-cohort-5';

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "5b012af6-9566-46e3-af76-7022bbe2d01b",
    "Content-Type": "application/json",
  },
};

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}

export function getBaseCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}

export function editProfileInfo(newInfo) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-5/users/me", {
    method: "PATCH",
    headers: {
      authorization: "5b012af6-9566-46e3-af76-7022bbe2d01b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newInfo.name,
      about: newInfo.about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}

export function editProfileAvatar(avatar) {
  console.log("twotwoteo");
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log("hello");
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}
export function appendNewCard(cardInfo, userId) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardInfo.name,
      link: cardInfo.link,
      cardID: cardInfo._id,
      likes: cardInfo.likes,
      owner: {
        _id: userId,
      },
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}

export function addLikes(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      return data.likes.length;
    });
}

export function deleteLikes(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      return data.likes.length;
    });
}

export function deleteCardApi(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}
