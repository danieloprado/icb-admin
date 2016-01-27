import {Provider, provide} from 'angular2/core';

import {AccountService} from './services/account';
import {ApiService} from './services/api';
import {StorageService} from './services/storage';

export var APP_SERVICES: Provider[] = [
    provide(AccountService, { useClass: AccountService }),
    provide(ApiService, { useClass: ApiService }),
    provide(StorageService, { useClass: StorageService })
];
