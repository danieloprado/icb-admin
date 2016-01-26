import {Injectable} from 'angular2/core';
import {BaseResponseOptions, Headers, ResponseOptionsArgs, ResponseOptions} from 'angular2/http';

import {AccountService} from './../services/account';
import {StorageService} from './../services/storage';

@Injectable()
export class ConfigResponseOptions extends BaseResponseOptions {
    constructor(private _storageService: StorageService) {
        super();
    }

    merge(options?: ResponseOptionsArgs): ResponseOptions {

        if (options.status == 500) {
            alert('deu zica!');
        }

        var token = options.headers.get("X-Token");
        if (token) {
            this._storageService.setToken(token);
        }

        return super.merge(options);
    }
}