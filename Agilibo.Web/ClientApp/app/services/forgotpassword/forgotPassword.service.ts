import { Injectable } from '@angular/core';
import { Http, Headers, Response, HttpModule, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppConfig } from '../../../AppConfig';
import { NavMenuComponent } from '../../components/navmenu/navmenu.component';
import { LoginModel, PasswordResetModel } from '../../models/RegisterRequest';

@Injectable()
export class ForgotPasswordService {


    constructor(private http: Http, private config: AppConfig, private app: NavMenuComponent) { }
    aa: string = "";
    forgotPasswordValue: any = {};
    //used in forgotpassword
    forgotPassword(obj: LoginModel) {

        return this.http.post(this.config.apiUrl + '/ScrumUser/forgotPassword', obj)
            .map((response: Response) => {
                this.forgotPasswordValue = response.json();
            });
    }
    //used in forgot password reset
    forgotPasswordReset(obj: PasswordResetModel) {

        return this.http.post(this.config.apiUrl + '/ScrumUser/ForgotPasswordReset', obj)
            .map((response: Response) => {
                this.forgotPasswordValue = response.json();
            });
    }



    
}