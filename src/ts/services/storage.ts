import {Injectable} from 'angular2/core';

@Injectable()
export class StorageService {
    private _tokenKey: string = "token";

    hasToken() {
        return localStorage.getItem(this._tokenKey) != null;
    }

    removeToken() {
        localStorage.removeItem(this._tokenKey);
    }

    getToken() {
        return localStorage.getItem(this._tokenKey);
    }

    setToken(token: string) {
        localStorage.setItem(this._tokenKey, token);
    }
}