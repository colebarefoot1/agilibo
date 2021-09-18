import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { StrategicObject } from '../../models/StrategicObject';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class StrategicObjectService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll(): Observable<StrategicObject[]> {
        return this.http.get(this.config.apiUrl + '/StrategicObject/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/StrategicObject/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(userDto: StrategicObject) {
        return this.http.post(this.config.apiUrl + '/StrategicObject/Create', userDto, TokenHelper());
    }

    update(userDto: StrategicObject) {
        return this.http.post(this.config.apiUrl + '/StrategicObject/Update', userDto, TokenHelper());
    }

    delete(userDto: StrategicObject) {
        return this.http.post(this.config.apiUrl + '/StrategicObject/Delete', userDto, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
   
}