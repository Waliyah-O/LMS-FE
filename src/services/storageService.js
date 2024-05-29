import { _getTokenFromSession, _setTokenToSession, _removeTokenFromSession } from '../utils';
export default class StorageService {
  #milliSecondsInDays = 86400000;

  saveAuthData(authData) {
    const expirationTime = new Date(authData.expires_in * 1000);
    this.#saveItemIfProvided('accessToken', authData.accessToken, expirationTime);
    this.#saveItemIfProvided('userName', authData.userName, expirationTime);
  }

  #saveItemIfProvided(key, value, expiresAt) {
    if (value && expiresAt) {
      _setTokenToSession(value, key);
    } else if (value) {
      _setTokenToSession(value, key);
    }
  }

  clearAuthData() {
    _removeTokenFromSession('accessToken');
    _removeTokenFromSession('userName');
  }

  clearCookieData() {
    _removeTokenFromSession('accessToken');
    _removeTokenFromSession('userName');
  }

  set(key, value) {
    this.#saveItemIfProvided(key, value);
  }

  get(key) {
    return _getTokenFromSession(key);
  }

  remove(key) {
    return _removeTokenFromSession(key);
  }

  clearAuthDataFromLocal = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userName');
  };

  getAuthData() {
    const accessToken = _getTokenFromSession('accessToken');
    const userName = _getTokenFromSession('userName');

    // If either accessToken or userName is null, return null for both
    if (!accessToken || !userName) {
      return null;
    }

    return {
      accessToken,
      userName,
    };
  }

  isAuthenticated() {
    const accessToken = _getTokenFromSession('accessToken');
    const userName = _getTokenFromSession('userName');

    // If either accessToken or userName is null, return false
    if (!accessToken || !userName) {
      return false;
    }

    return true;
  }

  // getAuthData() {
  //   return {
  //     accessToken: _getTokenFromSession('accessToken'),
  //     userName: _getTokenFromSession('userName'),
  //   };

  // }
}
