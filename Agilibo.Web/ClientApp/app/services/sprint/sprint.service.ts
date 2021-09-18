import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { Sprint, SprintViewModel } from '../../models/Sprint';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class SprintService {
    constructor(private http: Http, private config: AppConfig) { }
    getAll(teamKey:string): Observable<SprintViewModel[]> {
        return this.http.get(this.config.apiUrl + '/Sprint/GetAll/' + teamKey, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }

    getPrimarySprintByTeamKeyForCrossTeamDependency(teamKey: string): Observable<Sprint[]> {
        return this.http.get(this.config.apiUrl + '/Sprint/GetPrimarySprintByTeamKeyForCrossTeamDependency/' + teamKey, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }

    getAllSprintsTeamwise(teamKey: string): Observable<Sprint[]> {
        return this.http.get(this.config.apiUrl + '/Sprint/GetAllSprintsTeamwise/' + teamKey, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    //used in Sprint
    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/Sprint/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    //used in sprint
    create(obj: Sprint) {
        return this.http.post(this.config.apiUrl + '/Sprint/Create', obj, TokenHelper());
    }

    update(obj: Sprint) {
        return this.http.post(this.config.apiUrl + '/Sprint/Update', obj, TokenHelper());
    }
    //Used in Sprint
    delete(id: string) {
        return this.http.get(this.config.apiUrl + '/Sprint/Delete/' + id, TokenHelper());
    }
   
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}