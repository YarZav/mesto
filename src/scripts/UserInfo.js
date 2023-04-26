class UserInfo {
    // Init

    constructor(nameSelector, occupationSelector) {
        this._nameSelector = nameSelector;
        this._occupationSelector = occupationSelector;

        this._name = document.querySelector(this._nameSelector);
        this._occupation = document.querySelector(this._occupationSelector);

    }

    // Public

    getUserInfo() {
        return { name: this._name.textContent, occupation: this._occupation.textContent };
    }

    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._occupation.textContent = userInfo.occupation;
    }
}

export { UserInfo }