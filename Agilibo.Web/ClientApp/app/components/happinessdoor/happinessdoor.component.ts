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
import { HappinessDoor } from '../../models/HappinessDoor';



@Component({
    selector: 'happinessdoor',
    templateUrl: './happinessdoor.component.html',
    styleUrls: ['./happinessdoor.component.css'],
})

export class HappinessDoorComponent implements OnInit {
    model: any = {};
    events: any[] = [];
    happinessFilter: any[] = [];
    happinessNote: HappinessDoor[] = [];
    loading = false;
    public errorMessage: string = '';
    currentUser: LoggedinUserInformation;
    public flag: boolean = false;

    HappyForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private happinessDoorService: HappinessDoorService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.model.eventName = 'Sprint Planning';
        this.HappyForm = fb.group({
            eventName: [this.model.eventName]
        });
        //this.HappyForm.controls['eventName'].setValue(this.default, { onlySelf: true });
    }

    getHappinessCardByEvent() {
        this.happinessDoorService.getHappinessByFilter(this.currentUser.userEmail, this.model.eventName)
            .subscribe(data => {
                this.happinessFilter = data;
                console.log(this.happinessFilter);
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    gotoHappinessPost() {
        this.router.navigateByUrl('/happinessdoorpost');
        this.flag = true;
    }


    getHappinessByMail() {
        this.happinessDoorService.getHappinessByMail(this.currentUser.username)
            .subscribe(data => {
                this.happinessNote = data;
                console.log(this.happinessNote);
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
    happinessImage(imgName: any) {
        return require(`./assets/img/showImage/${imgName}.png`);
    }

     eventName = [

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
        },
        {
            "Name": "All"
        }
    ];

    //getAllEvent() {
    //    return Observable.of(this.eventName);

    //}

    ngOnInit(): void {
        this.getHappinessByMail();
        //this.getAllEvent()
        //    .subscribe(data => {
        //        this.events = data;
        //        console.log(this.events);
        //    });
        
    }

    public postHappinessDoor() {


    }

}


