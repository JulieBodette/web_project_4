class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers;
    }
  
    getInitialCards() {
      console.log("cards");
      const url = this.baseUrl + "/cards"
      fetch(url, {
  headers: {
    authorization: "7201271b-2cce-46ab-9f28-d324b822f8cb"
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
  console.log("we got the cards");
    }

  }


  export {Api};
  




