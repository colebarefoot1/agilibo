import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { CrossTeamDependency, CrossTeamView, TypeOfCrossTeamDependency, TeamInfoForReportDependencyOfGrid, TeamListWiththreeConsecutiveSprints } from '../../models/CrossTeamDependency';
import TokenHelper from '../../services/tokenHelper'; 

@Injectable()
export class CrossTeamDependencyService {
    constructor(private http: Http, private config: AppConfig) { }


    getAllSpecifiedByTeamKey(teamKey: string): Observable<CrossTeamView[]> {
        return this.http.get(this.config.apiUrl + '/CrossTeamDependency/GetAllSpecifiedByTeamKey/' + teamKey, TokenHelper())
            .map((response: Response) => response.json());

    }
   
    getAllCrossTeamDependencyType(): Observable<TypeOfCrossTeamDependency[]> {
        return this.http.get(this.config.apiUrl + '/CrossTeamDependency/GetAllCrossTeamDependencyType', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getAll(id:number): Observable<CrossTeamView[]> {
        return this.http.get(`${this.config.apiUrl}/CrossTeamDependency/GetAll/${id}`, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    ///function that fetches the data for Cross team Dependency
    getTeamListForReportDependencyGrid(id: number): Observable<TeamListWiththreeConsecutiveSprints[]> {
        return this.http.get(`${this.config.apiUrl}/CrossTeamDependency/GetTeamListForReportDependencyGrid/${id}`, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getByKey(id: string, isExternal: boolean) {
        return this.http.get(this.config.apiUrl + '/CrossTeamDependency/GetByCrossTeamDependencyKey/' + id + '/' + isExternal, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(obj: CrossTeamDependency) {
        return this.http.post(this.config.apiUrl + '/CrossTeamDependency/Create', obj, TokenHelper());
    }
    delete(id: string, external: boolean) {
        return this.http.get(this.config.apiUrl + '/CrossTeamDependency/Delete/' + id + '/' + external, TokenHelper());
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
  
}