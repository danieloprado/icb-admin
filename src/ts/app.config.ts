import {Provider, provide} from 'angular2/core';
import {RequestOptions, ResponseOptions} from 'angular2/http';

import {ConfigResponseOptions} from './config/responseOptions';


export var APP_CONFIG: Provider[] = [
    provide(ResponseOptions, { useClass: ConfigResponseOptions })
];