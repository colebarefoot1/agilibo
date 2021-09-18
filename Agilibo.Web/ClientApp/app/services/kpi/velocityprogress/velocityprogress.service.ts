import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../../AppConfig';
import { VelocityProgressView, category, combinedCharts } from '../../../models/VelocityProgressView';
import { Observable } from 'rxjs/Observable';
import TokenHelper from '../../../services/tokenHelper';

@Injectable()
export class VelocityProgressService {
    constructor(private http: Http, private config: AppConfig) { }
    teamkpilist: VelocityProgressView[] = [];
    //used in velocity KPI
    getVelocityProgressForKPITeamwise(id: string): Observable<VelocityProgressView[]> {
        console.log(TokenHelper());
        return this.http.get(`${this.config.apiUrl}/VelocityProgress/GetVelocityProgressForKPITeamwise/${id}`, TokenHelper())
            .map((response: Response) => { response.json(); this.teamkpilist = response.json();})
            .catch(this.errorHandler);

    }
    chartValue: any = {};
    //used in Velocity KPI
    getvalueForGraphCategory(id: string): Observable<combinedCharts> {
        return this.http.get(this.config.apiUrl + '/VelocityProgress/GetvalueForGraphCategory/' + id, TokenHelper())
            .map((response: Response) => { response.json(); this.chartValue = response.json(); })
            .catch(this.errorHandler);

    }  
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
    
}