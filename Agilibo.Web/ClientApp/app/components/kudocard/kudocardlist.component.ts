import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RerouteToSignin } from '../../services/rerouteToSignin';
import { AlertService } from '../../services/alert.service';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';


@Component({
    selector: 'kudocardlist',
    templateUrl: './kudocardlist.component.html',
    styleUrls: ['./kudocard.component.css'],
})

export class KudoCardsListPage implements OnInit {
    currentUser: LoggedinUserInformation;

    //public heroImageUrl = require("./assets/imgs/kudo_cards/congratulations.png");
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    }
    cardsList: any[] = [
        {
            title: 'CONGRATULATIONS!',
            color: 'green',
            img: 'congratulations.png'
        },
        {
            title: 'GREAT JOB!',
            color: 'pink',
            img: 'greatjob.png'
        },
        {
            title: 'MANY THANKS!',
            color: 'yellow',
            img: 'manythanks.png'
        },
        {
            title: 'THANK YOU!',
            color: 'red',
            img: 'thankyou.png'
        },
        {
            title: 'TOTALLY AWESOME!',
            color: 'purple',
            img: 'totalawesome.png'
        },
        {
            title: 'VERY HAPPY!',
            color: 'blue',
            img: 'veryhappy.png'
        },
        
        {
            title: 'WELL DONE!',
            color: 'brown',
            img: 'welldone.png'
        }
       
        
    ];

    kudoImagePath(imgName: string) {
        //console.log(imgName);
        return require(`./assets/imgs/kudo_cards/${imgName}`);
        
    }
    gotoKudoPost(card: any) {

        this.router.navigate(['/kudocard'], { queryParams: card});

        //this.router.navigate(['kudocard', { cardname: card, email: this.currentUser.username }]);

        console.log(card)
    }

    ngOnInit(): void {


    }

}