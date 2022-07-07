class UserInfo {
  constructor(
    { userName, userJob, userAvatar } //userName "profile__info-name" //userJob ".profile__info-title" //userAvatar ".profile__avatar"
  ) {
    //class names are sent in the constructor, we use the classes to find the objects in the DOM
    this.userNameElement = document.querySelector(userName);
    this.userJobElement = document.querySelector(userJob);
    this.userAvatarElement = document.querySelector(userAvatar);
  }
  setUserInfo({ name, about, avatar }) {
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = about;
    this.userAvatarElement.src = avatar;
  }

  setUserInfoTextOnly({ name, about }) {
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = about;
  }

  getUserInfo() {
    //might need to add profile pic??
    // handy for cases when it's necessary to display the user data in the open form
    const newObj = {
      username: this.userNameElement.textContent,
      userinfo: this.userJobElement.textContent,
    };
    return newObj;
  }
}

export { UserInfo };
