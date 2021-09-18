import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';
import { AlertService } from '../../services/alert.service';
import { map } from 'rxjs/operator/map';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { empty } from 'rxjs/Observer';
import { HappinessDoorService } from '../../services/happinessDoor.service/happinessdoor.service';
import * as signalR from '../../../../node_modules/@aspnet/signalr';
import { HubConnection } from '../../../../node_modules/@aspnet/signalr';
import { AppConfig } from '../../../AppConfig';



@Component({
    selector: 'happinessdoorpost',
    templateUrl: './happinessdoorpost.component.html',
    styleUrls: ['./happinessdoor.component.css'],
})

export class HappinessDoorPostComponent implements OnInit {
    happinessList: happiness = { "happy": 1 , "good": 2 , "bad": 3 };
    email: string;
    happiness: string;
    feedback: string;
    model: any = {};
    loading = false;
    public errorMessage: string = '';
    currentUser: LoggedinUserInformation;
    public flag: boolean = false;
    HappinessForm: FormGroup;
    ApiKey = '37629CDA-E0F0-49D3-9B86-EB5F2BB200AB';
    currDate = new Date();
    postDate = this.currDate.getUTCFullYear() + '-' +
        ('0' + (this.currDate.getUTCMonth() + 1)).slice(-2) + '-' +
        ('0' + this.currDate.getUTCDate()).slice(-2);

    public _hubConnection: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private happinessDoorService: HappinessDoorService,
        private alertService: AlertService, private config: AppConfig) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.happiness = 'happy';
        this.feedback = '';
        this.email = this.currentUser.username;
        this.HappinessForm = fb.group({
            'happiness': [null, [Validators.required]],
            'feedback': [null, [Validators.required]],
            'eventName':[null]
        });
    }

    public validateControl(controlName: string) {
        if (this.HappinessForm.controls[controlName].invalid && this.HappinessForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.HappinessForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }
    public events = [
        {
            "Name": "None"
        },
        {
            "Name": "Sprint Planning"
        },
        {
            "Name": "Sprint Review"
        },
        {
            "Name": "Sprint Retrospective"
        },
        {
            "Name": "Daily Call"
        }
    ];


    ngOnInit(): void {
        console.log(this.postDate);

        this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.WebSockets | signalR.TransportType.LongPolling });
        this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second

        this._hubConnection.on('FeedsGroup', (data: any) => {
            console.log(data);
            console.log('Group Information');
        });

        this._hubConnection.start()
            .then(() => {
                console.log('Feeds Hub connection started From Kudo');
                // this._hubConnection.invoke('StartFeed', this.currentUser.userKey)
                this.loading = false;
            })
            .catch(() => {
                console.log('Error while establishing connection');
            });     

    }
    //ngOnDestroy() {
    //    this.card.unsubscribe();
    //}

    public postHappinessDoor() {
        this.model.apiKey = this.ApiKey;
        this.model.userEmailAddress = this.currentUser.username;
        this.model.happinessPicture = this.happinessList[this.happiness];
        this.model.entryDate = this.postDate;
        this.model.userKey = this.currentUser.userKey;
        this.model.unitKey = this.currentUser.unitKey;
        this.model.companyKey = this.currentUser.companyKey;
        this.happinessDoorService.create(this.model)
            .subscribe(
            data => {
                this._hubConnection.invoke('UpdateHapinessFeeds', this.model, this.currentUser.userKey, this.currentUser.unitKey, this.currentUser.companyKey);
                    this.alertService.success('Happiness note Created successfully', true);
                    this.HappinessForm.reset();
                    this.router.navigate(['/happinessdoor']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

}

interface happiness {
    [key: string]: any;
}
