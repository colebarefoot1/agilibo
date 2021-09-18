import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { Observable } from 'rxjs/Observable';
import TokenHelper from '../../services/tokenHelper';
import { KudoCard } from '../../models/KudoCard';

@Injectable()
export class KudoCardService {
    constructor(private http: Http, private config: AppConfig) { }

    create(kudocard: KudoCard) {
        console.log(kudocard)
        return this.http.post(this.config.apiUrl + '/V1/KudoCard/AddKudoCard', kudocard, TokenHelper());
    }
    //Used In kudocardbox
    getKudoCardByUnitId(unitId: number, companyId: number) {
        return this.http.get(`${this.config.apiUrl}/V1/KudoCard/GetKudoCardByUnitId/${unitId}/${companyId}`, TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}