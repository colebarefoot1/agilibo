import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { Observable } from 'rxjs/Observable';
import { ClientCompanyService } from '../../services/clientcompany.service/clientcompany.service';
import { ClientCompany, DetailCompany } from '../../models/ClientCompany';
import { Country } from '../../models/Country';
import { CountryService } from '../../services/country.service/country.service';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';



@Component({
    selector: 'clientcompany',
    templateUrl: './clientcompany.component.html'
})

export class ClientCompanyComponent implements OnInit {


    model: any = {};
    id: string = "";
    clientCompanyList: ClientCompany[] = [];
    countryList: Country[] = [];
    detailCompany: DetailCompany[] = [];
    errorMessage: string = "";
    currentUser: LoggedinUserInformation;
    loading = false;
    CompanyForm: FormGroup;
    constructor(
        private redirectUser: RerouteToSignin,
        private fb: FormBuilder,
        private router: Router,
        private clientCompanyService: ClientCompanyService,
        private countryService: CountryService,
        private alertService: AlertService) {
        this.CompanyForm = fb.group({
            'companyName': [null, [Validators.required, Validators.maxLength(20)]],
            'address': [null],
            'city': [null],
            'zipCode': [null],
            'countryKey': [null],
            'vatNumber': [null],
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    }

    public validateControl(controlName: string) {
        if (this.CompanyForm.controls[controlName].invalid && this.CompanyForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.CompanyForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit(): void {

        this.redirectUser.sendToLogin();

        this.getAllCompany();


        //fill Country Selectlist
        this.countryService.getAll()
            .subscribe(countryList => {
                this.countryList = countryList;

            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        this.clientCompanyService.getDetail(this.currentUser.userKey)
            .subscribe(detailCompany => {
                this.detailCompany = detailCompany;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
    getList() {
        this.clientCompanyService.getDetail(this.currentUser.userKey)
            .subscribe(detailCompany => {
                this.detailCompany = detailCompany;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
    getAllCompany() {
        this.clientCompanyService.getAll(this.currentUser.userKey)
            .subscribe(clientCompanyList => {
                this.clientCompanyList = clientCompanyList;
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
    

    public submitclientCompany() {
        this.loading = true;
        console.log(this.model.countryKey);
        this.model.modifiedBy = this.currentUser.userKey;
        this.model.createdBy = this.currentUser.userKey;
        this.clientCompanyService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successful', false);
                    this.getList();
                    this.model = new Observable<ClientCompany>();
                    this.loading = false;
                    this.CompanyForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
            });



    }

    public edit(obj: ClientCompany) {
        this.model = obj;
    }

    public delete(Obj: ClientCompany) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.clientCompanyService.delete(Obj).subscribe((data) => {
                this.alertService.success('Data Deleted successful', false);
                this.getList();
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        }
    }
}