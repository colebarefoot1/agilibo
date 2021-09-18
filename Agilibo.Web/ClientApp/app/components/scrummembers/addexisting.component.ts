import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrumTeamService } from "../../services/scrumTeam/scrumTeam.service";
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { ScrumTeamViewList, ScrumTeam, TeamDetail } from '../../models/ScrumTeam';
import { AlertService } from '../../services/alert.service';
import { SaveExistingMember } from '../../models/SaveExistingMember';

@Component({
    selector: 'addexisting',
    templateUrl: './addexisting.component.html'
})

export class AddExisitingUserComponent implements OnInit {
    loading = false;
    model: any = {};
    id: string = "";
    teamdetail: TeamDetail[] = [];
    teamname: string = "";
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";

    constructor(private _avRoute: ActivatedRoute,
        private router: Router,
        private scrumTeamService: ScrumTeamService,
        private alertService: AlertService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.model.teamKey = this.id;
        }
    }
    getList() {
        this.scrumTeamService.getAllUsersForAddingInTheTeam(this.id,this.currentUser.companyKey)
            .subscribe(data => { this.teamdetail = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    ngOnInit(): void {
        this.getList();
    }

    public Submit() {
        this.loading = true;
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.model.teamKey = this.id;
        this.scrumTeamService.addexistingMemberToTeam(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Team has been Added successfully', true);
                    this.getList();
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public Update(obj: SaveExistingMember, id: string) {
        this.model = obj;
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.model.teamKey = this.id;
        this.model.userKey = id
        this.scrumTeamService.addexistingMemberToTeam(obj).subscribe((data) => {
            this.alertService.success('Team has been Added successfully', true);
            this.getList();
        },
            error => {
            this.alertService.error(error._body);
            this.loading = false;
        });
    }
}
