import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { EstimateSettingPlanningPoker } from '../../models/EstimateSettingPlanningPoker';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class EstimateSettingForPlanningPokerService {
    constructor(private http: Http, private config: AppConfig) { }
    //used in poker settings
    getAll(groupKey: string): Observable<EstimateSettingPlanningPoker[]> {
        return this.http.get(this.config.apiUrl + '/EstimateSettingForPlanningPoker/GetAllwithTeamID/' + groupKey, TokenHelper())
            .map((response: Response) => { return response.json(); })
            .catch(this.errorHandler);

    }
    // used in planningpokerpointsetting
    levelDown(obj: EstimateSettingPlanningPoker) {
        return this.http.post(this.config.apiUrl + '/EstimateSettingForPlanningPoker/LevelDown', obj, TokenHelper());
    }
    // used in planningpokerpointsetting
    levelUp(obj: EstimateSettingPlanningPoker) {
        return this.http.post(this.config.apiUrl + '/EstimateSettingForPlanningPoker/LevelUp', obj, TokenHelper());
    }

    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/EstimateSettingForPlanningPoker/GetDetail/' + id, TokenHelper());
    }
    // used in planningpokerpointsetting
    create(obj: EstimateSettingPlanningPoker) {
        return this.http.post(this.config.apiUrl + '/EstimateSettingForPlanningPoker/Create', obj, TokenHelper());
    }

    update(obj: EstimateSettingPlanningPoker) {
        return this.http.post(this.config.apiUrl + '/EstimateSettingForPlanningPoker/Update', obj, TokenHelper());
    }
    // used in planningpokerpointsetting
    delete(id: string) {
        return this.http.get(this.config.apiUrl + '/EstimateSettingForPlanningPoker/Delete/' + id, TokenHelper());
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
  
}