import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { Observable } from 'rxjs/Observable';
import TokenHelper from '../../services/tokenHelper';

import { HappinessDoor } from '../../models/HappinessDoor';

@Injectable()
export class HappinessDoorService {
    constructor(private http: Http, private config: AppConfig) { }
     //used in happinessdoor
    create(happinessDoor: HappinessDoor) {
        console.log(happinessDoor)
        return this.http.post(this.config.apiUrl + '/V1/HapinessDoor/AddHapinessNote', happinessDoor, TokenHelper());
    }
    //used in happinessdoor
    getHappinessByMail(email: string): Observable<HappinessDoor[]> {
        //return this.http.get(`${this.config.apiUrl}/V1/HapinessDoor/GetHapinessDoorByEmail/${email}`, TokenHelper())
        return this.http.get(this.config.apiUrl + '/V1/HapinessDoor/GetHapinessDoorByEmail/' + email, TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);

    }
    //used in Happinessdoor
    getHappinessByFilter(email: string, eventName: string) {
        return this.http.get(`${this.config.apiUrl}/V1/HapinessDoor/GetHappinessByFilter/${email}/${eventName}`, TokenHelper())
        //return this.http.get(this.config.apiUrl + '/V1/HapinessDoor/GetHappinessByFilter/${email}/${eventName}', TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);
    }


    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}