import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { MethodologyService } from '../../services/setup/methodology.service';
import { Methodology } from "../../models/Methodology";
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { RerouteToSignin } from '../../services/rerouteToSignin';

@Component({
    selector: 'methodologySetup',
    templateUrl: './methodology.component.html'
})

export class MethodologyComponent implements OnInit {

    currentLesson: string = "1";
    products: Methodology[] = [];
    errorMessage: string = "";
    filteredProducts: Methodology[] = [];
    model: any = {};
    loading = false;
    token: string;
    currentUser: LoggedinUserInformation;
    methodologyForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private redirectUser: RerouteToSignin,
        private router: Router,
        private methodologyService: MethodologyService,
        private alertService: AlertService) {
        this.methodologyForm = fb.group({
            'methodologyName': [null, [Validators.required, Validators.maxLength(20)]],
        });
        this.currentLesson = "1";
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.token = this.currentUser.token;
    }

    public validateControl(controlName: string) {
        if (this.methodologyForm.controls[controlName].invalid && this.methodologyForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.methodologyForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {
        this.methodologyService.getAll(this.token)
            .subscribe(products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        this.redirectUser.sendToLogin();
    }

    getList() {
        this.methodologyService.getAll(this.token).subscribe(
            data => { this.products = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public edit(obj: Methodology) {
        this.model = obj;
    }

    public delete(obj: Methodology) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.methodologyService.delete(obj.methodologyKey).subscribe((data) => {
                this.alertService.success('Data Deleted successfully', false);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }

    public submitMethodology() {
        this.loading = true;
        this.methodologyService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successfully', false);
                    this.getList();
                    this.model = new Observable<Methodology>();
                    this.methodologyForm.reset();
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
