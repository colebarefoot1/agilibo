import { Component, Inject, Output, Input, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
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
import { ScrumUserInviteMember } from '../../models/ScrumUserInviteMember';


@Component({
    selector: 'invitemember',
    templateUrl: './invitemember.component.html',
    styleUrls: ['./invitemember.component.css']
})

export class InviteMemberComponent {

    model: any = {};
    loading = false;
    confirmpassword: any = {};
    registerResponse: any = {};
    companyKey: number = 0;
    private searchTerms = new Subject<string>();
    public currentCompany = '';
    email = '';
    regexp: RegExp;
    inviteRequestDetails: any = {};


    public company: Observable<ClientCompany[]> | undefined;

    public flag: boolean = true;
    public collapseflag: boolean = true;
    companyLoading = false;

    constructor(
        private router: Router, private app: NavMenuComponent,
        private userService: UserService,
        private clientCompanyService: ClientCompanyService,
        private alertService: AlertService, private route: ActivatedRoute) {

        this.model.dob = new Date();
        this.app.checkLogin();
    }

    ngOnInit(): void {
        //this.company = this.searchTerms
        //    .debounceTime(300) // wait for 300ms pause in events  
        //    .distinctUntilChanged()  // ignore if next search term is same as previous 
        //    .do(() => this.companyLoading = true)
        //    // switch to new observable each time
        //    .switchMap(term => term ?
        //        this.clientCompanyService.getClientCompanyForAutocomplete(term) : Observable.of<any[]>([]))

        //    .do(() => this.companyLoading = false)
        //    .catch(error => {
        //        // TODO: real error handling               
        //        this.alertService.error(error._body);
        //        return Observable.of<any[]>([]);
        //    });

        let param1 = this.route.snapshot.queryParams["inviteid"];
        //Get Company Name
        //alert(param1);
        this.clientCompanyService.getInviteDetails(param1).subscribe(
            data => {
                //console.log(this.currentUser.userKey);
                this.inviteRequestDetails = this.clientCompanyService.inviteRequestDetails;
                //console.log(this.data);
            }
        );

        this.model.currentCompany = this.inviteRequestDetails.companyName;
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

    public checkConfirmpassword(confirmpassword: string, password: string) {
        if (confirmpassword != null && confirmpassword != "" && password != null && password != "") {
            if (confirmpassword != password) return true;
            else return false;
        }
        return false;
    }




    public register() {
        this.loading = true;
        console.log(this.model.firstName);
        //if (this.flag = false) {
        //    this.companyObj.companyName = this.model.currentCompany;
        //}
        //console.log(this.companyObj.companyName = this.model.currentCompany);
        this.model.companyKey = this.inviteRequestDetails.companyKey;
        this.model.unitKey = this.inviteRequestDetails.unitKey;
        this.model.memberRequestId = this.inviteRequestDetails.inviteKey;

        this.userService.inviteMemberRegister(this.model)
            .subscribe(
                (data: any) => {
                    //this.companyObj.companyName = this.model.currentCompany;
                    //this.registerResponse = this.userService.registerValue;
                    //console.log(this.registerResponse);
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
                (error: any) => {
                    console.log("ELSEWHERE");
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

