import { Component, Inject, Output, Input, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { ScrumUser } from '../../models/ScrumUser';
import { Observable } from 'rxjs/Observable';
import { FormControl, NgModel } from '@angular/forms';
import { ClientCompany } from '../../models/ClientCompany';
import { CompanyUnit } from '../../models/CompanyUnit';
import { ClientCompanyService } from '../../services/clientcompany.service/clientcompany.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { AppComponent } from '../app/app.component';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
    model: any = {};
    loading = false;
    confirmpassword: any = {};
    registerResponse: any = {};
    companyKey: number = 0;
    private searchTerms = new Subject<string>(); 
    public currentCompany = '';
    email = '';
    regexp: RegExp;


    public company: Observable<ClientCompany[]> | undefined;

    public flag: boolean = true;
    public collapseflag: boolean = true;
    companyLoading = false;

    constructor(
        private router: Router, private app: NavMenuComponent,
        private userService: UserService,
        private mainapp: AppComponent,
        private clientCompanyService: ClientCompanyService,
        private alertService: AlertService) {

        this.model.dob = new Date();
        this.app.checkLogin();
       
    }

    ngOnInit(): void {
        this.mainapp.showheader();
        this.company = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events  
            .distinctUntilChanged()  // ignore if next search term is same as previous 
            .do(() => this.companyLoading = true)
            // switch to new observable each time
            .switchMap(term => term ?
                this.clientCompanyService.getClientCompanyForAutocomplete(term) : Observable.of<any[]>([]))

            .do(() => this.companyLoading = false)
            .catch(error => {
                // TODO: real error handling               
                this.alertService.error(error._body);
                return Observable.of<any[]>([]);
            });
    }
    companyObj: any = {};
    // Push a search term into the observable stream. 
    searchCompany(term: string): void {
        this.flag = true;
        this.searchTerms.next(term);    
    } 
    onselectCompany(CompanyObj: any) {
        if (CompanyObj.companyKey != null) {
            this.model.currentCompany = CompanyObj.companyName;
            this.companyObj = CompanyObj;
            this.flag = false;
            console.log(CompanyObj.companyKey);
            //this.collapseflag = true;
        }
        else {
            return false; 
        }
    }

    public checkConfirmpassword(confirmpassword: string, password:string) {
        if (confirmpassword != null && confirmpassword != "" && password != null && password != "") {
            if (confirmpassword != password) return true;
            else return false;
        }
        return false;
    }


    

    public register() {
        this.loading = true;
        console.log(this.model.firstName);
        if (this.flag = false) {
            this.companyObj.companyName = this.model.currentCompany;
        }
        console.log(this.companyObj.companyName = this.model.currentCompany);

        this.userService.create(this.model, this.companyObj)
            .subscribe(
            (data:any) => {
                this.companyObj.companyName = this.model.currentCompany;
                this.registerResponse = this.userService.registerValue;
                console.log(this.registerResponse);
                if (this.registerResponse === '1009') {
                    console.log("wHY HERE");
                    this.alertService.error('This email address already registered.');
                    this.loading = false;
                }
                else {                  
                  
                    this.alertService.success('Registration successfully', true);
                    this.router.navigate(['/signin']);
                }
              
                },
            (error:any) => {
                console.log("ELSEWHERE");
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

