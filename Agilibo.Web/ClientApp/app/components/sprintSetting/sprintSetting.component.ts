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
import { empty } from 'rxjs/observable/empty';

@Component({
    selector: 'sprintsetting',
    templateUrl: './sprintsetting.component.html'
})
export class SprintSettingComponent implements OnInit {
    loading = false;
    model: any;
    tempkey: string = "";
    flag: number = 0;
    myScrumteams: ScrumTeamViewList[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    constructor(private router: Router,
        private scrumTeamService: ScrumTeamService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this.currentUser.userKey == null) {
            this.router.navigate(['/signin']);
        }
        this.tempkey = this.currentUser.userKey;
        this.getList();
    }

    getList() {
        this.scrumTeamService.getAllTeamInfoforSprintSetting(this.currentUser.companyKey)
            .subscribe(data => {
                this.myScrumteams = data;
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

  

}
