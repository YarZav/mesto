class UserInfo {
    // Init

    constructor(nameSelector, occupationSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._occupation = document.querySelector(occupationSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    // Public

    getUserInfo() {
        return this._userInfo;
    }

    setUserInfo(userInfo) {
        this._userInfo = userInfo;
        this._name.textContent = userInfo.name;
        this._occupation.textContent = userInfo.about;
        this._avatar.src = new URL(userInfo.avatar, import.meta.url);
    }
}

export { UserInfo }