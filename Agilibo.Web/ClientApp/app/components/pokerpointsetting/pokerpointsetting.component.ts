import { Component, OnInit, transition } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { ScrumTeamService } from '../../services/scrumTeam/scrumTeam.service';
import { AlertService } from '../../services/alert.service';
import { EstimateSettingForPlanningPokerService } from '../../services/estimateSettingPlanningPoker/estimateSettingPlanningPoker.service';
import { EstimateSettingPlanningPoker } from '../../models/EstimateSettingPlanningPoker';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as signalR from '../../../../node_modules/@aspnet/signalr';
import { HubConnection } from '../../../../node_modules/@aspnet/signalr';
import { AppConfig } from '../../../AppConfig';

@Component({
    selector: 'planningpokerpointsetting',
    templateUrl: './pokerpointsetting.component.html'
})
export class PokerPointSettingComponent implements OnInit {
    loading: boolean = false;
    estimateList: EstimateSettingPlanningPoker[] = [];
    estimatemodel: any = {};
    teamName: string = "";
    id: string = "";
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    public group: any;
    public groupKey: string = '';
    rForm: FormGroup;
    public _hubConnection: any;

    pokerObj: EstimateSettingPlanningPoker;

    constructor(private _avRoute: ActivatedRoute, private fb: FormBuilder,
        private pokerserviceEstimateSetting: EstimateSettingForPlanningPokerService,
        private router: Router, private scrumTeamService: ScrumTeamService,
        private alertService: AlertService, private config: AppConfig)
    {
        this.rForm = fb.group({
            'estimateLabel': [null, [Validators.required, Validators.maxLength(20)]],
            'estimateValue': [null, [Validators.required, Validators.maxLength(20)]],
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.groupKey = this.id;
            this.teamName = this._avRoute.snapshot.params["teamname"];
            this.estimatemodel.teamKey = this.id;
        }
    }
    public validateControl(controlName: string) {
        if (this.rForm.controls[controlName].invalid && this.rForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.rForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }

    ngOnInit() {
        //this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.LongPolling });
        //this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second

        //this._hubConnection.on('Group', (data: any) => {
        //    console.log(data);
        //    console.log('Group Information');
        //});

        //this._hubConnection.start()
        //    .then(() => {
        //        console.log('Pocker Hub connection started From point');

        //        // this._hubConnection.invoke('StartFeed', this.currentUser.userKey)
        //        this.loading = false;
        //    })
        //    .catch(() => {
        //        console.log('Error while establishing connection');
        //    });     
        this.getAllSettingPoint(this.groupKey);
    }

    public getAllSettingPoint(groupKey: string) {
        this.pokerserviceEstimateSetting.getAll(groupKey).subscribe(
            data => { this.estimateList = data },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }


    public levelUp(item: any) {
        this.loading = true;
        this.pokerserviceEstimateSetting.levelUp(item)
            .subscribe(
                data => {
                    this.alertService.success('Data Saved successfully', false);
                   // this._hubConnection.invoke('UpdateFiboVote', item);
                    this.getAllSettingPoint(this.groupKey);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public levelDown(item: any) {
        this.loading = true;
        this.pokerserviceEstimateSetting.levelDown(item)
            .subscribe(
                data => {
                    this.alertService.success('Data Saved successfully', false);
                   // this._hubConnection.invoke('UpdateFiboVote', item);
                    this.getAllSettingPoint(this.groupKey);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public deleteEstimateSetting(item: EstimateSettingPlanningPoker) {
        var ans = confirm("Do you want to delete This");
        if (ans) {
            this.loading = true;
            this.pokerserviceEstimateSetting.delete(item.estimateSettingKey)
                .subscribe(
                    data => {
                        this.alertService.warning('Data was deleted successfully', false);
                        //this._hubConnection.invoke('UpdateFiboVote', item);
                        this.getAllSettingPoint(this.groupKey);
                        this.loading = false;
                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                });
        }
    }

    public updateEstimateSettings(item: EstimateSettingPlanningPoker) {
        this.estimatemodel = item;
        this.estimatemodel.EstimateSettingKey = item.estimateSettingKey;
    }

    public submitForSave() {
        this.loading = true;
        this.estimatemodel.teamKey = this.groupKey;
        this.pokerserviceEstimateSetting.create(this.estimatemodel)
            .subscribe(
            data => {
                console.log('POKER OBJ');
                console.log(this.pokerObj);
                console.log(this.estimatemodel);
                    this.pokerObj = this.estimatemodel;
                    this.alertService.success('Data Saved successfully', false);
               // this._hubConnection.invoke('UpdateFiboVote', this.estimatemodel);
                    this.getAllSettingPoint(this.groupKey);
                    this.loading = false;
                    this.estimatemodel = new Observable<EstimateSettingPlanningPoker>();
                    this.estimatemodel.teamKey = this.groupKey;
                    this.rForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
    public addEstimateSetting() {
        this.loading = true;
        this.estimatemodel.teamKey = this.groupKey;
        this.pokerserviceEstimateSetting.create(this.estimatemodel)
            .subscribe(
                data => {
                    this.alertService.success('Data Saved successfully', false);
                    //this._hubConnection.invoke('UpdateFiboVote', this.estimatemodel);
                    this.getAllSettingPoint(this.groupKey);
                    this.loading = false;
                    this.estimatemodel = new Observable<EstimateSettingPlanningPoker>();
                    this.estimatemodel.teamKey = this.groupKey;
                    this.rForm.reset();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }


}
