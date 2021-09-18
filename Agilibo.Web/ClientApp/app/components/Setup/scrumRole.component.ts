import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ScrumRoleService } from '../../services/setup/scrumRole.service';
import { ScrumRole } from "../../models/ScrumRole";
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';

@Component({
    selector: 'scrumrole',
    templateUrl: './scrumRole.component.html'
})

export class ScrumRoleComponent implements OnInit {
    currentUser: LoggedinUserInformation;
    roles: ScrumRole[] = [];
    errorMessage: string = "";
    filteredProducts: ScrumRole[] = [];
    model: any = {};
    loading = false;
    scrumForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private redirectUser: RerouteToSignin,
        private router: Router,
        private roleservice: ScrumRoleService,
        private alertService: AlertService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.scrumForm = fb.group({
            'roleName': [null, [Validators.required, Validators.maxLength(20)]],
        });
    }

    public validateControl(controlName: string) {
        if (this.scrumForm.controls[controlName].invalid && this.scrumForm.controls[controlName].touched)
            return true;

        return false;
    }

    public hasError(controlName: string, errorName: string) {
        if (this.scrumForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.getList();
        this.redirectUser.sendToLogin();
    }

    getList() {
        this.roleservice.getAll().subscribe(
            data => { this.roles = data; console.log(this.roles); },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public submit() {
        this.loading = true;
        this.roleservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successfully', true);
                    this.getList();
                    this.model = new Observable<ScrumRole>();
                    this.model.createdBy = this.currentUser.userKey;
                    this.model.modifiedBy = this.currentUser.userKey;
                    this.loading = false;
                    this.scrumForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

    public edit(obj: ScrumRole) {
        this.model = obj;
    }

    public delete(obj: ScrumRole) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.roleservice.delete(obj.scrumRoleKey).subscribe((data) => {
                this.alertService.success('Data Deleted successfully', true);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}
