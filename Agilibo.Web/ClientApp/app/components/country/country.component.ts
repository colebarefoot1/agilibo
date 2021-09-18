import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { Country } from '../../models/Country';
import { CountryService } from '../../services/country.service/country.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';


@Component({
    selector: 'country',
    templateUrl: './country.component.html'
})

export class CountryComponent implements OnInit {


    model: any = {};
    countryList: Country[] = [];
    loading = false;
    countryForm: FormGroup;
    public errorMessage: string = '';


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private redirectUser: RerouteToSignin,
        private countryService: CountryService,
        private alertService: AlertService) {
        this.countryForm = fb.group({
            'countryCode': [null, [Validators.required, Validators.maxLength(20)]],
            'countryName': [null, [Validators.required, Validators.maxLength(20)]],
        });

    }

    public validateControl(controlName: string) {
        if (this.countryForm.controls[controlName].invalid && this.countryForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.countryForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {
        this.model.createdBy = "Admin";
        this.model.modifiedBy = "Admin";

        this.redirectUser.sendToLogin();

        this.countryService.getAll()
            .subscribe(countryList => {
                this.countryList = countryList;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    getList() {
        this.countryService.getAll().subscribe(
            data => { this.countryList = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            }
        );
    }
    //country form
    public submitCountryDetail() {
        this.loading = true;
        console.log("countryKey");
            this.countryService.create(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Data Added successful', true);
                        this.getList();
                        this.model = new Observable<Country>();
                        this.loading = false;
                        this.countryForm.reset();     
                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                    });


    }

    public redirectTo() {
        this.router.navigate(['/country']);
    }

    public edit(obj: Country) {
        this.model = obj;
    }

    public delete(country: Country) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.countryService.delete(country.countryKey)
                .subscribe((data) => {
                this.alertService.success('Data Deleted successful', true);
                this.getList();
            },
                error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}