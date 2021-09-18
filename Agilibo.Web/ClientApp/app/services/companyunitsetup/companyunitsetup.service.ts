import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { Observable } from 'rxjs/Observable';
import { CompanyUnit } from '../../models/CompanyUnit';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class CompanyUnitSetupService {
    constructor(private http: Http, private config: AppConfig) { }

    create(companyUnit: CompanyUnit) {
        return this.http.post(this.config.apiUrl + '/CompanyUnitSetup/Create', companyUnit, TokenHelper());
    }

    getAll(id:number): Observable<CompanyUnit[]> {
        return this.http.get(this.config.apiUrl + '/CompanyUnitSetup/GetAll/'+id, TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);
    }

    update(companyUnit: CompanyUnit) {
        return this.http.post(this.config.apiUrl + '/CompanyUnitSetup/Update', companyUnit, TokenHelper());
    }

    delete(id:string) {
        return this.http.delete(`${this.config.apiUrl}/CompanyUnitSetup/Delete/${id}`, TokenHelper());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}