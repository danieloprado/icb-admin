import {Injectable} from 'angular2/core';

import {StorageService} from './storage';
import {ApiService} from './api';

@Injectable()
export class AccountService {
    private tokenKey: string = "token";

    constructor(private _storage: StorageService, private _api: ApiService) { }

    isLogged() {
        return this._storage.hasToken();
    }

    logoff() {
        this._storage.removeToken();
    }

    login(email: string, password: string) {
        return this._api.post("account", "login", { email, password });
    }
}