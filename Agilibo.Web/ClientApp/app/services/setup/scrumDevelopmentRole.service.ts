import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { ScrumDevelopmentRole } from '../../models/ScrumDevelopmentRole';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class ScrumDevelopmentRoleService {
    constructor(private http: Http, private config: AppConfig) { }
    //used in ScrumDevelopmentRole, userprofile
    getAll(): Observable<ScrumDevelopmentRole[]> {
        return this.http.get(this.config.apiUrl + '/ScrumDevelopmentRole/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }    
    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumDevelopmentRole/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
     //used in ScrumDevelopmentRole
    create(userDto: ScrumDevelopmentRole) {
        return this.http.post(this.config.apiUrl + '/ScrumDevelopmentRole/Create', userDto, TokenHelper());
    }

    update(userDto: ScrumDevelopmentRole) {
        return this.http.post(this.config.apiUrl + '/ScrumDevelopmentRole/Update', userDto, TokenHelper());
    }
     //used in ScrumDevelopmentRole
    delete(id:string) {
        return this.http.get(this.config.apiUrl + '/ScrumDevelopmentRole/Delete/'+id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }      
}