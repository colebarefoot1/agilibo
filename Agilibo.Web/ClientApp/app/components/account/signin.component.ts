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
import { transition } from '@angular/animations';


@Component({
    selector: 'signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    model: any = {};
    currentUser: any = {};
    loading = false;
    returnUrl: string = "";

    constructor(      
        private route: ActivatedRoute,
        private router: Router,
        private alertcom: AlertComponent,
        private mainapp: AppComponent,
        private app: NavMenuComponent,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
       
    }
    refresh(): void {
        location.reload();
    }

    loginResponse: any = {};

    ngOnInit() {
        this.authenticationService.logout();
        //Clear header from cache
        DisposeTokenHelper();
        this.mainapp.showheader();
        //reset login status ie localStorage
      
    }
    login() {
        this.loading = true;
      
        this.authenticationService.login(this.model)
            .subscribe(
                data => {

                    this.loginResponse = this.authenticationService.loginValue;
                    if (this.loginResponse === '1006') {
                        this.alertService.error('Invalid Email address, Please enter valid email address.');
                        this.loading = false;
                    }
                    else if (this.loginResponse === '1007') {
                        this.alertService.error('Invalid password, Please enter valid password.');
                        this.loading = false;
                    }
                    //Email and Password Is Not Valid
                    else if (this.loginResponse === 'Email and Password Is Not Valid') {
                        this.alertService.error('Email address or Password is not valid. Please enter valid email and password');
                        this.loading = false;
                    }

                    else if (this.loginResponse === 'Create UnitKey') {

                        this.router.navigate(['/companyunit']);
                        this.loading = false;
                    }
                    else {
                        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                        if (this.currentUser.unitKey == "0" || this.currentUser.unitKey == "null")
                        {
                            this.app.checkLogin();
                            this.app.getList(true);
                            this.app.setNavBarState();

                            this.mainapp.showheader();
                            var newTabUrl = "/companyunit";
                            location.href = newTabUrl;
                           // this.router.navigate(['/companyunit']);
                            this.loading = false;
                        }
                        else
                        {
                            this.app.checkLogin();
                            this.app.getList(true);
                            this.app.setNavBarState();
                            
                            this.mainapp.showheader();
                          
                           // this.app.reload();
                           // this.router.navigate(['/feeds']);
                           
                            var newTabUrl = "/feeds";                        
                                location.href = newTabUrl;
                           
                        }
                    }

                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

}

