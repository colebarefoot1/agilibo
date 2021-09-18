import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { Observable } from 'rxjs/Observable';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { CreateRoleClass, MenuClass, GetMenuList, AccessMenuView, RoleViewModel } from '../../models/MenuClass';
import { AccessRole, AccessMain, AccessDetail } from '../../models/AccessRole';
import TokenHelper from '../../services/tokenHelper';


@Injectable()
export class AccessRoleService {
    constructor(private http: Http, private config: AppConfig) { }
   

    accessMenuHeader: Observable<AccessMain[]>;
    accessMenuFormList: Observable<AccessDetail[]>;

    getAllRoleByCreatedUser(id: string): Observable<AccessRole[]> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetAllRoleByCreatedUser/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getAllRoleByCompany(id: number): Observable<AccessRole[]> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetAllRoleByCompany/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getMenuForAllAccess(): Observable<AccessMenuView> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetAllElementofMenu', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    getMenuForAllAccessDissociatedList(id: number): Observable<AccessMenuView> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetMenuForAllAccessDissociatedList/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    //getting the mainmenu and formlist at a time
    populatePostSigninMenu(id: number): Observable<AccessMenuView> {
        return this.http.get(this.config.apiUrl + '/AccessRole/PopulatePostSigninMenu/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getFixedHeaderAfterLogin(id: number): Observable<AccessMain[]> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetFixedHeaderAfterLogin/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getFormListAfterLogin(id: number): Observable<AccessDetail[]> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetFormListAfterLogin/' + id, TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }


    getAllDetailRoleSelected(formlist: MenuClass[]): Observable<MenuClass[]> {

        return this.http.get(this.config.apiUrl + '/AccessRole/GetAllDetailRoleSelected/' + formlist, TokenHelper())
            .map((response: Response) => { response.json(); })
            .catch(this.errorHandler);
    }
    getAllDetailRoleUnselected(formlist: MenuClass[]): Observable<MenuClass[]> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetAllDetailRoleUnselected/' + formlist, TokenHelper())
            .map((response: Response) => { response.json(); console.log(response.json()); })
            .catch(this.errorHandler);
    }
    delete(id: number) {
        return this.http.get(this.config.apiUrl + '/AccessRole/Delete/' + id, TokenHelper());
    }
    deleteSingleForm(id: number) {
        return this.http.get(this.config.apiUrl + '/AccessRole/DeleteSingleForm/' + id, TokenHelper());
    }
    roleData: any = {};
    getRoleDetailByRoleKey(id: number): Observable<RoleViewModel> {
        return this.http.get(this.config.apiUrl + '/AccessRole/GetRoleDetailByRoleKey/' + id, TokenHelper())
            .map((response: Response) => { response.json(); this.roleData = response.json(); })
            .catch(this.errorHandler);
    }

    ////////////////////////////////////////////////////Connects to RoleBaseController in the API (New controller for the new Menu System)//////////////////////

    getdefaultMenu(): Observable<string> {
        return this.http.get(this.config.apiUrl + '/RolebasedAccess/GetMenuStructureForCreateForm', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    addNewRole(obj: CreateRoleClass) {
        return this.http.post(this.config.apiUrl + '/RolebasedAccess/Create', obj, TokenHelper());
    }
    updateNewRole(obj: CreateRoleClass) {
        return this.http.post(this.config.apiUrl + '/RolebasedAccess/Update', obj, TokenHelper());
    }
    removeRoleFromAccess(id: string) {
        return this.http.get(this.config.apiUrl + '/AccessRole/RemoveRoleFromAccess/' + id, TokenHelper());
    }
    deleteAccessMainAndAccessDetailByAccessKey(id: number) {
        return this.http.get(this.config.apiUrl + '/AccessRole/DeleteAccessMainAndAccessDetailByAccessKey/' + id, TokenHelper());
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}