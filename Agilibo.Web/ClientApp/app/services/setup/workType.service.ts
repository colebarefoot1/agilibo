import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { WorkType } from '../../models/WorkType';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class WorkTypeService {
    constructor(private http: Http, private config: AppConfig) { }
    //used in Team manage
    getAll(): Observable<WorkType[]> {
        return this.http.get(this.config.apiUrl + '/WorkType/GetAll', TokenHelper())
            .map((response: Response) => {  return response.json(); })
            .catch(this.errorHandler);
    }

    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/WorkType/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(worktype: WorkType) {
        return this.http.post(this.config.apiUrl + '/WorkType/Create', worktype, TokenHelper());
    }

    update(worktype: WorkType) {
        return this.http.post(this.config.apiUrl + '/WorkType/Update', worktype, TokenHelper());
    }

    delete(id: string) {        
        return this.http.get(this.config.apiUrl + '/WorkType/Delete/' + id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
   
}