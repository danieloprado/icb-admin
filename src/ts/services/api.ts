import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


import {StorageService} from './storage';

@Injectable()
export class ApiService {
    constructor(private _http: Http, private _storage: StorageService) {

    }

    private apiUrl(controller: string, action: string) {
        return `api/${controller}/${action}`;
    }

    private getHeaders() {
        var token = this._storage.getToken();
        return new Headers({
            //"Authentication": `Bearer ${token}`,
            "Content-Type": "application/json; charset=UTF-8"
        });
    }

    private setBody(data: any): string {
        if (data == null) return;

        return JSON.stringify(data);
    }

    get(controller: string, action: string, data?: any): Observable<Response> {
        var url = this.apiUrl(controller, action);

        return this._http.get(url, new RequestOptions({
            headers: this.getHeaders(),
            body: this.setBody(data)
        }));
    }

    post(controller: string, action: string, data?: any): Observable<Response> {
        var url = this.apiUrl(controller, action);

        return this._http.post(url, this.setBody(data), new RequestOptions({
            headers: this.getHeaders()
        }));
    }
}