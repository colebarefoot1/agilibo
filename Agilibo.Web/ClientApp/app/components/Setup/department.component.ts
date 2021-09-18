import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { DepartmentService } from '../../services/setup/department.service';
import { Department } from "../../models/Department";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { RerouteToSignin } from '../../services/rerouteToSignin';

@Component({
    selector: 'department',
    templateUrl: './Department.component.html'
})

export class DepartmentComponent implements OnInit {

    departmentList:any = [];
    errorMessage: string = "";
    rForm: FormGroup;
    departmentName: string = '';    
    model: any = {};
    loading = false;
    currentUser: LoggedinUserInformation;
    constructor(
        private redirectUser: RerouteToSignin,
        private fb: FormBuilder,
        private router: Router,
        private departmentservice: DepartmentService,
        private alertService: AlertService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.rForm = fb.group({
            'departmentName': [null, [Validators.required, Validators.maxLength(20)]],
        });
    }

    public validateControl(controlName: string) {
        if (this.rForm.controls[controlName].invalid && this.rForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.rForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.getAllDepartmentList();
        this.redirectUser.sendToLogin();
    }

    getAllDepartmentList() {
        this.departmentservice.getAll().subscribe(
            data => {
                this.departmentList = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

    }

    public submitDepartment(department: { departmentName: string; }) {
        this.loading = true;
        this.departmentName = department.departmentName;
        this.departmentservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Saved successfully', false);
                    this.getAllDepartmentList();
                    this.model = new Observable<Department>();
                    this.model.departmentName = department.departmentName;
                    this.model.createdBy = this.currentUser.userKey;
                    this.model.modifiedBy = this.currentUser.userKey;
                    this.loading = false;
                    this.rForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

    public edit(obj: Department) {
        this.model = obj;
    }
    public delete(obj: Department) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.departmentservice.delete(obj.departmentKey).subscribe((data) => {
                this.alertService.warning('Data Deleted successfully', false);
                this.getAllDepartmentList();
                this.rForm.reset();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }

}
