import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { EmploymentType } from '../../models/EmploymentType';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class EmploymentTypeService {
    constructor(private http: Http, private config: AppConfig) { }
    //used in userprofile
    getAll():Observable<EmploymentType[]> {
        return this.http.get(this.config.apiUrl + '/EmploymentType/GetAll',TokenHelper())
            .map((response: Response) => {return response.json(); })
            .catch(this.errorHandler);    
    }

    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/EmploymentType/GetDetail/' + id, TokenHelper());
    }

    create(userDto: EmploymentType) {
        return this.http.post(this.config.apiUrl + '/EmploymentType/Create', userDto, TokenHelper());
    }

    update(userDto: EmploymentType) {
        return this.http.post(this.config.apiUrl + '/EmploymentType/Update', userDto, TokenHelper());
    }

    delete(id: string) {
        return this.http.get(this.config.apiUrl + '/EmploymentType/Delete/' + id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    } 
   
}