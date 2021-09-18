import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { ScrumRole } from '../../models/ScrumRole';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class ScrumRoleService {
    constructor(private http: Http, private config: AppConfig) { }

    //used in ScrumRole
    getAll(): Observable<ScrumRole[]> {
        return this.http.get(this.config.apiUrl + '/ScrumRole/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
   
    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumRole/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(userDto: ScrumRole) {
        return this.http.post(this.config.apiUrl + '/ScrumRole/Create', userDto, TokenHelper());
    }

    update(userDto: ScrumRole) {
        return this.http.post(this.config.apiUrl + '/ScrumRole/Update', userDto, TokenHelper());
    }

    delete(id:string) {
        return this.http.get(this.config.apiUrl + '/ScrumRole/Delete/'+id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
  
}