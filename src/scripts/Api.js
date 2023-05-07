class Api {
    // Init

    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    // Private

    _makeRequest(method, path, data = { }) {
        const reqeust = (Object.keys(data).length === 0)
            ? this._makeRequestWithoutBody(method, path)
            : this._makeRequestWithBody(method, path, data);
        return reqeust.then(this._parseResponse);
    }

    _makeRequestWithBody(method, path, data) {
        return fetch(
            `${this._baseUrl}/${path}`, 
            {
                method: method,
                headers: this._headers,
                body: JSON.stringify(data)
            }
        )
    }

    _makeRequestWithoutBody(method, path, data) {
        return fetch(
            `${this._baseUrl}/${path}`, 
            {
                method: method,
                headers: this._headers
            }
        )
    }

    _parseResponse(result) {
        if (result.ok) {
            return result.json();
        } else {
            return Promise.reject(`Ошибка: ${result.status}`);
        }
    }

    // Public

    getProfilInfo() {
        return this._makeRequest("GET", "users/me");
    }

    setProfileInfo(name, about) {
        return this._makeRequest("PATCH", "users/me", { name: name, about: about });
    }

    setAvatar(avatar) {
        return this._makeRequest("PATCH", "users/me/avatar", { avatar: avatar });
    }

    getInitialCards() {
        return this._makeRequest("GET", "cards");
    }

    addCard(name, link) {
        return this._makeRequest("POST", "cards", { name: name, link: link });
    }

    deleteCard(cardId) {
        return this._makeRequest("DELETE", `cards/${cardId}`);
    }

    setCardLike(cardId) {
        return this._makeRequest("PUT", `/cards/${cardId}/likes`);
    }
}

export { Api }