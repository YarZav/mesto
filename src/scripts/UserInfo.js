class UserInfo {
    // Init

    constructor(nameSelector, occupationSelector) {
        this._nameSelector = nameSelector;
        this._occupationSelector = occupationSelector;
    }

    // Public

    getUserInfo() {
        return this._userInfo;
    }

    setUserInfo(userInfo) {
        this._userInfo = userInfo;
        this._name.textContent = userInfo.name;
        this._occupation.textContent = userInfo.occupation;
    }
}

export { UserInfo }