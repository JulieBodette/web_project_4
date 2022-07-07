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
}

export { Api };
