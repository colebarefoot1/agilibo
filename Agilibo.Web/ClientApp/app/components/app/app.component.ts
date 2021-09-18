import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { ScrumTeamService } from '../../services/scrumTeam/scrumTeam.service';
import { SprintForHeader } from '../../models/Sprint';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    defaultteamName: string = "";
    _router: Router;
    sprint: any = {};
    currentUser: LoggedinUserInformation;
    constructor(private router: Router, private scrumTeamService: ScrumTeamService) {
        this._router = router;
       
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        //if (this.currentUser.userKey) {
        //    this.scrumTeamService.getTeamNameUserKey(this.currentUser.userKey)
        //        .subscribe(
        //            data => {
        //                this.defaultteamName = data;
        //            },
        //            error => {
        //                console.log(error._body);
        //            });
        //    this.scrumTeamService.getCurrentSprintDetail(this.currentUser.userKey)
        //        .subscribe(
        //            data => {
        //                this.sprint = data;
        //            },
        //            error => {
        //                console.log(error._body);
        //            });
        //}
    }
    getHeaderDetail() {
        if (this.currentUser.userKey) {
            this.scrumTeamService.getTeamNameUserKey(this.currentUser.userKey)
                .subscribe(
                    data => {
                        this.defaultteamName = data;
                    },
                    error => {
                        console.log(error._body);
                    });
            this.scrumTeamService.getCurrentSprintDetail(this.currentUser.userKey)
                .subscribe(
                    data => {
                        this.sprint = data;
                    },
                    error => {
                        console.log(error._body);
                    });
        }
    }
    today: number = Date.now();
    _showMenu: boolean = true;

    getRouter() {
        return this._router.url.replace('/', '');
    }

    hideMenu() {
        this._showMenu = false;
    }

    showMenu() {
        this._showMenu = true;
    }
    showheader() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this.currentUser.userKey) {           
            return true;
        
        }
        else return false;
    }
}
