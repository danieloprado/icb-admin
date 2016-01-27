import 'rxjs/Rx';

import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, RequestOptions} from 'angular2/http';

import {AppComponent} from './app.component';
import {APP_SERVICES} from './app.services';
import {APP_CONFIG} from './app.config';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, APP_SERVICES, APP_CONFIG]);
