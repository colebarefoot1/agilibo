import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { ScrumUserAllocationType } from '../../models/ScrumUserAllocationType';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class ScrumUserAllocationTypeService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll(): Observable<ScrumUserAllocationType[]> {
        return this.http.get(this.config.apiUrl + '/ScrumUserAllocationType/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumUserAllocationType/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    create(userDto: ScrumUserAllocationType) {
        return this.http.post(this.config.apiUrl + '/ScrumUserAllocationType/Create', userDto, TokenHelper());
    }
    update(userDto: ScrumUserAllocationType) {
        return this.http.post(this.config.apiUrl + '/ScrumUserAllocationType/Update', userDto, TokenHelper());
    }
    delete(id:string) {
        return this.http.get(this.config.apiUrl + '/ScrumUserAllocationType/Delete/'+id, TokenHelper());
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
   
}