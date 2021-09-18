import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrumTeamService } from "../../services/scrumTeam/scrumTeam.service";
import { ScrumUser } from '../../models/ScrumUser';
import { ScrumTeamMemberService } from "../../services/scrumTeam/scrumTeamMember.service";
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { ScrumTeamViewList, ScrumTeam, TeamDetail, CustomScrumTeamMember } from '../../models/ScrumTeam';
import { ScrumDevelopmentRole } from '../../models/ScrumDevelopmentRole';
import { AlertService } from '../../services/alert.service';
import { ScrumRole } from '../../models/ScrumRole';
import { ScrumDevelopmentRoleService } from '../../services/setup/scrumDevelopmentRole.service';
import { ScrumRoleService } from '../../services/setup/scrumRole.service';

@Component({
    selector: 'addscrummember',
    templateUrl: './scrummember.component.html'
})

export class ScrumMemberComponent implements OnInit {
    loading = false;
    teammodel: any = {};
    usermodel: any = {};
    id: string = "";
    scrumrolelist: ScrumRole[] = [];
    devrolelist: ScrumDevelopmentRole[] = [];
    teamdetail: TeamDetail[] = [];
    teamname: string = "";
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";


    constructor(private _avRoute: ActivatedRoute,
        private router: Router,
        private scrumTeamService: ScrumTeamService,
        private memberservice: ScrumTeamMemberService,
        private devroleservice: ScrumDevelopmentRoleService,
        private scrumroleservice: ScrumRoleService,
        private alertService: AlertService
    ) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.usermodel.teamKey = this.id;
        }
    }

    ngOnInit(): void {
      
        //load all the other members
        this.memberservice.getAllByTeamKey(this.id)
            .subscribe(data => { this.teamdetail = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });

        this.scrumTeamService.getById(this.id)
            .subscribe(data => { this.teammodel = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
    getList() {
        this.memberservice.getAllByTeamKey(this.id)
            .subscribe(data => { this.teamdetail = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    registerResponse: string = "";

    public Submit() {
        this.loading = true;
        this.usermodel.createdBy = this.currentUser.userKey;
        this.usermodel.modifiedBy = this.currentUser.userKey;
        this.usermodel.userKey = this.currentUser.userKey;
        this.usermodel.companyKey = this.currentUser.companyKey;
        this.usermodel.unitKey = this.currentUser.unitKey;
        this.usermodel.teamName = this.teammodel.teamName;
        this.usermodel.firstName = this.currentUser.firstName;
        this.usermodel.lastName = this.currentUser.lastName;
        this.memberservice.inviteNewMember(this.usermodel)
            .subscribe(
                data => {
                    this.registerResponse = this.memberservice.registerValue;
                    console.log(this.registerResponse);

                    if (this.registerResponse === '1007') {
                        this.alertService.error('Please enter email address for send team invitation.');
                        this.loading = false;
                    }
                    else if (this.registerResponse === '1008') {
                        this.alertService.error('Invalid email address, Please enter valid email address.');
                        this.loading = false;
                    }
                    else if (this.registerResponse === '1009') {
                        this.alertService.error('This email address already registered, You can add Existing Users to Team.');
                        this.loading = false;
                    }
                    else {
                        this.alertService.success('Team Member invitation has been sended successfully', false);
                        this.usermodel = new Observable<CustomScrumTeamMember>();
                        this.loading = false;
                    }
                    this.getList();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public delete(obj: TeamDetail) {
        var ans = confirm("Do you want to Remove this member?");
        if (ans) {
            this.scrumTeamService.deleteTeamMember(obj).subscribe((data) => {
                this.alertService.success('Data Deleted successfully', true);
                this.getList();
            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }
}
