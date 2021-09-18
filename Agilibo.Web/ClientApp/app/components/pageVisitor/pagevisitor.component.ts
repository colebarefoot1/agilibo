import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { AlertService } from '../../services/alert.service';
@Component({
    selector: 'pagevisitor',
    templateUrl: './pagevisitor.component.html'
})

export class PagevisitorComponent implements OnInit {
    loading = false;
    currentUser: LoggedinUserInformation;
    errorMessage: string = "";

    constructor(private _avRoute: ActivatedRoute,
        private router: Router,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    ngOnInit(): void {
    }
}
