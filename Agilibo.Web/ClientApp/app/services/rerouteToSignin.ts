import { Router, Event } from '@angular/router';
import { LoggedinUserInformation } from '../models/LoggedinUserInformation';
import { Component, Injectable } from '@angular/core';


@Injectable()
export class RerouteToSignin{
    loading = false;
    model: any = {};
    user: any = [];
    currentUser: LoggedinUserInformation;
   
    constructor( private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
       
    }
    sendToLogin() {

        if (!(this.currentUser && this.currentUser.userKey)) {
            this.router.navigate(['/signin']);
        }
    }
   
}

