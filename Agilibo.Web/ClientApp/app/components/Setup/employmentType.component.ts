import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { EmploymentTypeService } from '../../services/setup/employmentType.service';
import { EmploymentType } from "../../models/EmploymentType";
import { empty } from 'rxjs/Observer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';

@Component({
    selector: 'employmentTypeSetup',
    templateUrl: './employmentType.component.html'
})

export class EmploymentTypeComponent implements OnInit {
    loading = false;
    employmentTypeList: EmploymentType[] = [];
    errorMessage: string = "";
    filteredProducts: EmploymentType[] = [];
    model: any = {};
    employmentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private redirectUser: RerouteToSignin,
        private router: Router,
        private employmentTypeservice: EmploymentTypeService,
        private alertService: AlertService) {
        this.employmentForm = fb.group({
            'employmentTypeName': [null, [Validators.required, Validators.maxLength(20)]],
        });
    }

    public validateControl(controlName: string) {
        if (this.employmentForm.controls[controlName].invalid && this.employmentForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.employmentForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }
    ngOnInit(): void {
        this.employmentTypeservice.getAll()
            .subscribe(employmentTypeList => {
                this.employmentTypeList = employmentTypeList;
                this.filteredProducts = this.employmentTypeList;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        this.redirectUser.sendToLogin();
    }

    getList() {
        this.employmentTypeservice.getAll().subscribe(
            data => { this.employmentTypeList = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public submitemploymentType() {
        this.loading = true;
        this.employmentTypeservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successfully', false);
                    this.getList();
                    this.model = new Observable<EmploymentType>();
                    this.loading = false;
                    this.employmentForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public edit(obj: EmploymentType) {
        this.model = obj;
    }
    public delete(obj: EmploymentType) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.employmentTypeservice.delete(obj.employmentTypeKey).subscribe((data) => {
                this.alertService.success('Data Deleted successfully', false);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}
