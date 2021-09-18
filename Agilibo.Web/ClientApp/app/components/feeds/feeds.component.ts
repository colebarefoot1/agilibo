
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
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
import { HubConnection } from '@aspnet/signalr';
import { AppConfig } from '../../../AppConfig';
import * as signalR from '@aspnet/signalr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'feeds',
    templateUrl: './feeds.component.html',
    styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit, OnDestroy {

    
    // Flag to see if status update is in progress
    private inProgress: boolean = false;

    // Possible available reactions
    private reactions: string[] = ['like', 'love', 'dislike'];

    // All the statuses available
   // public statuses: FirebaseListObservable<any[]>

    // The maimum length and minimum length of a status
    public maxLength: number = 500;
    public minLength: number = 0;

    // Flag that determines if the status text is valid or nah
    public statusTextValid: boolean = false;

  
    // Status text
    public statusText: string;

    // The status available
    public statuses: any[];

    // Flag to see if a new status can be added or nah
    public canPostStatus: boolean = false;

    public show: boolean = false;
    public buttonName: any = 'Show Upcoming Sprint';
   
    loading: boolean = false;
    group: any = {};
   // loading = false;
    model: any;
    sprintFrom: string = "";
    sprintTo: string = "";
    tempkey: string = "";
    flag: number = 0;
    myScrumteams: ScrumTeamViewList[] = [];
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";
    public _hubConnection: any;
    public hubConnectionContextId: string = '';
    constructor(private router: Router, private app: NavMenuComponent,
        private scrumTeamService: ScrumTeamService,
        private alertService: AlertService, private http: Http, private config: AppConfig, private nav: NavMenuComponent ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.nav.setNavBarState();
        this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.WebSockets | signalR.TransportType.LongPolling });
        this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second
    }    

    ngOnDestroy(): void {
        this.loading = true;
        setTimeout(() => {
            this._hubConnection.invoke('DistroyPage', this.currentUser.userKey);
            this.loading = false;
        }, 2000);
    }

    ngOnInit(): void {
       
        //this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.ServerSentEvents  });

        //this._hubConnection = new HubConnection(this.config.feedsApiUrl, { transport: signalR.TransportType.LongPolling });
        //this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second

        //if (this._hubConnection.connection.connectionState === 1) {
            this._hubConnection.on('FeedsGroup',
                (data: any) => {

                    this.group = null;
                    this.group = data;
                    console.log(data);
                    this.sprintFrom = ''; //data.currentSprint.sprintFrom;
                    this.sprintTo = ''; //data.currentSprint.sprintTo;
                    console.log('Group Information');
                    console.log(this.group);

                });
      //  }


        this.loading = true;
        this._hubConnection.start()
            .then(() => {
                console.log('Feeds Hub connection started');

                this._hubConnection.invoke('StartFeed', this.currentUser.userKey,this.currentUser.unitKey, this.currentUser.companyKey);
                this.loading = false;
            })
            .catch(() => {
                console.log('Error while establishing connection');
            });     

    }

    toggle() {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "Hide Upcoming Sprint";
        else
            this.buttonName = "Show Upcoming Sprint";
    }


    // ---------------------------------------------------------
    // Get the status of the text if its valid or nah
    // ---------------------------------------------------------

    typingStatus() {
        this.canPostStatus = this.valid(this.statusText) && this.updating() === false;
    }

    // ---------------------------------------------------------
    // Post a status if it is valid
    // ---------------------------------------------------------

    postHappy() {
        //this.status.valid(this.statusText) && this.status.post(this.statusText)
        this.router.navigate(['/happinessdoor']);
    }

    postKudo() {
        //this.status.valid(this.statusText) && this.status.post(this.statusText)
        this.router.navigate(['/kudocard']);
    }

    
    // ----------------------------------------------------------------------
    // Method to check the validity of a status update
    // ----------------------------------------------------------------------

    valid(status: string): boolean {
        return status.length >= this.minLength && status.length <= this.maxLength;
    }

    // ----------------------------------------------------------------------
    // Method to check the in progress flag
    // ----------------------------------------------------------------------

    updating(): boolean {
        return this.inProgress;
    }

    //toLocalTimeString(dateStr): string {
    //    return new Date(dateStr).toDateString();
    //}

    //kudoImage
    kudoImagePath(imgName: string) {
        return require(`./assets/imgs/kudo_cards/main/${imgName}`);
    }

    //happinessImage
    happyImagePath(imgName: string) {
        return require(`./assets/imgs/happiness/${imgName}`);
    }

    showCompanyData() {

        console.log('User click on show Company Data');
        this._hubConnection.invoke('ShowCompanyData', this.currentUser.userKey, this.currentUser.unitKey, this.currentUser.companyKey);
        //this._hub.ShowVote(this.currentFiboId);
        console.log('Connected hub information show vote');
        console.log(this._hubConnection);
    }

    showUnitData() {
        console.log('User click on Show Unit Data');
        this._hubConnection.invoke('ShowUnitData', this.currentUser.userKey, this.currentUser.unitKey, this.currentUser.companyKey);
        //this._hub.ShowVote(this.currentFiboId);
        console.log('Connected hub information show vote');
        console.log(this._hubConnection);
    }

    shareStatus() {
        console.log('User click on share status Data');
        this._hubConnection.invoke('ShareStatusData', this.currentUser.userKey, this.currentUser.unitKey, this.currentUser.companyKey, this.currentUser.userEmail, this.statusText);
        //this._hub.ShowVote(this.currentFiboId);
        console.log('Connected hub information show vote');
        console.log(this._hubConnection);
        this.statusText = '';
    }
}
