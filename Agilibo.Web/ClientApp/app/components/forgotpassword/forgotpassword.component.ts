import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { AppComponent } from '../app/app.component';
import { ForgotPasswordService } from '../../services/forgotpassword/forgotPassword.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'forgotpassword',
    templateUrl: './forgotpassword.component.html'
})

export class ForgotPasswordComponent implements OnInit {
    model: any = {};
    currentUser: any = {};
    loading = false;
    returnUrl: string = "";

    constructor(
        private forgotPasswordService: ForgotPasswordService,
        private alertService: AlertService, private router: Router,) { }
    refresh(): void {
        location.reload();
    }

    forgotPasswordResponse: any = {};

    ngOnInit() {
       
    }
    forgotloginpassword() {
        this.loading = true;
        this.forgotPasswordService.forgotPassword(this.model)
            .subscribe(
                data => {

                    this.forgotPasswordResponse = this.forgotPasswordService.forgotPasswordValue;
                    if (this.forgotPasswordResponse === '1006') {
                        this.alertService.error('Invalid Email address, Please enter valid email address.');
                        this.loading = false;
                    }
                    else if (this.forgotPasswordResponse === '1007') {
                        this.alertService.error('Invalid password, Please enter valid password.');
                        this.loading = false;
                    }
                    //Email and Password Is Not Valid
                    else if (this.forgotPasswordResponse === 'Email and Password Is Not Valid') {
                        this.alertService.error('Email address or Password is not valid. Please enter valid email and password');
                        this.loading = false;
                    }
 
                    else {

                        this.router.navigate(['/forgotpasswordmail']);
                    }

                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

}

