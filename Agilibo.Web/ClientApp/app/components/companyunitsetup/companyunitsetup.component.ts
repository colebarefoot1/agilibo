import { OnInit, Component } from "@angular/core";
import { LoggedinUserInformation } from "../../models/LoggedinUserInformation";
import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { CompanyUnit } from "../../models/CompanyUnit";
import { Observable } from "rxjs/Observable";
import { NavMenuComponent } from "../navmenu/navmenu.component";
import { ScrumUser } from "../../models/ScrumUser";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CompanyUnitSetupService } from "../../services/companyunitsetup/companyunitsetup.service";
import { RerouteToSignin } from "../../services/rerouteToSignin";


@Component({
    selector: 'companyunitsetup',
    templateUrl: './companyunitsetup.component.html'
})
export class CompanyUnitSetupComponent implements OnInit {

    model: any = {};
    userKey: string = "";
    companyUnitList: CompanyUnit[] = [];

    errorMessage: string = "";
    loading = false;
    id: string = "";
    comapnyUnitSetupForm: FormGroup;

    currentUser: LoggedinUserInformation;

    constructor(private router: Router,
        private redirectUser: RerouteToSignin,
        private fb: FormBuilder,
        private companyUnitSetupService: CompanyUnitSetupService,
        private alertService: AlertService, private app: NavMenuComponent) {

        this.comapnyUnitSetupForm = fb.group({
            'unitName': [null, [Validators.required, Validators.maxLength(20)]],
        });

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.app.checkLogin();
    }
    public validateControl(controlName: string) {
        if (this.comapnyUnitSetupForm.controls[controlName].invalid && this.comapnyUnitSetupForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.comapnyUnitSetupForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }
    ngOnInit(): void {

        this.redirectUser.sendToLogin();

        this.getList()
    }



    getList() {
        this.companyUnitSetupService.getAll(this.currentUser.companyKey).subscribe(
            data => { this.companyUnitList = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            }
        );
    }

    public submitCompanyUnit() {
        this.loading = true;
        console.log(this.currentUser.userKey);
        console.log(this.currentUser.companyKey);
        this.model.userKey = this.currentUser.userKey;
        this.model.companyKey = this.currentUser.companyKey;
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.companyUnitSetupService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Data Added successful', false);
                    this.getList();
                    this.model = new Observable<CompanyUnit>();
                    this.loading = false;
                    this.comapnyUnitSetupForm.reset();

                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

}