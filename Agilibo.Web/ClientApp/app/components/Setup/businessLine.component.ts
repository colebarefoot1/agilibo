import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { BusinessLineService } from '../../services/setup/businessLine.service';
import { BusinessLine } from "../../models/BusinessLine";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';

@Component({
    selector: 'businessLineSetup',
    templateUrl: './businessLine.component.html'
})

export class BusinessLineComponent implements OnInit {

    products: BusinessLine[] = [];
    errorMessage: string = "";
    model: any = {};
    loading = false;
    businessLineForm: FormGroup;
    constructor(
        private redirectUser: RerouteToSignin,
        private fb: FormBuilder,
        private router: Router,
        private businessService: BusinessLineService,
        private alertService: AlertService,
    ) {
        this.businessLineForm = fb.group({
            'businessLineName': [null, [Validators.required, Validators.maxLength(20)]],
        });
    }

    public validateControl(controlName: string) {
        if (this.businessLineForm.controls[controlName].invalid && this.businessLineForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.businessLineForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }
    ngOnInit(): void {
        this.businessService.getAll()
            .subscribe(products => {
                this.products = products;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        this.redirectUser.sendToLogin();
    }
    getList() {
        this.businessService.getAll().subscribe(
            data => { this.products = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public edit(obj: BusinessLine) {
        this.model = obj;
    }

    public delete(obj: BusinessLine) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.businessService.delete(obj.businessLineKey).subscribe((data) => {
                this.alertService.warning('Data Deleted successfully', false);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }

    public submitBusinessLine() {
        this.loading = true;
        this.businessService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successful', true);
                    this.getList();
                    this.model = new Observable<BusinessLine>();
                    this.businessLineForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
