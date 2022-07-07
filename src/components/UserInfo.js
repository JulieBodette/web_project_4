class UserInfo {
  constructor(
    { userName, userJob } //userName "profile__info-name" //userJob ".profile__info-title"
  ) {
    this.userNameElement = document.querySelector(userName);
    this.userJobElement = document.querySelector(userJob);
  }
  setUserInfo({ name, about }) {
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = about;
  }
  getUserInfo() {
    // handy for cases when it's necessary to display the user data in the open form
    const newObj = {
      username: this.userNameElement.textContent,
      userinfo: this.userJobElement.textContent,
    };
    return newObj;
  }
}

export { UserInfo };
