const API_URL = 'http://localhost:3000';

class Api {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(new Error(err.message)));
  }

  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this._checkRes);
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }

  getReports(token) {
    return fetch(`${this._url}/reports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }
}

const api = new Api(API_URL);

export default api;
