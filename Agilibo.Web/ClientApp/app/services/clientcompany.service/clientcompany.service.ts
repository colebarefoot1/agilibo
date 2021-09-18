import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { ClientCompany, DetailCompany } from '../../models/ClientCompany';
import { Observable } from 'rxjs/Observable';
import TokenHelper from '../../services/tokenHelper'; 
import { ScrumUserInviteMember } from '../../models/ScrumUserInviteMember';

@Injectable()
export class ClientCompanyService {

    inviteRequestDetails: ScrumUserInviteMember;

    constructor(private http: Http, private config: AppConfig) { }


    create(clientCom: ClientCompany) {
        return this.http.post(this.config.apiUrl + '/ClientCompany/Create', clientCom, TokenHelper());
    }

    getAll(id:string): Observable<ClientCompany[]> {
        return this.http.get(this.config.apiUrl + '/ClientCompany/GetAll/'+id, TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);
    }
    //Used in ClientCompany
    getDetail(id: string): Observable<DetailCompany[]> {
        return this.http.get(this.config.apiUrl + '/ClientCompany/GetDetail/'+id, TokenHelper())
            .map((response: Response) => { console.log(response); return response.json(); })
            .catch(this.errorHandler);

    }
    update(clientCom: ClientCompany) {
        return this.http.post(this.config.apiUrl + '/ClientCompany/Update', clientCom, TokenHelper());
    }
    delete(clientCom: ClientCompany) {
        return this.http.post(this.config.apiUrl + '/ClientCompany/Delete', clientCom, TokenHelper());
    }

    getClientCompany(term: string): Observable<any[]> {
        return this.http.get(this.config.apiUrl + '/Registration/GetClientCompanyList/' + term, TokenHelper())
            .map((r: Response) => r.json())
            .catch (this.errorHandler);
    }  
    //dropdown in the registration Process
    getClientCompanyForAutocomplete(term: string): Observable<any[]> {
        return this.http.get(this.config.apiUrl + '/Registration/GetClientCompanyList/' + term)
            .map((r: Response) => r.json())
            .catch(this.errorHandler);
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    } 

    getInviteDetails(inviteKey: string) {
        console.log(inviteKey);
        return this.http.get(this.config.apiUrl + '/ScrumUser/GetInvitedMemberRequestDetails/' + inviteKey)
            .map((response: Response) => {
                this.inviteRequestDetails = response.json();
                console.log(this.inviteRequestDetails);

            })
            .catch(this.errorHandler);
    }
}