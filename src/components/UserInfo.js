class UserInfo {
  constructor(
    { userName, userJob } //userName "profile__info-name"
  ) //userJob ".profile__info-title"
  {
    this.userNameElement = document.querySelector(userName);
    this.userJobElement = document.querySelector(userJob);
  }
  setUserInfo({ newName, newJob }) {
    this.userNameElement.textContent = newName;
    this.userJobElement.textContent = newJob;
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
