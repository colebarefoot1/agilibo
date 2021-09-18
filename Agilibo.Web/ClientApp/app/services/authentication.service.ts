import { Injectable } from '@angular/core';
import { Http, Headers, Response, HttpModule, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppConfig } from '../../AppConfig';


import { LoggedinUserInformation } from '../models/LoggedinUserInformation';
import { HttpClient } from '@aspnet/signalr';
import { LoginModel } from '../models/RegisterRequest';
import { NavMenuComponent } from '../components/navmenu/navmenu.component';


@Injectable()
export class AuthenticationService {


    constructor(private http: Http, private config: AppConfig,private app:NavMenuComponent) { }
    aa: string = "";
    loginValue: any = {};
    ///Used in Signin
    login(obj: LoginModel) {

        return this.http.post(this.config.apiUrl + '/ScrumUser/authenticate', obj)
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                this.loginValue = response.json();
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.aa = user.token;
                    console.log(this.loginValue);

                }

            });
    }

   

    logout() {
        this.app.getEmptyList();
        localStorage.removeItem('currentUser');
        this.app.checkLogin();
        localStorage.clear();
    }
}