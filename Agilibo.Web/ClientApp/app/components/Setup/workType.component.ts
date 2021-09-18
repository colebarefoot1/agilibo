import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { WorkTypeService } from '../../services/setup/workType.service';
import { WorkType } from "../../models/WorkType";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';

@Component({
    selector: 'workTypeSetup',
    templateUrl: './workType.component.html'
})

export class WorkTypeComponent implements OnInit {
    loading = false;
    workTypeList: WorkType[] = [];
    errorMessage: string = "";
    filteredProducts: WorkType[] = [];
    model: any = {};
    workTypeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private redirectUser: RerouteToSignin,
        private workservice: WorkTypeService,
        private alertService: AlertService) {
        this.workTypeForm = fb.group({
            'workTypeName': [null, [Validators.required, Validators.maxLength(20)]],
        });

    }

    public validateControl(controlName: string) {
        if (this.workTypeForm.controls[controlName].invalid && this.workTypeForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.workTypeForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {
        this.workservice.getAll()
            .subscribe(workTypeList => {
                this.workTypeList = workTypeList;
                this.filteredProducts = this.workTypeList;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        this.redirectUser.sendToLogin();
    }
    getList() {
        this.workservice.getAll().subscribe(
            data => { this.workTypeList = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public submitWorkType() {
        this.loading = true;
        this.workservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Saved successfully', false);
                    this.getList();
                    this.model = new Observable<WorkType>();
                    this.loading = false;
                    this.workTypeForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public edit(obj: WorkType) {
        this.model = obj;
    }

    public delete(worktype: WorkType) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.workservice.delete(worktype.workTypeKey).subscribe((data) => {
                this.alertService.success('Data Deleted successfully', false);
                this.workTypeForm.reset();
                this.getList();
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        }
    }
}
