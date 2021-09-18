import { Component, OnInit, transition, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HubConnection, IHubConnectionOptions, StreamInvocationMessage } from '@aspnet/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { ScrumTeamService } from '../../services/scrumTeam/scrumTeam.service';
import { AlertService } from '../../services/alert.service';
import * as signalR from '@aspnet/signalr';
import { EstimateSettingForPlanningPokerService } from '../../services/estimateSettingPlanningPoker/estimateSettingPlanningPoker.service';
import { EstimateSettingPlanningPoker } from '../../models/EstimateSettingPlanningPoker';
import { AppConfig } from '../../../AppConfig';
import { Http } from '@angular/http';
import { myPockerHub, HubFactory } from '../../services/hub.factory.service';
import { UserProfileService } from '../../services/userprofile/userprofile.service';

//const connection = new signalR.HubConnectionBuilder()
//    .withUrl("/hub")
//    .build();


@Component({
    selector: 'planningpocker',
    templateUrl: './playpocker.component.html',
    styleUrls: ['./playpocker.component.css']
})
export class PockerComponent implements OnInit, OnDestroy {

    _hub: HubFactory;
    loading: boolean = false;
    model: any = {};
    showImage: boolean = false;
    // Scrum Team
    teammodel: any = {};
    teamName: string = "";
    usermodel: any = {};
    id: string = "";
    currentUser: LoggedinUserInformation;

    errorMessage: string = "";
    valueToshowsetting: boolean = false;
    groupName: string = "";

    public group: any;
    public _hubConnection: any;
    //***********************commented by Nahid because getting error whicle dotnet build ...cant publish
    //public _hubConnection: HubConnection | undefined;
    public groupKey: string = '';
    public email: string = '';
    public userKey: string = '';
    public playingTeamName: string = '';
    public groupMessage: string = '';
    teammaster: string = "";
    History: string[] = [];
    public currentCount: string = '';
    public currentFiboId: string = '';

    images: any = {};

    public hubConnectionContextId: string = '';



    constructor(private _avRoute: ActivatedRoute, 
        private router: Router, private scrumTeamService: ScrumTeamService, private alertService: AlertService,
        private http: Http, private config: AppConfig, private userprofileservice: UserProfileService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.email = this.currentUser.firstName + " " + this.currentUser.lastName;
            this.userKey = this.currentUser.userKey;
            this.groupKey = this.id;
            this.teamName = this._avRoute.snapshot.params["teamname"];
        }

        // Zaki Bhai approach, single r create problem with in single connection
        //this._hub = myPockerHub.hub();
        this._hubConnection = new HubConnection(this.config.pockerApiUrl, { transport: signalR.TransportType.WebSockets | signalR.TransportType.LongPolling });
        this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second
    }

    ngOnDestroy(): void {
        this.loading = true;
        setTimeout(() => {
            this._hubConnection.invoke('DistroyPage', this.groupKey, this.email);
            this.loading = false;
        }, 2000);
    }

    ngOnInit() {

       
        // Working Properly after publish also and this is proven
        //this._hubConnection = new HubConnection(this.config.pockerApiUrl, { transport: signalR.TransportType.ServerSentEvents });
        //this._hubConnection = new HubConnection(this.config.pockerApiUrl, { transport: signalR.TransportType.LongPolling });
       

        // SIGNAL R RECEIVING BROADCASTING DATA
       // if (this._hubConnection.connection.connectionState === 1) {

            this._hubConnection.on('Group', (data: any) => {
                console.log('Receiving new group broadcast data');
                this.group = null;
                this.group = data;
                this.model.sprintKey = "";
                console.log('Connected hub information after receiving new broadcast data');
                console.log(this._hubConnection);
            });
      //  }
        

        this._hubConnection.start()
            .then(() => {
                console.log('Hub connection started');
                console.log('Connected hub information');
                console.log(this._hubConnection);
                this._hubConnection.invoke('PrepairTeamMember', this.groupKey, this.email, this.userKey);
               
            })
            .catch(() => {
                console.log('Error while establishing connection');
            });

         
        
     

        // Getting team information
        this.loading = true;
        this.scrumTeamService.getById(this.id)
            .subscribe(data => {
                this.teammodel = data;
                this.loading = false;
            },
            error => this.errorMessage = <any>error);

       
    }

    createOrJoin() {
        console.log('Start joining new team');
        this.loading = true;

        setTimeout(() => {

            if (this._hubConnection.connection.connectionState === 1) {

                this.hubConnectionContextId = this._hubConnection.connection.connectionId;
                this._hubConnection.invoke('CreateOrJoin', this.groupKey);
                this.loading = false;
                console.log('Connected hub information after join');
                console.log(this._hubConnection);
            }

            else {
                //alert('You are trying to change group frequently, Please wait for a moment.');

                this._hubConnection.start()
                .then(() => {
                        console.log('Hub connection Restarted.....!!!');
                        console.log('Connected hub information Again');
                        console.log(this._hubConnection);
                        this._hubConnection.invoke('CreateOrJoin', this.groupKey);
                        this.loading = false;
                    })
                .catch(() => {
                    console.log('Error while establishing connection, Fail to reconnect again');
                        this.loading = false;
                    });
            }
        }, 5000);
    }

    selectName() {
        console.log('User select new sprint goal');
        this.model.sprintKey = this.group.sprintKey;
        this._hubConnection.invoke('SprintGoal', this.groupKey, this.model.sprintKey, this.email);
        //this._hub.selectName(this.groupKey, this.model.sprintKey, this.email);
        console.log('Connected hub information After select new sprint goal');
        console.log(this._hubConnection);
    }

    selectNameFromWoner() {
        console.log('User story owner select new sprint goal');
        this._hubConnection.invoke('SprintGoal', this.groupKey, this.model.sprintKey, this.email);
        //this._hub.selectName(this.groupKey, this.model.sprintKey, this.email);
        console.log('Connected hub information After select new sprint goal');
        console.log(this._hubConnection);
    }

    start() {
        if (this.group.sprintOwnerName === null) {
            this.alertService.warning('Please select sprint for start poker.', false);
            //return;
        }
        else {
            console.log('Start group with new message');
            this._hubConnection.invoke('Start', this.groupMessage, this.groupKey);
            //this._hub.start(this.groupMessage, this.groupKey);
            console.log('Connected hub information after start a new message conversation');
            console.log(this._hubConnection);
        }
    }

    fiboVote(fiboId: string) {
        console.log('User give his vote for user story');
        this.currentFiboId = fiboId;
        this._hubConnection.invoke('FiboVote', this.currentFiboId, this.email);
        //this._hub.fiboVote(this.currentFiboId, this.email);
        console.log('Connected hub information after New vote');
        console.log(this._hubConnection);
    }

    ShowVote(fiboId: string) {
        console.log('User click on show vote');
        this.currentFiboId = fiboId;
        this._hubConnection.invoke('FiboVote', this.currentFiboId);
        //this._hub.ShowVote(this.currentFiboId);
        console.log('Connected hub information show vote');
        console.log(this._hubConnection);
    }

    showAllVote(): void {
        console.log('User click on show all vote');
        this.showImage = !this.showImage;
        if (this.showImage == true) {
            this._hubConnection.invoke('ShowVote', this.groupKey, this.email);
            //this._hub.showAllVote(this.groupKey, this.email);
            console.log('Connected hub information after click on show all vote');
            console.log(this._hubConnection);
        }
    }

    clearVote(): void {
        console.log('User is clearing all vote information for story');
        this._hubConnection.invoke('ClearVote', this.groupKey, this.email);
        //this._hub.clearVote(this.groupKey, this.email);
        this.groupMessage = "";
        console.log('Connected hub information Clear vote');
        console.log(this._hubConnection);
    }

    close() {

        console.log('User leaving group');

        setTimeout(() => {

            this._hubConnection.invoke('Stop', this.groupKey, this.email);
            //this._hub.close(this.groupKey, this.email);
            this.group = null;
            this.groupMessage = "";
            this.router.navigate(['/home']);
            this.loading = false;
            console.log('Connected hub information after leave group');
            console.log(this._hubConnection);
        }, 1000);
    }
     
    getGravatarByEmail(email: string): string {
        if (!email) email = "___";
        return 'http://www.gravatar.com/avatar/' + (email) + '?s=210&d=mm';
    }


    getProfileImage(userKey: string): string {

        alert('sss');
        //console.log(this.images)
        this.userprofileservice.getImage(userKey).subscribe(
            data => {
                console.log(this.currentUser.userKey);
                this.images = this.userprofileservice.imageStore;
                console.log(this.images);
                return (this.images.imageHeaders + this.images.imageBinary);

            }
        );

        return 'http://www.gravatar.com/avatar/' + (userKey) + '?s=210&d=mm';
    }
}
