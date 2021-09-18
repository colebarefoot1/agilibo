import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { CrossTeamExternalDependency, CrossTeamView, TypeOfCrossTeamDependency, TeamInfoForReportDependencyOfGrid, CrossTeamDependency } from '../../models/CrossTeamDependency';
import TokenHelper from '../../services/tokenHelper'; 

@Injectable()
export class ExternalDependencyService {
    constructor(private http: Http, private config: AppConfig) { }


    getAllSpecifiedByTeamKey(teamKey: string): Observable<CrossTeamView[]> {
        return this.http.get(this.config.apiUrl + '/CrossTeamExternalDependency/GetAllSpecifiedByTeamKey/' + teamKey, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }  
   

    getByKey(id: string) {
        return this.http.get(this.config.apiUrl + '/CrossTeamExternalDependency/GetByKey/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(obj: CrossTeamDependency) {
        return this.http.post(this.config.apiUrl + '/CrossTeamExternalDependency/Create', obj, TokenHelper());
    }
   

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
   
}