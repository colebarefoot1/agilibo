import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { StakeHolder } from '../../models/StakeHolder';
import TokenHelper from '../../services/tokenHelper';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScrumTeamService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }   

    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(userDto: StakeHolder) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/Create', userDto, TokenHelper());
    }

    update(userDto: StakeHolder) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/Update', userDto, TokenHelper());
    }

    delete(id:string) {
        return this.http.delete(this.config.apiUrl + '/ScrumTeam/Delete/'+id, TokenHelper());
    }
    errorHandler(error: Response) {       
        return Observable.throw(error);
    }  

}