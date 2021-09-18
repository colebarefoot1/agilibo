import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { Observable } from 'rxjs/Observable';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { NavMenuView, DefaultMenu } from '../../models/NavMenuView';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class NavigationService {
    constructor(private http: Http, private config: AppConfig) { }

    //getMenuForAllAccess(): Observable<NavMenuView> {
    //    return this.http.get(this.config.apiUrl + '/AppNavigation/GetMenuForAllAcess', TokenHelper())
    //        .map((response: Response) => response.json())
    //        .catch(this.errorHandler);
    //}

    getMenuForPresignIn(): Observable<DefaultMenu> {
        return this.http.get(this.config.apiUrl + '/AppNavigation/GetMenuForPresignIn', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    presignIn(): Observable<DefaultMenu> {
        return this.http.get(this.config.apiUrl + '/AppNavigation/PresignIn')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}