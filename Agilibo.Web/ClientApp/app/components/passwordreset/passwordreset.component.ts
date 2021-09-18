import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { PasswordResetService } from '../../services/passwordreset/passwordreset.service';


@Component({
    selector: 'passwordreset',
    templateUrl: './passwordreset.component.html'
})

export class PasswordResetComponent implements OnInit {

    loading = false;
    model: any = {};
    public errorMessage: string = '';
    passwordForm: FormGroup;
    currentUser: LoggedinUserInformation;


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private passwordresetservice: PasswordResetService,
        private redirectUser: RerouteToSignin,
        private alertService: AlertService) {
        this.passwordForm = fb.group({
            'password': [null, [Validators.required]],
            'oldpassword': [null, [Validators.required]],
            'confirmpassword': [null, [Validators.required]],
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    public validateControl(controlName: string) {
        if (this.passwordForm.controls[controlName].invalid && this.passwordForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.passwordForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {
       
    }

    confirmpassword: any = {};
    public checkConfirmpassword(confirmpassword: string, password: string) {
        if (confirmpassword != null && confirmpassword != "" && password != null && password != "") {
            if (confirmpassword != password) return true;
            else return false;
        }
        return false;
    }

    public submitPassword() {
        this.loading = true;
        this.model.userKey = this.currentUser.userKey;
        this.passwordresetservice.changePassword(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Information has been updated successfully', false);
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    this.loading = false;
                    this.passwordForm.reset();
                },
                error => {
                    this.alertService.error("Old Password does not match!! Try again", false);
                    this.loading = false;
                    this.passwordForm.reset();
                });

    }

}