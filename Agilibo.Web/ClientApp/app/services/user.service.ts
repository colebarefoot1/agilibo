import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../../AppConfig';
import { ScrumUser } from '../models/ScrumUser';
import { ClientCompany } from '../models/ClientCompany';
import { LoggedinUserInformation } from '../models/LoggedinUserInformation';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
 

@Injectable()
export class UserService {
    constructor(private http: Http, private config: AppConfig, private router: Router, private alertService: AlertService) { }

    registerValue: any = {};
    //used in User Registration
    create(user: ScrumUser, obj: ClientCompany) {       
        user.companyKey = obj.companyKey;
        user.companyName = obj.companyName;
        console.log(user.companyName = obj.companyName);
        return this.http.post(this.config.apiUrl + '/ScrumUser/register' , user)
            .map((response: Response) => {
                this.registerValue = response.json();
            });
    }

    //registerValue: any = {};
    inviteMemberRegister(user: ScrumUser) {
        return this.http.post(this.config.apiUrl + '/ScrumUser/RegisterInviteMember', user)
            .map((response: Response) => {
                this.registerValue = response.json();
            });
    }
    currentUser: LoggedinUserInformation;
    checkIfUserisLoggedIn() {
       
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this.currentUser.userKey != null) {

        }
        else {

            this.router.navigate(['/signin']);
            this.alertService.error("Sorry, you are not signed in.", true);
        }
    }
}