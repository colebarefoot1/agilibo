import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { ScrumTeamMember,CustomScrumTeamMember} from '../../models/ScrumTeamMember';
import { Observable } from 'rxjs/Observable';
import { TeamDetail } from '../../models/ScrumTeam';
import { ScrumUser } from '../../models/ScrumUser';
import TokenHelper from '../../services/tokenHelper';

@Injectable()
export class ScrumTeamMemberService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/ScrumTeamMember/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    getAllByTeamKey(id: string): Observable<TeamDetail[]> {
        return this.http.get(this.config.apiUrl + '/ScrumTeamMember/GetAllByTeamKey/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
   
    getById(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumTeamMember/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    create(userDto: ScrumTeamMember) {
        return this.http.post(this.config.apiUrl + '/ScrumTeamMember/Create', userDto, TokenHelper());
    }

    saveNewUserAsMember(userDto: CustomScrumTeamMember) {
        return this.http.post(this.config.apiUrl + '/ScrumTeamMember/SaveNewUserAsMember', userDto, TokenHelper());
    }
    // used in addscrummember
    registerValue: any = {};
    inviteNewMember(userDto: CustomScrumTeamMember) {
        return this.http.post(this.config.apiUrl + '/ScrumTeamMember/InviteNewMember', userDto, TokenHelper())
            .map((response: Response) => {
                this.registerValue = response.json();
            });
    }

    update(userDto: ScrumTeamMember) {
        return this.http.post(this.config.apiUrl + '/ScrumTeamMember/Update', userDto, TokenHelper());
    }

    delete(id:string) {
        return this.http.get(this.config.apiUrl + '/ScrumTeamMember/Delete/'+id, TokenHelper());
    }

    deleteAllMemberOfATeam(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumTeamMember/DeleteAllMemberOfATeam/' + id, TokenHelper());
    }

    getAllwithDetail() {
        return this.http.get(this.config.apiUrl + '/ScrumTeamMember/GetAllwithDetail', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  
  
}