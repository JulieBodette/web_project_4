class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    console.log("cards. this runs before fetch starts.");
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

  patchUserInfo(info) {
    //user.getUserInfo() is passed in for info
    const url = this._baseUrl + "/users/me";
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    });
  }

  uploadCard(info) {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(info),
    });
  }
}

export { Api };
