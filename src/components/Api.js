class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    const url = this._baseUrl + "/users/me";
    return fetch(url, {
      headers: this._headers,
    });
  }

  patchUserAvatar(info) {
    const url = this._baseUrl + "/users/me/avatar";
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    });
  }
  patchUserInfo(info) {
    //user.getUserInfo() is passed in for info
    const url = this._baseUrl + "/users/me";
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    });
  }

  deleteCard(id) {
    const url = this._baseUrl + "/cards/" + id;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  uploadCard(info) {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(info),
    }).then((res) => res.json());
  }

  likeCard(id) {
    const url = this._baseUrl + "/cards/likes/" + id;
    return fetch(url, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => res.json());
  }

  //handleapiresonse
  //(res) => res.json()

  unLikeCard(id) {
    const url = this._baseUrl + "/cards/likes/" + id;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => res.json());
  }
}
export { Api };
