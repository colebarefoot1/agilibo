import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { MenuHeader, MenuDetail } from '../../models/MenuHeader';

import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class FormService {
    constructor(private http: Http, private config: AppConfig) { }
    getAllFormsUnderSubHeader(): Observable<MenuDetail[]> {
        return this.http.get(this.config.apiUrl + '/Forms/GetAllFormsUnderSubHeader', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    createFromsUnderSubHeader(userDto: MenuDetail) {
        return this.http.post(this.config.apiUrl + '/Forms/CreateFromsUnderSubHeader', userDto, TokenHelper());
    }
    getAllFormsUnderFixedHeader(): Observable<MenuDetail[]> {
        return this.http.get(this.config.apiUrl + '/Forms/GetAllFormsUnderFixedHeader', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    createFromsUnderFixedHeader(userDto: MenuDetail) {
        return this.http.post(this.config.apiUrl + '/Forms/CreateFromsUnderFixedHeader', userDto, TokenHelper());
    }

    deleteForms(id: number) {
        return this.http.get(this.config.apiUrl + '/Forms/Delete/' + id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}