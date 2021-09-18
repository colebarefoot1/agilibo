import { Component, OnInit, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoggedinUserInformation } from '../../models/LoggedinUserInformation';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { AppComponent } from '../app/app.component';

@Component({
    selector: 'agilibo',
    templateUrl: './agilibo.component.html'
})
export class AgiliboComponent implements OnInit {
    isLoggedIn: boolean = false;
    currentUser: LoggedinUserInformation;
    constructor(private router: Router, private app: NavMenuComponent, private mainapp: AppComponent)
    {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    ngOnInit(): void {
       
        if (this.currentUser.userKey) {
            this.app.checkLogin();
            this.app.getList(true);
            this.app.setNavBarState();

            this.mainapp.showheader();
            this.mainapp.getHeaderDetail();
            this.router.navigate(['/feeds']);
        }
        else {
            this.router.navigate(['/signin']);
        }
    }
}
