import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { ScrumDevelopmentRoleService } from '../../services/setup/scrumDevelopmentRole.service';
import { ScrumDevelopmentRole } from "../../models/ScrumDevelopmentRole";
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';

@Component({
    selector: 'scrumdevrole',
    templateUrl: './scrumdevrole.component.html'
})

export class ScrumDevelopmentRoleComponent implements OnInit {
    currentUser: LoggedinUserInformation;
    roles: ScrumDevelopmentRole[] = [];
    errorMessage: string = "";
    filteredProducts: ScrumDevelopmentRole[] = [];
    model: any = {};
    loading = false;
    scrumDevRoleForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private redirectUser: RerouteToSignin,
        private router: Router,
        private roleservice: ScrumDevelopmentRoleService,
        private alertService: AlertService) {
        this.scrumDevRoleForm = fb.group({
            'roleName': [null, [Validators.required, Validators.maxLength(20)]],
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    public validateControl(controlName: string) {
        if (this.scrumDevRoleForm.controls[controlName].invalid && this.scrumDevRoleForm.controls[controlName].touched)
            return true;

        return false;
    }

    public hasError(controlName: string, errorName: string) {
        if (this.scrumDevRoleForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.roleservice.getAll()
            .subscribe(products => {
                this.roles = products;
                this.filteredProducts = this.roles;
            },
            error => this.errorMessage = <any>error);
        this.redirectUser.sendToLogin();
    }
    getList() {
        this.roleservice.getAll().subscribe(
            data => this.roles = data
        );
    }

    public submit() {
        this.loading = true;
        this.roleservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successfully', false);
                    this.getList();
                    this.model = new Observable<ScrumDevelopmentRole>();
                    this.model.createdBy = this.currentUser.userKey;
                    this.model.modifiedBy = this.currentUser.userKey;
                    this.loading = false;
                    this.scrumDevRoleForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

    public edit(obj: ScrumDevelopmentRole) {
        this.model = obj;
    }

    public delete(obj: ScrumDevelopmentRole) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.roleservice.delete(obj.scrumDevelopemntRoleKey).subscribe((data) => {
                this.alertService.success('Data Deleted successfully', false);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}
