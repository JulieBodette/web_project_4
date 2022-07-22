class UserInfo {
  constructor(
    { userName, userJob, userAvatar } //userName "profile__info-name" //userJob ".profile__info-title" //userAvatar ".profile__avatar"
  ) {
    //class names are sent in the constructor, we use the classes to find the objects in the DOM
    this._userNameElement = document.querySelector(userName);
    this._userJobElement = document.querySelector(userJob);
    this._userAvatarElement = document.querySelector(userAvatar);
  }

  setAvatar(avatar) {
    this._userAvatarElement.src = avatar;
  }

  setId(id) {
    this._id = id; //being set here and not in the constructor
  }

  getId() {
    return this._id;
  }

  setUserInfoTextOnly({ name, about }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = about;
  }

  getUserInfo() {
    //might need to add profile pic??
    // handy for cases when it's necessary to display the user data in the open form
    const newObj = {
      name: this._userNameElement.textContent,
      about: this._userJobElement.textContent,
      id: this.getId(),
    };
    return newObj;
  }
}

export { UserInfo };
