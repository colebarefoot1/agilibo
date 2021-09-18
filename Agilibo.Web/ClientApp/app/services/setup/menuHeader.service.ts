import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { MenuHeader } from '../../models/MenuHeader';
import { MenuClass } from '../../models/MenuClass';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class MenuHeaderService {
    constructor(private http: Http, private config: AppConfig) { }
    getAll(): Observable<MenuHeader[]> {
        return this.http.get(this.config.apiUrl + '/Menu/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    create(userDto: MenuHeader) {
        return this.http.post(this.config.apiUrl + '/Menu/Create', userDto, TokenHelper());
    }
    

    deleteWithSubMenu(id: number) {
        return this.http.get(this.config.apiUrl + '/Menu/DeleteWithSubMenu/' + id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
}