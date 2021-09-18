import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { ScrumTeam, ScrumTeamDetail, TeamDetail, ScrumTeamViewList } from '../../models/ScrumTeam';
import { Observable } from 'rxjs/Observable';
import { Country } from '../../models/Country';
import TokenHelper from '../../services/tokenHelper'; 

@Injectable()
export class CountryService {
    constructor(private http: Http, private config: AppConfig) { }

    create(country: Country) {
        return this.http.post(this.config.apiUrl + '/Country/Create', country, TokenHelper());
    }

    getAll(): Observable<Country[]> {
        return this.http.get(this.config.apiUrl + '/Country/GetAll', TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);
    }

    update(country: Country) {
        return this.http.post(this.config.apiUrl + '/Country/Update', country, TokenHelper());
    }

    delete(id: string) {
        return this.http.get(this.config.apiUrl + '/Country/Delete/'+ id, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
  
}