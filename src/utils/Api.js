class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards() {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getUserInfo() {
    const url = this._baseUrl + "/users/me";
    return fetch(url, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  patchUserAvatar(info) {
    const url = this._baseUrl + "/users/me/avatar";
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    }).then(this._processResponse);
  }

  patchUserInfo(info) {
    //user.getUserInfo() is passed in for info
    const url = this._baseUrl + "/users/me";
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    }).then(this._processResponse);
  }

  deleteCard(id) {
    const url = this._baseUrl + "/cards/" + id;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }

  uploadCard(info) {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(info),
    }).then(this._processResponse);
  }

  likeCard(id) {
    const url = this._baseUrl + "/cards/likes/" + id;
    return fetch(url, {
      method: "PUT",
      headers: this._headers,
    }).then(this._processResponse);
  }

  unLikeCard(id) {
    const url = this._baseUrl + "/cards/likes/" + id;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }
}
export { Api };
