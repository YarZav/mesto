class UserInfo {
    // Init

    constructor(nameSelector, descriptionSelector) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
    }

    // Public

    getUserInfo() {
        const name = document.querySelector(this._nameSelector).textContent;
        const description = document.querySelector(this._descriptionSelector).textContent;

        return { name: name, description: description };
    }

    setUserInfo(userInfo) {
        document.querySelector(this._nameSelector).textContent = userInfo.name;
        document.querySelector(this._descriptionSelector).textContent = userInfo.description;
    }
}

export { UserInfo }