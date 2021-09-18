import { OnInit, Component } from "@angular/core";
import { LoggedinUserInformation } from "../../models/LoggedinUserInformation";
import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { CompanyUnit } from "../../models/CompanyUnit";
import { CompanyUnitService } from "../../services/companyunit.service/companyunit.service";
import { Observable } from "rxjs/Observable";
import { NavMenuComponent } from "../navmenu/navmenu.component";
import { ScrumUser } from "../../models/ScrumUser";


@Component({
    selector: 'companyunit',
    templateUrl: './companyunit.component.html',
    styleUrls: ['./companyunit.component.css']
})
export class CompanyUnitComponent implements OnInit {

    model: any = {};
    userKey: string = "";
    unitlist: ScrumUser ;
   
    companyUnitListByCompany: CompanyUnit[] = [];
    errorMessage: string = "";
    loading = false;
    id: string = "";

    currentUser: LoggedinUserInformation;

    constructor(private router: Router,
        private companyUnitService: CompanyUnitService,
        private alertService: AlertService,private app:NavMenuComponent) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.app.checkLogin();
    }
    ngOnInit(): void {

       

        this.companyUnitService.getUnitPerCompany(this.currentUser.companyKey)
            .subscribe(companyUnitListByCompany => {
                this.companyUnitListByCompany = companyUnitListByCompany;
                console.log(this.companyUnitListByCompany);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        
    }

    getUnitList(userKey: string) {
        this.companyUnitService.getUnitList(userKey)
            .subscribe(data => {
                this.unitlist = data;
                console.log(this.unitlist);
                //this.currentUser.unitKey = data;

            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
     


    responseUnitKey: number = 0;
    sample: any = {};
    public submitCompanyUnit() {
        this.loading = true;
        //console.log(this.currentUser.userKey);
        //console.log(this.currentUser.companyKey);
        this.model.userKey = this.currentUser.userKey;
        this.model.companyKey = this.currentUser.companyKey;
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.companyUnitService.create(this.model)
            .subscribe(
            data => {
                console.log(data);
                    this.alertService.success('Data Added successful', true);
                   
                    //this.model = new Observable<CompanyUnit>();
                    this.loading = false;
                    if (this.companyUnitService.responseValue > 0) {
                        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                        this.currentUser.unitKey = this.companyUnitService.responseValue;
                        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                        this.app.checkLogin();
                       
                        //this.app.reload();
                        //this.router.navigate(['/feeds']);
                        var newTabUrl = "/feeds";
                        location.href = newTabUrl;
                    }
                    else {
                        location.reload();
                    }               
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }


    //Update Unit
     submitUnitUpdate() {

        this.loading = true;
        
        this.model.userKey = this.currentUser.userKey;
         this.model.companyKey = this.currentUser.companyKey;
         this.model.modifiedBy = this.currentUser.userKey;
         this.companyUnitService.updateUnit(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Unit Updated successful', true);
                    this.model = new Observable<ScrumUser>();
                    this.loading = false;

                    this.responseUnitKey = this.companyUnitService.responseValue;
                    console.log(this.companyUnitService.responseValue);

                    if (this.companyUnitService.responseValue > 0) {
                        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                        this.currentUser.unitKey = this.companyUnitService.responseValue;
                        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                        this.app.checkLogin();
                        var newTabUrl = "/feeds";
                        location.href = newTabUrl;
                        //this.router.navigate(['/feeds']);
                    }
                    else {
                        location.reload();
                    }
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }
}