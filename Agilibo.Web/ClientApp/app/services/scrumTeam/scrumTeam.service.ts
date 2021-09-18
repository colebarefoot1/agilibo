import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { ScrumTeam,ScrumTeamDetail,TeamDetail,ScrumTeamViewList } from '../../models/ScrumTeam';
import { Observable } from 'rxjs/Observable';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { SaveExistingMember } from '../../models/SaveExistingMember';
import TokenHelper from '../../services/tokenHelper';
import { SprintForHeader } from '../../models/Sprint';

@Injectable()
export class ScrumTeamService {
    constructor(private http: Http, private config: AppConfig) { }
    getAll(id:number): Observable<ScrumTeam[]> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetAll/'+id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    // used in addexisting
    getAllUsersForAddingInTheTeam(id: string, companyKey: number): Observable<TeamDetail[]> {
        return this.http.get(`${this.config.apiUrl}/ScrumTeam/GetAllUsersForAddingInTheTeam/${id}/${companyKey}`, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getAllTeamInfoWithoutUserKey(): Observable<ScrumTeamViewList[]> {        
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetAllTeamInfoWithoutUserKey', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    } 
    //used in planning poker
    getAllTeamWithMyIDforPoker(id: string): Observable<ScrumTeamViewList[]> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetAllTeamWithMyIDforPoker/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getAllTeamWithMyID(id: string): Observable<ScrumTeamViewList[]> {       
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetAllTeamWithMyID/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    //used in Team
    getMyTeams(id: string): Observable<ScrumTeamViewList[]> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetMyTeams/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getAllTeamInfoforSprintSetting(id: number): Observable<ScrumTeamViewList[]> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetAllTeamInfoforSprintSetting/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    //Used in Velocity KPI, manage Team
    getAllTeamInfo(id: number): Observable<ScrumTeamViewList[]> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetAllTeamInfo/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
   
    getWithScrumTeamDetail(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetWithScrumTeamDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    //used in manageTeam(edit), addscrummember
    getById(id: string): Observable<ScrumTeam> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    //used in addexisting
    addexistingMemberToTeam(userDto: SaveExistingMember) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/AddMemberToTeam', userDto, TokenHelper());
    }
    //used in teamManage (Create)
    create(userDto: ScrumTeam) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/Create', userDto, TokenHelper());
    }

    update(userDto: ScrumTeam) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/Update', userDto, TokenHelper());
    }
    //used in manage team
    deleteAll(userDto: ScrumTeamViewList) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/DeleteAllMembersFromTeamAlongWithTeam', userDto, TokenHelper());
    }

    delete(userDto: ScrumTeam) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/Delete', userDto, TokenHelper());
    }
    // used in addscrummember
    deleteTeamMember(userDto: TeamDetail) {
        return this.http.post(this.config.apiUrl + '/ScrumTeam/DeleteTeamMember', userDto, TokenHelper());
    }

    getTeamWithAllMember(id: string) {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetTeamWithAllMember/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    //Used in: Team
    setDefaultTeam(teamKey: string, userKey:string) {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/SetDefaultTeam/' + teamKey + '/' + userKey, TokenHelper());
    }

    ///////////////////////////////////////get the default Team Name Only
    //used in: Team
    getTeamNameUserKey(id: string): Observable<string> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetTeamNameUserKey/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    getCurrentSprintDetail(id: string): Observable<SprintForHeader> {
        return this.http.get(this.config.apiUrl + '/ScrumTeam/GetCurrentSprintDetail/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }  

}