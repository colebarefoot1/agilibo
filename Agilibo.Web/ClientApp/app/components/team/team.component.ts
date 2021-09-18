
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
import { AlertService } from '../../services/alert.service';
import { empty } from 'rxjs/observable/empty';

import { NavMenuComponent } from '../navmenu/navmenu.component';
import { AppComponent } from '../app/app.component';


@Component({
    selector: 'team',
    templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
    loading = false;
    model: any;
    tempkey: string = "";
    flag: number = 0;
    defaultteamName: string = "";
    myScrumteams: ScrumTeamViewList[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    constructor(private router: Router, private app: NavMenuComponent,
        private mainapp: AppComponent,
        private scrumTeamService: ScrumTeamService,
        private alertService: AlertService) {

    }

    refresh(): void {
        location.reload();
    }

    getHometeams() {
        this.scrumTeamService.getMyTeams(this.currentUser.userKey)
            .subscribe(data => {
                this.myScrumteams = data;
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    checkForDefault(setDefault: string) {
        if (setDefault == "Default") return true;
        else return false;
    }

    getTeamName(): void {
        this.scrumTeamService.getTeamNameUserKey(this.currentUser.userKey)
            .subscribe(
                data => {
                    this.mainapp.defaultteamName = data;
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    this.currentUser.defaultTeam = data;

                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); 
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    setDefaultTeam(teamKey: string, userKey: string): void {
        this.scrumTeamService.setDefaultTeam(teamKey, userKey)
            .subscribe(
                data => {
                    this.alertService.success('Default Team set successful', false);
                     
                    this.getHometeams();
                    this.getTeamName();
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    ngOnInit(): void {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!(this.currentUser && this.currentUser.userKey)) {
            this.router.navigate(['/signin']);
            this.alertService.error("Sorry, you are not signed in.", true);
        }
        this.tempkey = this.currentUser.userKey;
        if (this.currentUser.userKey != null) {
            this.getHometeams();
            this.getTeamName();
        }
    }
}
