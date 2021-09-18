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
import { KudoCardService } from '../../services/kudocard.service/kudocard.service';
import { KudoCard } from '../../models/KudoCard';
import * as signalR from '../../../../node_modules/@aspnet/signalr';
import { HubConnection } from '../../../../node_modules/@aspnet/signalr';
import { AppConfig } from '../../../AppConfig';


@Component({
    selector: 'kudocard',
    templateUrl: './kudocardbox.component.html',
    styleUrls: ['./kudocard.component.css']
})

export class KudoCardBoxComponent implements OnInit {

    model: any = {};
    loading = false;
    public errorMessage: string = '';
    currentUser: LoggedinUserInformation;
    kudoCardByUnit: any = {};

    kudoForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private kudocardService: KudoCardService,
        private alertService: AlertService
        , private config: AppConfig) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    }

    getKudoCardByUnitId() {
        this.kudocardService.getKudoCardByUnitId(this.currentUser.unitKey, this.currentUser.companyKey)
            .subscribe(data => {
                this.kudoCardByUnit = data;
                console.log(this.kudoCardByUnit);
            },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
    kudoCardImage(imgName: any) {
        return require(`./assets/imgs/kudo_cards/main/${imgName}`);
    }

    //savePdf() {
    //   var PdfHtml = ("#manDiv").html(); 
    //    pdfMake.createPdf(PdfHtml).download();
    //}
    ngOnInit(): void {

        this.getKudoCardByUnitId();
    }
    //ngOnDestroy() {
    //    this.card.unsubscribe();
    //}

    public postKudoCard() {


    }

}