import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { CrossTeamDependencyService } from "../../services/crossTeamDependency/crossTeamDependency.service";
import { CrossTeamDependency, CrossTeamView, TypeOfCrossTeamDependency, TeamInfoForReportDependencyOfGrid, TeamListWiththreeConsecutiveSprints } from '../../models/CrossTeamDependency';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'dependencyGrid',
    templateUrl: './dependencyGrid.component.html',
    styleUrls: ['./dependencyGrid.component.css']
})

export class DependencyGridComponent implements OnInit {
    loading = false;
    id: string = "";
    gridlist: TeamListWiththreeConsecutiveSprints[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";

    constructor(private _avRoute: ActivatedRoute,
        private router: Router,
        private crossdependencyservice: CrossTeamDependencyService,
        private alertService: AlertService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    ngOnInit(): void {
        this.getDependencyList();
    }

    getDependencyList() {
        this.crossdependencyservice.getTeamListForReportDependencyGrid(this.currentUser.companyKey)
            .subscribe(data => { this.gridlist = data; console.log(data);},
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    scrollToVirtualNumber = (num: number) => {
        const elmnt = document.getElementById(`us${num}`);

        if (elmnt) {
            elmnt.classList.add("blink_me");

            setTimeout(() => {
                elmnt.classList.remove("blink_me");
            }, 5000);

            elmnt.scrollIntoView();
        }       
    }
}
