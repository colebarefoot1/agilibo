import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrumTeamService } from "../../services/scrumTeam/scrumTeam.service";
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { AlertService } from '../../services/alert.service';
import { DatePipe } from '@angular/common';
import { Sprint, SprintViewModel } from '../../models/Sprint';
import { SprintService } from '../../services/sprint/sprint.service';
import { SprintDuration } from '../../models/SprintDuration';
import { SprintDurationService } from '../../services/sprintDuration/sprintDuration.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as signalR from '../../../../node_modules/@aspnet/signalr';
import { HubConnection } from '../../../../node_modules/@aspnet/signalr';
import { AppConfig } from '../../../AppConfig';

@Component({
    selector: 'sprint',
    templateUrl: './sprint.component.html'
})
export class SprintComponent implements OnInit {
    loading = false;
    sprintlist: SprintViewModel[] = [];
    durationList: SprintDuration[] = [];
    id: string = "";
    sprintForm: FormGroup;
    teamName: string = "";
    teamKey: string = "";
    model: any = {};
    viewmodel: any = {};
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    public _hubConnection: any;

    constructor(private _avRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private scrumTeamService: ScrumTeamService,
        private sprintservice: SprintService,
        private sprintDurationService: SprintDurationService,
        private alertService: AlertService, private config: AppConfig) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.teamKey = this.id;
            this.teamName = this._avRoute.snapshot.params["teamname"];

        }
        this.sprintForm = fb.group({
            'sprintName': [null, [Validators.required, Validators.maxLength(50)]],
            'sprintGoal': [null, [Validators.required, Validators.maxLength(100)]],
            'sprintDurationKey': [null, [Validators.required]],
            'sprintFrom': [null, [Validators.required]],
            'releasePlan': [null],
            'storyPointCommited': [null],
            'storyPointCompleted': [null]
        });
    }

    public validateControl(controlName: string) {
        if (this.sprintForm.controls[controlName].invalid && this.sprintForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.sprintForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    getList(teamKey: string) {
        this.sprintservice.getAll(teamKey)
            .subscribe(data => { this.sprintlist = data; },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }

    ngOnInit(): void {

        //this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.LongPolling });
        //this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second

        //this._hubConnection.on('Group', (data: any) => {
        //    console.log(data);
        //    console.log('Group Information');
        //});

        //this._hubConnection.start()
        //    .then(() => {
        //        console.log('Pocker Hub connection started From Sprint');

        //        // this._hubConnection.invoke('StartFeed', this.currentUser.userKey)
        //        this.loading = false;
        //    })
        //    .catch(() => {
        //        console.log('Error while establishing connection');
        //    });     

        //fill Duration Selectlist
        this.sprintDurationService.getAll()
            .subscribe(data => {
                this.durationList = data;
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        this.getList(this.teamKey);
        this.model.teamKey = this.teamKey;
    }

    public Submit() {
        this.loading = true;
        this.model.createdBy = this.currentUser.userKey;
        this.model.modifiedBy = this.currentUser.userKey;
        this.sprintservice.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Sprint has been Added successfully', false);
                   // this._hubConnection.invoke('UpdatePockerSprint', this.model);
                    this.getList(this.teamKey);
                    this.model = new Observable<Sprint>();
                    this.model.teamKey = this.teamKey;
                    this.loading = false;
                    this.sprintForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public formatDate(today: Date) {
        return today.toString().substr(0, 10);
    }

    public edit(sprintkey: string) {
        this.sprintservice.getById(sprintkey)
            .subscribe(
                data => {
                    this.model = data;
                    this.model.sprintFrom = this.formatDate(data.sprintFrom);
                  
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    addDays(date: Date, days: number) {
       
        this.sprintDurationService.getToDate(date, days)
            .subscribe(
                data => {
                    
                    var convertedDateString = data.toLocaleString();
                    console.log(data.toLocaleString());
                    convertedDateString = convertedDateString.replace('at ', '');
                    this.model.sprintTo = new Date(convertedDateString);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public selectchange(sprintDurationKey: number) {
        console.log("Select Change works");
        this.addDays(this.model.sprintFrom, sprintDurationKey * 7);
    }

    public view(sprintkey: string) {
        this.sprintservice.getById(sprintkey)
            .subscribe(
                data => {
                    this.viewmodel = data;
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public clearDate() {
        this.model.sprintTo = "";
        this.model.sprintFrom = "";
    }

    public clear() {
        this.viewmodel = new Observable<Sprint>();
    }

    public delete(sprintkey: string) {
        var ans = confirm("Are you sure you want to Delete this Sprint?");
        if (ans) {
            this.sprintservice.delete(sprintkey).subscribe((data) => {               
                this.alertService.warning('Sprint Deleted successfully', false);
                //this._hubConnection.invoke('UpdatePockerSprint', this.model);
                this.getList(this.teamKey);

            }, error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        }
    }

}