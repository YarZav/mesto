class UserInfo {
    // Init

    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    // Public

    getUserInfo() {
        return this._userInfo;
    }

    setUserInfo(userInfo) {
        this._userInfo = userInfo;
        this._name.textContent = userInfo.name;
        this._about.textContent = userInfo.about;
        this._avatar.src = new URL(userInfo.avatar, import.meta.url);
    }
}

export { UserInfo }