import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../../AppConfig';
import { Observable } from 'rxjs/Observable';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { CreateRoleClass, MenuClass, GetMenuList, AccessMenuView, RoleViewModel } from '../../models/MenuClass';
import { AccessRole } from '../../models/AccessRole';
import { UserForAssignAccess } from '../../models/UserForAssignAccess';
import TokenHelper from '../../services/tokenHelper';


@Injectable()
export class AssignAccessRoleService {
    constructor(private http: Http, private config: AppConfig) { }
    userlist: UserForAssignAccess[] = [];


    getAllUserList(id: number): Observable<UserForAssignAccess[]> {
        return this.http.get(this.config.apiUrl + '/AssignAccess/GetAllUserList/' + id, TokenHelper())
            .map((response: Response) => { response.json();this.userlist=response.json(); })
            .catch(this.errorHandler);

    }

    addRoleToUsers(obj: UserForAssignAccess) {
        return this.http.post(this.config.apiUrl + '/AssignAccess/Create', obj, TokenHelper());
    }
  
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}