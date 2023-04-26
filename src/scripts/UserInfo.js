class UserInfo {
    // Init

    constructor(nameSelector, occupationSelector) {
        this._nameSelector = nameSelector;
        this._occupationSelector = occupationSelector;
    }

    // Public

    getUserInfo() {
        const name = document.querySelector(this._nameSelector).textContent;
        const occupation = document.querySelector(this._occupationSelector).textContent;

        return { name: name, occupation: occupation };
    }

    setUserInfo(userInfo) {
        document.querySelector(this._nameSelector).textContent = userInfo.name;
        document.querySelector(this._occupationSelector).textContent = userInfo.occupation;
    }
}

export { UserInfo }