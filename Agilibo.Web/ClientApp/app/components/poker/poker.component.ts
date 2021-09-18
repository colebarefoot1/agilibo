
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


@Component({
    selector: 'poker',
    templateUrl: './poker.component.html'
})
export class PokerComponent implements OnInit {
    loading = false;
    model: any;
    tempkey: string = "";
    flag: number = 0;
    defaultteamName: string = "";
    myScrumteams: ScrumTeamViewList[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    constructor(private router: Router, private app: NavMenuComponent,
        private scrumTeamService: ScrumTeamService,
        private alertService: AlertService) {

    }

    refresh(): void {
        location.reload();
    }

    getHometeams() {
        this.scrumTeamService.getAllTeamWithMyIDforPoker(this.currentUser.userKey)
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
    ngOnInit(): void {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!(this.currentUser && this.currentUser.userKey)) {
            this.router.navigate(['/signin']);
            this.alertService.error("Sorry, you are not signed in.", true);
        }
        this.tempkey = this.currentUser.userKey;
        if (this.currentUser.userKey != null) {
            this.getHometeams();           
        }
    }
}
