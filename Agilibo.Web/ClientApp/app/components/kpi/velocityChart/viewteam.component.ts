import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { ScrumTeamViewList } from '../../../models/ScrumTeam';
import { ScrumTeamService } from '../../../services/scrumTeam/scrumTeam.service';
import { AlertService } from '../../../services/alert.service';


@Component({
    selector: 'viewteam',
    templateUrl: './viewteam.component.html'
})
export class ViewTeamComponent implements OnInit {
    currentUser: any;
    loading = false;
    model: any;
    userkey: string = "";
    flag: number = 0;
    myScrumteams: ScrumTeamViewList[] = [];
    errorMessage: string = "";
    constructor(private router: Router,
        private scrumTeamService: ScrumTeamService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');      
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this.currentUser.userKey == null) {
            this.router.navigate(['/login']);
        }
        this.userkey = this.currentUser.userKey;
        this.getList();       
    }
    getList() {
        this.scrumTeamService.getAllTeamInfo(this.currentUser.companyKey)
            .subscribe(data => {
                this.myScrumteams = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
}
