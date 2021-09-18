import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { SprintDuration } from '../../models/SprintDuration';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class SprintDurationService {
    constructor(private http: Http, private config: AppConfig) { }

    //Used in Sprint
    getAll(): Observable<SprintDuration[]> {
        return this.http.get(this.config.apiUrl + '/SprintDuration/GetAll',TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }

    getToDate(fromdate: Date, days:number) {
        return this.http.get(this.config.apiUrl + '/SprintDuration/GetToDate/' + fromdate + '/' + days, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/SprintDuration/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(obj: SprintDuration) {
        return this.http.post(this.config.apiUrl + '/SprintDuration/Create', obj, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    update(obj: SprintDuration) {
        return this.http.post(this.config.apiUrl + '/SprintDuration/Update', obj, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/SprintDuration/Delete/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
  
}