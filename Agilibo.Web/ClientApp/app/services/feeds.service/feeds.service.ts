import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { Observable } from 'rxjs/Observable';
import TokenHelper from '../../services/tokenHelper';
import { KudoCard } from '../../models/KudoCard';

@Injectable()
export class FeedsService {
    constructor(private http: Http, private config: AppConfig) { }

    getKudoCardByEmail(email: string, apiKey: string) {
        //return this.http.get(this.config.apiUrl + '/V1/KudoCard/GetKudoCardByEmail' + email, TokenHelper())
        return this.http.get(`${this.config.apiUrl}/ScrumTeam/GetAllUsersForAddingInTheTeam/${email}/${apiKey}`, TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);

    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}