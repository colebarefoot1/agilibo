import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AppConfig } from "../../../AppConfig";
import { CompanyUnit } from "../../models/CompanyUnit";
import { Observable } from "rxjs/Observable";
import { ScrumUser } from "../../models/ScrumUser";
import TokenHelper from '../../services/tokenHelper'; 

@Injectable()
export class CompanyUnitService {
   
    constructor(private http: Http, private config: AppConfig) { }

    responseValue: any = {};
    //used in companyunit after signin
    create(companyUnit: CompanyUnit): Observable<number>{
        return this.http.post(this.config.apiUrl + '/CompanyUnit/Create', companyUnit, TokenHelper())
            .map((response: Response) => { this.responseValue = response.json(); return response.json(); })
            .catch(this.errorHandler);
    }

    updateUnit(scrumUser: ScrumUser): Observable<number>{
        console.log(scrumUser);
        return this.http.post(this.config.apiUrl + '/CompanyUnit/UpdateUnit', scrumUser, TokenHelper())
            .map((response: Response) => { this.responseValue = response.json(); return response.json(); })
            .catch(this.errorHandler);
    }
    
    getAll(): Observable<CompanyUnit[]> {
        return this.http.get(this.config.apiUrl + '/CompanyUnit/GetAll', TokenHelper())
            .map((response: Response) => { return response.json(); })
            .catch(this.errorHandler);
    }
    getUnitList(userKey: string) {
        return this.http.get(this.config.apiUrl + '/CompanyUnit/GetUnitList/' + userKey, TokenHelper())           
            .map((response: Response) => {
                let user = response.json();               
            })
            .catch(this.errorHandler);
    }
    //used in companyunit page, userProfile
    getUnitPerCompany(companyKey: number): Observable<CompanyUnit[]> {
        return this.http.get(this.config.apiUrl + '/CompanyUnit/GetUnitPerCompany/' + companyKey, TokenHelper())
            .map((response: Response) => { return response.json(); })
            .catch(this.errorHandler);

    }

    update(companyUnit: CompanyUnit) {
        return this.http.post(this.config.apiUrl + '/CompanyUnit/Update', companyUnit, TokenHelper());
    }
    
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}