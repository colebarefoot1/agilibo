import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { ScrumTeamService } from "../../services/scrumTeam/scrumTeam.service";
import { ScrumUser } from '../../models/ScrumUser';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { ScrumTeamViewList, ScrumTeam } from '../../models/ScrumTeam';
import { WorkType } from '../../models/WorkType';
import { AlertService } from '../../services/alert.service';
import { Department } from '../../models/Department';
import { Methodology } from '../../models/Methodology';
import { DepartmentService } from '../../services/setup/department.service';
import { WorkTypeService } from '../../services/setup/workType.service';
import { MethodologyService } from '../../services/setup/methodology.service';

@Component({
    selector: 'scrumteam',
    templateUrl: './scrumteam.component.html'
})
export class ScrumTeamComponent implements OnInit {
    loading = false;
    model: any = {};
    worktypelist: WorkType[] = [];
    departmentlist: Department[] = [];
    methodologyList: Methodology[] = [];
    MyScrumteams: ScrumTeamViewList[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    constructor(private router: Router,
        private scrumTeamService: ScrumTeamService,
        private departmentservice: DepartmentService,
        private worktypeservice: WorkTypeService,
        private methodologyservice: MethodologyService,
        private alertService: AlertService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    ngOnInit(): void {

        //fill WorkType Selectlist
        this.worktypeservice.getAll()
            .subscribe(data => {
                this.worktypelist = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        //fill Department Selectlist
        this.departmentservice.getAll()
            .subscribe(data => {
                this.departmentlist = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        //fill Methodology Selectlist
        this.methodologyservice.getAll(this.currentUser.token)
            .subscribe(data => {
                this.methodologyList = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    public SubmitTeam() {
        this.loading = true;
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.model.unitKey = this.currentUser.unitKey;
        this.model.organizationCompanyKey = this.currentUser.companyKey;
        this.model.userKey = this.currentUser.userKey;
        this.scrumTeamService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Team has been Added successfully', false);
                    this.router.navigate(['/teammanage']);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
