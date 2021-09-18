import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppConfig } from '../../../AppConfig';
import { MenuHeader,MenuDetail, SubMenuView } from '../../models/MenuHeader';
import TokenHelper from '../../services/tokenHelper';
import { SubMenuClass, MenuforDropdownSelection } from '../../models/MenuClass';

@Injectable()
export class MenuDetailService {
    constructor(private http: Http, private config: AppConfig) { }

   
    getAllWhereFormIsUnderFixedHeader(): Observable<SubMenuView[]> {
        return this.http.get(this.config.apiUrl + '/SubMenuUnderFixedHeader/GetAll', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getListOfSubmenu(): Observable<SubMenuView[]> {
        return this.http.get(this.config.apiUrl + '/SubMenuUnderFixedHeader/GetListOfSubmenu', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    getAllSubmenuForDropdown(): Observable<SubMenuView[]> {
        return this.http.get(this.config.apiUrl + '/SubMenuUnderFixedHeader/GetAllSubmenuForDropdown', TokenHelper())
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }
    createMultiLevelSubMenu(userDto: SubMenuView) {
        return this.http.post(this.config.apiUrl + '/SubMenuUnderFixedHeader/CreateMultiLevelSubMenu', userDto, TokenHelper());
    }
    create(userDto: SubMenuView) {
        return this.http.post(this.config.apiUrl + '/SubMenuUnderFixedHeader/Create', userDto, TokenHelper());
    }
   
    delete(id: number) {
        return this.http.get(this.config.apiUrl + '/SubMenuUnderFixedHeader/Delete/' + id, TokenHelper());
    }
   
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}