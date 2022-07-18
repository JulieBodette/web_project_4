class UserInfo {
  constructor(
    { userName, userJob, userAvatar } //userName "profile__info-name" //userJob ".profile__info-title" //userAvatar ".profile__avatar"
  ) {
    //class names are sent in the constructor, we use the classes to find the objects in the DOM
    this.userNameElement = document.querySelector(userName);
    this.userJobElement = document.querySelector(userJob);
    this.userAvatarElement = document.querySelector(userAvatar);
  }

  setAvatar(avatar) {
    this.userAvatarElement.src = avatar;
  }

  setId(id) {
    this.id = id; //being set here and not in the constructor
  }

  getId() {
    console.log("userinfo id" + this.id);
    return this.id;
  }

  setUserInfoTextOnly({ name, about }) {
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = about;
  }

  getUserInfo() {
    //might need to add profile pic??
    // handy for cases when it's necessary to display the user data in the open form
    const newObj = {
      name: this.userNameElement.textContent,
      about: this.userJobElement.textContent,
      id: this.id,
    };
    return newObj;
  }
}

export { UserInfo };
