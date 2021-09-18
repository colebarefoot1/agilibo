import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { BusinessLine } from '../../models/BusinessLine';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class BusinessLineService {
    constructor(private http: Http, private config: AppConfig) { }


    getAll(): Observable<BusinessLine[]> {
        return this.http.get(this.config.apiUrl + '/BusinessLine/GetAll', TokenHelper())
            .map((response: Response) => {return response.json();})
            .catch(this.errorHandler);                 
    }
  
    getById(id: string){
        return this.http.get(this.config.apiUrl + '/BusinessLine/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(userDto: BusinessLine) {
        return this.http.post(this.config.apiUrl + '/BusinessLine/Create', userDto, TokenHelper());
    }

    update(userDto: BusinessLine) {
        return this.http.post(this.config.apiUrl + '/BusinessLine/Update', userDto, TokenHelper());
    }

    delete(id: string) {
        return this.http.get(this.config.apiUrl + '/BusinessLine/Delete/' + id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
   
}