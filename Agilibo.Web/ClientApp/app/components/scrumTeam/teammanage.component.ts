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
import { PagerService } from '../../services/pagerservice';

@Component({
    selector: 'teammanage',
    templateUrl: './teammanage.component.html'
})
export class TeamManageComponent implements OnInit {
    loading = false;
    model: any;
    tempkey: string = "";
    flag: number = 0;
    myScrumteams: ScrumTeamViewList[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    constructor(private router: Router,
        private scrumTeamService: ScrumTeamService,
        private pagerService: PagerService,
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
    // pager object
    pager: any = {};
    filter: string = "";   
    pagedItems: any[];
    filteredItems: any = [];
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.myScrumteams.length, page);

        // get current page of items
        this.pagedItems = this.myScrumteams.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    search() {
        this.filteredItems = [];
        this.filteredItems = Object.assign([], this.pagedItems);
        console.log(this.filter);
        if (this.filter != "") {

            this.filteredItems = Object.assign([], this.pagedItems).filter(
                item => (item.teamName.toLowerCase().includes(this.filter.toLowerCase()))
            );
            console.log(this.filteredItems);
        }
        this.myScrumteams = this.filteredItems;
        this.setPage(1);
    }
    getList() {
        this.scrumTeamService.getAllTeamInfo(this.currentUser.companyKey)
            .subscribe(data => {
                this.myScrumteams = data;
                this.setPage(1);
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public delete(obj: ScrumTeamViewList) {
        var ans = confirm("Do you want to remove TEAM : " + obj.teamName + " from List?");
        if (ans) {
            this.scrumTeamService.deleteAll(obj).subscribe((data) => {
                this.alertService.error('Data Deleted successfully', false);
                this.getList();
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        }
    }

}
