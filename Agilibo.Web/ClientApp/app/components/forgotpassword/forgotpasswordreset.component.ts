import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { window } from 'rxjs/operator/window';
import { AlertComponent } from '../alert/alert.component';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { DisposeTokenHelper } from '../../services/tokenHelper';
import { AppComponent } from '../app/app.component';
import { ForgotPasswordService } from '../../services/forgotpassword/forgotPassword.service';

@Component({
    selector: 'forgotpasswordreset',
    templateUrl: './forgotpasswordreset.component.html'
})

export class ForgotPasswordResetComponent implements OnInit {
    model: any = {};
    currentUser: any = {};
    loading = false;
    returnUrl: string = "";

    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private alertcom: AlertComponent,
        private app: NavMenuComponent,
        private forgotPasswordService: ForgotPasswordService,
        private alertService: AlertService) { }
    refresh(): void {
        location.reload();
    }

    forgotPasswordResponseReset: any = {};

    ngOnInit() {
        //Clear header from cache
        let param1 = this.route.snapshot.queryParams["resetid"];
        this.model.requestId = param1;
        
    }
    passwordreset() {
        if (this.model.newPassword === this.model.password) {

            this.loading = true;
            this.forgotPasswordService.forgotPasswordReset(this.model)
                .subscribe(
                    data => {

                        this.forgotPasswordResponseReset = this.forgotPasswordService.forgotPasswordValue;
                        if (this.forgotPasswordResponseReset === '1010') {
                            this.alertService.error('Password already reset.');
                            this.loading = false;
                        }
                         
                        else if (this.forgotPasswordResponseReset === '1000') {
                            console.log('Password change success!!');
                            this.router.navigate(['/forgotpasswordresetsuccess']);
                            this.loading = false;
                        }
                        else {


                        }

                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                    });

        }

        else {
            this.loading = true;
            this.alertService.error('Mismatch retype password.!!');
            this.loading = false;

        }

        

    }

}

