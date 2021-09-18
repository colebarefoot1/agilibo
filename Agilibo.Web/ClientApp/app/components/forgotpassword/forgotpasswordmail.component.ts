import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { AppComponent } from '../app/app.component';
import { ForgotPasswordService } from '../../services/forgotpassword/forgotPassword.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'forgotpasswordmail',
    templateUrl: './forgotpasswordmail.component.html'
})

export class ForgotPasswordEmailComponent implements OnInit {
    model: any = {};
    currentUser: any = {};
    loading = false;
    returnUrl: string = "";

    constructor(
        private forgotPasswordService: ForgotPasswordService,
        private alertService: AlertService) { }
    refresh(): void {
        location.reload();
    }

    forgotPasswordResponse: any = {};

    ngOnInit() {

    }
     

}

