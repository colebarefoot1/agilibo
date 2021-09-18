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
import { KudoCardsListPage } from './kudocardlist.component';
import { map } from 'rxjs/operator/map';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { empty } from 'rxjs/Observer';
import { KudoCardService } from '../../services/kudocard.service/kudocard.service';
import { KudoCard } from '../../models/KudoCard';
import * as signalR from '../../../../node_modules/@aspnet/signalr';
import { HubConnection } from '../../../../node_modules/@aspnet/signalr';
import { AppConfig } from '../../../AppConfig';


@Component({
    selector: 'kudocard',
    templateUrl: './kudocard.component.html',
    styleUrls: ['./kudocard.component.css']
})

export class KudoCardComponent implements OnInit {

    cardImg: string;
    card: any;
    kudoCardPictureId: string;
    kudoMessage: string;
    fromEmailAddress: string;
    recipientEmailAddress: string;
    model: any = {};
    loading = false;
    public errorMessage: string = '';
    currentUser: LoggedinUserInformation;
    public flag: boolean = false;
    ApiKey = '37629CDA-E0F0-49D3-9B86-EB5F2BB200AB';

    cardTitleAB = {
    'CONGRATULATIONS!': 'CN',
    'THANK YOU!': 'TY',
    'VERY HAPPY!': 'VH',
    'MANY THANKS!': 'MT',
    'WELL DONE!': 'WD',
    'GREAT JOB!': 'GJ',
    'TOTALLY AWESOME!': 'TA'
}
    public _hubConnection: any;

    kudoForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private kudocardService: KudoCardService,
        private alertService: AlertService
        , private config: AppConfig) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.kudoForm = fb.group({
            'recipientEmailAddress': [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
            'kudoMessage': [null, [Validators.required]],
        });
    }
    public validateControl(controlName: string) {
        if (this.kudoForm.controls[controlName].invalid && this.kudoForm.controls[controlName].touched)
            return true;

        return false;
    }

    public checkError(controlName: string, errorName: string) {
        if (this.kudoForm.controls[controlName].hasError(errorName))
            return true;

        return false;
    }
    goToKudoCardsList() {
        this.router.navigateByUrl('/kudocardlist');
        this.flag = true;
    }

    ngOnInit(): void {
        this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.WebSockets | signalR.TransportType.LongPolling });
        this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second

        this._hubConnection.on('FeedsGroup', (data: any) => {
            console.log(data);
            console.log('Group Information');
        });

        this._hubConnection.start()
            .then(() => {
                console.log('Feeds Hub connection started From Kudo')

               // this._hubConnection.invoke('StartFeed', this.currentUser.userKey)
                this.loading = false;
            })
            .catch(() => {
                console.log('Error while establishing connection')
            });     

        this.card = this.route.snapshot.queryParams;
        if (this.card.img == null) {
            this.cardImg = '';
        }
        else {
            this.cardImg = require(`./assets/imgs/kudo_cards/main/${this.card.img}`);
            console.log(this.cardImg);
            
        }
        //this.cardImg = require("./assets/imgs/kudo_cards/main/" + this.card.img);
        this.fromEmailAddress = this.currentUser.username;
        console.log(this.card);
        console.log(this.fromEmailAddress);
        const ApiKey = '37629CDA-E0F0-49D3-9B86-EB5F2BB200AB';

    }
    //ngOnDestroy() {
    //    this.card.unsubscribe();
    //}

    public postKudoCard() {

        let cardTitleAB: any = {
            'CONGRATULATIONS!': 'CN',
            'THANK YOU!': 'TY',
            'VERY HAPPY!': 'VH',
            'MANY THANKS!': 'MT',
            'WELL DONE!': 'WD',
            'GREAT JOB!': 'GJ',
            'TOTALLY AWESOME!': 'TA',
        }
        this.fromEmailAddress = this.currentUser.username;
        this.kudoCardPictureId = cardTitleAB[this.card.title];
        this.model.apiKey = this.ApiKey;
        //this.model.kudoMessage = this.kudoMessage;
        //this.model.recipientEmailAddress = this.recipientEmailAddress;
        this.model.fromEmailAddress = this.fromEmailAddress;
        this.model.kudoCardPictureID = this.kudoCardPictureId;

        this.model.userKey = this.currentUser.userKey;
        this.model.unitKey = this.currentUser.unitKey;
        this.model.companyKey = this.currentUser.companyKey;
        this.kudocardService.create(this.model)
            .subscribe(
            data => {
                this._hubConnection.invoke('UpdateKudoFeeds', this.model,  this.currentUser.userKey, this.currentUser.unitKey, this.currentUser.companyKey);
                    this.alertService.success('Kudo Card Created successful', true);
                    this.kudoForm.reset();
                    this.router.navigate(['/feeds'], { queryParams: {} });
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

    }

}