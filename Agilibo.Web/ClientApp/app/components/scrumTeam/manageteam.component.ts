import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ScrumTeamService } from '../../services/scrumTeam/scrumTeam.service';
import { ScrumTeam } from "../../models/ScrumTeam";
import { WorkType } from '../../models/WorkType';
import { Department } from '../../models/Department';
import { Methodology } from '../../models/Methodology';
import { DepartmentService } from '../../services/setup/department.service';
import { WorkTypeService } from '../../services/setup/workType.service';
import { MethodologyService } from '../../services/setup/methodology.service';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'manageTeam',
    templateUrl: './manageteam.component.html'
})

export class ManageTeamComponent implements OnInit {
    currentUser: LoggedinUserInformation;
    title: string = "Manage Team";
    id: string | undefined;
    errorMessage: any;
    worktypelist: WorkType[] = [];
    departmentlist: Department[] = [];
    methodologyList: Methodology[] = [];
    model: any = {};
    loading = false;

    constructor(private _avRoute: ActivatedRoute,
        private alertService: AlertService,
        private departmentservice: DepartmentService,
        private worktypeservice: WorkTypeService,
        private methodologyservice: MethodologyService,
        private _Service: ScrumTeamService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    }
    public formatDate(today: Date) {

        return today.toString().substr(0, 10);
    }

    ngOnInit(): void {
        if (this.id != null) {
            this._Service.getById(this.id)
                .subscribe(data => {
                    this.model = data;
                    this.model.dateEstablished = this.formatDate(data.dateEstablished);
                    this.model.agileAdoptedDate = this.formatDate(data.agileAdoptedDate);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        }

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

    public submitTeam() {
        this.loading = true;
        this.model.modifiedBy = this.currentUser.firstName + " " + this.currentUser.lastName;
        this.model.userKey = this.currentUser.userKey;
        this._Service.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Team has been Added successfully', false);
                    this._router.navigate(['/teammanage']);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}